'use client';

import React, { useState, useEffect } from 'react';
import { CalculatorForm } from './components/calculator-form';
import { ResultsCard } from './components/results-card';
import { InfoModal } from './components/info-modal';
import { WaferMap } from './components/wafer-map';
import { CalculatorInputs, CalculatorResults } from './lib/types';
import { calculateResults } from './lib/formulas';
import { Cpu } from 'lucide-react';

export default function Home() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    waferDiameter: 300,
    dieWidth: 10,
    dieHeight: 10,
    edgeExclusion: 3,
    defectDensity: 0.1,
    scribeLine: 100,
    reticleLimit: 26,
    yieldModel: 'poisson',
  });

  const [results, setResults] = useState<CalculatorResults>(calculateResults(inputs));

  useEffect(() => {
    const newResults = calculateResults(inputs);
    setResults(newResults);
  }, [inputs]);

  return (
    <main className="min-h-screen bg-black relative overflow-hidden selection:bg-white/20">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
             backgroundSize: '40px 40px',
             maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
           }} 
      />

      {/* Gradient background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-5xl mx-auto py-20 px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center justify-center gap-3 mb-8 p-4 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl shadow-2xl shadow-black/50 hover:scale-105 transition-transform duration-500">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-white to-neutral-400 shadow-lg">
              <Cpu className="h-6 w-6 text-black" />
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight text-white drop-shadow-sm">
              Die Yield Calculator
            </h1>
          </div>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Professional semiconductor yield analysis and wafer economics.
            <span className="block mt-3 text-sm font-medium text-neutral-500 uppercase tracking-widest">
              Designed for precision
            </span>
          </p>
          <div className="flex justify-center mt-8">
            <InfoModal />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-8">
                <CalculatorForm inputs={inputs} onInputChange={setInputs} />
                <ResultsCard results={results} />
              </div>
              <div className="lg:col-span-2 h-full min-h-[500px]">
                <WaferMap inputs={inputs} results={results} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-10 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
             <p className="text-sm text-neutral-500 font-medium">
              Semiconductor Analysis Tools
            </p>
            <p className="text-xs text-neutral-600 mt-2">
              Built with Next.js 14 & Tailwind CSS
            </p>
          </div>
          
          <div className="flex gap-6 text-xs text-neutral-600 font-medium uppercase tracking-wider">
            <span>Poisson Model</span>
            <span>Murphy Model</span>
            <span>Bose-Einstein</span>
          </div>
        </div>
      </div>
    </main>
  );
}
