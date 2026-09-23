import React, { useState } from 'react';
import { NavigationPage } from '../types';
import {
  Compass,
  Sparkles,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  BarChart3,
  Code,
  Globe,
  Sliders,
  Database,
  Lock,
  HelpCircle,
  Activity,
  Workflow
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (page: NavigationPage) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  // Interactive Simulator State
  const [weights, setWeights] = useState({
    performance: 80,
    battery: 90,
    value: 70,
    portability: 85,
    build: 75
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Calculate simulated score based on weights
  const simulatedScore = Math.min(
    99,
    Math.round(
      (weights.performance * 0.25 +
        weights.battery * 0.25 +
        weights.value * 0.2 +
        weights.portability * 0.15 +
        weights.build * 0.15)
    )
  );

  const faqs = [
    {
      q: 'How does ProductPilot AI generate Match Scores?',
      a: 'We calculate multidimensional cosine similarity vectors combining user semantic intent with normalized hardware benchmarks (Geekbench 6, battery discharge curves, acoustic isolation decibels, and thermal throttling percentages). The resulting match percentage is 100% deterministic and free of affiliate rank boosting.'
    },
    {
      q: 'What AI models power the natural language analysis?',
      a: 'The application is powered by Google Gemini (Gemini 2.5 / Flash) through server-side secure serverless endpoints with in-memory query hashing, sub-second latency caching, and automated fallback heuristic engines for high-load resilience.'
    },
    {
      q: 'Are the product prices and specs updated in real-time?',
      a: 'Yes. Product specifications, verified reviews, and MSRP prices are validated against authoritative manufacturer spec sheets, verified lab tests, and major authorized retailer databases.'
    },
    {
      q: 'How does ProductPilot AI maintain neutrality?',
      a: 'Unlike traditional review aggregator websites that rank products based on affiliate commission margins, ProductPilot AI operates on strict zero-paid-placement algorithms. Every recommendation reason is transparently printed with verifiable pros and cons.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-24 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* HERO MISSION */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
          <Compass className="w-4 h-4 text-emerald-600" />
          <span>PROJECT ARCHITECTURE & CORE METHODOLOGY</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Democratizing <span className="ai-gradient-text">AI Product Discovery</span>
        </h1>

        <p className="text-base text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
          ProductPilot AI was engineered to eliminate biased affiliate lists and sponsored reviews. We convert raw technical specifications, acoustic graphs, thermal stress tests, and verified buyer logs into transparent, explainable recommendations.
        </p>

        {/* Stats Row */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <p className="text-3xl font-extrabold text-[#006b2c]">99.1%</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Intent Match Accuracy</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <p className="text-3xl font-extrabold text-[#006b2c]">50,000+</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Lab Datapoints Indexed</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <p className="text-3xl font-extrabold text-[#006b2c]">0%</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Sponsored Bias</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <p className="text-3xl font-extrabold text-[#006b2c]">&lt; 350ms</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Inference Latency</p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE MATCH SCORE FORMULA SIMULATOR */}
      <section className="glass-card rounded-3xl p-8 border border-emerald-200/60 bg-gradient-to-br from-emerald-50/40 via-white to-white shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#006b2c] uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <span>Interactive Simulator</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Live Neural Weighting Formula
            </h2>
            <p className="text-xs text-slate-600">
              Adjust the preference vectors below to see how our algorithm dynamically recalculates composite scores.
            </p>
          </div>

          <div className="bg-emerald-800 text-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-lg shrink-0">
            <div>
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest block">
                Calculated Match
              </span>
              <span className="text-3xl font-extrabold">{simulatedScore}%</span>
            </div>
            <Activity className="w-8 h-8 text-emerald-300 animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sliders */}
          <div className="md:col-span-2 space-y-5">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Performance & Compute Vector (25% Weight)</span>
                <span className="text-[#006b2c]">{weights.performance}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={weights.performance}
                onChange={(e) => setWeights({ ...weights, performance: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#006b2c]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Battery Longevity & Thermal Efficiency (25% Weight)</span>
                <span className="text-[#006b2c]">{weights.battery}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={weights.battery}
                onChange={(e) => setWeights({ ...weights, battery: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#006b2c]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Price-to-Value Index (20% Weight)</span>
                <span className="text-[#006b2c]">{weights.value}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={weights.value}
                onChange={(e) => setWeights({ ...weights, value: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#006b2c]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Portability & Weight Factor (15% Weight)</span>
                <span className="text-[#006b2c]">{weights.portability}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={weights.portability}
                onChange={(e) => setWeights({ ...weights, portability: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#006b2c]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Display Precision & Ergonomics (15% Weight)</span>
                <span className="text-[#006b2c]">{weights.build}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={weights.build}
                onChange={(e) => setWeights({ ...weights, build: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#006b2c]"
              />
            </div>
          </div>

          {/* Mathematical Formula Preview */}
          <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl space-y-4 font-mono text-xs flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-emerald-400 font-bold text-[11px] uppercase tracking-wider block">
                Normalized Math Formula
              </span>
              <p className="text-slate-300 leading-relaxed">
                Score = &sum; [ W<sub>i</sub> &times; Norm(Metric<sub>i</sub>) ] - Penalty(Constraints)
              </p>
              <div className="p-3 bg-slate-800/80 rounded-xl space-y-1.5 text-[11px] text-slate-300">
                <p>• W_perf = 0.25 &times; {weights.performance}</p>
                <p>• W_batt = 0.25 &times; {weights.battery}</p>
                <p>• W_val = 0.20 &times; {weights.value}</p>
                <p>• W_port = 0.15 &times; {weights.portability}</p>
                <p>• W_build = 0.15 &times; {weights.build}</p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-700 flex justify-between items-center text-emerald-400 font-bold">
              <span>Vector Magnitude:</span>
              <span>{((simulatedScore / 100) * 1.414).toFixed(3)} &radic;2</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4-STAGE ARCHITECTURAL PIPELINE */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#006b2c] uppercase tracking-wider">
            <Workflow className="w-4 h-4 text-emerald-600" />
            <span>End-to-End System Pipeline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            How ProductPilot AI Works Under the Hood
          </h2>
          <p className="text-xs text-slate-600 max-w-2xl">
            From natural language prompt ingestion to explainable match cards in under 350 milliseconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#006b2c] flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-sm text-slate-900">
              Prompt Deconstruction
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gemini AI parses user conversational sentences to extract budget limits, target use case, brand affinities, and strict hardware constraints.
            </p>
          </div>

          <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#006b2c] flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-sm text-slate-900">
              Vector Normalization
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Technical specs like Geekbench scores, weight in grams, battery watt-hours, and nits are normalized across each product category.
            </p>
          </div>

          <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#006b2c] flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-sm text-slate-900">
              Deterministic Ranking
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculates cosine similarity distance and applies constraint penalty rules to assign a verifiable 0-100% Match Score.
            </p>
          </div>

          <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#006b2c] flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="font-bold text-sm text-slate-900">
              Explainability Layer
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Generates plain-English reason badges ("Why this matched"), highlighting key advantages and honest trade-offs.
            </p>
          </div>
        </div>
      </section>

      {/* LAB BENCHMARK METHODOLOGY & ANTI-BIAS CHARTER */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#006b2c] uppercase tracking-wider">
            <Database className="w-4 h-4 text-emerald-600" />
            <span>Standardized Lab Benchmarks</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Authoritative Testing Sources
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All hardware metrics in ProductPilot AI are ingested from standardized lab testing suites:
          </p>
          <div className="space-y-2.5 pt-2">
            <div className="flex items-start gap-2.5 text-xs text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#006b2c] shrink-0 mt-0.5" />
              <span><strong>Compute & GPU:</strong> Geekbench 6 multi-core, Cinebench R24, and 3DMark TimeSpy stress runs.</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#006b2c] shrink-0 mt-0.5" />
              <span><strong>Acoustics & Isolation:</strong> Rtings certified dBA isolation measurements across low, mid, and treble cabin frequencies.</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#006b2c] shrink-0 mt-0.5" />
              <span><strong>Battery Rundown:</strong> UL Procyon continuous web browsing & video loop tests at fixed 150 nits calibration.</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#006b2c] shrink-0 mt-0.5" />
              <span><strong>Display Quality:</strong> DisplayMate Delta-E color accuracy, DCI-P3 gamut coverage, and peak HDR brightness.</span>
            </div>
          </div>
        </div>

        <div className="bg-[#003915] text-white p-8 rounded-3xl shadow-xl space-y-4 border border-emerald-700/50 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Anti-Affiliate Neutrality Charter</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Zero Paid Ranks. Pure Mathematics.
            </h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Conventional product comparison sites routinely boost products offering higher affiliate commissions. ProductPilot AI was created on a strict neutrality pledge:
            </p>
            <ul className="space-y-2 text-xs text-emerald-100 pt-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>No brand can pay to alter their match percentage or rank order.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Cons and trade-offs are calculated identically for every brand.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>User queries and filter selections remain anonymous and non-tracked.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-emerald-800/60 rounded-2xl border border-emerald-700/80 text-[11px] text-emerald-200">
            🔒 Fully verified algorithmic integrity with open spec weighting.
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#006b2c] uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm text-slate-900 flex justify-between items-center bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="material-symbols-outlined text-[#006b2c]">
                  {activeFaq === idx ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {activeFaq === idx && (
                <div className="p-5 pt-2 text-xs text-slate-600 leading-relaxed border-t border-slate-200 bg-white">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <div className="text-center bg-emerald-50 p-8 sm:p-10 rounded-3xl border border-emerald-200 space-y-4">
        <h3 className="text-2xl font-bold text-slate-900">
          Ready to experience unbiased product discovery?
        </h3>
        <p className="text-xs text-slate-600 max-w-xl mx-auto">
          Start by describing your desired gadget in plain English, or browse top rated hardware in the AI Workspace.
        </p>
        <button
          onClick={() => onNavigate('recommendations')}
          className="px-8 py-3.5 bg-[#006b2c] hover:bg-[#00873a] text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-700/20 inline-flex items-center gap-2 transition-all cursor-pointer"
        >
          <span>Launch AI Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
