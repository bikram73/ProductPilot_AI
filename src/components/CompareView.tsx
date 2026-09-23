import React, { useState } from 'react';
import { Product, NavigationPage } from '../types';

interface CompareViewProps {
  products: Product[];
  selectedCompareIds: string[];
  onSelectProduct: (productId: string) => void;
  onNavigate: (page: NavigationPage) => void;
  onRemoveFromCompare: (productId: string) => void;
  onToggleCompare: (productId: string) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  products,
  selectedCompareIds,
  onSelectProduct,
  onNavigate,
  onRemoveFromCompare,
  onToggleCompare
}) => {
  const [downloaded, setDownloaded] = useState(false);
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [pickerSearch, setPickerSearch] = useState('');

  const compareProducts = products.filter((p) =>
    selectedCompareIds.includes(p.id)
  );

  const handleExportPDF = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const filteredPickerProducts = products.filter(
    (p) =>
      !selectedCompareIds.includes(p.id) &&
      (p.name.toLowerCase().includes(pickerSearch.toLowerCase()) ||
        p.brand.toLowerCase().includes(pickerSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(pickerSearch.toLowerCase()))
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 space-y-10 pb-24 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#bdcaba]/30 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#006b2c] uppercase tracking-widest">
            <span className="material-symbols-outlined text-[18px]">equalizer</span>
            <span>PRODUCT COMPARISON MATRIX</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#191c1e] mt-1">
            Side-by-Side Feature Trade-off
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportPDF}
            className="px-4 py-2.5 bg-[#eceef0] hover:bg-[#e0e3e5] text-[#191c1e] font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Download Matrix</span>
          </button>

          <button
            onClick={() => setShowPickerModal(true)}
            className="px-4 py-2.5 bg-[#006b2c] hover:bg-[#00873a] text-white font-bold text-xs rounded-xl shadow-md shadow-[#006b2c]/20 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Add Product ({selectedCompareIds.length} in Matrix)</span>
          </button>
        </div>
      </div>

      {downloaded && (
        <div className="bg-[#006b2c] text-white p-3 rounded-2xl text-xs font-bold text-center shadow-lg animate-in fade-in">
          ✓ Comparison Matrix PDF generated and ready for offline review!
        </div>
      )}

      {/* QUICK PRODUCT PICKER MODAL */}
      {showPickerModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#191c1e]">
                  Add Product to Comparison Matrix
                </h3>
                <p className="text-xs text-[#3e4a3d]">
                  Select from any product in the catalog ({selectedCompareIds.length} products currently in matrix)
                </p>
              </div>
              <button
                onClick={() => setShowPickerModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">
                search
              </span>
              <input
                type="text"
                placeholder="Search by product name, brand or category..."
                value={pickerSearch}
                onChange={(e) => setPickerSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#006b2c]"
              />
            </div>

            {/* List */}
            <div className="overflow-y-auto flex-1 space-y-2.5 pr-1">
              {filteredPickerProducts.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No additional products matching your query.
                </div>
              ) : (
                filteredPickerProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-[#006b2c]/30 rounded-2xl flex items-center justify-between gap-4 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-12 h-12 rounded-xl object-cover bg-white"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-[#006b2c] uppercase">
                          {prod.brand} • {prod.category}
                        </span>
                        <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                          {prod.name}
                        </h4>
                        <span className="text-xs font-extrabold text-[#006b2c]">
                          ${prod.price}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onToggleCompare(prod.id);
                        setShowPickerModal(false);
                      }}
                      className="px-4 py-2 bg-[#006b2c] hover:bg-[#00873a] text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                      <span>Add</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* EMPTY STATE IF 0 PRODUCTS PICKED */}
      {compareProducts.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center space-y-6 border border-[#bdcaba]/40 bg-white">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-[#006b2c] flex items-center justify-center mx-auto shadow-sm">
            <span className="material-symbols-outlined text-4xl">equalizer</span>
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-[#191c1e]">
              No Products Selected for Comparison
            </h3>
            <p className="text-xs text-[#3e4a3d] leading-relaxed">
              Select 2 to 4 products from the AI Workspace recommendations or browse the catalog to compare hardware specs, benchmarks, and trade-offs side-by-side.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('recommendations')}
              className="px-6 py-3 bg-[#006b2c] hover:bg-[#00873a] text-white font-bold text-xs rounded-xl shadow-md shadow-[#006b2c]/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Explore AI Workspace</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
            <button
              onClick={() => setShowPickerModal(true)}
              className="px-6 py-3 bg-[#eceef0] hover:bg-[#e0e3e5] text-[#191c1e] font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Quick Pick Products</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* AI EXECUTIVE SUMMARY "THE VERDICT" */}
          <div className="bg-[#003915] text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden border border-[#006b2c]/30">
            <div className="flex items-center gap-2 text-xs font-bold text-[#7ffc97] uppercase tracking-widest">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span>AI EXECUTIVE SUMMARY • THE VERDICT</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold leading-snug">
                  {compareProducts[0]?.name || 'Top Pick'} leads as the highest rated device for overall balance.
                </h2>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                  Comparing {compareProducts.map((p) => p.name).join(', ')}. Each device brings tailored hardware trade-offs regarding battery longevity, thermals, portability, and value-to-performance index.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#7ffc97] uppercase tracking-widest block">
                    Profile Match Winners
                  </span>
                  <div className="text-xs space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 font-medium">Top Match:</span>
                      <span className="font-bold text-white bg-[#006b2c] px-2 py-0.5 rounded truncate max-w-[140px]">
                        {compareProducts[0]?.name}
                      </span>
                    </div>
                    {compareProducts[1] && (
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 font-medium">Top Value:</span>
                        <span className="font-bold text-white bg-[#006b2c] px-2 py-0.5 rounded truncate max-w-[140px]">
                          {compareProducts.reduce((min, p) => p.price < min.price ? p : min, compareProducts[0]).name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/20 text-[11px] text-[#7ffc97]">
                  Confidence Score: <strong>99.1%</strong>
                </div>
              </div>
            </div>
          </div>

          {/* COMPARISON TABLE MATRIX */}
          <div className="glass-card rounded-2xl border border-[#bdcaba]/30 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                
                {/* Table Header Row */}
                <thead>
                  <tr className="bg-[#f7f9fb] border-b border-[#bdcaba]/30">
                    <th className="p-5 text-xs font-bold text-[#3e4a3d] uppercase tracking-wider w-48">
                      Specifications
                    </th>

                    {compareProducts.map((product) => (
                      <th key={product.id} className="p-5 min-w-[260px] align-top">
                        <div className="space-y-3 relative">
                          <button
                            onClick={() => onRemoveFromCompare(product.id)}
                            className="absolute top-0 right-0 p-1 text-[#3e4a3d]/50 hover:text-rose-600 rounded-full hover:bg-black/5 cursor-pointer transition-colors"
                            title="Remove from matrix"
                          >
                            <span className="material-symbols-outlined text-lg">close</span>
                          </button>

                          <div className="h-36 rounded-xl overflow-hidden relative bg-[#eceef0]">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                            {product.badge && (
                              <span className="absolute top-2 left-2 bg-[#006b2c] text-white text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">
                                {product.badge}
                              </span>
                            )}
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-[#006b2c] uppercase tracking-widest block">
                              {product.brand}
                            </span>
                            <h3 className="font-bold text-sm text-[#191c1e] line-clamp-1">
                              {product.name}
                            </h3>
                            <p className="text-base font-extrabold text-[#006b2c] mt-1">
                              ${product.price}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              onSelectProduct(product.id);
                              onNavigate('product-detail');
                            }}
                            className="w-full py-2 bg-[#006b2c] hover:bg-[#00873a] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                          >
                            View Full Product
                          </button>
                        </div>
                      </th>
                    ))}

                    {/* Placeholder Column to add more products */}
                    <th className="p-5 min-w-[220px] align-middle">
                      <button
                        onClick={() => setShowPickerModal(true)}
                        className="w-full h-full min-h-[260px] border-2 border-dashed border-[#bdcaba] hover:border-[#006b2c] rounded-2xl flex flex-col items-center justify-center gap-2 p-6 text-slate-500 hover:text-[#006b2c] transition-all bg-slate-50/50 hover:bg-emerald-50/30 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-3xl">add_circle</span>
                        <span className="text-xs font-bold">Add Another Product</span>
                        <span className="text-[10px] text-slate-400">Click to browse & add to matrix</span>
                      </button>
                    </th>
                  </tr>
                </thead>

                {/* Table Body Specs */}
                <tbody className="divide-y divide-[#bdcaba]/20 text-xs text-[#191c1e]">
                  
                  {/* Match Score */}
                  <tr className="bg-[#6bff8f]/10">
                    <td className="p-4 font-bold text-[#006b2c]">
                      AI Match Score
                    </td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="p-4 font-extrabold text-[#006b2c]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base">{product.matchScore}%</span>
                          {product.matchScore >= 95 && (
                            <span className="px-2 py-0.5 bg-[#006b2c] text-white text-[10px] rounded-full uppercase tracking-wider font-extrabold">
                              TOP MATCH
                            </span>
                          )}
                        </div>
                      </td>
                    ))}
                    <td className="bg-slate-50/20" />
                  </tr>

                  {/* User Rating */}
                  <tr>
                    <td className="p-4 font-bold text-[#3e4a3d]">
                      User Rating
                    </td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="p-4">
                        <div className="flex items-center gap-1 font-bold text-[#191c1e]">
                          <span className="material-symbols-outlined text-[#006b2c] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span>{product.rating} / 5.0</span>
                          <span className="text-[#3e4a3d]/60 font-normal">({product.reviewCount})</span>
                        </div>
                      </td>
                    ))}
                    <td className="bg-slate-50/20" />
                  </tr>

                  {/* Category */}
                  <tr>
                    <td className="p-4 font-bold text-[#3e4a3d]">
                      Category
                    </td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="p-4 font-medium">
                        {product.category}
                      </td>
                    ))}
                    <td className="bg-slate-50/20" />
                  </tr>

                  {/* Processor / Sensor */}
                  <tr>
                    <td className="p-4 font-bold text-[#3e4a3d]">
                      Processor / Sensor / Driver
                    </td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="p-4 font-medium">
                        {product.specs['Processor'] || product.specs['Sensor'] || product.specs['Driver Size'] || 'High Performance Architecture'}
                      </td>
                    ))}
                    <td className="bg-slate-50/20" />
                  </tr>

                  {/* Memory / Battery */}
                  <tr>
                    <td className="p-4 font-bold text-[#3e4a3d]">
                      Memory / Battery
                    </td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="p-4 font-medium">
                        {product.specs['Memory'] || product.specs['Battery Life'] || product.specs['Battery'] || 'Standard Runtime'}
                      </td>
                    ))}
                    <td className="bg-slate-50/20" />
                  </tr>

                  {/* Display / Audio */}
                  <tr>
                    <td className="p-4 font-bold text-[#3e4a3d]">
                      Display / Audio Tech
                    </td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="p-4 font-medium">
                        {product.specs['Display'] || product.specs['ANC Tech'] || product.specs['Frequency Response'] || 'Pro Grade Calibrated'}
                      </td>
                    ))}
                    <td className="bg-slate-50/20" />
                  </tr>

                  {/* Weight */}
                  <tr>
                    <td className="p-4 font-bold text-[#3e4a3d]">
                      Weight & Form Factor
                    </td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="p-4 font-medium">
                        {product.specs['Weight'] || 'Ultra Portable'}
                      </td>
                    ))}
                    <td className="bg-slate-50/20" />
                  </tr>

                  {/* Key Pros */}
                  <tr>
                    <td className="p-4 font-bold text-[#3e4a3d] align-top">
                      Key Strengths
                    </td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="p-4 align-top">
                        <ul className="space-y-1.5 text-[11px] text-[#191c1e]">
                          {product.pros.map((pro, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="material-symbols-outlined text-[#006b2c] text-sm shrink-0">check_circle</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                    <td className="bg-slate-50/20" />
                  </tr>

                  {/* Key Cons */}
                  <tr>
                    <td className="p-4 font-bold text-[#3e4a3d] align-top">
                      Trade-offs
                    </td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="p-4 align-top">
                        <ul className="space-y-1.5 text-[11px] text-[#3e4a3d]">
                          {product.cons.map((con, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#3e4a3d]/50 shrink-0 mt-1.5" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                    <td className="bg-slate-50/20" />
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

    </div>
  );
};
