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

  const selectedProduct =
    mockProducts.find((p) => p.id === selectedProductId) || mockProducts[0];

  const handleToggleCompare = (productId: string) => {
    setSelectedCompareIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        if (prev.length >= 4) return prev; // cap at 4 products
        return [...prev, productId];
      }
    });
  };

  const handleRemoveFromCompare = (productId: string) => {
    setSelectedCompareIds((prev) => prev.filter((id) => id !== productId));
  };

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      
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
          />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetailView
            product={selectedProduct}
            allProducts={mockProducts}
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
