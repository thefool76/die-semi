'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { CalculatorResults } from '../lib/types';

interface ResultsCardProps {
  results: CalculatorResults;
}

function AnimatedNumber({ value, decimals = 2, suffix = '' }: { value: number; decimals?: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const steps = 20;
    const diff = value - displayValue;
    const increment = diff / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue((prev) => prev + increment);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function ResultsCard({ results }: ResultsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Results</CardTitle>
        <CardDescription>Calculated semiconductor yield metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Wafer Area */}
          <div className="space-y-2 p-3 sm:p-4 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05] transition-all duration-300 hover:border-white/[0.1]">
            <div className="flex items-center gap-2">
              <p className="text-xs text-neutral-500 uppercase tracking-wider">Wafer Area</p>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <button type="button" className="inline-flex items-center justify-center cursor-help focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded">
                    <Info className="h-3.5 w-3.5 text-neutral-400 hover:text-white transition-colors" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="z-50">
                  <p>Total area of the silicon wafer</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-2xl sm:text-3xl font-display font-semibold">
              <AnimatedNumber value={results.waferAreaMm2} decimals={2} /> <span className="text-base sm:text-lg text-neutral-500">mm²</span>
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              <AnimatedNumber value={results.waferAreaCm2} decimals={2} /> cm²
            </p>
          </div>

          {/* Die Area */}
          <div className="space-y-2 p-3 sm:p-4 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05] transition-all duration-300 hover:border-white/[0.1]">
            <div className="flex items-center gap-2">
              <p className="text-xs text-neutral-500 uppercase tracking-wider">Die Area</p>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <button type="button" className="inline-flex items-center justify-center cursor-help focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded">
                    <Info className="h-3.5 w-3.5 text-neutral-400 hover:text-white transition-colors" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="z-50">
                  <p>Area of a single die/chip</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-2xl sm:text-3xl font-display font-semibold">
              <AnimatedNumber value={results.dieAreaMm2} decimals={2} /> <span className="text-base sm:text-lg text-neutral-500">mm²</span>
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              <AnimatedNumber value={results.dieAreaCm2} decimals={4} /> cm²
            </p>
          </div>

          {/* Gross Dies */}
          <div className="space-y-2 p-3 sm:p-4 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05] transition-all duration-300 hover:border-white/[0.1]">
            <div className="flex items-center gap-2">
              <p className="text-xs text-neutral-500 uppercase tracking-wider">Gross Dies Per Wafer</p>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <button type="button" className="inline-flex items-center justify-center cursor-help focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded">
                    <Info className="h-3.5 w-3.5 text-neutral-400 hover:text-white transition-colors" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="z-50">
                  <p>Theoretical maximum dies without edge loss</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-2xl sm:text-3xl font-display font-semibold">
              <AnimatedNumber value={results.grossDies} decimals={0} />
            </p>
          </div>

          {/* Usable Dies */}
          <div className="space-y-2 p-3 sm:p-4 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05] transition-all duration-300 hover:border-white/[0.1]">
            <div className="flex items-center gap-2">
              <p className="text-xs text-neutral-500 uppercase tracking-wider">Usable Dies</p>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <button type="button" className="inline-flex items-center justify-center cursor-help focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded">
                    <Info className="h-3.5 w-3.5 text-neutral-400 hover:text-white transition-colors" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="z-50">
                  <p>Dies after accounting for edge exclusion</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-2xl sm:text-3xl font-display font-semibold">
              <AnimatedNumber value={results.usableDies} decimals={0} />
            </p>
          </div>

          {/* Yield Percentage */}
          <div className="space-y-2 p-3 sm:p-4 rounded-lg bg-gradient-to-br from-green-500/[0.05] to-transparent border border-green-500/[0.2] transition-all duration-300 hover:border-green-500/[0.3]">
            <div className="flex items-center gap-2">
              <p className="text-xs text-neutral-500 uppercase tracking-wider">Yield</p>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <button type="button" className="inline-flex items-center justify-center cursor-help focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded">
                    <Info className="h-3.5 w-3.5 text-neutral-400 hover:text-white transition-colors" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="z-50">
                  <p>Percentage of defect-free dies</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-2xl sm:text-3xl font-display font-semibold text-green-400">
              <AnimatedNumber value={results.yieldPercent * 100} decimals={2} suffix="%" />
            </p>
          </div>

          {/* Net Functional Dies */}
          <div className="space-y-2 p-3 sm:p-4 rounded-lg bg-gradient-to-br from-blue-500/[0.05] to-transparent border border-blue-500/[0.2] transition-all duration-300 hover:border-blue-500/[0.3]">
            <div className="flex items-center gap-2">
              <p className="text-xs text-neutral-500 uppercase tracking-wider">Net Functional Dies</p>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <button type="button" className="inline-flex items-center justify-center cursor-help focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded">
                    <Info className="h-3.5 w-3.5 text-neutral-400 hover:text-white transition-colors" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="z-50">
                  <p>Final number of working dies per wafer</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-2xl sm:text-3xl font-display font-semibold text-blue-400">
              <AnimatedNumber value={results.netFunctionalDies} decimals={0} />
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/[0.06]">
          <p className="text-xs sm:text-sm text-neutral-400 text-center leading-relaxed">
            Out of <span className="font-display font-semibold text-foreground">{results.grossDies}</span> gross dies,{' '}
            <span className="font-display font-semibold text-blue-400">{results.netFunctionalDies}</span> are
            functional at <span className="font-display font-semibold text-green-400">
              {(results.yieldPercent * 100).toFixed(2)}%
            </span> yield
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

