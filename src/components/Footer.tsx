import React from 'react';
import { NavigationPage } from '../types';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#f2f4f6] border-t border-[#bdcaba]/30 mt-16">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 py-12 px-4 sm:px-8 max-w-[1440px] mx-auto text-sm">
        <div className="col-span-2 space-y-4">
          <div className="text-2xl font-bold text-[#006b2c]">ProductPilot AI</div>
          <p className="text-[#3e4a3d] max-w-xs leading-relaxed">
            Empowering consumer choices through advanced AI orchestration and natural language understanding.
          </p>
          <div className="text-[#3e4a3d] text-xs">
            © {new Date().getFullYear()} ProductPilot AI. All rights reserved.
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-[#006b2c] uppercase tracking-wider mb-4">Navigation</h4>
          <ul className="space-y-2.5 text-[#3e4a3d]">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:underline decoration-[#006b2c] transition-all">
                Home Discovery
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('recommendations')} className="hover:underline decoration-[#006b2c] transition-all">
                Recommendation Workspace
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('compare')} className="hover:underline decoration-[#006b2c] transition-all">
                Compare Products
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('product-detail')} className="hover:underline decoration-[#006b2c] transition-all">
                Product Details
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:underline decoration-[#006b2c] transition-all">
                About & Engine
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-[#006b2c] uppercase tracking-wider mb-4">Support & Resources</h4>
          <ul className="space-y-2.5 text-[#3e4a3d]">
            <li><a className="hover:underline decoration-[#006b2c] transition-all" href="#how-it-works">How It Works</a></li>
            <li><a className="hover:underline decoration-[#006b2c] transition-all" href="#ai-specs">Documentation</a></li>
            <li><a className="hover:underline decoration-[#006b2c] transition-all" href="#privacy">Privacy Policy</a></li>
            <li><a className="hover:underline decoration-[#006b2c] transition-all" href="#terms">Terms of Service</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-[#006b2c] uppercase tracking-wider mb-4">Connect</h4>
          <ul className="space-y-2.5 text-[#3e4a3d]">
            <li><a className="hover:underline decoration-[#006b2c] transition-all" href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a className="hover:underline decoration-[#006b2c] transition-all" href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
            <li><a className="hover:underline decoration-[#006b2c] transition-all" href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
