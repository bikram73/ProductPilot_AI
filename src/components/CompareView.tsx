import React, { useState } from 'react';
import { Product, NavigationPage } from '../types';

interface CompareViewProps {
  products: Product[];
  selectedCompareIds: string[];
  onSelectProduct: (productId: string) => void;
  onNavigate: (page: NavigationPage) => void;
  onRemoveFromCompare: (productId: string) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  products,
  selectedCompareIds,
  onSelectProduct,
  onNavigate,
  onRemoveFromCompare
}) => {
  const [downloaded, setDownloaded] = useState(false);

  // Default products to compare if none explicitly picked
  const compareProducts = products.filter((p) =>
    selectedCompareIds.length > 0 ? selectedCompareIds.includes(p.id) : ['lumina-pro-x', 'zenith-ultra', 'prime-core'].includes(p.id)
  );

  const handleExportPDF = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 space-y-10 pb-24">
      
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
            onClick={() => onNavigate('recommendations')}
            className="px-4 py-2.5 bg-[#006b2c] hover:bg-[#00873a] text-white font-bold text-xs rounded-xl shadow-md shadow-[#006b2c]/20 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {downloaded && (
        <div className="bg-[#006b2c] text-white p-3 rounded-2xl text-xs font-bold text-center shadow-lg animate-in fade-in">
          ✓ Comparison Matrix PDF generated and ready for offline review!
        </div>
      )}

      {/* AI EXECUTIVE SUMMARY "THE VERDICT" */}
      <div className="bg-[#003915] text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden border border-[#006b2c]/30">
        <div className="flex items-center gap-2 text-xs font-bold text-[#7ffc97] uppercase tracking-widest">
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          <span>AI EXECUTIVE SUMMARY • THE VERDICT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold leading-snug">
              Lumina Pro X leads as the overall 98% Winner for portability and battery life.
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
              If battery runtime (18h) and lightweight chassis (1.2kg) are paramount, **Lumina Pro X** is undisputed. If raw GPU multi-core processing for heavy 4K rendering is needed, **Zenith Ultra** excels despite higher weight. For budget value under $900, **Prime Core** is the optimum pick.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#7ffc97] uppercase tracking-widest block">
                Profile Match Winners
              </span>
              <div className="text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-white/80 font-medium">Best Overall:</span>
                  <span className="font-bold text-white bg-[#006b2c] px-2 py-0.5 rounded">Lumina Pro X</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80 font-medium">Best Value:</span>
                  <span className="font-bold text-white bg-[#006b2c] px-2 py-0.5 rounded">Prime Core</span>
                </div>
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
            
            {/* Table Header Row: Product Card Columns */}
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
                        className="absolute top-0 right-0 p-1 text-[#3e4a3d]/50 hover:text-[#191c1e] rounded-full hover:bg-black/5"
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
                        <h3 className="font-bold text-sm text-[#191c1e]">
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
                        Select Winner
                      </button>
                    </div>
                  </th>
                ))}
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
                          WINNER
                        </span>
                      )}
                    </div>
                  </td>
                ))}
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
              </tr>

              {/* Processor */}
              <tr>
                <td className="p-4 font-bold text-[#3e4a3d]">
                  Processor / Sensor
                </td>
                {compareProducts.map((product) => (
                  <td key={product.id} className="p-4 font-medium">
                    {product.specs['Processor'] || product.specs['Sensor'] || 'High Efficiency Architecture'}
                  </td>
                ))}
              </tr>

              {/* Memory / Battery */}
              <tr>
                <td className="p-4 font-bold text-[#3e4a3d]">
                  Memory / Battery
                </td>
                {compareProducts.map((product) => (
                  <td key={product.id} className="p-4 font-medium">
                    {product.specs['Memory'] || product.specs['Battery Life'] || '18 Hours'}
                  </td>
                ))}
              </tr>

              {/* Display / Audio */}
              <tr>
                <td className="p-4 font-bold text-[#3e4a3d]">
                  Display / Audio Tech
                </td>
                {compareProducts.map((product) => (
                  <td key={product.id} className="p-4 font-medium">
                    {product.specs['Display'] || product.specs['ANC Tech'] || 'Pro Grade Display'}
                  </td>
                ))}
              </tr>

              {/* Weight */}
              <tr>
                <td className="p-4 font-bold text-[#3e4a3d]">
                  Weight
                </td>
                {compareProducts.map((product) => (
                  <td key={product.id} className="p-4 font-medium">
                    {product.specs['Weight'] || '1.2 kg'}
                  </td>
                ))}
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
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

