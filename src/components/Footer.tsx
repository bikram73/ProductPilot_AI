import React, { useState } from 'react';
import { NavigationPage } from '../types';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'docs' | null>(null);

  const handleSupportLink = (type: 'privacy' | 'terms' | 'docs') => {
    setModalType(type);
  };

  return (
    <>
      <footer className="bg-[#f2f4f6] border-t border-[#bdcaba]/30 mt-16 font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pt-10 pb-28 md:py-12 px-4 sm:px-8 max-w-[1440px] mx-auto text-sm">
          
          {/* Brand Col */}
          <div className="sm:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="cursor-pointer hover:opacity-95 inline-flex items-center gap-3 transition-opacity group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#006b2c] via-[#005221] to-[#003915] p-2 flex items-center justify-center shadow-sm shadow-[#006b2c]/20 border border-[#7ffc97]/40 shrink-0 group-hover:scale-105 transition-transform duration-200">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#7ffc97" />
                      <stop offset="0.55" stopColor="#ffffff" />
                      <stop offset="1" stopColor="#bdcaba" />
                    </linearGradient>
                  </defs>
                  <path d="M16 3L27 25L16 20.5L5 25L16 3Z" fill="url(#footerLogoGrad)" />
                  <path d="M16 3V20.5" stroke="#003915" strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="16" cy="11" r="1.75" fill="#003915" />
                  <path d="M24 3L25 6L28 7L25 8L24 11L23 8L20 7L23 6L24 3Z" fill="#7ffc97" />
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#191c1e] flex items-center">
                <span>ProductPilot</span>
                <span className="text-[#006b2c] ml-1.5 font-extrabold bg-[#6bff8f]/25 px-1.5 py-0.5 rounded-md text-sm border border-[#006b2c]/20">AI</span>
              </span>
            </div>
            <p className="text-[#3e4a3d] max-w-sm leading-relaxed text-xs sm:text-sm">
              Empowering smart consumer choices through deterministic AI orchestration, semantic vector scoring, and zero-bias hardware discovery.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#006b2c] font-bold text-[11px] border border-emerald-200">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                <span>No Database • No Auth Required</span>
              </span>
            </div>
            <div className="text-[#3e4a3d]/80 text-xs pt-1">
              © {new Date().getFullYear()} ProductPilot AI. Open & verifiable recommendation engine.
            </div>
          </div>

          {/* Navigation Links Column */}
          <div>
            <h4 className="text-xs font-bold text-[#006b2c] uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">explore</span>
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-[#3e4a3d]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#006b2c] hover:translate-x-1 transition-all cursor-pointer flex items-center gap-1 text-left"
                >
                  <span className="material-symbols-outlined text-sm text-[#006b2c]">arrow_right</span>
                  <span>Home Discovery</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('recommendations')}
                  className="hover:text-[#006b2c] hover:translate-x-1 transition-all cursor-pointer flex items-center gap-1 text-left"
                >
                  <span className="material-symbols-outlined text-sm text-[#006b2c]">arrow_right</span>
                  <span>Recommendation Workspace</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('compare')}
                  className="hover:text-[#006b2c] hover:translate-x-1 transition-all cursor-pointer flex items-center gap-1 text-left"
                >
                  <span className="material-symbols-outlined text-sm text-[#006b2c]">arrow_right</span>
                  <span>Comparison Matrix</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('product-detail')}
                  className="hover:text-[#006b2c] hover:translate-x-1 transition-all cursor-pointer flex items-center gap-1 text-left"
                >
                  <span className="material-symbols-outlined text-sm text-[#006b2c]">arrow_right</span>
                  <span>Product Details</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#006b2c] hover:translate-x-1 transition-all cursor-pointer flex items-center gap-1 text-left"
                >
                  <span className="material-symbols-outlined text-sm text-[#006b2c]">arrow_right</span>
                  <span>Engine Methodology & Docs</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Resources Column (Targeted by User) */}
          <div>
            <h4 className="text-xs font-bold text-[#006b2c] uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">support</span>
              <span>Support & Resources</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-[#3e4a3d]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#006b2c] hover:translate-x-1 transition-all cursor-pointer flex items-center gap-1.5 text-left group"
                >
                  <span className="material-symbols-outlined text-sm text-[#006b2c] group-hover:scale-110 transition-transform">
                    architecture
                  </span>
                  <span>How It Works & Pipeline</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSupportLink('docs')}
                  className="hover:text-[#006b2c] hover:translate-x-1 transition-all cursor-pointer flex items-center gap-1.5 text-left group"
                >
                  <span className="material-symbols-outlined text-sm text-[#006b2c] group-hover:scale-110 transition-transform">
                    menu_book
                  </span>
                  <span>API & Scoring Documentation</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSupportLink('privacy')}
                  className="hover:text-[#006b2c] hover:translate-x-1 transition-all cursor-pointer flex items-center gap-1.5 text-left group"
                >
                  <span className="material-symbols-outlined text-sm text-[#006b2c] group-hover:scale-110 transition-transform">
                    shield
                  </span>
                  <span>Privacy Guarantee (No-DB)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSupportLink('terms')}
                  className="hover:text-[#006b2c] hover:translate-x-1 transition-all cursor-pointer flex items-center gap-1.5 text-left group"
                >
                  <span className="material-symbols-outlined text-sm text-[#006b2c] group-hover:scale-110 transition-transform">
                    gavel
                  </span>
                  <span>Terms & Algorithmic Neutrality</span>
                </button>
              </li>
            </ul>
          </div>

        </div>
      </footer>

      {/* POPUP MODAL FOR SUPPORT & RESOURCES ITEMS */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 border border-slate-200 animate-in fade-in max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006b2c] text-2xl">
                  {modalType === 'privacy' && 'shield'}
                  {modalType === 'terms' && 'gavel'}
                  {modalType === 'docs' && 'menu_book'}
                </span>
                <h3 className="font-extrabold text-lg text-[#191c1e]">
                  {modalType === 'privacy' && 'Privacy Guarantee & Ephemeral Sessions'}
                  {modalType === 'terms' && 'Terms & Objective Neutrality'}
                  {modalType === 'docs' && 'Engine API & Formula Documentation'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="text-xs text-[#3e4a3d] space-y-3 leading-relaxed">
              {modalType === 'privacy' && (
                <>
                  <p className="font-bold text-[#191c1e]">
                    Zero Persistent Tracking or Database Storage
                  </p>
                  <p>
                    ProductPilot AI is designed to operate completely statelessly. We do not maintain any user databases, tracking cookies, or persistent account records.
                  </p>
                  <p>
                    Your search queries and selected comparison items exist purely inside your current browser session memory.
                  </p>
                </>
              )}

              {modalType === 'terms' && (
                <>
                  <p className="font-bold text-[#191c1e]">
                    Strict Algorithmic Independence
                  </p>
                  <p>
                    All product recommendation scores and comparison rankings are produced mathematically based on verified hardware specifications, price limits, and objective benchmarks.
                  </p>
                  <p>
                    ProductPilot AI contains 0% sponsored ad listings, paid placement bids, or retailer bias.
                  </p>
                </>
              )}

              {modalType === 'docs' && (
                <>
                  <p className="font-bold text-[#191c1e]">
                    Multi-Factor Weighted Scoring Architecture:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 font-mono text-[11px] text-[#006b2c]">
                    <li>Budget Score Ratio: 30%</li>
                    <li>Feature & Purpose Alignment: 30%</li>
                    <li>Category Match: 20%</li>
                    <li>Brand Preference: 10%</li>
                    <li>Rating & Lab Quality: 10%</li>
                  </ul>
                  <p className="pt-1">
                    Powered by Google Gemini 2.5 Flash for natural language structured intent extraction and deterministic constraint penalty processing.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="px-5 py-2 bg-[#006b2c] hover:bg-[#00873a] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
