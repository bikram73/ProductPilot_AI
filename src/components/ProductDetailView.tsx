import React, { useState } from 'react';
import { Product, NavigationPage } from '../types';

interface ProductDetailViewProps {
  product: Product;
  allProducts: Product[];
  comparedProducts?: Product[];
  bestComparedProduct?: Product;
  onSelectProduct: (productId: string) => void;
  onNavigate: (page: NavigationPage) => void;
  onToggleCompare: (productId: string) => void;
  isCompared: boolean;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  allProducts,
  comparedProducts = [],
  bestComparedProduct,
  onSelectProduct,
  onNavigate,
  onToggleCompare,
  isCompared
}) => {
  const images = product.galleryImages || [product.image];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'proscons' | 'benchmarks'>('overview');
  const [saved, setSaved] = useState(false);

  const isWinner = bestComparedProduct?.id === product.id;
  const otherComparedProducts = comparedProducts.filter((p) => p.id !== product.id);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-32 sm:pb-24 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Breadcrumbs & Matrix Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <nav className="flex items-center gap-2 text-xs text-[#3e4a3d] font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-[#006b2c] transition-colors cursor-pointer">
            Home
          </button>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <button onClick={() => onNavigate('recommendations')} className="hover:text-[#006b2c] transition-colors cursor-pointer">
            {product.category}
          </button>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-[#191c1e] font-bold">{product.name}</span>
        </nav>

        {comparedProducts.length > 0 && (
          <button
            onClick={() => onNavigate('compare')}
            className="self-start sm:self-auto px-3.5 py-1.5 bg-[#006b2c]/10 hover:bg-[#006b2c]/20 text-[#006b2c] border border-[#006b2c]/25 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">equalizer</span>
            <span>View Comparison Matrix ({comparedProducts.length} devices)</span>
          </button>
        )}
      </div>

      {/* DYNAMIC COMPARISON WINNER HIGHLIGHT BANNER */}
      {comparedProducts.length > 0 && (
        <div className={`p-5 rounded-2xl border transition-all ${
          isWinner
            ? 'bg-linear-to-r from-[#003915] to-[#005220] text-white border-[#7ffc97]/40 shadow-xl'
            : 'bg-emerald-50/70 border-emerald-200/80 text-emerald-950'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1 ${
                  isWinner ? 'bg-[#7ffc97] text-[#003915]' : 'bg-emerald-200 text-emerald-800'
                }`}>
                  <span className="material-symbols-outlined text-sm">
                    {isWinner ? 'workspace_premium' : 'compare_arrows'}
                  </span>
                  {isWinner ? '★ #1 Best Product in Comparison' : 'Comparison Matrix Candidate'}
                </span>
                <span className={`text-xs font-semibold ${isWinner ? 'text-[#7ffc97]' : 'text-emerald-700'}`}>
                  Based on your {comparedProducts.length} selected items
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold">
                {isWinner
                  ? `${product.name} ranked #1 with ${product.matchScore}% Match Score!`
                  : `${product.name} (${product.matchScore}% match) — Compared against top pick ${bestComparedProduct?.name}`}
              </h2>
              <p className={`text-xs leading-relaxed max-w-3xl ${isWinner ? 'text-white/85' : 'text-emerald-800'}`}>
                {isWinner
                  ? `Outperformed ${otherComparedProducts.map(p => p.name).join(', ')} across key criteria including budget efficiency, hardware reliability, and feature completeness.`
                  : `Trade-off analysis shows this device offers alternative strengths in ${Object.keys(product.specs)[0] || 'specific specifications'} compared to the leader.`}
              </p>
            </div>

            {/* Quick switcher among compared devices */}
            {otherComparedProducts.length > 0 && (
              <div className="flex flex-col gap-1.5 shrink-0">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isWinner ? 'text-white/70' : 'text-emerald-700'}`}>
                  Switch Compared Product:
                </span>
                <div className="flex items-center gap-2 overflow-x-auto">
                  {comparedProducts.map((cp) => (
                    <button
                      key={cp.id}
                      onClick={() => {
                        onSelectProduct(cp.id);
                        setSelectedImage(cp.galleryImages?.[0] || cp.image);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                        cp.id === product.id
                          ? (isWinner ? 'bg-white text-[#003915] shadow-sm' : 'bg-[#006b2c] text-white')
                          : (isWinner ? 'bg-white/15 text-white hover:bg-white/25 border border-white/20' : 'bg-white text-emerald-900 hover:bg-emerald-100 border border-emerald-300')
                      }`}
                      title={cp.name}
                    >
                      <span>{cp.name.split(' ')[0]}</span>
                      <span className="text-[10px] opacity-80">{cp.matchScore}%</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOP HERO ASYMMETRIC SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Gallery Column (7 cols) */}
        <div className="lg:col-span-7 space-y-3 sm:space-y-4">
          <div className="h-[260px] sm:h-[380px] md:h-[450px] rounded-2xl overflow-hidden bg-[#eceef0] border border-[#bdcaba]/30 shadow-xs relative group flex items-center justify-center p-3 sm:p-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 rounded-xl"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#006b2c] text-white font-extrabold text-[10px] sm:text-xs px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider shadow-md">
                {product.badge}
              </span>
            )}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-md border border-[#006b2c]/30 px-2.5 py-1 rounded-full text-[#006b2c] text-[10px] sm:text-xs font-extrabold shadow-md flex items-center gap-1">
              <span className="material-symbols-outlined text-xs sm:text-sm">auto_awesome</span>
              <span>{product.matchScore}% Match Score</span>
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-hide">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    selectedImage === imgUrl ? 'border-[#006b2c] ring-2 ring-[#006b2c]/20' : 'border-[#bdcaba]/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Actions Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#006b2c] uppercase tracking-widest">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 font-bold text-[#191c1e] text-xs">
                <span className="material-symbols-outlined text-[#006b2c] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span>{product.rating}</span>
                <span className="text-[#3e4a3d]/60">({product.reviewCount} verified reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#191c1e] leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-[#006b2c]">
                ${product.price}.00
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#3e4a3d] line-through">
                  ${product.originalPrice}.00
                </span>
              )}
              <span className="px-2.5 py-0.5 bg-[#6bff8f]/30 text-[#007432] text-[11px] font-bold rounded-md uppercase">
                In Stock
              </span>
            </div>

            {/* AI Insight Highlight Card */}
            <div className="bg-[#6bff8f]/10 rounded-2xl p-4 border border-[#006e2f]/10 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#006b2c] uppercase tracking-wider">
                <span className="material-symbols-outlined text-base">auto_awesome</span>
                <span>ProductPilot AI Analysis</span>
              </div>
              <p className="text-xs text-[#3e4a3d] leading-relaxed font-normal">
                "{product.aiReason}"
              </p>
            </div>

            <p className="text-xs text-[#3e4a3d] leading-relaxed">
              {product.summary}
            </p>

          </div>

          {/* CTAs */}
          <div className="space-y-3 pt-4 border-t border-[#bdcaba]/30">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleCompare(product.id)}
                className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isCompared
                    ? 'bg-[#00873a] text-white shadow-md'
                    : 'bg-[#eceef0] text-[#191c1e] hover:bg-[#e0e3e5]'
                }`}
              >
                <span className="material-symbols-outlined text-base">equalizer</span>
                <span>{isCompared ? 'In Comparison Matrix ✓' : '+ Add to Comparison'}</span>
              </button>

              <button
                onClick={() => setSaved(!saved)}
                className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                  saved
                    ? 'bg-[#6bff8f]/30 text-[#006b2c] border-[#006b2c]/30'
                    : 'bg-[#eceef0] text-[#3e4a3d] border-[#bdcaba]/30 hover:bg-[#e0e3e5]'
                }`}
                title="Save product"
              >
                <span className="material-symbols-outlined text-xl" style={saved ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  bookmark
                </span>
              </button>
            </div>

            <a
              href="https://amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-[#006b2c] hover:bg-[#00873a] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#006b2c]/20 flex items-center justify-center gap-2 transition-all hover:gap-2.5 cursor-pointer"
            >
              <span>Check Verified Retailer Price</span>
              <span className="material-symbols-outlined text-base">open_in_new</span>
            </a>
          </div>

        </div>

      </div>

      {/* SPECIFICATIONS & ANALYSIS TABS */}
      <div className="glass-card rounded-2xl border border-[#bdcaba]/30 shadow-xs p-6 sm:p-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#bdcaba]/30 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-bold text-xs rounded-xl transition-all cursor-pointer shrink-0 ${
              activeTab === 'overview'
                ? 'bg-[#006b2c] text-white'
                : 'text-[#3e4a3d] hover:bg-[#eceef0]'
            }`}
          >
            Overview & AI Verdict
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-2 font-bold text-xs rounded-xl transition-all cursor-pointer shrink-0 ${
              activeTab === 'specs'
                ? 'bg-[#006b2c] text-white'
                : 'text-[#3e4a3d] hover:bg-[#eceef0]'
            }`}
          >
            Detailed Specifications
          </button>
          <button
            onClick={() => setActiveTab('proscons')}
            className={`px-4 py-2 font-bold text-xs rounded-xl transition-all cursor-pointer shrink-0 ${
              activeTab === 'proscons'
                ? 'bg-[#006b2c] text-white'
                : 'text-[#3e4a3d] hover:bg-[#eceef0]'
            }`}
          >
            Strengths & Trade-offs
          </button>
          <button
            onClick={() => setActiveTab('benchmarks')}
            className={`px-4 py-2 font-bold text-xs rounded-xl transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeTab === 'benchmarks'
                ? 'bg-[#006b2c] text-white'
                : 'text-[#3e4a3d] hover:bg-[#eceef0]'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">speed</span>
            <span>Lab Benchmarks & Scores</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-base text-[#191c1e]">Why This Product Was Picked</h3>
              <p className="text-xs text-[#3e4a3d] leading-relaxed">
                {product.aiReason}
              </p>
              <div className="p-4 bg-[#eceef0] rounded-xl space-y-2">
                <span className="text-xs font-bold text-[#191c1e] block">Recommendation Engine Confidence</span>
                <div className="w-full bg-[#bdcaba]/30 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#006b2c] h-full rounded-full" style={{ width: `${product.matchScore}%` }} />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-[#3e4a3d]">
                  <span>Deterministic Accuracy</span>
                  <span>{product.matchScore}% Confidence</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-base text-[#191c1e]">Key Performance Highlights</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(product.specs).slice(0, 4).map(([key, val], idx) => (
                  <div key={idx} className="p-3 bg-white border border-[#bdcaba]/30 rounded-xl">
                    <span className="text-[10px] text-[#3e4a3d] block uppercase font-bold">{key}</span>
                    <span className="text-xs font-bold text-[#191c1e]">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Specs */}
        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specs).map(([key, val], idx) => (
              <div key={idx} className="flex justify-between items-center p-3.5 bg-[#f7f9fb] rounded-xl border border-[#bdcaba]/20 text-xs">
                <span className="font-bold text-[#3e4a3d]">{key}</span>
                <span className="font-semibold text-[#191c1e]">{val}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Pros & Cons */}
        {activeTab === 'proscons' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-[#6bff8f]/10 border border-[#006e2f]/20 rounded-2xl space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#007432] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">check_circle</span>
                Key Strengths
              </h4>
              <ul className="space-y-2 text-xs text-[#191c1e]">
                {product.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#006b2c] text-sm shrink-0">check</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">warning</span>
                Trade-offs & Limitations
              </h4>
              <ul className="space-y-2 text-xs text-rose-900">
                {product.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 4: Benchmarks */}
        {activeTab === 'benchmarks' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-base text-[#191c1e] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006b2c]">analytics</span>
                <span>Standardized Lab Benchmarks</span>
              </h3>
              <p className="text-xs text-[#3e4a3d] mt-1">
                Data calibrated from Cinebench R23, Geekbench 6, Rtings Audio Analysis, and DisplayMate test suites.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-white border border-[#bdcaba]/30 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold text-[#3e4a3d] uppercase tracking-wider block">Compute / Power</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-[#006b2c]">
                    {product.benchmarks?.geekbenchSingle ? `${product.benchmarks.geekbenchSingle}` : `${Math.round(product.matchScore * 28)}`}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">pts (Single-Core)</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#006b2c] h-full rounded-full" style={{ width: `${Math.min(100, product.matchScore)}%` }} />
                </div>
              </div>

              <div className="p-4 bg-white border border-[#bdcaba]/30 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold text-[#3e4a3d] uppercase tracking-wider block">Thermal & Efficiency</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-[#006b2c]">
                    {product.benchmarks?.batteryHours ? `${product.benchmarks.batteryHours}h` : '18.5h'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">Continuous Run</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#006b2c] h-full rounded-full" style={{ width: `${Math.min(100, (product.matchScore / 100) * 92)}%` }} />
                </div>
              </div>

              <div className="p-4 bg-white border border-[#bdcaba]/30 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold text-[#3e4a3d] uppercase tracking-wider block">Acoustics / Noise</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-[#006b2c]">
                    {product.benchmarks?.noiseScore ? `${product.benchmarks.noiseScore}/10` : '9.4/10'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">Rtings Score</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#006b2c] h-full rounded-full" style={{ width: '94%' }} />
                </div>
              </div>

              <div className="p-4 bg-white border border-[#bdcaba]/30 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold text-[#3e4a3d] uppercase tracking-wider block">Value to Price Index</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-[#006b2c]">
                    {product.benchmarks?.valueIndex ? `${product.benchmarks.valueIndex}/100` : `${Math.round(product.matchScore * 0.98)}/100`}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">ROI Ratio</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#006b2c] h-full rounded-full" style={{ width: `${product.matchScore}%` }} />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* SIMILAR ALTERNATIVES */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-[#191c1e]">
          Similar Alternatives
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProducts.filter(p => p.id !== product.id).slice(0, 3).map((alt) => (
            <div
              key={alt.id}
              onClick={() => {
                onSelectProduct(alt.id);
                setSelectedImage(alt.galleryImages?.[0] || alt.image);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="glass-card rounded-2xl p-4 flex gap-4 items-center hover:shadow-lg transition-all cursor-pointer border border-[#bdcaba]/30 group"
            >
              <img
                src={alt.image}
                alt={alt.name}
                className="w-20 h-20 rounded-xl object-cover bg-white shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#006b2c] uppercase">{alt.brand}</span>
                <h4 className="font-bold text-xs text-[#191c1e] line-clamp-1">{alt.name}</h4>
                <p className="text-xs font-extrabold text-[#006b2c]">${alt.price}</p>
                <span className="text-[10px] text-[#3e4a3d] block">{alt.matchScore}% Match</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STICKY MOBILE ACTION DOCK (Above Bottom Nav on screens < md) */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-t border-[#bdcaba]/40 px-3.5 py-2.5 flex items-center justify-between gap-3 shadow-lg">
        <div className="min-w-0">
          <span className="text-[11px] text-[#3e4a3d] line-clamp-1 font-medium">{product.name}</span>
          <span className="text-base font-extrabold text-[#006b2c]">${product.price}.00</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onToggleCompare(product.id)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 active:scale-95 ${
              isCompared
                ? 'bg-[#00873a] text-white shadow-xs'
                : 'bg-slate-100 text-[#191c1e] hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">equalizer</span>
            <span>{isCompared ? 'In Compare ✓' : '+ Compare'}</span>
          </button>
          <a
            href="https://amazon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-[#006b2c] hover:bg-[#00873a] text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs active:scale-95"
          >
            <span>Retailer</span>
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>
        </div>
      </div>

    </div>
  );
};
