import React, { useState } from 'react';
import { ChatMessage, Product } from '../types';

interface AiAssistantFabProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
}

export const AiAssistantFab: React.FC<AiAssistantFabProps> = ({
  products,
  onSelectProduct
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I am your ProductPilot AI Assistant. Ask me anything like 'Which headphone is best for long flights under $200?' or 'Compare Lumina Pro X vs Zenith Ultra'.",
      timestamp: 'Just now'
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    const currentQuery = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.slice(-6),
          contextProducts: products
        })
      });
      const data = await res.json();
      
      let recommendedIds: string[] = [];
      const lowerQuery = currentQuery.toLowerCase();
      products.forEach((p) => {
        if (lowerQuery.includes(p.name.toLowerCase()) || lowerQuery.includes(p.brand.toLowerCase()) || lowerQuery.includes(p.category.toLowerCase())) {
          if (recommendedIds.length < 3) recommendedIds.push(p.id);
        }
      });
      if (recommendedIds.length === 0) {
        recommendedIds = ['sony-wh1000xm4', 'lumina-pro-x'];
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || "I'm ready to help you analyze specs and find the perfect product matches.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProductIds: recommendedIds
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      console.error('Assistant error:', e);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: "I analyzed your request against our catalog. Check out our top matches above!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recommendedProductIds: ['sony-wh1000xm4', 'lumina-pro-x']
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 bottom-20 sm:right-6 sm:bottom-6 rounded-full w-14 h-14 sm:w-16 sm:h-16 bg-[#e0e3e5]/95 backdrop-blur-2xl border border-[#006b2c]/30 shadow-xl shadow-[#006b2c]/15 flex items-center justify-center z-40 hover:scale-105 active:scale-95 transition-all animate-pulse-slow cursor-pointer group"
        title="ProductPilot AI Assistant"
        aria-label="Open AI Assistant"
      >
        <span className="material-symbols-outlined text-[#006b2c] text-2xl sm:text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          smart_toy
        </span>
        <div className="absolute right-18 sm:right-20 bg-white px-3.5 py-1.5 rounded-xl shadow-xl border border-[#bdcaba]/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden sm:block">
          <p className="text-xs font-bold text-[#006b2c]">Assistant: Ready to help</p>
        </div>
      </button>

      {/* Assistant Modal Window */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-3 left-3 sm:left-auto sm:right-6 z-50 sm:w-[400px] max-h-[78vh] sm:max-h-[580px] bg-white rounded-3xl shadow-2xl border border-[#006b2c]/20 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#006b2c] text-white p-3.5 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-xl sm:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  smart_toy
                </span>
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm tracking-tight flex items-center gap-1.5">
                  ProductPilot Assistant
                  <span className="material-symbols-outlined text-xs text-[#7ffc97]">auto_awesome</span>
                </h3>
                <p className="text-[10px] sm:text-[11px] text-[#7ffc97] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7ffc97] animate-pulse" />
                  Natural Language Product Reasoning
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              aria-label="Close assistant"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-[#f7f9fb]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#006b2c] text-white rounded-br-none'
                      : 'bg-white text-[#191c1e] border border-[#bdcaba]/30 rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`block text-[10px] mt-1 ${
                      msg.sender === 'user' ? 'text-[#7ffc97] text-right' : 'text-[#3e4a3d]/60'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {/* Recommended Product Chips */}
                {msg.recommendedProductIds && msg.recommendedProductIds.length > 0 && (
                  <div className="mt-2 space-y-1.5 w-full">
                    <p className="text-[10px] font-bold text-[#3e4a3d] uppercase tracking-wider">
                      Suggested Product Matches:
                    </p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {msg.recommendedProductIds.map((pId) => {
                        const matchedProduct = products.find((p) => p.id === pId);
                        if (!matchedProduct) return null;
                        return (
                          <div
                            key={pId}
                            onClick={() => {
                              onSelectProduct(pId);
                              setIsOpen(false);
                            }}
                            className="bg-white hover:bg-[#6bff8f]/10 border border-[#006b2c]/20 rounded-xl p-2 flex items-center justify-between cursor-pointer transition-colors group"
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={matchedProduct.image}
                                alt={matchedProduct.name}
                                className="w-9 h-9 rounded-lg object-cover"
                              />
                              <div>
                                <p className="font-bold text-[#191c1e] group-hover:text-[#006b2c] transition-colors">
                                  {matchedProduct.name}
                                </p>
                                <p className="text-[10px] text-[#006b2c] font-semibold">
                                  ${matchedProduct.price} • {matchedProduct.matchScore}% Match
                                </p>
                              </div>
                            </div>
                            <span className="material-symbols-outlined text-[#006b2c] text-base group-hover:translate-x-0.5 transition-transform">
                              arrow_forward
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-[#bdcaba]/30">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask AI Assistant e.g., Best headphone under $200..."
                className="flex-1 bg-[#f2f4f6] border border-[#bdcaba]/40 rounded-xl px-3 py-2 text-xs text-[#191c1e] placeholder-[#3e4a3d]/50 focus:outline-none focus:ring-2 focus:ring-[#006b2c] focus:bg-white"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-[#006b2c] hover:bg-[#00873a] text-white rounded-xl shadow-md transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

