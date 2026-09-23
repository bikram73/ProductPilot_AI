import React, { useState } from 'react';
import { NavigationPage } from './types';
import { mockProducts } from './data/mockProducts';
import { Navbar } from './components/Navbar';
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#003915] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-2xl border border-[#7ffc97]/40 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-base text-[#7ffc97]">info</span>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-white/60 hover:text-white"
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
      <main className="flex-1">
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

      {/* Sticky Floating Bottom Comparison Dock (Visible when items selected & not on compare page) */}
      {selectedCompareIds.length > 0 && currentPage !== 'compare' && (
        <aside
          aria-label="Comparison dock"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 backdrop-blur-md text-white px-4 sm:px-6 py-3 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-3 sm:gap-6 max-w-[95vw] sm:max-w-xl transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7ffc97] text-lg">equalizer</span>
            <div className="hidden sm:block">
              <p className="text-[11px] font-extrabold text-[#7ffc97] uppercase tracking-wider">Compare Matrix</p>
              <p className="text-[10px] text-slate-400">{selectedCompareIds.length} items added</p>
            </div>
          </div>

          {/* Product Thumbnail Chips */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {comparedProducts.map((p) => (
              <div
                key={p.id}
                className="relative group bg-slate-800 rounded-lg p-1 border border-slate-700 flex items-center gap-1.5 shrink-0"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-8 h-8 rounded object-cover"
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

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleNavigate('compare')}
              className="px-3.5 py-1.5 bg-[#006b2c] hover:bg-[#00873a] text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Compare</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
            <button
              onClick={handleClearCompare}
              className="text-[11px] text-slate-400 hover:text-white px-1.5 py-1 cursor-pointer"
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

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
