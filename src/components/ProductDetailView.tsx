import React, { useState } from 'react';
import { Product, NavigationPage } from '../types';

interface ProductDetailViewProps {
  product: Product;
  allProducts: Product[];
  onSelectProduct: (productId: string) => void;
  onNavigate: (page: NavigationPage) => void;
  onToggleCompare: (productId: string) => void;
  isCompared: boolean;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  allProducts,
  onSelectProduct,
  onNavigate,
  onToggleCompare,
  isCompared
}) => {
  const images = product.galleryImages || [product.image];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'proscons' | 'benchmarks'>('overview');
  const [saved, setSaved] = useState(false);

  const alternatives = allProducts.filter((p) => p.id !== product.id);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 space-y-12 pb-24">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#3e4a3d] font-medium">
        <button onClick={() => onNavigate('home')} className="hover:text-[#006b2c] transition-colors">
          Home
        </button>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <button onClick={() => onNavigate('recommendations')} className="hover:text-[#006b2c] transition-colors">
          {product.category}
        </button>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-[#191c1e] font-bold">{product.name}</span>
      </nav>

      {/* TOP HERO ASYMMETRIC SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Gallery Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="h-[380px] sm:h-[450px] rounded-2xl overflow-hidden bg-[#eceef0] border border-[#bdcaba]/30 shadow-xs relative group flex items-center justify-center p-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 rounded-xl"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#006b2c] text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                {product.badge}
              </span>
            )}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-[#006b2c]/30 px-3 py-1 rounded-full text-[#006b2c] text-xs font-extrabold shadow-md">
              {product.matchScore}% Match Score
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
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
                <span>{isCompared ? 'In Comparison Matrix' : 'Add to Compare Matrix'}</span>
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
        <div className="flex items-center gap-2 border-b border-[#bdcaba]/30 pb-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-bold text-xs rounded-xl transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#006b2c] text-white'
                : 'text-[#3e4a3d] hover:bg-[#eceef0]'
            }`}
          >
            Overview & AI Verdict
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-2 font-bold text-xs rounded-xl transition-all cursor-pointer ${
              activeTab === 'specs'
                ? 'bg-[#006b2c] text-white'
                : 'text-[#3e4a3d] hover:bg-[#eceef0]'
            }`}
          >
            Full Specifications
          </button>
          <button
            onClick={() => setActiveTab('proscons')}
            className={`px-4 py-2 font-bold text-xs rounded-xl transition-all cursor-pointer ${
              activeTab === 'proscons'
                ? 'bg-[#006b2c] text-white'
                : 'text-[#3e4a3d] hover:bg-[#eceef0]'
            }`}
          >
            Pros & Cons Analysis
          </button>
          <button
            onClick={() => setActiveTab('benchmarks')}
            className={`px-4 py-2 font-bold text-xs rounded-xl transition-all cursor-pointer ${
              activeTab === 'benchmarks'
                ? 'bg-[#006b2c] text-white'
                : 'text-[#3e4a3d] hover:bg-[#eceef0]'
            }`}
          >
            Lab Benchmarks & Scores
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6 text-xs text-[#191c1e] leading-relaxed">
            <h3 className="text-base font-bold text-[#191c1e]">
              Why ProductPilot AI recommends {product.name}
            </h3>
            <p className="text-[#3e4a3d]">
              In strict synthetic testing and real-world user logs, {product.name} delivered consistent performance matching peak expectations. Thermal throttling remained under 4% during sustained loads, and acoustics recorded whisper-quiet levels under office ambient background.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#f7f9fb] rounded-xl border border-[#bdcaba]/30">
                <span className="font-bold text-[#006b2c] block mb-1">
                  Ideal Profile Target
                </span>
                <p className="text-[#3e4a3d]">
                  Professionals, creators, and daily power users seeking optimal battery longevity, minimal weight, and top display color accuracy.
                </p>
              </div>
              <div className="p-4 bg-[#f7f9fb] rounded-xl border border-[#bdcaba]/30">
                <span className="font-bold text-[#006b2c] block mb-1">
                  Build Quality & Ergonomics
                </span>
                <p className="text-[#3e4a3d]">
                  Precision CNC-machined body with zero chassis flex, satisfying tactile key switches, and high contrast glass trackpad.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="p-3.5 bg-[#f7f9fb] rounded-xl border border-[#bdcaba]/30 flex justify-between items-center">
                <span className="font-bold text-[#3e4a3d]">{key}:</span>
                <span className="font-semibold text-[#191c1e] text-right">{val}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'proscons' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Pros */}
            <div className="space-y-3 bg-[#6bff8f]/10 p-5 rounded-xl border border-[#006e2f]/10">
              <h4 className="font-bold text-[#006b2c] uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#006b2c] text-base">check_circle</span>
                Verified Advantages
              </h4>
              <ul className="space-y-2 text-[#191c1e]">
                {product.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#006b2c] text-sm shrink-0 mt-0.5">check</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="space-y-3 bg-[#f7f9fb] p-5 rounded-xl border border-[#bdcaba]/30">
              <h4 className="font-bold text-[#3e4a3d] uppercase tracking-wider">
                Considered Trade-offs
              </h4>
              <ul className="space-y-2 text-[#3e4a3d]">
                {product.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3e4a3d]/50 shrink-0 mt-1.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'benchmarks' && (
          <div className="space-y-6 text-xs text-[#191c1e]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#191c1e]">
                  Laboratory Benchmark Index
                </h3>
                <p className="text-[#3e4a3d] mt-0.5">
                  Standardized test scores normalized across comparable hardware in the {product.category} sector.
                </p>
              </div>
              <span className="px-3 py-1 bg-[#006b2c] text-white font-bold text-[11px] rounded-lg">
                Verified Lab Test
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-700">Compute & Sustained Processing</span>
                  <span className="text-[#006b2c]">94 / 100</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#006b2c] rounded-full" style={{ width: '94%' }} />
                </div>
                <p className="text-[11px] text-slate-500">Peak single-core burst and continuous multi-thread score.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-700">Thermal Stability & Cooling</span>
                  <span className="text-[#006b2c]">96 / 100</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#006b2c] rounded-full" style={{ width: '96%' }} />
                </div>
                <p className="text-[11px] text-slate-500">Maintains 96% of peak speed under 60-minute stress loops.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-700">Acoustic Silence & Decibels</span>
                  <span className="text-[#006b2c]">92 / 100</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#006b2c] rounded-full" style={{ width: '92%' }} />
                </div>
                <p className="text-[11px] text-slate-500">Recorded under 28 dBA during everyday productivity tasks.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-700">Value-to-Hardware Ratio</span>
                  <span className="text-[#006b2c]">90 / 100</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#006b2c] rounded-full" style={{ width: '90%' }} />
                </div>
                <p className="text-[11px] text-slate-500">MSRP price relative to premium build materials & lifespan.</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* RECOMMENDED ALTERNATIVES CAROUSEL */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#191c1e]">
            Recommended Alternatives
          </h2>
          <button
            onClick={() => onNavigate('recommendations')}
            className="text-xs font-bold text-[#006b2c] hover:text-[#00873a] flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {alternatives.slice(0, 3).map((alt) => (
            <div
              key={alt.id}
              onClick={() => {
                onSelectProduct(alt.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="glass-card rounded-2xl border border-[#bdcaba]/30 p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
            >
              <img
                src={alt.image}
                alt={alt.name}
                className="w-20 h-20 rounded-xl object-cover group-hover:scale-105 transition-transform"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#006b2c] uppercase">
                  {alt.matchScore}% Match
                </span>
                <h4 className="font-bold text-xs text-[#191c1e] group-hover:text-[#006b2c] transition-colors line-clamp-1">
                  {alt.name}
                </h4>
                <p className="text-xs font-extrabold text-[#006b2c]">
                  ${alt.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

