'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Wafer Area */}
          <div className="space-y-2 p-4 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05] transition-all duration-300 hover:border-white/[0.1]">
            <div className="flex items-center gap-2">
              <p className="text-xs text-neutral-500 uppercase tracking-wider">Wafer Area</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total area of the silicon wafer</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-3xl font-display font-semibold">
              <AnimatedNumber value={results.waferAreaMm2} decimals={2} /> <span className="text-lg text-neutral-500">mm²</span>
            </p>
            <p className="text-sm text-muted-foreground">
              <AnimatedNumber value={results.waferAreaCm2} decimals={2} /> cm²
            </p>
          </div>

          {/* Die Area */}
          <div className="space-y-2 p-4 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05] transition-all duration-300 hover:border-white/[0.1]">
            <div className="flex items-center gap-2">
              <p className="text-xs text-neutral-500 uppercase tracking-wider">Die Area</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Area of a single die/chip</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-3xl font-display font-semibold">
              <AnimatedNumber value={results.dieAreaMm2} decimals={2} /> <span className="text-lg text-neutral-500">mm²</span>
            </p>
            <p className="text-sm text-muted-foreground">
              <AnimatedNumber value={results.dieAreaCm2} decimals={4} /> cm²
            </p>
          </div>

          {/* Gross Dies */}
          <div className="space-y-2 p-4 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05] transition-all duration-300 hover:border-white/[0.1]">
            <div className="flex items-center gap-2">
              <p className="text-xs text-neutral-500 uppercase tracking-wider">Gross Dies Per Wafer</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Theoretical maximum dies without edge loss</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-3xl font-display font-semibold">
              <AnimatedNumber value={results.grossDies} decimals={0} />
            </p>
          </div>

          {/* Usable Dies */}
          <div className="space-y-2 p-4 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05] transition-all duration-300 hover:border-white/[0.1]">
            <div className="flex items-center gap-2">
              <p className="text-xs text-neutral-500 uppercase tracking-wider">Usable Dies</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Dies after accounting for edge exclusion</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-3xl font-display font-semibold">
              <AnimatedNumber value={results.usableDies} decimals={0} />
            </p>
          </div>

          {/* Yield Percentage */}
          <div className="space-y-2 p-4 rounded-lg bg-gradient-to-br from-green-500/[0.05] to-transparent border border-green-500/[0.2] transition-all duration-300 hover:border-green-500/[0.3]">
            <div className="flex items-center gap-2">
              <p className="text-xs text-neutral-500 uppercase tracking-wider">Yield</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Percentage of defect-free dies</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-3xl font-display font-semibold text-green-400">
              <AnimatedNumber value={results.yieldPercent * 100} decimals={2} suffix="%" />
            </p>
          </div>

          {/* Net Functional Dies */}
          <div className="space-y-2 p-4 rounded-lg bg-gradient-to-br from-blue-500/[0.05] to-transparent border border-blue-500/[0.2] transition-all duration-300 hover:border-blue-500/[0.3]">
            <div className="flex items-center gap-2">
              <p className="text-xs text-neutral-500 uppercase tracking-wider">Net Functional Dies</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Final number of working dies per wafer</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-3xl font-display font-semibold text-blue-400">
              <AnimatedNumber value={results.netFunctionalDies} decimals={0} />
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 pt-6 border-t border-white/[0.06]">
          <p className="text-sm text-neutral-400 text-center leading-relaxed">
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

