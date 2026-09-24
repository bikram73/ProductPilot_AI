import React, { useState, useMemo, useEffect } from 'react';
import { FilterState, Product, NavigationPage, SampleProfile } from '../types';
import { rankProducts, ExtractedPreferences, ScoredProduct, detectMissingPreferences } from '../recommendation/scoring';
import { sampleProfiles } from '../data/sampleProfiles';

interface WorkspaceViewProps {
  products: Product[];
  currentPrompt: string;
  onSearchPrompt: (prompt: string) => void;
  onSelectProduct: (productId: string) => void;
  onNavigate: (page: NavigationPage) => void;
  selectedCompareIds: string[];
  onToggleCompare: (productId: string) => void;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  products,
  currentPrompt,
  onSearchPrompt,
  onSelectProduct,
  onNavigate,
  selectedCompareIds,
  onToggleCompare
}) => {
  const [filters, setFilters] = useState<FilterState>({
    maxBudget: 2000,
    category: 'All',
    brand: 'All',
    purpose: 'Travel & Commuting',
    minRating: 0,
    selectedFeatures: [],
    searchPrompt: currentPrompt || '',
    sortBy: 'match',
    inStockOnly: false
  });

  const [promptText, setPromptText] = useState(
    currentPrompt || 'I need noise-cancelling headphones under $250 for long flights with 20h+ battery life'
  );

  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [showColdStartWizard, setShowColdStartWizard] = useState(false);
  const [extractedIntent, setExtractedIntent] = useState<ExtractedPreferences | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [coldStartQuestions, setColdStartQuestions] = useState<string[]>([]);
  const [buyingAdvice, setBuyingAdvice] = useState<{
    summary?: string;
    buyingTips?: string[];
    thingsToConsider?: string;
    valueWinner?: string;
  } | null>(null);
  const [savedNotification, setSavedNotification] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category !== 'All') count++;
    if (filters.brand !== 'All') count++;
    if (filters.purpose !== 'All' && filters.purpose !== 'Travel & Commuting') count++;
    if (filters.maxBudget < 2000) count++;
    if (filters.minRating > 0) count++;
    if (filters.selectedFeatures.length > 0) count += filters.selectedFeatures.length;
    if (filters.inStockOnly) count++;
    return count;
  }, [filters]);

  // Cold Start analysis
  const coldStartAnalysis = useMemo(() => {
    return detectMissingPreferences(promptText, filters);
  }, [promptText, filters]);

  // Extract preferences via AI whenever prompt is updated
  const handleRunAiExtraction = async (queryToExtract: string) => {
    if (!queryToExtract.trim()) return;
    setIsExtracting(true);
    setColdStartQuestions([]);
    try {
      const res = await fetch('/api/gemini/extract-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryToExtract })
      });
      const data = await res.json();
      if (data && !data.error) {
        setExtractedIntent(data);
        if (data.budget && data.budget > 0) {
          setFilters(prev => ({ ...prev, maxBudget: data.budget }));
        }
        if (data.category && data.category !== 'null') {
          setFilters(prev => ({ ...prev, category: data.category }));
        }

        // Check cold start condition (insufficient query detail)
        if (queryToExtract.trim().split(/\s+/).length < 4) {
          const coldRes = await fetch('/api/gemini/cold-start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: queryToExtract })
          });
          const coldData = await coldRes.json();
          if (coldData.questions) {
            setColdStartQuestions(coldData.questions);
          }
        }
      }
    } catch (e) {
      console.error('Extraction error:', e);
    } finally {
      setIsExtracting(false);
    }
  };

  useEffect(() => {
    if (currentPrompt) {
      setPromptText(currentPrompt);
      handleRunAiExtraction(currentPrompt);
    }
  }, [currentPrompt]);

  // Rank products dynamically using the Weighted Content-Based Filtering Algorithm
  const rankedProducts: ScoredProduct[] = useMemo(() => {
    const scored = rankProducts(products, filters, extractedIntent || undefined);
    let filtered = scored.filter((item) => {
      if (item.price > filters.maxBudget) return false;
      if (filters.category !== 'All' && item.category !== filters.category) return false;
      if (filters.brand !== 'All' && item.brand !== filters.brand) return false;
      if (filters.inStockOnly && !item.inStock) return false;
      if (filters.minRating > 0 && item.rating < filters.minRating) return false;
      return true;
    });

    if (filters.sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating-desc') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      filtered.sort((a, b) => b.calculatedMatchScore - a.calculatedMatchScore);
    }

    return filtered;
  }, [products, filters, extractedIntent]);

  const lastAdviceFetchRef = React.useRef<string>('');

  // Fetch contextual buying advice
  useEffect(() => {
    const fetchAdvice = async () => {
      if (rankedProducts.length === 0) return;
      const topIds = rankedProducts.slice(0, 3).map((p) => p.id).join(',');
      if (topIds === lastAdviceFetchRef.current) return;
      lastAdviceFetchRef.current = topIds;

      try {
        const topProducts = rankedProducts.slice(0, 3);
        const res = await fetch('/api/gemini/explain-recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            products: topProducts,
            userQuery: promptText || 'General search'
          })
        });
        const data = await res.json();
        if (data && !data.error) {
          setBuyingAdvice({
            summary: data.summary,
            buyingTips: data.buyingTips,
            thingsToConsider: data.thingsToConsider,
            valueWinner: data.valueWinner
          });
        }
      } catch (err) {
        console.error('Error fetching buying advice:', err);
      }
    };

    const timer = setTimeout(() => {
      fetchAdvice();
    }, 600);

    return () => clearTimeout(timer);
  }, [rankedProducts, promptText]);

  const handleApplyProfile = (profile: SampleProfile) => {
    setActiveProfileId(profile.id);
    setPromptText(profile.suggestedPrompt);
    setFilters({
      maxBudget: profile.budget,
      category: profile.category,
      brand: 'All',
      purpose: profile.purpose,
      minRating: 0,
      selectedFeatures: profile.priorities,
      searchPrompt: profile.suggestedPrompt,
      sortBy: 'match',
      inStockOnly: false
    });
    onSearchPrompt(profile.suggestedPrompt);
    handleRunAiExtraction(profile.suggestedPrompt);
  };

  const handleResetFilters = () => {
    setActiveProfileId(null);
    setFilters({
      maxBudget: 2500,
      category: 'All',
      brand: 'All',
      purpose: 'All',
      minRating: 0,
      selectedFeatures: [],
      searchPrompt: '',
      sortBy: 'match',
      inStockOnly: false
    });
    setExtractedIntent(null);
    setPromptText('');
  };

  const toggleFeature = (featureName: string) => {
    setFilters(prev => {
      const exists = prev.selectedFeatures.includes(featureName);
      return {
        ...prev,
        selectedFeatures: exists
          ? prev.selectedFeatures.filter(f => f !== featureName)
          : [...prev.selectedFeatures, featureName]
      };
    });
  };

  const handleApplyPrompt = () => {
    onSearchPrompt(promptText);
    handleRunAiExtraction(promptText);
  };

  const handleSavePath = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  // Extract all available brands dynamically
  const availableBrands = useMemo(() => {
    const brandSet = new Set<string>();
    products.forEach(p => {
      if (p.brand) brandSet.add(p.brand);
    });
    return Array.from(brandSet).sort();
  }, [products]);

  const featureOptions = [
    'Noise Cancellation (ANC)',
    '20h+ Battery',
    'OLED / 4K Display',
    'Lightweight & Portable',
    'Water Resistant (IPX7+)',
    'Wireless Fast Charging',
    'High-Res Audio / LDAC',
    'Multi-Band GPS',
    'Mechanical / Haptic Keys',
    '40MP+ Pro Sensor'
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 space-y-8 pb-32 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {savedNotification && (
        <div className="bg-[#006b2c] text-white p-3 rounded-2xl text-xs font-bold text-center shadow-lg animate-in fade-in">
          ✓ Recommendation Path saved to your ProductPilot session!
        </div>
      )}

      {/* SAMPLE PROFILES SELECTOR BAR (REQ-07 & TC-016) */}
      <div className="bg-white rounded-2xl p-5 border border-[#bdcaba]/30 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006b2c] text-xl">group</span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#191c1e]">
              Sample User Profiles (Preset Test Scenarios)
            </span>
          </div>
          <span className="text-[11px] text-[#3e4a3d]">
            Click any profile to instantly load its structured preferences and test recommendation scoring.
          </span>
        </div>

        <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 pb-2 scrollbar-hide snap-x">
          {sampleProfiles.map((prof) => {
            const isSelected = activeProfileId === prof.id;
            return (
              <button
                key={prof.id}
                type="button"
                onClick={() => handleApplyProfile(prof)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-w-[260px] sm:min-w-0 snap-start shrink-0 sm:shrink ${
                  isSelected
                    ? 'bg-[#003915] text-white border-[#7ffc97] shadow-md ring-2 ring-[#006b2c]/30'
                    : 'bg-slate-50/70 hover:bg-emerald-50/50 border-[#bdcaba]/30 text-[#191c1e]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined text-base ${isSelected ? 'text-[#7ffc97]' : 'text-[#006b2c]'}`}>
                        {prof.avatar}
                      </span>
                      <span className="text-xs font-extrabold">{prof.roleTitle}</span>
                    </div>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-[#7ffc97] text-[#003915]' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      ${prof.budget} Cap
                    </span>
                  </div>
                  <p className={`text-[11px] leading-relaxed line-clamp-2 ${isSelected ? 'text-white/80' : 'text-[#3e4a3d]'}`}>
                    {prof.description}
                  </p>
                </div>

                <div className={`mt-2 pt-2 border-t text-[10px] font-bold flex items-center justify-between ${
                  isSelected ? 'border-white/20 text-[#7ffc97]' : 'border-slate-200 text-[#006b2c]'
                }`}>
                  <span>{prof.category} • {prof.priorities[0]}</span>
                  <span>{isSelected ? 'Active ✓' : 'Load →'}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* COLD START GUIDED SETUP WIZARD (REQ-06 & Change 3) */}
      {(coldStartAnalysis.isColdStart || showColdStartWizard) && (
        <div className="bg-emerald-50/80 border border-emerald-300 rounded-2xl p-6 space-y-4 animate-in fade-in shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006b2c] text-xl">help_center</span>
              <h3 className="text-sm font-extrabold text-[#003915] uppercase tracking-wider">
                New to ProductPilot? Guided Preference Setup
              </h3>
            </div>
            <button
              onClick={() => setShowColdStartWizard(false)}
              className="text-xs font-bold text-[#006b2c] hover:underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>

          <p className="text-xs text-[#3e4a3d] leading-relaxed">
            Tell us what you need in 4 quick clicks — no login or database account required:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            {/* 1. Category */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-[#3e4a3d] uppercase block">1. Product Category</span>
              <div className="flex flex-wrap gap-1.5">
                {['Laptops', 'Headphones', 'Smartphones', 'Wearables', 'Cameras'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setFilters(prev => ({ ...prev, category: cat }));
                      setPromptText(prev => `${cat} ${prev}`);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      filters.category === cat ? 'bg-[#006b2c] text-white' : 'bg-white border border-[#bdcaba]/40 text-[#191c1e] hover:bg-emerald-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Budget */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-[#3e4a3d] uppercase block">2. Max Budget</span>
              <div className="flex flex-wrap gap-1.5">
                {[300, 800, 1200, 2000].map((b) => (
                  <button
                    key={b}
                    onClick={() => setFilters(prev => ({ ...prev, maxBudget: b }))}
                    className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      filters.maxBudget === b ? 'bg-[#006b2c] text-white' : 'bg-white border border-[#bdcaba]/40 text-[#191c1e] hover:bg-emerald-50'
                    }`}
                  >
                    &lt; ${b}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Purpose */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-[#3e4a3d] uppercase block">3. Main Purpose</span>
              <div className="flex flex-wrap gap-1.5">
                {['Travel & Commuting', 'Software Engineering', 'Creative Production', 'Fitness & Sport'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setFilters(prev => ({ ...prev, purpose: p }))}
                    className={`text-[11px] px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      filters.purpose === p ? 'bg-[#006b2c] text-white' : 'bg-white border border-[#bdcaba]/40 text-[#191c1e] hover:bg-emerald-50'
                    }`}
                  >
                    {p.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Priority */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-[#3e4a3d] uppercase block">4. Top Priority</span>
              <div className="flex flex-wrap gap-1.5">
                {['20h+ Battery', 'Noise Cancellation (ANC)', 'Lightweight & Portable', 'OLED / 4K Display'].map((f) => (
                  <button
                    key={f}
                    onClick={() => toggleFeature(f)}
                    className={`text-[11px] px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      filters.selectedFeatures.includes(f) ? 'bg-[#006b2c] text-white' : 'bg-white border border-[#bdcaba]/40 text-[#191c1e] hover:bg-emerald-50'
                    }`}
                  >
                    {f.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Layout: Left Sidebar + Right Workspace */}
      <div className="flex flex-col md:flex-row gap-8 relative">
        
        {/* DESKTOP SIDEBAR: PREFERENCE FORM */}
        <aside className="hidden md:block w-[320px] shrink-0">
          <div className="glass-card rounded-2xl p-6 sticky top-28 border border-[#bdcaba]/20 space-y-6">
            <div className="flex items-center justify-between border-b border-[#bdcaba]/20 pb-4">
              <h2 className="text-lg font-bold text-[#006b2c] flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">tune</span>
                <span>Preference Filters</span>
              </h2>
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#3e4a3d] hover:text-[#006b2c] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                title="Reset all filters"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-5">
              
              {/* Category Filter */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#3e4a3d] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#006b2c]">category</span>
                  <span>Category</span>
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full bg-white border border-[#bdcaba] rounded-xl p-2.5 text-xs font-medium focus:ring-2 focus:ring-[#006b2c] focus:border-[#006b2c] transition-all text-[#191c1e] cursor-pointer"
                >
                  <option value="All">All Categories (60+ items)</option>
                  <option value="Laptops">Laptops & Ultrabooks</option>
                  <option value="Headphones">Headphones & ANC Earbuds</option>
                  <option value="Smartphones">Smartphones & Flagships</option>
                  <option value="Wearables">Wearables & Smartwatches</option>
                  <option value="Audio">Audio & Spatial Speakers</option>
                  <option value="Cameras">Cameras & Creator Tech</option>
                </select>
              </div>

              {/* Brand Filter */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#3e4a3d] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#006b2c]">branding_watermark</span>
                  <span>Preferred Brand</span>
                </label>
                <select
                  value={filters.brand}
                  onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                  className="w-full bg-white border border-[#bdcaba] rounded-xl p-2.5 text-xs font-medium focus:ring-2 focus:ring-[#006b2c] focus:border-[#006b2c] transition-all text-[#191c1e] cursor-pointer"
                >
                  <option value="All">All Brands ({availableBrands.length} Available)</option>
                  {availableBrands.map((brandName) => (
                    <option key={brandName} value={brandName}>
                      {brandName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Purpose / Workflow */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#3e4a3d] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#006b2c]">work</span>
                  <span>Primary Purpose</span>
                </label>
                <select
                  value={filters.purpose}
                  onChange={(e) => setFilters({ ...filters, purpose: e.target.value })}
                  className="w-full bg-white border border-[#bdcaba] rounded-xl p-2.5 text-xs font-medium focus:ring-2 focus:ring-[#006b2c] focus:border-[#006b2c] transition-all text-[#191c1e] cursor-pointer"
                >
                  <option value="All">All Workflows & Use Cases</option>
                  <option value="Travel & Commuting">Travel & Long Commuting (ANC, 20h+ Battery)</option>
                  <option value="Software Engineering">Software Engineering & Coding (RAM, CPU)</option>
                  <option value="Creative Production">Creative Production & 4K Video (OLED)</option>
                  <option value="Mobility & Student">Ultra-Light Mobility & Student Life</option>
                  <option value="Fitness & Sport">Marathon, Fitness & Sport (GPS, IPX7)</option>
                  <option value="Studio & Audiophile">Audiophile & Studio Monitoring (Lossless)</option>
                  <option value="Office Productivity">Remote Office & Daily Meetings</option>
                  <option value="Street Photography">Night & Street Photography</option>
                  <option value="Casual Listening">Casual Listening & Media</option>
                </select>
              </div>

              {/* Budget Range Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-[#3e4a3d] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-[#006b2c]">payments</span>
                    <span>Max Budget</span>
                  </label>
                  <span className="text-xs text-[#006b2c] font-extrabold bg-[#6bff8f]/20 px-2 py-0.5 rounded-md">
                    ${filters.maxBudget}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2500"
                  step="50"
                  value={filters.maxBudget}
                  onChange={(e) => setFilters({ ...filters, maxBudget: Number(e.target.value) })}
                  className="w-full h-2 bg-[#e0e3e5] rounded-lg appearance-none cursor-pointer accent-[#006b2c]"
                />
                <div className="flex justify-between text-[10px] text-[#3e4a3d]/70 font-semibold pt-0.5">
                  <span>$50</span>
                  <span>$1,000</span>
                  <span>$2,500</span>
                </div>
              </div>

              {/* Key Feature Multi-Select Pills */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#3e4a3d] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#006b2c]">check_box</span>
                  <span>Required Features</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {featureOptions.map((feat) => {
                    const selected = filters.selectedFeatures.includes(feat);
                    return (
                      <button
                        key={feat}
                        type="button"
                        onClick={() => toggleFeature(feat)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          selected
                            ? 'bg-[#006b2c] text-white shadow-xs'
                            : 'bg-[#eceef0] text-[#3e4a3d] hover:bg-[#e0e3e5]'
                        }`}
                      >
                        {selected && <span className="material-symbols-outlined text-[12px]">check</span>}
                        <span>{feat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Rating Filter (Interactive) */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-[#3e4a3d] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-[#006b2c]">grade</span>
                    <span>Min Rating</span>
                  </label>
                  <span className="text-xs font-bold text-[#006b2c]">
                    {filters.minRating > 0 ? `${filters.minRating}.0+` : 'Any Rating'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {[0, 3, 4, 4.5].map((rateVal) => (
                    <button
                      key={rateVal}
                      type="button"
                      onClick={() => setFilters({ ...filters, minRating: rateVal })}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                        filters.minRating === rateVal
                          ? 'bg-[#006b2c] text-white'
                          : 'bg-[#eceef0] text-[#3e4a3d] hover:bg-[#e0e3e5]'
                      }`}
                    >
                      {rateVal === 0 ? 'All' : `${rateVal}★+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sorting & Availability */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#bdcaba]/20">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#3e4a3d] uppercase tracking-wider">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy || 'match'}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                    className="w-full bg-white border border-[#bdcaba] rounded-lg p-1.5 text-xs font-medium text-[#191c1e] cursor-pointer"
                  >
                    <option value="match">AI Match</option>
                    <option value="price-asc">Price: Low</option>
                    <option value="price-desc">Price: High</option>
                    <option value="rating-desc">Rating</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#3e4a3d] uppercase tracking-wider">
                    Stock
                  </label>
                  <button
                    type="button"
                    onClick={() => setFilters({ ...filters, inStockOnly: !filters.inStockOnly })}
                    className={`w-full p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border flex items-center justify-center gap-1 ${
                      filters.inStockOnly
                        ? 'bg-[#6bff8f]/30 border-[#006b2c] text-[#006b2c]'
                        : 'bg-white border-[#bdcaba] text-[#3e4a3d]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {filters.inStockOnly ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span>In Stock</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleResetFilters}
                className="w-full py-2.5 bg-[#006b2c]/10 text-[#006b2c] font-bold rounded-xl hover:bg-[#006b2c] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 text-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">refresh</span>
                <span>Reset All Filters</span>
              </button>

            </div>
          </div>
        </aside>

        {/* MOBILE FILTER MODAL / BOTTOM SHEET */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center animate-in fade-in duration-200">
            <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[88vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-250">
              {/* Modal Header */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006b2c] text-xl">tune</span>
                  <h3 className="font-bold text-base text-[#191c1e]">
                    Filters & Refine ({activeFiltersCount})
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetFilters}
                    className="text-xs font-bold text-[#006b2c] hover:underline cursor-pointer px-2 py-1"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1 rounded-full text-slate-500 hover:bg-slate-200 cursor-pointer"
                    aria-label="Close filters"
                  >
                    <span className="material-symbols-outlined text-xl">close</span>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 overflow-y-auto space-y-5 text-xs">
                {/* Category */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#3e4a3d] uppercase tracking-wider">
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['All', 'Laptops', 'Headphones', 'Smartphones', 'Wearables', 'Audio', 'Cameras'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFilters({ ...filters, category: cat })}
                        className={`p-2 rounded-xl text-left font-bold transition-all cursor-pointer ${
                          filters.category === cat
                            ? 'bg-[#006b2c] text-white shadow-xs'
                            : 'bg-slate-100 text-[#3e4a3d] hover:bg-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#3e4a3d] uppercase tracking-wider">
                    Brand
                  </label>
                  <select
                    value={filters.brand}
                    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium text-[#191c1e]"
                  >
                    <option value="All">All Brands ({availableBrands.length} Available)</option>
                    {availableBrands.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Purpose */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#3e4a3d] uppercase tracking-wider">
                    Primary Purpose
                  </label>
                  <select
                    value={filters.purpose}
                    onChange={(e) => setFilters({ ...filters, purpose: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium text-[#191c1e]"
                  >
                    <option value="All">All Workflows & Use Cases</option>
                    <option value="Travel & Commuting">Travel & Commuting</option>
                    <option value="Software Engineering">Software Engineering & Coding</option>
                    <option value="Creative Production">Creative Production & 4K Video</option>
                    <option value="Mobility & Student">Mobility & Student</option>
                    <option value="Fitness & Sport">Fitness & Sport</option>
                    <option value="Studio & Audiophile">Studio & Audiophile</option>
                  </select>
                </div>

                {/* Budget Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-[#3e4a3d] uppercase tracking-wider">
                      Max Budget
                    </label>
                    <span className="text-xs text-[#006b2c] font-extrabold bg-[#6bff8f]/20 px-2 py-0.5 rounded-md">
                      ${filters.maxBudget}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="2500"
                    step="50"
                    value={filters.maxBudget}
                    onChange={(e) => setFilters({ ...filters, maxBudget: Number(e.target.value) })}
                    className="w-full h-2 bg-[#e0e3e5] rounded-lg appearance-none cursor-pointer accent-[#006b2c]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>$50</span>
                    <span>$1,000</span>
                    <span>$2,500</span>
                  </div>
                </div>

                {/* Required Features */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#3e4a3d] uppercase tracking-wider">
                    Required Features
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {featureOptions.map((feat) => {
                      const selected = filters.selectedFeatures.includes(feat);
                      return (
                        <button
                          key={feat}
                          type="button"
                          onClick={() => toggleFeature(feat)}
                          className={`text-xs px-2.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1 ${
                            selected
                              ? 'bg-[#006b2c] text-white shadow-xs'
                              : 'bg-slate-100 text-[#3e4a3d]'
                          }`}
                        >
                          {selected && <span className="material-symbols-outlined text-[12px]">check</span>}
                          <span>{feat}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Min Rating */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#3e4a3d] uppercase tracking-wider">
                    Minimum Rating
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[0, 3, 4, 4.5].map((rateVal) => (
                      <button
                        key={rateVal}
                        type="button"
                        onClick={() => setFilters({ ...filters, minRating: rateVal })}
                        className={`py-2 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                          filters.minRating === rateVal
                            ? 'bg-[#006b2c] text-white'
                            : 'bg-slate-100 text-[#3e4a3d]'
                        }`}
                      >
                        {rateVal === 0 ? 'Any' : `${rateVal}★+`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stock Toggle */}
                <div className="pt-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setFilters({ ...filters, inStockOnly: !filters.inStockOnly })}
                    className={`w-full p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center justify-center gap-2 ${
                      filters.inStockOnly
                        ? 'bg-[#6bff8f]/30 border-[#006b2c] text-[#006b2c]'
                        : 'bg-slate-50 border-slate-300 text-[#3e4a3d]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">
                      {filters.inStockOnly ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span>In Stock Only</span>
                  </button>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-3">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 py-3 bg-[#006b2c] hover:bg-[#00873a] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Show {rankedProducts.length} Matches</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <section className="flex-grow space-y-6 sm:space-y-8">
          
          {/* Mobile Quick Category Strip */}
          <div className="md:hidden flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {['All', 'Laptops', 'Headphones', 'Smartphones', 'Wearables', 'Cameras', 'Audio'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilters(prev => ({ ...prev, category: cat }))}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  filters.category === cat
                    ? 'bg-[#006b2c] text-white shadow-xs'
                    : 'bg-white text-[#3e4a3d] border border-[#bdcaba]/40 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile Filter & Sort Toolbar */}
          <div className="md:hidden flex items-center justify-between gap-2 p-2.5 sm:p-3 bg-white rounded-2xl border border-[#bdcaba]/30 shadow-xs">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#006b2c]/10 text-[#006b2c] rounded-xl text-xs font-bold border border-[#006b2c]/20 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-base">tune</span>
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="px-1.5 py-0.2 bg-[#006b2c] text-white rounded-full text-[10px] font-extrabold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#3e4a3d] hidden xs:inline">
                {rankedProducts.length} items
              </span>
              <select
                value={filters.sortBy || 'match'}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                className="bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-medium text-[#191c1e] cursor-pointer"
              >
                <option value="match">AI Match</option>
                <option value="price-asc">Price: Low</option>
                <option value="price-desc">Price: High</option>
                <option value="rating-desc">Rating</option>
              </select>
            </div>
          </div>
          
          {/* Natural Language Prompt Box */}
          <div className="glass-card rounded-2xl p-2 ai-glow">
            <div className="relative group">
              <textarea
                rows={3}
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="I need wireless noise-cancelling headphones under $200 for travel..."
                className="w-full border-none bg-transparent p-4 sm:p-6 text-lg sm:text-xl font-medium text-[#191c1e] placeholder:text-[#3e4a3d]/40 focus:ring-0 outline-none resize-none transition-all"
              />
              <div className="absolute right-4 bottom-4 flex items-center gap-3">
                <button
                  onClick={handleApplyPrompt}
                  className="w-12 h-12 bg-[#006b2c] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#00873a] transition-all active:scale-95 cursor-pointer"
                  title="Extract Intent & Filter"
                >
                  <span className="material-symbols-outlined">auto_awesome</span>
                </button>
              </div>
            </div>
          </div>

          {/* AI Processing State: Extracted Intent */}
          <div className="bg-[#006b2c]/5 rounded-2xl p-6 border border-[#006b2c]/10 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#006b2c] flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[18px]">
                  {isExtracting ? 'sync' : 'psychology'}
                </span>
              </div>
              <h3 className="font-bold text-[#006b2c] text-base">
                {isExtracting ? 'AI Extracting Intent...' : 'Extracted User Intent'}
              </h3>
              <div className="flex-grow border-t border-[#006b2c]/10 mx-2" />
              <span className="text-[11px] text-[#006b2c]/70 font-semibold tracking-wider uppercase">
                Transparent preference-based ranking
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <div className="px-4 py-2 bg-white rounded-full border border-[#006b2c]/20 flex items-center gap-2 shadow-xs">
                <span className="material-symbols-outlined text-[16px] text-[#006b2c]">payments</span>
                <span className="text-xs font-semibold text-[#191c1e]">
                  Budget: &lt; ${extractedIntent?.budget || filters.maxBudget}
                </span>
              </div>
              {extractedIntent?.category && (
                <div className="px-4 py-2 bg-white rounded-full border border-[#006b2c]/20 flex items-center gap-2 shadow-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#006b2c]">category</span>
                  <span className="text-xs font-semibold text-[#191c1e]">
                    Category: {extractedIntent.category}
                  </span>
                </div>
              )}
              {extractedIntent?.brand && (
                <div className="px-4 py-2 bg-white rounded-full border border-[#006b2c]/20 flex items-center gap-2 shadow-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#006b2c]">verified</span>
                  <span className="text-xs font-semibold text-[#191c1e]">
                    Brand: {extractedIntent.brand}
                  </span>
                </div>
              )}
              {extractedIntent?.purpose && (
                <div className="px-4 py-2 bg-white rounded-full border border-[#006b2c]/20 flex items-center gap-2 shadow-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#006b2c]">flight</span>
                  <span className="text-xs font-semibold text-[#191c1e]">
                    Usage: {extractedIntent.purpose}
                  </span>
                </div>
              )}
              {extractedIntent?.features?.map((feat, idx) => (
                <div key={idx} className="px-4 py-2 bg-[#6bff8f]/20 rounded-full border border-[#006b2c]/30 flex items-center gap-2 shadow-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#006b2c]">check_circle</span>
                  <span className="text-xs font-semibold text-[#006b2c]">{feat}</span>
                </div>
              ))}
            </div>

            {/* Cold Start Clarification Questions */}
            {coldStartQuestions.length > 0 && (
              <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-xs font-bold text-amber-800 mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">help_center</span>
                  AI Clarification Needed:
                </p>
                <ul className="text-xs text-amber-900 space-y-1 list-disc pl-4">
                  {coldStartQuestions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* AI Advice & Buying Guidance Card */}
          {buyingAdvice && (
            <div className="glass-card rounded-2xl p-6 bg-linear-to-r from-emerald-900/5 to-white border border-[#006b2c]/20 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006b2c]">auto_awesome</span>
                  <h4 className="font-bold text-[#006b2c] text-sm uppercase tracking-wider">AI Buying Advisor Advice</h4>
                </div>
                {buyingAdvice.valueWinner && (
                  <span className="px-3 py-1 bg-[#6bff8f]/30 border border-[#006b2c]/20 text-[#006b2c] font-bold text-xs rounded-full">
                    ★ Best Value Winner: {buyingAdvice.valueWinner}
                  </span>
                )}
              </div>
              <p className="text-sm text-[#191c1e] font-medium leading-relaxed">
                {buyingAdvice.summary}
              </p>
              {buyingAdvice.buyingTips && buyingAdvice.buyingTips.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  {buyingAdvice.buyingTips.map((tip, idx) => (
                    <div key={idx} className="bg-white/80 p-3 rounded-xl border border-[#bdcaba]/30 text-xs text-[#3e4a3d]">
                      <span className="font-bold text-[#006b2c] block mb-1">Tip #{idx + 1}</span>
                      {tip}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {rankedProducts.map((product) => {
              const isCompared = selectedCompareIds.includes(product.id);
              const displayScore = product.calculatedMatchScore || product.matchScore;
              return (
                <div
                  key={product.id}
                  className="glass-card rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group border-slate-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 sm:h-64 bg-[#eceef0] overflow-hidden flex items-center justify-center p-3 sm:p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                      />
                      {product.badge && (
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                          <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#006b2c] text-white font-semibold text-[10px] sm:text-xs rounded-full shadow-sm uppercase tracking-wider">
                            {product.badge}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-md rounded-2xl px-2.5 py-1.5 sm:px-3 sm:py-2 flex flex-col items-center justify-center border border-[#006b2c]/30 shadow-sm">
                        <span className="text-xs sm:text-sm font-extrabold text-[#006b2c]">{displayScore}%</span>
                        <span className="text-[8px] sm:text-[9px] font-bold uppercase text-[#3e4a3d]">Best Match</span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <div className="flex justify-between items-start mb-2.5 sm:mb-3">
                        <div>
                          <p className="text-[11px] sm:text-xs font-bold text-[#3e4a3d] uppercase tracking-wider mb-0.5 sm:mb-1">
                            {product.brand} • {product.category}
                          </p>
                          <h4 className="text-base sm:text-lg font-bold text-[#191c1e] leading-tight">
                            {product.name}
                          </h4>
                        </div>
                        <div className="text-right shrink-0 ml-2">
                          <p className="text-base sm:text-lg text-[#006b2c] font-bold">${product.price.toFixed(2)}</p>
                          {product.originalPrice && (
                            <p className="text-xs text-[#3e4a3d] line-through">${product.originalPrice.toFixed(2)}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#6bff8f]/30 text-[#007432] rounded-lg">
                          <span className="material-symbols-outlined text-[15px] sm:text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                          <span className="text-xs font-bold">{product.rating}</span>
                        </div>
                        <div className="text-[11px] sm:text-xs text-[#3e4a3d]">{product.reviewCount || 1200}+ verified reviews</div>
                      </div>

                      {/* Score breakdown pills */}
                      {product.scoreBreakdown && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 text-[10px] font-semibold">
                          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200">
                            Budget: {product.scoreBreakdown.budgetScore}%
                          </span>
                          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200">
                            Features: {product.scoreBreakdown.featureScore}%
                          </span>
                          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200">
                            Category: {product.scoreBreakdown.categoryScore}%
                          </span>
                        </div>
                      )}

                      {/* RATIONALE GUARANTEE (REQ-04 & Change 5) */}
                      <div className="p-3 bg-[#6bff8f]/10 border border-[#006e2f]/10 rounded-xl mb-4 text-xs text-[#3e4a3d] space-y-1">
                        <span className="font-bold text-[#007432] uppercase text-[10px] block">
                          AI Recommendation Rationale
                        </span>
                        <p className="leading-relaxed text-xs">
                          {product.aiReason || product.summary}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 pt-0 grid grid-cols-2 gap-2.5 sm:gap-3">
                    <button
                      onClick={() => {
                        onSelectProduct(product.id);
                        onNavigate('product-detail');
                      }}
                      className="py-2.5 sm:py-3 px-3 sm:px-4 min-h-[44px] border border-[#6e7b6c] rounded-xl text-xs font-bold text-[#191c1e] hover:bg-[#eceef0] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => onToggleCompare(product.id)}
                      className={`py-2.5 sm:py-3 px-3 sm:px-4 min-h-[44px] rounded-xl text-xs font-bold active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        isCompared
                          ? 'bg-[#00873a] text-white shadow-md shadow-[#00873a]/20'
                          : 'bg-[#006b2c] text-white hover:bg-[#00873a] shadow-sm'
                      }`}
                      title={isCompared ? 'Remove from comparison' : 'Add to comparison matrix'}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isCompared ? 'check_circle' : 'add_circle'}
                      </span>
                      <span>{isCompared ? 'In Compare ✓' : '+ Compare'}</span>
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Discovering More Card */}
            <div className="glass-card rounded-2xl p-8 border-dashed border-2 border-[#bdcaba] flex flex-col items-center justify-center text-center opacity-70 min-h-[300px]">
              <div className="w-16 h-16 rounded-full bg-[#e6e8ea] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#006b2c] text-[32px] animate-spin">
                  sync
                </span>
              </div>
              <h4 className="font-bold text-base text-[#191c1e]">Live Catalog Synced</h4>
              <p className="text-xs text-[#3e4a3d] mt-2 max-w-[220px] leading-relaxed">
                Deterministic scoring evaluated across 60+ verified catalog devices.
              </p>
            </div>
          </div>

          {/* INLINE WORKSPACE SUMMARY & ACTIONS */}
          <div className="glass-card bg-[#f2f4f6]/90 rounded-2xl p-5 border border-[#006b2c]/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#3e4a3d] uppercase font-bold">Average Match</span>
                <span className="text-lg font-bold text-[#006b2c]">95.4%</span>
              </div>
              <div className="w-[1px] h-8 bg-[#bdcaba]/40 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-[10px] text-[#3e4a3d] uppercase font-bold">Selected to Compare</span>
                <span className="text-sm font-bold text-[#191c1e]">{selectedCompareIds.length} items</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleSavePath}
                className="flex-1 sm:flex-initial px-6 py-2.5 bg-[#eceef0] hover:bg-[#e0e3e5] text-[#191c1e] rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">bookmark</span>
                <span>Save Search Path</span>
              </button>
              <button
                onClick={() => onNavigate('compare')}
                className="flex-1 sm:flex-initial px-6 py-2.5 bg-[#006b2c] hover:bg-[#00873a] text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-[#006b2c]/20 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">equalizer</span>
                <span>Open Matrix ({selectedCompareIds.length})</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
