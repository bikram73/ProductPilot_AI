import React from 'react';
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
  return (
    <header className="bg-[#f7f9fb]/80 backdrop-blur-xl sticky top-0 z-50 border-b border-[#bdcaba]/30 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center h-20 px-4 sm:px-8 max-w-[1440px] mx-auto">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="text-2xl font-bold text-[#006b2c] tracking-tighter hover:opacity-90 transition-opacity focus:outline-none flex items-center gap-2"
        >
          <span>ProductPilot AI</span>
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

        {/* CTA Button */}
        <button
          onClick={() => onNavigate('recommendations')}
          className="bg-[#006b2c] text-white px-6 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all scale-95 active:scale-90 shadow-sm text-sm sm:text-base"
        >
          Start Recommending
        </button>
      </div>

      {/* Mobile Nav Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-[#bdcaba]/30 bg-[#f2f4f6] py-2.5 px-2 text-xs font-medium text-[#3e4a3d]">
        <button
          onClick={() => onNavigate('home')}
          className={`px-3 py-1 rounded-lg ${currentPage === 'home' ? 'text-[#006b2c] font-bold bg-[#6bff8f]/30' : ''}`}
        >
          Home
        </button>
        <button
          onClick={() => onNavigate('recommendations')}
          className={`px-3 py-1 rounded-lg ${currentPage === 'recommendations' ? 'text-[#006b2c] font-bold bg-[#6bff8f]/30' : ''}`}
        >
          Workspace
        </button>
        <button
          onClick={() => onNavigate('compare')}
          className={`px-3 py-1 rounded-lg flex items-center gap-1 cursor-pointer ${
            currentPage === 'compare' ? 'text-[#006b2c] font-bold bg-[#6bff8f]/30' : ''
          }`}
        >
          <span>Compare</span>
          {selectedCompareCount > 0 && (
            <span className="px-1.5 py-0.2 text-[10px] bg-[#006b2c] text-white rounded-full font-bold">
              {selectedCompareCount}
            </span>
          )}
        </button>
        <button
          onClick={() => onNavigate('product-detail')}
          className={`px-3 py-1 rounded-lg ${currentPage === 'product-detail' ? 'text-[#006b2c] font-bold bg-[#6bff8f]/30' : ''}`}
        >
          Details
        </button>
        <button
          onClick={() => onNavigate('about')}
          className={`px-3 py-1 rounded-lg ${currentPage === 'about' ? 'text-[#006b2c] font-bold bg-[#6bff8f]/30' : ''}`}
        >
          About
        </button>
      </div>
    </header>
  );
};

