import React, { useState } from 'react';
import { NavigationPage } from '../types';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  selectedCompareCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  selectedCompareCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNav = (page: NavigationPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#f7f9fb]/90 backdrop-blur-xl sticky top-0 z-50 border-b border-[#bdcaba]/30 shadow-xs transition-all duration-300">
      <div className="flex justify-between items-center h-16 sm:h-20 px-3.5 sm:px-8 max-w-[1440px] mx-auto">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="hover:opacity-95 transition-all focus:outline-none flex items-center gap-2.5 sm:gap-3 group cursor-pointer text-left shrink-0"
          title="ProductPilot AI - Home"
        >
          {/* Project Logo Icon on Left */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#006b2c] via-[#005221] to-[#003915] p-1.5 sm:p-2 flex items-center justify-center shadow-md shadow-[#006b2c]/20 border border-[#7ffc97]/40 shrink-0 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#006b2c]/30 transition-all duration-300">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="w-5 h-5 sm:w-6 sm:h-6"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="pilotLogoGrad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7ffc97" />
                  <stop offset="0.55" stopColor="#ffffff" />
                  <stop offset="1" stopColor="#bdcaba" />
                </linearGradient>
              </defs>
              <path
                d="M16 3L27 25L16 20.5L5 25L16 3Z"
                fill="url(#pilotLogoGrad)"
              />
              <path
                d="M16 3V20.5"
                stroke="#003915"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <circle cx="16" cy="11" r="1.75" fill="#003915" />
              <path
                d="M24 3L25 6L28 7L25 8L24 11L23 8L20 7L23 6L24 3Z"
                fill="#7ffc97"
              />
            </svg>
          </div>

          {/* Brand Name */}
          <span className="text-lg sm:text-2xl font-black tracking-tight text-[#191c1e] flex items-center">
            <span>ProductPilot</span>
            <span className="text-[#006b2c] ml-1 sm:ml-1.5 font-extrabold bg-[#6bff8f]/25 px-1 sm:px-1.5 py-0.5 rounded-md text-xs sm:text-base border border-[#006b2c]/20">
              AI
            </span>
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => onNavigate('home')}
            className={`font-medium transition-colors text-base py-1 ${
              currentPage === 'home'
                ? 'text-[#006b2c] border-b-2 border-[#006b2c] font-semibold'
                : 'text-[#3e4a3d] hover:text-[#006b2c]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('recommendations')}
            className={`font-medium transition-colors text-base py-1 ${
              currentPage === 'recommendations'
                ? 'text-[#006b2c] border-b-2 border-[#006b2c] font-semibold'
                : 'text-[#3e4a3d] hover:text-[#006b2c]'
            }`}
          >
            Recommendations
          </button>
          <button
            onClick={() => onNavigate('compare')}
            className={`font-medium transition-colors text-base py-1 relative flex items-center gap-1.5 cursor-pointer ${
              currentPage === 'compare'
                ? 'text-[#006b2c] border-b-2 border-[#006b2c] font-semibold'
                : 'text-[#3e4a3d] hover:text-[#006b2c]'
            }`}
          >
            <span>Compare</span>
            {selectedCompareCount > 0 && (
              <span className="px-2 py-0.5 text-xs bg-[#006b2c] text-white rounded-full font-bold shadow-xs">
                {selectedCompareCount}
              </span>
            )}
          </button>
          <button
            onClick={() => onNavigate('product-detail')}
            className={`font-medium transition-colors text-base py-1 ${
              currentPage === 'product-detail'
                ? 'text-[#006b2c] border-b-2 border-[#006b2c] font-semibold'
                : 'text-[#3e4a3d] hover:text-[#006b2c]'
            }`}
          >
            Product Details
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`font-medium transition-colors text-base py-1 ${
              currentPage === 'about'
                ? 'text-[#006b2c] border-b-2 border-[#006b2c] font-semibold'
                : 'text-[#3e4a3d] hover:text-[#006b2c]'
            }`}
          >
            About
          </button>
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop/Tablet CTA Button */}
          <button
            onClick={() => onNavigate('recommendations')}
            className="hidden sm:flex bg-[#006b2c] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold hover:opacity-90 transition-all scale-95 active:scale-90 shadow-sm text-xs sm:text-base items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">auto_awesome</span>
            <span>Start Recommending</span>
          </button>

          {/* Mobile Quick Discover Button */}
          <button
            onClick={() => onNavigate('recommendations')}
            className="sm:hidden flex items-center gap-1 px-3 py-1.5 bg-[#006b2c] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer active:scale-95"
            title="Start Recommending"
          >
            <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
            <span>Workspace</span>
          </button>

          {/* Mobile Hamburger Drawer Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl border border-[#bdcaba]/40 bg-white flex items-center justify-center text-[#191c1e] hover:text-[#006b2c] hover:border-[#006b2c] transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            <span className="material-symbols-outlined text-xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay & Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#bdcaba]/30 bg-white/98 backdrop-blur-2xl shadow-xl px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1.5">
            <button
              onClick={() => handleMobileNav('home')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                currentPage === 'home'
                  ? 'bg-emerald-50 text-[#006b2c] font-bold border border-emerald-200'
                  : 'text-[#3e4a3d] hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl text-[#006b2c]">home</span>
                <span>Home Discovery</span>
              </div>
              <span className="material-symbols-outlined text-base text-slate-400">chevron_right</span>
            </button>

            <button
              onClick={() => handleMobileNav('recommendations')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                currentPage === 'recommendations'
                  ? 'bg-emerald-50 text-[#006b2c] font-bold border border-emerald-200'
                  : 'text-[#3e4a3d] hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl text-[#006b2c]">auto_awesome</span>
                <span>Recommendation Workspace</span>
              </div>
              <span className="material-symbols-outlined text-base text-slate-400">chevron_right</span>
            </button>

            <button
              onClick={() => handleMobileNav('compare')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                currentPage === 'compare'
                  ? 'bg-emerald-50 text-[#006b2c] font-bold border border-emerald-200'
                  : 'text-[#3e4a3d] hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl text-[#006b2c]">equalizer</span>
                <span>Comparison Matrix</span>
              </div>
              <div className="flex items-center gap-2">
                {selectedCompareCount > 0 && (
                  <span className="px-2 py-0.5 text-xs bg-[#006b2c] text-white rounded-full font-bold">
                    {selectedCompareCount}
                  </span>
                )}
                <span className="material-symbols-outlined text-base text-slate-400">chevron_right</span>
              </div>
            </button>

            <button
              onClick={() => handleMobileNav('product-detail')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                currentPage === 'product-detail'
                  ? 'bg-emerald-50 text-[#006b2c] font-bold border border-emerald-200'
                  : 'text-[#3e4a3d] hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl text-[#006b2c]">visibility</span>
                <span>Product Details & Specs</span>
              </div>
              <span className="material-symbols-outlined text-base text-slate-400">chevron_right</span>
            </button>

            <button
              onClick={() => handleMobileNav('about')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                currentPage === 'about'
                  ? 'bg-emerald-50 text-[#006b2c] font-bold border border-emerald-200'
                  : 'text-[#3e4a3d] hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl text-[#006b2c]">info</span>
                <span>About Methodology & Engine</span>
              </div>
              <span className="material-symbols-outlined text-base text-slate-400">chevron_right</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-[#3e4a3d]">
            <span className="flex items-center gap-1 font-semibold text-[#006b2c]">
              <span className="w-2 h-2 rounded-full bg-[#006b2c] animate-pulse" />
              <span>Catalog: 60+ Devices Synced</span>
            </span>
            <span className="text-[11px] text-slate-400">Zero Sponsored Placement</span>
          </div>
        </div>
      )}
    </header>
  );
};


