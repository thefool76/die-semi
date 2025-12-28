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

      <div className="max-w-7xl mx-auto py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 animate-fade-in">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl shadow-2xl shadow-black/50 hover:scale-105 transition-transform duration-500">
            <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-white to-neutral-400 shadow-lg">
              <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white drop-shadow-sm">
              Die Yield Calculator
            </h1>
          </div>
          <p className="text-neutral-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light px-4">
            Professional semiconductor yield analysis and wafer economics.
            <span className="block mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-neutral-500 uppercase tracking-widest">
              Designed for precision
            </span>
          </p>
          <div className="flex justify-center mt-6 sm:mt-8">
            <InfoModal />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8">
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
              <div className="xl:col-span-1 space-y-6 sm:space-y-8">
                <CalculatorForm inputs={inputs} onInputChange={setInputs} />
                <ResultsCard results={results} />
              </div>
              <div className="xl:col-span-2 h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
                <WaferMap inputs={inputs} results={results} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 sm:mt-24 md:mt-32 pt-8 sm:pt-10 border-t border-white/[0.06] space-y-6">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-neutral-500 font-medium">
                Semiconductor Analysis Tools
              </p>
              <p className="text-xs text-neutral-600">
                Built with Next.js 14 & Tailwind CSS
              </p>
              <p className="text-xs text-neutral-400 flex items-center justify-center md:justify-start gap-1.5">
                Made by 
                <a 
                  href="https://github.com/thefool76" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-white hover:text-blue-400 transition-colors font-medium"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  thefool76
                </a>
              </p>
            </div>
            
            {/* Yield Models with Wikipedia Links */}
            <div className="flex flex-col items-center md:items-end gap-3">
              <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Yield Models</p>
              <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4 text-xs">
                <a 
                  href="https://en.wikipedia.org/wiki/Poisson_distribution" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>Poisson Model</span>
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a 
                  href="https://en.wikipedia.org/wiki/Semiconductor_device_fabrication#Yield" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>Murphy Model</span>
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a 
                  href="https://en.wikipedia.org/wiki/Bose%E2%80%93Einstein_statistics" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>Bose-Einstein</span>
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Additional Resources */}
          <div className="pt-4 border-t border-white/[0.04] flex flex-wrap justify-center gap-4 text-xs text-neutral-600">
            <a 
              href="https://en.wikipedia.org/wiki/Wafer_(electronics)" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-neutral-400 transition-colors"
            >
              About Wafer Fabrication
            </a>
            <span className="text-neutral-800">•</span>
            <a 
              href="https://en.wikipedia.org/wiki/Defect_density" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-neutral-400 transition-colors"
            >
              Defect Density
            </a>
            <span className="text-neutral-800">•</span>
            <a 
              href="https://en.wikipedia.org/wiki/Semiconductor_device_fabrication" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-neutral-400 transition-colors"
            >
              Semiconductor Fabrication
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
