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

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptText.trim()) {
      onSearchPrompt('I\'m looking for a lightweight laptop under $1000 for programming...');
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

  return (
    <div className="space-y-16 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20 pb-20 overflow-hidden px-4 sm:px-8 max-w-[1440px] mx-auto text-center">
        {/* Atmospheric BG */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6bff8f]/30 text-[#007432] text-xs font-bold mb-8 border border-[#006b2c]/10">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <span>POWERED BY NEXT-GEN AI</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 max-w-4xl mx-auto tracking-tight leading-tight text-[#191c1e]">
            Find the <span className="ai-gradient-text">Perfect Product</span> with AI
          </h1>

          <p className="text-base sm:text-lg text-[#3e4a3d] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Stop scrolling through endless reviews. Describe what you need in natural language, and our AI orchestrator will find the best match across 20+ categories instantly.
          </p>

          {/* AI Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#006b2c] to-[#006e2f] rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
            <div className="relative glass-card rounded-xl p-2 flex flex-col md:flex-row items-stretch md:items-center gap-2 ai-glow">
              <div className="flex-1 flex items-center px-4 gap-3">
                <span className="material-symbols-outlined text-[#006b2c]">search</span>
                <input
                  type="text"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="I'm looking for a lightweight laptop under $1000 for programming..."
                  className="w-full bg-transparent border-none focus:ring-0 text-base py-3 sm:py-4 placeholder:text-[#3e4a3d]/50 text-[#191c1e] outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-[#006b2c] text-white px-8 py-3.5 sm:py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#00873a] transition-colors shrink-0"
              >
                <span>Analyze</span>
                <span className="material-symbols-outlined">rocket_launch</span>
              </button>
            </div>
          </form>

          {/* Chips / Prompt Helpers */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              '"Ergonomic office chair for back pain"',
              '"Noise-cancelling headphones for flights"',
              '"Smartphone with best zoom camera"'
            ].map((chip, idx) => (
              <span
                key={idx}
                onClick={() => handleChipClick(chip)}
                className="px-4 py-2 rounded-full bg-[#f2f4f6] border border-[#bdcaba]/30 text-[#3e4a3d] text-xs sm:text-sm cursor-pointer hover:bg-[#eceef0] transition-colors font-medium"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="py-16 bg-white border-y border-[#bdcaba]/20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#006b2c]">100k+</div>
              <div className="text-xs text-[#3e4a3d] uppercase tracking-widest font-semibold mt-2">
                Products Indexed
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#006b2c]">95%</div>
              <div className="text-xs text-[#3e4a3d] uppercase tracking-widest font-semibold mt-2">
                Accuracy Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#006b2c]">20+</div>
              <div className="text-xs text-[#3e4a3d] uppercase tracking-widest font-semibold mt-2">
                Expert Categories
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#006b2c]">AI</div>
              <div className="text-xs text-[#3e4a3d] uppercase tracking-widest font-semibold mt-2">
                Powered Logic
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES (BENTO GRID STYLE) */}
      <section className="py-12 px-4 sm:px-8 max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-[#191c1e]">Explore Categories</h2>
            <p className="text-[#3e4a3d]">Intelligent sorting across our most popular sectors.</p>
          </div>
          <button
            onClick={() => onNavigate('recommendations')}
            className="text-[#006b2c] font-bold flex items-center gap-1 hover:underline"
          >
            <span>View All</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 h-auto md:h-[500px]">
          {/* Large Card - Laptops */}
          <div
            onClick={() => {
              onSearchPrompt('High Performance Laptops');
              onNavigate('recommendations');
            }}
            className="md:col-span-3 md:row-span-2 group relative overflow-hidden rounded-2xl bg-[#00873a]/10 border border-[#006b2c]/10 p-8 flex flex-col justify-between transition-all hover:shadow-lg cursor-pointer min-h-[260px]"
          >
            <div className="relative z-10">
              <span className="material-symbols-outlined text-[#006b2c] text-[48px] mb-4">
                laptop_mac
              </span>
              <h3 className="text-2xl font-bold mb-2 text-[#191c1e]">High Performance Laptops</h3>
              <p className="text-[#3e4a3d] max-w-xs text-sm">
                From ultrabooks to gaming rigs, find your perfect workstation.
              </p>
            </div>
            <div className="absolute right-[-5%] bottom-[-5%] w-1/2 h-1/2 opacity-30 group-hover:scale-110 transition-transform">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
                alt="Laptops"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-8 relative z-10">
              <span className="text-[#006b2c] font-bold text-sm">12,400+ Products</span>
            </div>
          </div>

          {/* Medium Card - Smartphones */}
          <div
            onClick={() => {
              onSearchPrompt('Smartphones');
              onNavigate('recommendations');
            }}
            className="md:col-span-3 md:row-span-1 group relative overflow-hidden rounded-2xl bg-[#6bff8f]/10 border border-[#006e2f]/10 p-6 sm:p-8 flex items-center justify-between transition-all hover:shadow-lg cursor-pointer"
          >
            <div>
              <span className="material-symbols-outlined text-[#006e2f] text-[32px] mb-2">
                smartphone
              </span>
              <h3 className="text-xl font-bold mb-1 text-[#191c1e]">Smartphones</h3>
              <p className="text-xs text-[#3e4a3d]">Next-gen mobile tech & pro optics.</p>
            </div>
            <div className="w-24 h-24 opacity-40 group-hover:rotate-12 transition-transform">
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80"
                alt="Smartphones"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Small Card - Audio */}
          <div
            onClick={() => {
              onSearchPrompt('Audio Headphones');
              onNavigate('recommendations');
            }}
            className="md:col-span-1.5 md:row-span-1 group relative overflow-hidden rounded-2xl bg-[#eceef0] border border-[#bdcaba]/30 p-6 flex flex-col justify-center text-center transition-all hover:shadow-lg cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#3e4a3d] text-[32px] mb-2 mx-auto">
              headphones
            </span>
            <h4 className="font-bold text-[#191c1e] text-sm">Audio & Sound</h4>
          </div>

          {/* Small Card - Wearables */}
          <div
            onClick={() => {
              onSearchPrompt('Smartwatches Wearables');
              onNavigate('recommendations');
            }}
            className="md:col-span-1.5 md:row-span-1 group relative overflow-hidden rounded-2xl bg-[#eceef0] border border-[#bdcaba]/30 p-6 flex flex-col justify-center text-center transition-all hover:shadow-lg cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#3e4a3d] text-[32px] mb-2 mx-auto">
              watch
            </span>
            <h4 className="font-bold text-[#191c1e] text-sm">Wearables</h4>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-[#f2f4f6]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12 text-[#191c1e]">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#006b2c] text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-[#191c1e]">Describe</h3>
              <p className="text-sm text-[#3e4a3d] max-w-xs mx-auto leading-relaxed">
                Tell us what you're looking for using natural language, just like talking to an expert friend.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#006b2c] text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-[#191c1e]">Understand</h3>
              <p className="text-sm text-[#3e4a3d] max-w-xs mx-auto leading-relaxed">
                Our AI analyzes your intent, budget, and specific needs against millions of technical data points.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#006b2c] text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-[#191c1e]">Receive</h3>
              <p className="text-sm text-[#3e4a3d] max-w-xs mx-auto leading-relaxed">
                Get a curated list of recommendations with clear explanations of why they match your requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="py-12 px-4 sm:px-8 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-white border border-[#bdcaba]/30 hover:border-[#006b2c]/30 transition-all group shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#006b2c]/10 text-[#006b2c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">chat</span>
            </div>
            <h3 className="text-lg font-bold mb-3 text-[#191c1e]">Natural Language Search</h3>
            <p className="text-xs sm:text-sm text-[#3e4a3d] leading-relaxed">
              Forget filters and rigid keywords. Our LLM-powered engine understands nuances like "comfortable for 8 hours" or "portable but powerful."
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#bdcaba]/30 hover:border-[#006b2c]/30 transition-all group shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#006b2c]/10 text-[#006b2c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">lightbulb</span>
            </div>
            <h3 className="text-lg font-bold mb-3 text-[#191c1e]">AI Explanations</h3>
            <p className="text-xs sm:text-sm text-[#3e4a3d] leading-relaxed">
              We don't just show products; we explain the 'Why'. Understand exactly how each feature aligns with your specific request.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#bdcaba]/30 hover:border-[#006b2c]/30 transition-all group shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#006b2c]/10 text-[#006b2c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">payments</span>
            </div>
            <h3 className="text-lg font-bold mb-3 text-[#191c1e]">Budget Matching</h3>
            <p className="text-xs sm:text-sm text-[#3e4a3d] leading-relaxed">
              Intelligent value analysis that finds the best bang-for-buck options within your price range, including hidden gems.
            </p>
          </div>
        </div>
      </section>

      {/* SAMPLE RECOMMENDATION PREVIEW */}
      <section className="py-16 bg-[#f7f9fb] px-4 sm:px-8 max-w-[1440px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-[#191c1e]">Sample Recommendations</h2>
          <p className="text-[#3e4a3d] text-sm max-w-xl mx-auto">
            See how ProductPilot AI presents matches for a "Programming Laptop under $1000".
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group border-slate-200"
            >
              <div className="relative h-64 bg-white p-6 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#006b2c] text-white px-3 py-1 rounded-full font-bold text-[11px] tracking-widest flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span>{product.matchScore}% MATCH</span>
                </div>
              </div>

              <div className="p-6 bg-white flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-lg mb-1 text-[#191c1e]">{product.name}</h4>
                  <p className="text-[#006b2c] font-bold text-base mb-4">${product.price.toFixed(2)}</p>

                  <div className="p-4 rounded-xl bg-[#6bff8f]/10 border border-[#006e2f]/10 mb-6">
                    <p className="text-[10px] font-bold text-[#007432] uppercase tracking-wider mb-1">
                      AI REASON
                    </p>
                    <p className="text-xs text-[#3e4a3d] leading-relaxed">
                      {product.aiReason || product.summary}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectProduct(product.id);
                    onNavigate('product-detail');
                  }}
                  className="w-full py-3 rounded-xl border border-[#006b2c] text-[#006b2c] font-bold hover:bg-[#006b2c] hover:text-white transition-all text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

