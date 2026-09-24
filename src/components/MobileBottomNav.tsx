import React from 'react';
import { NavigationPage } from '../types';

interface MobileBottomNavProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  selectedCompareCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
  selectedCompareCount = 0
}) => {
  const navItems = [
    {
      id: 'home' as NavigationPage,
      label: 'Home',
      icon: 'home'
    },
    {
      id: 'recommendations' as NavigationPage,
      label: 'Workspace',
      icon: 'auto_awesome'
    },
    {
      id: 'compare' as NavigationPage,
      label: 'Compare',
      icon: 'equalizer',
      badge: selectedCompareCount > 0 ? selectedCompareCount : undefined
    },
    {
      id: 'product-detail' as NavigationPage,
      label: 'Details',
      icon: 'visibility'
    },
    {
      id: 'about' as NavigationPage,
      label: 'About',
      icon: 'info'
    }
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#bdcaba]/35 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 transition-all"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 min-w-[56px] min-h-[48px] rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-[#006b2c]'
                  : 'text-[#3e4a3d]/80 hover:text-[#006b2c]'
              }`}
            >
              {/* Active Indicator Background Pill */}
              {isActive && (
                <span className="absolute inset-x-1.5 inset-y-1 bg-[#6bff8f]/25 rounded-xl -z-10 animate-in fade-in zoom-in-95 duration-200" />
              )}

              {/* Icon Container with Badge */}
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[22px] transition-transform"
                  style={isActive ? { fontVariationSettings: "'FILL' 1, 'wght' 600" } : { fontVariationSettings: "'wght' 400" }}
                >
                  {item.icon}
                </span>

                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 bg-[#006b2c] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-xs border border-white">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] tracking-tight mt-0.5 ${
                  isActive ? 'font-extrabold text-[#006b2c]' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
