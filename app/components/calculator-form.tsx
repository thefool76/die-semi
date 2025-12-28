'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Sliders, Disc, Grid, Maximize, AlertCircle, ChevronDown } from 'lucide-react';
import { CalculatorInputs, YieldModel } from '../lib/types';
import { cn } from '@/lib/utils';

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  onInputChange: (inputs: CalculatorInputs) => void;
}

export function CalculatorForm({ inputs, onInputChange }: CalculatorFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = useCallback((field: keyof CalculatorInputs, value: number | YieldModel) => {
    // Clear existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // For die dimensions, debounce to prevent excessive recalculations
    if (field === 'dieWidth' || field === 'dieHeight') {
      // Apply minimum constraint
      const minDieSize = 0.1;
      const numValue = typeof value === 'number' ? Math.max(minDieSize, value) : value;
      
      // Debounce by 300ms
      debounceTimerRef.current = setTimeout(() => {
        onInputChange({ ...inputs, [field]: numValue });
      }, 300);
    } else {
      // Immediate update for other fields
      onInputChange({ ...inputs, [field]: value });
    }
  }, [inputs, onInputChange]);

  return (
    <Card className="overflow-hidden border-white/[0.08] bg-black/40 backdrop-blur-xl">
      <CardHeader className="border-b border-white/[0.05] bg-white/[0.02]">
        <CardTitle className="flex items-center gap-2.5 text-xl">
          <div className="p-1.5 rounded-md bg-white/[0.05] border border-white/[0.05]">
            <Sliders className="h-4 w-4 text-neutral-300" />
          </div>
          Parameters
        </CardTitle>
        <CardDescription>
          Configure wafer and die properties
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 sm:space-y-8 pt-6 sm:pt-8 px-4 sm:px-6">
        
        {/* Section: Wafer Properties */}
        <div className="space-y-4 sm:space-y-5 group">
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-2 select-none">
            <Disc className="h-3.5 w-3.5" /> Wafer Settings
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="waferDiameter" className="text-sm font-medium text-neutral-200">Wafer Diameter (mm)</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="cursor-help">
                    <Info className="h-3.5 w-3.5 text-neutral-600 hover:text-white transition-colors" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Standard sizes: 150mm, 200mm, 300mm</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {[150, 200, 300].map((size) => (
                <button
                  key={size}
                  onClick={() => handleChange('waferDiameter', size)}
                  className={cn(
                    "px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border relative overflow-hidden",
                    inputs.waferDiameter === size
                      ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-[1.02]"
                      : "bg-neutral-900/30 text-neutral-400 border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.02] hover:text-white"
                  )}
                >
                  {size}mm
                  {inputs.waferDiameter === size && (
                    <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/20 opacity-50" />
                  )}
                </button>
              ))}
              <div className="relative">
                <Input
                  id="waferDiameter"
                  type="number"
                  value={inputs.waferDiameter}
                  onChange={(e) => handleChange('waferDiameter', parseFloat(e.target.value) || 0)}
                  onFocus={() => setActiveField('waferDiameter')}
                  onBlur={() => setActiveField(null)}
                  className={cn(
                    "text-center transition-all duration-300",
                    activeField === 'waferDiameter' && "scale-[1.02] border-white/30"
                  )}
                  placeholder="Custom"
                />
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/[0.04]" />

        {/* Section: Die Dimensions */}
        <div className="space-y-4 sm:space-y-5 group">
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-2 select-none">
            <Grid className="h-3.5 w-3.5" /> Die Dimensions
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <Label htmlFor="dieWidth" className="text-sm font-medium text-neutral-200">
                Die Width (mm)
                <span className="ml-1 text-xs text-neutral-500">(min: 0.1)</span>
              </Label>
              <Input
                id="dieWidth"
                type="number"
                step="0.1"
                min="0.1"
                value={inputs.dieWidth}
                onChange={(e) => handleChange('dieWidth', parseFloat(e.target.value) || 0.1)}
                onFocus={() => setActiveField('dieWidth')}
                onBlur={() => setActiveField(null)}
                className={cn("transition-all duration-300", activeField === 'dieWidth' && "scale-[1.01]")}
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="dieHeight" className="text-sm font-medium text-neutral-200">
                Die Height (mm)
                <span className="ml-1 text-xs text-neutral-500">(min: 0.1)</span>
              </Label>
              <Input
                id="dieHeight"
                type="number"
                step="0.1"
                min="0.1"
                value={inputs.dieHeight}
                onChange={(e) => handleChange('dieHeight', parseFloat(e.target.value) || 0.1)}
                onFocus={() => setActiveField('dieHeight')}
                onBlur={() => setActiveField(null)}
                className={cn("transition-all duration-300", activeField === 'dieHeight' && "scale-[1.01]")}
              />
            </div>
          </div>
        </div>

        <Separator className="bg-white/[0.04]" />

        {/* Section: Constraints */}
        <div className="space-y-4 sm:space-y-5 group">
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-2 select-none">
            <Maximize className="h-3.5 w-3.5" /> Constraints & Defects
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="edgeExclusion" className="text-sm font-medium text-neutral-200">Edge Exclusion (mm)</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" className="cursor-help">
                      <Info className="h-3.5 w-3.5 text-neutral-600 hover:text-white transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Unusable edge area around wafer perimeter</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="edgeExclusion"
                type="number"
                step="0.1"
                value={inputs.edgeExclusion}
                onChange={(e) => handleChange('edgeExclusion', parseFloat(e.target.value) || 0)}
                onFocus={() => setActiveField('edgeExclusion')}
                onBlur={() => setActiveField(null)}
                className={cn("transition-all duration-300", activeField === 'edgeExclusion' && "scale-[1.01]")}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="defectDensity" className="text-sm font-medium text-neutral-200">Defect Density D₀ (/cm²)</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" className="cursor-help">
                      <Info className="h-3.5 w-3.5 text-neutral-600 hover:text-white transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Number of defects per square centimeter</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="defectDensity"
                type="number"
                step="0.01"
                value={inputs.defectDensity}
                onChange={(e) => handleChange('defectDensity', parseFloat(e.target.value) || 0)}
                onFocus={() => setActiveField('defectDensity')}
                onBlur={() => setActiveField(null)}
                className={cn("transition-all duration-300", activeField === 'defectDensity' && "scale-[1.01]")}
              />
            </div>
          </div>
        </div>

        <div className={cn(
          "rounded-xl border border-white/[0.08] bg-white/[0.01] overflow-hidden transition-all duration-500",
          showAdvanced ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"
        )}>
          <div 
            className="flex items-center justify-between p-4 cursor-pointer select-none"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <div className="flex items-center gap-2.5">
              <div className={cn("p-1.5 rounded-md border transition-colors", showAdvanced ? "bg-white text-black border-white" : "bg-white/[0.05] text-neutral-400 border-white/[0.05]")}>
                <AlertCircle className="h-3.5 w-3.5" />
              </div>
              <span className={cn("text-sm font-medium transition-colors", showAdvanced ? "text-white" : "text-neutral-300")}>
                Advanced Settings
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="advanced-mode"
                checked={showAdvanced}
                onCheckedChange={setShowAdvanced}
              />
              <ChevronDown className={cn("h-4 w-4 text-neutral-500 transition-transform duration-300", showAdvanced ? "rotate-180" : "rotate-0")} />
            </div>
          </div>

          {/* Advanced Settings Content */}
          <div className={cn(
            "grid gap-4 sm:gap-6 px-4 transition-all duration-500 ease-in-out origin-top",
            showAdvanced ? "pb-6 opacity-100 max-h-[500px] translate-y-0" : "pb-0 opacity-0 max-h-0 -translate-y-4"
          )}>
            <Separator className="bg-white/[0.05]" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3">
                <Label htmlFor="scribeLine" className="text-sm font-medium text-neutral-200">Scribe Line (µm)</Label>
                <Input
                  id="scribeLine"
                  type="number"
                  step="1"
                  value={inputs.scribeLine}
                  onChange={(e) => handleChange('scribeLine', parseFloat(e.target.value) || 0)}
                  className="bg-black/20"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="reticleLimit" className="text-sm font-medium text-neutral-200">Reticle Limit</Label>
                <Input
                  id="reticleLimit"
                  type="number"
                  step="1"
                  value={inputs.reticleLimit}
                  onChange={(e) => handleChange('reticleLimit', parseFloat(e.target.value) || 0)}
                  className="bg-black/20"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="yieldModel" className="text-sm font-medium text-neutral-200">Yield Model</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" className="cursor-help">
                      <Info className="h-3.5 w-3.5 text-neutral-600 hover:text-white transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mathematical model for yield calculation</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select
                value={inputs.yieldModel}
                onValueChange={(value) => handleChange('yieldModel', value as YieldModel)}
              >
                <SelectTrigger id="yieldModel" className="bg-black/20 border-white/[0.1] focus:ring-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0A0A0A] border-white/[0.1]">
                  <SelectItem value="poisson">Poisson (Default)</SelectItem>
                  <SelectItem value="murphy">Murphy</SelectItem>
                  <SelectItem value="bose-einstein">Bose-Einstein</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
