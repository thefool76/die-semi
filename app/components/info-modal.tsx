'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Info, BookOpen, Layers, Activity, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';

export function InfoModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-white/[0.05] border-white/[0.1] hover:bg-white/[0.1] text-neutral-200 transition-all duration-300 hover:scale-105 text-xs sm:text-sm">
          <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Learn More
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] sm:max-w-2xl max-h-[85vh] overflow-y-auto bg-[#0A0A0A] border-white/[0.1] shadow-2xl p-0 gap-0">
        <DialogHeader className="p-4 sm:p-6 border-b border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-1.5 sm:p-2 rounded-lg bg-white text-black">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <DialogTitle className="text-lg sm:text-2xl font-display font-bold">Semiconductor Knowledge Base</DialogTitle>
          </div>
          <DialogDescription className="text-neutral-400 text-sm sm:text-base">
            Essential concepts for understanding wafer yield and defects
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* What is a Wafer */}
          <section className="space-y-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-lg font-display font-semibold flex items-center gap-2 text-white">
              <Layers className="h-4 w-4 text-neutral-400" /> What is a Wafer?
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              A wafer is a thin slice of semiconductor material (typically silicon) used to fabricate
              integrated circuits. Common wafer sizes are <span className="text-white font-medium">150mm</span>, <span className="text-white font-medium">200mm</span>, and <span className="text-white font-medium">300mm</span> in diameter.
              Modern fabs primarily use 300mm wafers for high-volume production.
            </p>
            <p className="text-xs text-neutral-500 mt-2">
              <strong className="text-neutral-400">Edge Exclusion:</strong> The outer ring of the wafer (typically 3-5mm) 
              is excluded from die placement due to edge effects and handling damage during processing.
            </p>
          </section>

          <Separator className="bg-white/[0.08]" />

          {/* Defect Density & Yield */}
          <section className="space-y-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-display font-semibold flex items-center gap-2 text-white">
              <Activity className="h-4 w-4 text-neutral-400" /> Defect Density & Yield
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Defect density (D₀) measures the number of defects per square centimeter. 
              Lower defect density means higher yield. Advanced processes typically achieve
              <span className="text-white font-medium"> 0.01-0.1 defects/cm²</span>.
            </p>
            <p className="text-xs text-neutral-500 mt-2">
              <strong className="text-neutral-400">Impact:</strong> A single defect can make an entire die non-functional. 
              Larger dies have higher probability of containing defects, resulting in lower yields.
            </p>
          </section>

          <Separator className="bg-white/[0.08]" />

          {/* Yield Models */}
          <section className="space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-display font-semibold flex items-center gap-2 text-white">
              <Calculator className="h-4 w-4 text-neutral-400" /> Yield Models
            </h3>
            
            <div className="grid gap-2 sm:gap-3">
              <div className="group p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Poisson Model (Default)</h4>
                  <code className="px-2 py-1 rounded bg-black/40 text-xs text-blue-400 font-mono self-start">Y = e^(-D₀ × A)</code>
                </div>
                <p className="text-xs text-neutral-500">
                  Assumes defects are randomly distributed across the wafer. Most commonly used in industry.
                  Best for mature processes with random, independent defects. Tends to be the most optimistic.
                </p>
              </div>

              <div className="group p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Murphy Model</h4>
                  <code className="px-2 py-1 rounded bg-black/40 text-xs text-blue-400 font-mono self-start">Y = [(1-e^(-D₀×A))/(D₀×A)]²</code>
                </div>
                <p className="text-xs text-neutral-500">
                  Accounts for defect clustering, where defects tend to occur in groups rather than randomly.
                  More pessimistic than Poisson. Better for newer or less mature processes.
                </p>
              </div>

              <div className="group p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-white">Bose-Einstein Model</h4>
                  <code className="px-2 py-1 rounded bg-black/40 text-xs text-blue-400 font-mono self-start">Y = [1/(1+D₀×A)]²</code>
                </div>
                <p className="text-xs text-neutral-500">
                  Based on statistical physics, accounts for strong defect clustering.
                  Most conservative estimate. Useful for highly clustered defect patterns.
                </p>
              </div>
            </div>
          </section>

          <Separator className="bg-white/[0.08]" />

          {/* Formulas */}
          <section className="space-y-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg font-display font-semibold text-white">Key Formulas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
              <div className="bg-neutral-900/50 p-2.5 sm:p-3 rounded-lg border border-white/[0.05]">
                <p className="font-medium text-neutral-300 mb-1 text-xs sm:text-sm">Wafer Area</p>
                <code className="text-neutral-500 text-xs font-mono">A = π × (D/2)²</code>
                <p className="text-[10px] text-neutral-600 mt-1">Where D is diameter</p>
              </div>

              <div className="bg-neutral-900/50 p-2.5 sm:p-3 rounded-lg border border-white/[0.05]">
                <p className="font-medium text-neutral-300 mb-1 text-xs sm:text-sm">Die Area</p>
                <code className="text-neutral-500 text-xs font-mono">A = W × H</code>
                <p className="text-[10px] text-neutral-600 mt-1">Width × Height</p>
              </div>

              <div className="bg-neutral-900/50 p-2.5 sm:p-3 rounded-lg border border-white/[0.05]">
                <p className="font-medium text-neutral-300 mb-1 text-xs sm:text-sm">Gross Dies</p>
                <code className="text-neutral-500 text-xs font-mono">GDW = ⌊A_wafer / A_die⌋</code>
                <p className="text-[10px] text-neutral-600 mt-1">Theoretical maximum</p>
              </div>

              <div className="bg-neutral-900/50 p-2.5 sm:p-3 rounded-lg border border-white/[0.05]">
                <p className="font-medium text-neutral-300 mb-1 text-xs sm:text-sm">Usable Dies</p>
                <code className="text-neutral-500 text-xs font-mono break-all">
                  Dies_eff - ⌊π×D_eff/√(2×A_die)⌋
                </code>
                <p className="text-[10px] text-neutral-600 mt-1">After edge exclusion</p>
              </div>

              <div className="bg-neutral-900/50 p-2.5 sm:p-3 rounded-lg border border-white/[0.05]">
                <p className="font-medium text-neutral-300 mb-1 text-xs sm:text-sm">Net Functional Dies</p>
                <code className="text-neutral-500 text-xs font-mono">N_net = ⌊Usable × Y⌋</code>
                <p className="text-[10px] text-neutral-600 mt-1">Final working dies</p>
              </div>

              <div className="bg-neutral-900/50 p-2.5 sm:p-3 rounded-lg border border-white/[0.05]">
                <p className="font-medium text-neutral-300 mb-1 text-xs sm:text-sm">Unit Conversion</p>
                <code className="text-neutral-500 text-xs font-mono">1 cm² = 100 mm²</code>
                <p className="text-[10px] text-neutral-600 mt-1">For defect density</p>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
