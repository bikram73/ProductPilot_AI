import React, { useState } from 'react';
import { NavigationPage } from './types';
import { mockProducts } from './data/mockProducts';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { WorkspaceView } from './components/WorkspaceView';
import { CompareView } from './components/CompareView';
import { ProductDetailView } from './components/ProductDetailView';
import { AboutView } from './components/AboutView';
import { AiAssistantFab } from './components/AiAssistantFab';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [searchPrompt, setSearchPrompt] = useState<string>(
    'Noise-cancelling headphones for long flights with 20h+ battery'
  );
  const [selectedProductId, setSelectedProductId] = useState<string>('lumina-pro-x');
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([
    'lumina-pro-x',
    'zenith-ultra',
    'prime-core'
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const comparedProducts = mockProducts.filter((p) =>
    selectedCompareIds.includes(p.id)
  );

  const bestComparedProduct = comparedProducts.length > 0
    ? [...comparedProducts].sort((a, b) => (b.calculatedMatchScore || b.matchScore) - (a.calculatedMatchScore || a.matchScore))[0]
    : mockProducts[0];

  const selectedProduct =
    mockProducts.find((p) => p.id === selectedProductId) || bestComparedProduct;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleToggleCompare = (productId: string) => {
    const targetProduct = mockProducts.find((p) => p.id === productId);
    const prodName = targetProduct ? targetProduct.name : 'Product';

    setSelectedCompareIds((prev) => {
      if (prev.includes(productId)) {
        showToast(`Removed "${prodName}" from comparison.`);
        return prev.filter((id) => id !== productId);
      } else {
        const updated = [...prev, productId];
        showToast(`Added "${prodName}" to comparison place (${updated.length} items ready).`);
        return updated;
      }
    });
  };

  const handleRemoveFromCompare = (productId: string) => {
    const targetProduct = mockProducts.find((p) => p.id === productId);
    const prodName = targetProduct ? targetProduct.name : 'Product';
    setSelectedCompareIds((prev) => prev.filter((id) => id !== productId));
    showToast(`Removed "${prodName}" from comparison.`);
  };

  const handleClearCompare = () => {
    setSelectedCompareIds([]);
    showToast('Comparison list cleared.');
  };

  const handleNavigate = (page: NavigationPage) => {
    if (page === 'product-detail' && comparedProducts.length > 0 && !selectedCompareIds.includes(selectedProductId)) {
      // Automatically show the best product based on active comparison
      setSelectedProductId(bestComparedProduct.id);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    const titles: Record<NavigationPage, string> = {
      home: 'ProductPilot AI | Find the Perfect Product with AI',
      recommendations: 'ProductPilot AI | Product Recommendations',
      compare: `ProductPilot AI | Comparison Matrix (${selectedCompareIds.length})`,
      'product-detail': selectedProduct ? `${selectedProduct.name} | ProductPilot AI` : 'ProductPilot AI',
      about: 'ProductPilot AI | About & Methodology'
    };
    const title = titles[currentPage] || 'ProductPilot AI';
    document.title = title;
    try {
      if (window.parent && window.parent !== window) {
        window.parent.document.title = title;
      }
    } catch {
      // Ignored for sandboxed cross-origin frames
    }
  }, [currentPage, selectedCompareIds.length, selectedProduct]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-18 sm:top-20 right-4 sm:right-6 left-4 sm:left-auto max-w-sm sm:max-w-md mx-auto sm:mx-0 z-50 bg-[#003915] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-2xl border border-[#7ffc97]/40 flex items-center justify-between gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-[#7ffc97] shrink-0">info</span>
            <span className="line-clamp-2">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-white/70 hover:text-white shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Sticky White & Emerald Header Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        selectedCompareCount={selectedCompareIds.length}
      />

      {/* Main Screen Views */}
      <main className="flex-1 pb-16 md:pb-0">
        {currentPage === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSearchPrompt={setSearchPrompt}
            featuredProducts={mockProducts}
            onSelectProduct={(id) => setSelectedProductId(id)}
          />
        )}

        {currentPage === 'recommendations' && (
          <WorkspaceView
            products={mockProducts}
            currentPrompt={searchPrompt}
            onSearchPrompt={setSearchPrompt}
            onSelectProduct={(id) => setSelectedProductId(id)}
            onNavigate={handleNavigate}
            selectedCompareIds={selectedCompareIds}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {currentPage === 'compare' && (
          <CompareView
            products={mockProducts}
            selectedCompareIds={selectedCompareIds}
            onSelectProduct={(id) => setSelectedProductId(id)}
            onNavigate={handleNavigate}
            onRemoveFromCompare={handleRemoveFromCompare}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetailView
            product={selectedProduct}
            allProducts={mockProducts}
            comparedProducts={comparedProducts}
            bestComparedProduct={bestComparedProduct}
            onSelectProduct={(id) => setSelectedProductId(id)}
            onNavigate={handleNavigate}
            onToggleCompare={handleToggleCompare}
            isCompared={selectedCompareIds.includes(selectedProduct.id)}
          />
        )}

        {currentPage === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}
      </main>

      {/* Sticky Floating Bottom Comparison Dock (Visible only on the recommendations page when items are selected) */}
      {selectedCompareIds.length > 0 && currentPage === 'recommendations' && (
        <aside
          aria-label="Comparison dock"
          className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 backdrop-blur-md text-white px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center justify-between gap-3 sm:gap-6 max-w-[94vw] sm:max-w-xl transition-all"
        >
          <div className="flex items-center gap-2 shrink-0">
            <span className="material-symbols-outlined text-[#7ffc97] text-lg">equalizer</span>
            <div className="hidden sm:block">
              <p className="text-[11px] font-extrabold text-[#7ffc97] uppercase tracking-wider">Compare Matrix</p>
              <p className="text-[10px] text-slate-400">{selectedCompareIds.length} items added</p>
            </div>
            <span className="sm:hidden text-xs font-bold text-[#7ffc97]">
              {selectedCompareIds.length} items
            </span>
          </div>

          {/* Product Thumbnail Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-[140px] sm:max-w-xs scrollbar-hide">
            {comparedProducts.map((p) => (
              <div
                key={p.id}
                className="relative group bg-slate-800 rounded-lg p-1 border border-slate-700 flex items-center gap-1 shrink-0"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded object-cover"
                />
                <button
                  onClick={() => handleRemoveFromCompare(p.id)}
                  className="w-4 h-4 rounded-full bg-slate-700 hover:bg-rose-500 text-white flex items-center justify-center text-[10px] transition-colors cursor-pointer"
                  title={`Remove ${p.name}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => handleNavigate('compare')}
              className="px-3 sm:px-3.5 py-1.5 bg-[#006b2c] hover:bg-[#00873a] text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Compare</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
            <button
              onClick={handleClearCompare}
              className="text-[11px] text-slate-400 hover:text-white px-1 py-1 cursor-pointer"
              title="Clear all"
            >
              Clear
            </button>
          </div>
        </aside>
      )}

      {/* Global Interactive Floating AI Assistant Copilot FAB */}
      <AiAssistantFab
        products={mockProducts}
        onSelectProduct={(id) => {
          setSelectedProductId(id);
          handleNavigate('product-detail');
        }}
      />

      {/* Mobile Bottom Navigation Dock */}
      <MobileBottomNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        selectedCompareCount={selectedCompareIds.length}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}

