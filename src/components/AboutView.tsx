import React from 'react';
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
  Globe
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (page: NavigationPage) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-20">
      
      {/* HERO MISSION */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-sm">
          <Compass className="w-3.5 h-3.5 text-emerald-600" />
          <span>OUR MISSION & ARCHITECTURE</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk'] leading-tight">
          Democratizing <span className="text-emerald-600">AI Product Discovery</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          ProductPilot AI was engineered to eliminate biased affiliate lists and sponsored reviews. We convert raw technical specifications, acoustic graphs, thermal stress tests, and verified buyer logs into pure vector match scores.
        </p>

        {/* Stats Row */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-['Space_Grotesk']">
              99.1%
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1">Match Accuracy</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-['Space_Grotesk']">
              100,000+
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1">Products Vectorized</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm col-span-2 sm:col-span-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-['Space_Grotesk']">
              0%
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1">Sponsored Bias</p>
          </div>
        </div>
      </section>

      {/* THE CONTENT-BASED RECOMMENDATION ENGINE */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest font-['Space_Grotesk']">
            CORE MATHEMATICS
          </span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-['Space_Grotesk']">
            The Content-Based Recommendation Engine
          </h2>
          <p className="text-xs text-slate-600 max-w-2xl">
            Our multi-stage pipeline translates user natural language intent into dimensional hyper-planes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 font-['Space_Grotesk']">
              1. Feature Vectorization
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Specs like thermal dissipation, battery capacity (Wh), weight (kg), and panel brightness (nits) are normalized into continuous multi-dimensional matrices.
            </p>
          </div>

          <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 font-['Space_Grotesk']">
              2. Semantic Intent Extraction
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When a user asks for "headphones for long flights under $200", natural language processing derives strict constraints: Noise Reduction Rating &gt; 25dB, Battery &gt; 20h, Price &lt; $200.
            </p>
          </div>

          <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 font-['Space_Grotesk']">
              3. Cosine Similarity Scoring
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cosine angle measurement determines nearest neighbor candidates, outputting exact percentage match scores (e.g. 98% Match Score).
            </p>
          </div>
        </div>
      </section>

      {/* RECOMMENDATION PIPELINE */}
      <section className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-8">
        <div className="space-y-2 text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest font-['Space_Grotesk']">
            PIPELINE FLOW
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk']">
            3-Step Execution Pipeline
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-emerald-800/80 p-6 rounded-2xl border border-emerald-700 space-y-3">
            <span className="text-emerald-300 font-extrabold text-xs uppercase tracking-wider block font-['Space_Grotesk']">
              STEP 01 • USER INTAKE
            </span>
            <h3 className="font-bold text-base text-white font-['Space_Grotesk']">
              Natural Language or Slider Inputs
            </h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Express your preferences casually or lock down exact filter parameters in our recommendation workspace.
            </p>
          </div>

          <div className="bg-emerald-800/80 p-6 rounded-2xl border border-emerald-700 space-y-3">
            <span className="text-emerald-300 font-extrabold text-xs uppercase tracking-wider block font-['Space_Grotesk']">
              STEP 02 • AI PROCESSING
            </span>
            <h3 className="font-bold text-base text-white font-['Space_Grotesk']">
              Real-time Vector Query
            </h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Our neural engine filters hardware specs, trade-offs, price anomalies, and verified user ratings.
            </p>
          </div>

          <div className="bg-emerald-800/80 p-6 rounded-2xl border border-emerald-700 space-y-3">
            <span className="text-emerald-300 font-extrabold text-xs uppercase tracking-wider block font-['Space_Grotesk']">
              STEP 03 • CURATED OUTPUT
            </span>
            <h3 className="font-bold text-base text-white font-['Space_Grotesk']">
              Transparent Match Matrix
            </h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Explore side-by-side matrices, AI reasoning cards, pros & cons, and direct retailer availability.
            </p>
          </div>
        </div>
      </section>

      {/* ENGINEERED FOR RELIABILITY */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider font-['Space_Grotesk']">
            <Code className="w-4 h-4 text-emerald-500" />
            ENGINEERED FOR STABILITY
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-['Space_Grotesk']">
            Modern Full-Stack Stack
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Built using React 19, Vite, TypeScript, and Tailwind CSS with custom emerald design tokens. All components strictly adhere to accessible desktop and mobile layouts.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider font-['Space_Grotesk']">
            <Globe className="w-4 h-4 text-emerald-500" />
            GLOBAL PRODUCT COVERAGE
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-['Space_Grotesk']">
            20+ Retail Partners
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our indexing webhooks pull live pricing, stock statuses, and warranty updates directly from certified retailer databases every 15 minutes.
          </p>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <div className="text-center bg-emerald-50 p-8 rounded-3xl border border-emerald-200 space-y-4">
        <h3 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
          Ready to find your ideal product match?
        </h3>
        <button
          onClick={() => onNavigate('recommendations')}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-emerald-600/20 inline-flex items-center gap-2 transition-all"
        >
          <span>Start Recommendation Engine</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
