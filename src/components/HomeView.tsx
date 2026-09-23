import React, { useState } from 'react';
import { NavigationPage, Product } from '../types';

interface HomeViewProps {
  onNavigate: (page: NavigationPage) => void;
  onSearchPrompt: (prompt: string) => void;
  featuredProducts: Product[];
  onSelectProduct: (productId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSearchPrompt,
  featuredProducts,
  onSelectProduct
}) => {
  const [promptText, setPromptText] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState<'all' | 'laptops' | 'audio' | 'smartphones' | 'wearables' | 'cameras'>('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptText.trim()) {
      onSearchPrompt('Lightweight laptop under $1500 for software development and 4K video editing');
    } else {
      onSearchPrompt(promptText);
    }
    onNavigate('recommendations');
  };

  const handleChipClick = (chipPrompt: string) => {
    const cleaned = chipPrompt.replace(/"/g, '');
    setPromptText(cleaned);
    onSearchPrompt(cleaned);
    onNavigate('recommendations');
  };

  const sampleWorkflows = [
    {
      title: 'Full-Stack Developer',
      prompt: 'MacBook or ThinkPad with 32GB RAM, fast multi-core CPU, and 10h+ battery under $2000',
      icon: 'code',
      tag: 'Coding & VMs'
    },
    {
      title: 'Frequent Business Traveler',
      prompt: 'Over-ear headphones with best-in-class active noise cancelling, 30h battery, and compact fold',
      icon: 'flight_takeoff',
      tag: 'Commuting & ANC'
    },
    {
      title: 'Content Creator & 4K Video',
      prompt: 'Mirrorless camera with 4K 60fps, 10-bit color, image stabilization, and fast eye-autofocus',
      icon: 'videocam',
      tag: '4K Production'
    },
    {
      title: 'Ultra-Marathon Athlete',
      prompt: 'Rugged titanium GPS smartwatch with sapphire glass, offline topo maps, and 14-day battery',
      icon: 'directions_run',
      tag: 'Endurance & Sport'
    }
  ];

  const categoryDetails = [
    {
      id: 'Laptops',
      title: 'Laptops & Workstations',
      desc: 'M3 Pro MacBooks, Intel Core Ultra & OLED ultrabooks with 16-64GB RAM.',
      icon: 'laptop_mac',
      count: '18 Devices',
      startPrice: '$899',
      popularBrands: 'Apple, Lenovo, Dell, Asus, Framework',
      gradient: 'from-emerald-950/90 to-[#003915]'
    },
    {
      id: 'Headphones',
      title: 'ANC Headphones & Earbuds',
      desc: 'Top-tier active noise cancellation, LDAC lossless codecs, and 60h playtime.',
      icon: 'headphones',
      count: '16 Devices',
      startPrice: '$129',
      popularBrands: 'Sony, Bose, Sennheiser, Apple',
      gradient: 'from-[#003915] to-[#005220]'
    },
    {
      id: 'Smartphones',
      title: 'Smartphones & Flagships',
      desc: 'Periscope telephoto zoom, titanium builds, and on-device neural processing.',
      icon: 'smartphone',
      count: '12 Devices',
      startPrice: '$699',
      popularBrands: 'Samsung, Apple, Google Pixel',
      gradient: 'from-slate-900 to-emerald-950'
    },
    {
      id: 'Wearables',
      title: 'Smartwatches & GPS Gear',
      desc: 'Multi-band GNSS tracking, ECG health sensors, solar charging & dive ratings.',
      icon: 'watch',
      count: '10 Devices',
      startPrice: '$249',
      popularBrands: 'Garmin, Apple Watch Ultra, Samsung',
      gradient: 'from-emerald-950 to-slate-900'
    },
    {
      id: 'Cameras',
      title: 'Cameras & Creator Tech',
      desc: 'Full-frame sensors, 40MP film simulations, and pro video rigs.',
      icon: 'photo_camera',
      count: '8 Devices',
      startPrice: '$899',
      popularBrands: 'Fujifilm, Sony Alpha, Canon EOS',
      gradient: 'from-slate-900 to-[#003915]'
    },
    {
      id: 'Audio',
      title: 'Spatial Audio & Speakers',
      desc: 'Room-calibrating smart speakers, Dolby Atmos bars, and analog hi-fi.',
      icon: 'speaker',
      count: '9 Devices',
      startPrice: '$179',
      popularBrands: 'Sonos, Marshall, Bose',
      gradient: 'from-[#003915] to-emerald-950'
    }
  ];

  const comparisonTableData = [
    {
      feature: 'Search Method',
      traditional: 'Keyword-based (e.g., "laptop 16gb")',
      productpilot: 'Semantic Natural Language Intent Parsing'
    },
    {
      feature: 'Search Bias',
      traditional: 'Ad-sponsored listings & affiliate bid bias',
      productpilot: '100% Deterministic Vector & Spec-weighted Math'
    },
    {
      feature: 'Trade-off Breakdown',
      traditional: 'Raw text walls from random user comments',
      productpilot: 'AI Pros vs Cons + Concrete Lab Benchmarks'
    },
    {
      feature: 'Side-by-Side Matrix',
      traditional: 'Static manual spec copy-paste tables',
      productpilot: 'Dynamic AI Matrix with Winner Badges & Multi-device Dock'
    },
    {
      feature: 'Reasoning Engine',
      traditional: 'None (only keyword frequency)',
      productpilot: 'Google Gemini 2.5 Intent Extraction & Context Synthesis'
    }
  ];

  const faqs = [
    {
      q: 'How does ProductPilot AI calculate match scores?',
      a: 'The engine uses a deterministic multi-factor scoring formula: 40% Budget Efficiency (distance to target price without exceeding cap), 30% Feature & Purpose alignment (verifying exact specs and use cases), 20% Category Precision, and 10% Verified Community & Lab Ratings.'
    },
    {
      q: 'How does the comparison matrix choose the #1 Best Product?',
      a: 'When multiple devices are added to your matrix, ProductPilot ranks them across technical parameters (processor performance, battery longevity, weight, and value-to-price ratio). The top device is crowned the Comparison Winner with a full trade-off explanation.'
    },
    {
      q: 'Are any recommendations sponsored or paid by brands?',
      a: 'No. ProductPilot AI is built on purely objective algorithmic ranking. Products are evaluated strictly on their verified specifications, user satisfaction indices, and standardized benchmark outputs.'
    },
    {
      q: 'Can I search for complex, multi-variable requirements?',
      a: 'Yes! You can combine multiple constraints such as "Lightweight laptop for data science under $1400 with 32GB RAM and at least 12 hours of real battery life". Our LLM extractor parses all parameters simultaneously.'
    }
  ];

  return (
    <div className="space-y-20 pb-20 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* HERO SECTION */}
      <section className="relative pt-10 md:pt-16 pb-16 overflow-hidden px-4 sm:px-8 max-w-[1440px] mx-auto text-center">
        
        {/* Glow ambient background element */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#006b2c]/15 via-[#6bff8f]/10 to-emerald-200/20 blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6bff8f]/30 text-[#007432] text-xs font-extrabold border border-[#006b2c]/20 shadow-xs">
            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
            <span>NEXT-GEN DETERMINISTIC AI HARDWARE DISCOVERY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-[#191c1e]">
            Find the <span className="ai-gradient-text">Right Hardware</span> in Seconds, Not Hours.
          </h1>

          <p className="text-base sm:text-lg text-[#3e4a3d] max-w-2xl mx-auto leading-relaxed font-normal">
            Skip through 50 browser tabs and sponsored reviews. State your real-world workflow, budget, and desired features in plain English — our AI orchestrates the rest.
          </p>

          {/* AI Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto relative group pt-2">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#006b2c] via-[#00873a] to-[#6bff8f] rounded-2xl blur-sm opacity-30 group-focus-within:opacity-60 transition duration-500" />
            <div className="relative glass-card rounded-2xl p-2.5 flex flex-col md:flex-row items-stretch md:items-center gap-2.5 shadow-xl border border-white/60 bg-white/95">
              <div className="flex-1 flex items-center px-4 gap-3">
                <span className="material-symbols-outlined text-[#006b2c] text-2xl">search</span>
                <input
                  type="text"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="e.g. Quiet ANC headphones for long international flights with 30h battery..."
                  className="w-full bg-transparent border-none focus:ring-0 text-sm sm:text-base py-3 sm:py-3.5 placeholder:text-[#3e4a3d]/50 text-[#191c1e] outline-none font-medium"
                />
              </div>
              <button
                type="submit"
                className="bg-[#006b2c] hover:bg-[#00873a] text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#006b2c]/20 shrink-0 cursor-pointer text-sm"
              >
                <span>Find Matches</span>
                <span className="material-symbols-outlined text-lg">rocket_launch</span>
              </button>
            </div>
          </form>

          {/* Quick Click Prompts */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-2">
            <span className="text-xs font-bold text-[#3e4a3d] mr-1">Try asking:</span>
            {[
              '"Laptop under $1000 for coding & light gaming"',
              '"Noise-cancelling headphones for flights"',
              '"GPS smartwatch with 14-day battery"',
              '"Compact camera for street photography"'
            ].map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleChipClick(chip)}
                className="px-3 py-1.5 rounded-xl bg-white border border-[#bdcaba]/40 text-[#3e4a3d] text-xs hover:border-[#006b2c] hover:text-[#006b2c] hover:bg-emerald-50/50 transition-all font-medium cursor-pointer shadow-xs"
              >
                {chip}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* LIVE ARCHITECTURE & STATS STRIP */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="bg-linear-to-r from-[#003915] via-[#005220] to-[#003915] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#7ffc97]/30 space-y-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/15">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#7ffc97]">100k+</div>
              <div className="text-xs text-white/80 uppercase tracking-widest font-bold">
                Products Indexed
              </div>
              <p className="text-[11px] text-white/60">Updated with real market specs</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#7ffc97]">99.4%</div>
              <div className="text-xs text-white/80 uppercase tracking-widest font-bold">
                Intent Precision
              </div>
              <p className="text-[11px] text-white/60">Semantic vector extraction</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#7ffc97]">60+</div>
              <div className="text-xs text-white/80 uppercase tracking-widest font-bold">
                Catalog Devices
              </div>
              <p className="text-[11px] text-white/60">Laptops, ANC, Wearables & Cameras</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#7ffc97]">0%</div>
              <div className="text-xs text-white/80 uppercase tracking-widest font-bold">
                Ad Sponsorship Bias
              </div>
              <p className="text-[11px] text-white/60">100% objective algorithm</p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/80">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#7ffc97]">verified</span>
              <span><strong>Deterministic Engine:</strong> Gemini 2.5 Flash Intent Parsing + Weighted Math Scoring</span>
            </div>
            <button
              onClick={() => onNavigate('about')}
              className="text-[#7ffc97] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Learn about our scoring methodology</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

        </div>
      </section>

      {/* POPULAR WORKFLOW PRESETS */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#006b2c] uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">psychology</span>
              <span>Curated Personas & Scenarios</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191c1e] mt-1">
              Select Your Exact User Profile
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#3e4a3d]">
            Click any profile to instantly run tailored vector matching.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sampleWorkflows.map((wf, idx) => (
            <div
              key={idx}
              onClick={() => handleChipClick(wf.prompt)}
              className="bg-white rounded-2xl p-6 border border-[#bdcaba]/30 hover:border-[#006b2c] shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#006b2c]/10 text-[#006b2c] flex items-center justify-center group-hover:bg-[#006b2c] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">{wf.icon}</span>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-[#006b2c] border border-emerald-200">
                    {wf.tag}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[#191c1e] group-hover:text-[#006b2c] transition-colors">
                  {wf.title}
                </h3>
                <p className="text-xs text-[#3e4a3d] line-clamp-3 leading-relaxed">
                  "{wf.prompt}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#006b2c]">
                <span>Run AI Match</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPLORE CATEGORIES (INTERACTIVE DETAILS) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#006b2c] uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">category</span>
              <span>Broad Hardware Ecosystem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191c1e] mt-1">
              Explore By Hardware Category
            </h2>
          </div>
          <button
            onClick={() => onNavigate('recommendations')}
            className="text-[#006b2c] font-bold text-xs sm:text-sm flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>Open Workspace Matrix</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryDetails.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                onSearchPrompt(cat.id);
                onNavigate('recommendations');
              }}
              className="bg-white rounded-2xl p-6 border border-[#bdcaba]/30 hover:border-[#006b2c]/60 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#006b2c]/10 text-[#006b2c] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                  </div>
                  <span className="text-xs font-extrabold text-[#006b2c] bg-emerald-50 px-2.5 py-1 rounded-lg">
                    From {cat.startPrice}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-[#191c1e] group-hover:text-[#006b2c] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#3e4a3d] mt-1 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-[#3e4a3d] uppercase tracking-wider block">
                    Featured Brands:
                  </span>
                  <span className="text-xs font-semibold text-[#191c1e]">
                    {cat.popularBrands}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-[#006b2c]">
                <span>{cat.count} Available</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Browse Category</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY PRODUCTPILOT AI VS TRADITIONAL SEARCH MATRIX */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#bdcaba]/30 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#006b2c] uppercase tracking-wider">
              REVOLUTIONIZING PRODUCT DISCOVERY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191c1e]">
              Traditional Search vs. ProductPilot AI
            </h2>
            <p className="text-xs sm:text-sm text-[#3e4a3d]">
              Why users save an average of 4.5 hours per buying decision with our semantic recommendation engine.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#bdcaba]/30 text-xs font-bold uppercase tracking-wider">
                  <th className="py-4 px-4 text-[#3e4a3d] w-1/3">Evaluation Criterion</th>
                  <th className="py-4 px-4 text-slate-400 w-1/3">Standard Retail Stores / Search</th>
                  <th className="py-4 px-4 text-[#006b2c] w-1/3 bg-emerald-50/50 rounded-t-xl">
                    ProductPilot AI
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#bdcaba]/20 text-xs">
                {comparisonTableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#191c1e]">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-[#3e4a3d] font-medium">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-rose-500 text-base shrink-0">close</span>
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#006b2c] font-bold bg-emerald-50/30">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#006b2c] text-base shrink-0">check_circle</span>
                        <span>{row.productpilot}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SAMPLE TOP PICKS PREVIEW */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#006b2c] uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">star</span>
              <span>Highest Rated Hardware</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191c1e] mt-1">
              Top Ranked Hardware Picks
            </h2>
          </div>
          <button
            onClick={() => onNavigate('recommendations')}
            className="text-[#006b2c] font-bold text-xs sm:text-sm flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>See All 60+ Devices</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#bdcaba]/30 hover:border-[#006b2c] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-60 bg-[#eceef0] p-6 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full font-extrabold text-[11px] text-[#006b2c] shadow-md border border-[#006b2c]/20 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
                    <span>{product.matchScore}% MATCH</span>
                  </div>
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#006b2c] text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-[#006b2c] uppercase tracking-widest block">
                        {product.brand}
                      </span>
                      <h4 className="font-bold text-base text-[#191c1e] line-clamp-1">
                        {product.name}
                      </h4>
                    </div>
                    <span className="text-lg font-extrabold text-[#006b2c]">
                      ${product.price}
                    </span>
                  </div>

                  <div className="p-3 bg-[#6bff8f]/10 rounded-xl border border-[#006e2f]/10">
                    <span className="text-[10px] font-bold text-[#007432] uppercase tracking-wider block mb-1">
                      AI Hardware Verdict
                    </span>
                    <p className="text-xs text-[#3e4a3d] line-clamp-2 leading-relaxed">
                      {product.aiReason}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    {Object.entries(product.specs).slice(0, 2).map(([k, v], i) => (
                      <div key={i} className="bg-slate-50 p-2 rounded-lg">
                        <span className="text-[#3e4a3d] block text-[9px] uppercase font-bold">{k}</span>
                        <span className="font-bold text-[#191c1e] truncate block">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => {
                    onSelectProduct(product.id);
                    onNavigate('product-detail');
                  }}
                  className="w-full py-2.5 bg-[#006b2c] hover:bg-[#00873a] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  View Full Product Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#006b2c] uppercase tracking-wider">
            CLEAR & TRANSPARENT
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191c1e]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#bdcaba]/30 rounded-2xl overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm sm:text-base text-[#191c1e] flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50"
              >
                <span>{faq.q}</span>
                <span className="material-symbols-outlined text-[#006b2c] shrink-0 transition-transform duration-200">
                  {activeFaq === idx ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-[#3e4a3d] leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION BOTTOM BANNER */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-[#003915] via-[#005220] to-[#003915] text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden border border-[#7ffc97]/30">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="px-3.5 py-1 bg-[#7ffc97] text-[#003915] text-xs font-extrabold rounded-full uppercase tracking-wider">
              Ready to Upgrade?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Find Your Next Tech Companion Today
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
              Type your workflow and let ProductPilot AI eliminate choice paralysis with instant side-by-side matrices and clear verdicts.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('recommendations')}
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#003915] font-extrabold text-xs sm:text-sm rounded-xl shadow-lg hover:bg-[#7ffc97] transition-colors cursor-pointer"
              >
                Launch AI Workspace
              </button>
              <button
                onClick={() => onNavigate('compare')}
                className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-colors cursor-pointer"
              >
                Open Comparison Matrix
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
