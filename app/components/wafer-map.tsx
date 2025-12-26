'use client';

import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalculatorInputs, CalculatorResults } from '../lib/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface WaferMapProps {
  inputs: CalculatorInputs;
  results: CalculatorResults;
}

interface Die {
  x: number;
  y: number;
  isUsable: boolean;
  isDefective: boolean;
  id: number;
}

export function WaferMap({ inputs, results }: WaferMapProps) {
  const [animationKey, setAnimationKey] = React.useState(0);

  // Trigger re-animation when inputs change significantly
  React.useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [inputs.waferDiameter, inputs.dieWidth, inputs.dieHeight]);

  const dies = useMemo(() => {
    const dieList: Die[] = [];
    const waferRadius = inputs.waferDiameter / 2;
    const dieWidth = inputs.dieWidth;
    const dieHeight = inputs.dieHeight;
    
    // Calculate how many dies fit in each direction
    const diesX = Math.floor((inputs.waferDiameter) / dieWidth);
    const diesY = Math.floor((inputs.waferDiameter) / dieHeight);
    
    // Center the die grid
    const startX = -((diesX * dieWidth) / 2);
    const startY = -((diesY * dieHeight) / 2);
    
    let dieId = 0;
    let usableDieCount = 0;
    
    // Generate die grid
    for (let row = 0; row < diesY; row++) {
      for (let col = 0; col < diesX; col++) {
        const x = startX + col * dieWidth + dieWidth / 2;
        const y = startY + row * dieHeight + dieHeight / 2;
        
        // Check if die center is within wafer
        const distanceFromCenter = Math.sqrt(x * x + y * y);
        const isWithinWafer = distanceFromCenter <= waferRadius - inputs.edgeExclusion;
        
        if (distanceFromCenter <= waferRadius) {
          // Determine if this die is defective based on yield
          // Use deterministic pseudo-random based on position
          const seed = (col * 1000 + row) % 100;
          const isDefective = isWithinWafer && (seed / 100) > results.yieldPercent;
          
          if (isWithinWafer) {
            usableDieCount++;
          }
          
          dieList.push({
            x,
            y,
            isUsable: isWithinWafer,
            isDefective,
            id: dieId++,
          });
        }
      }
    }
    
    return dieList;
  }, [inputs, results.yieldPercent]);

  const viewBoxSize = inputs.waferDiameter * 1.1;
  const waferRadius = inputs.waferDiameter / 2;
  const scale = 400 / viewBoxSize; // Scale to fit 400px container

  const goodDies = dies.filter(d => d.isUsable && !d.isDefective).length;
  const defectiveDies = dies.filter(d => d.isUsable && d.isDefective).length;
  const edgeLossDies = dies.filter(d => !d.isUsable).length;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-none">
        <CardTitle className="flex items-center gap-2">
          <span>Wafer Map</span>
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </CardTitle>
        <CardDescription>
          Visual distribution of functional and defective dies
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center min-h-[400px] p-8">
        <style jsx global>{`
          @keyframes dieAppear {
            from {
              opacity: 0;
              transform: scale(0.5);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>
        <div className="flex flex-col items-center w-full">
          {/* SVG Wafer */}
          <div className="relative w-full max-w-[600px] aspect-square group">

            <svg
              viewBox={`${-viewBoxSize/2} ${-viewBoxSize/2} ${viewBoxSize} ${viewBoxSize}`}
              className="w-full h-full transition-transform duration-700 group-hover:scale-[1.02]"
              style={{ filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.08))' }}
            >
              {/* Wafer background circle with gradient */}
              <defs>
                <radialGradient id="waferGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1a1a1a" />
                  <stop offset="70%" stopColor="#111111" />
                  <stop offset="100%" stopColor="#0a0a0a" />
                </radialGradient>
                <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.08)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="defectGlow">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Wafer circle with subtle pulse */}
              <circle
                cx="0"
                cy="0"
                r={waferRadius}
                fill="url(#waferGradient)"
                stroke="#444"
                strokeWidth="2"
                className="transition-all duration-700"
              >
                <animate
                  attributeName="stroke"
                  values="#444;#555;#444"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Scanning animation line */}
              <g className="opacity-40">
                <rect
                  x={-waferRadius}
                  y={-waferRadius * 0.1}
                  width={waferRadius * 2}
                  height={waferRadius * 0.2}
                  fill="url(#scanGradient)"
                  clipPath="circle()"
                >
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values={`0,${-waferRadius * 2};0,${waferRadius * 2}`}
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </rect>
              </g>

              {/* Edge exclusion zone with animation */}
              <circle
                cx="0"
                cy="0"
                r={waferRadius - inputs.edgeExclusion}
                fill="none"
                stroke="#666"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.5"
                className="transition-all duration-700"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="8"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Dies */}
              <TooltipProvider>
                {dies.map((die, index) => {
                  let fillColor = '#ef4444'; // Red for edge loss
                  let opacity = 0.3;
                  let shouldPulse = false;
                  
                  if (die.isUsable) {
                    if (die.isDefective) {
                      fillColor = '#f59e0b'; // Orange for defective
                      opacity = 0.7;
                      shouldPulse = true;
                    } else {
                      fillColor = '#22c55e'; // Green for good
                      opacity = 0.8;
                    }
                  }

                  // Stagger animation delay based on distance from center
                  const distanceFromCenter = Math.sqrt(die.x * die.x + die.y * die.y);
                  const maxDistance = waferRadius;
                  const animationDelay = (distanceFromCenter / maxDistance) * 0.8;

                  return (
                    <Tooltip key={`${die.id}-${animationKey}`} delayDuration={0}>
                      <TooltipTrigger asChild>
                        <g>
                          <rect
                            x={die.x - inputs.dieWidth / 2}
                            y={die.y - inputs.dieHeight / 2}
                            width={inputs.dieWidth}
                            height={inputs.dieHeight}
                            fill={fillColor}
                            opacity={opacity}
                            stroke={die.isUsable ? '#fff' : '#666'}
                            strokeWidth="0.3"
                            filter={shouldPulse ? 'url(#defectGlow)' : undefined}
                            className="transition-all duration-300 hover:opacity-100 hover:stroke-white hover:stroke-[0.6] cursor-pointer"
                            style={{
                              transformOrigin: `${die.x}px ${die.y}px`,
                              animation: `dieAppear 0.5s ease-out ${animationDelay}s both`,
                            }}
                          >
                            {/* Pulse animation for defective dies */}
                            {shouldPulse && (
                              <animate
                                attributeName="opacity"
                                values={`${opacity};${opacity * 1.3};${opacity}`}
                                dur="2s"
                                repeatCount="indefinite"
                                begin={`${animationDelay}s`}
                              />
                            )}
                          </rect>
                        </g>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          {!die.isUsable && 'Edge Loss Die'}
                          {die.isUsable && die.isDefective && 'Defective Die'}
                          {die.isUsable && !die.isDefective && 'Functional Die'}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </TooltipProvider>

              {/* Center marker */}
              <circle
                cx="0"
                cy="0"
                r="3"
                fill="#fff"
                opacity="0.5"
              />
            </svg>
          </div>

          {/* Legend */}
          <div className="mt-8 w-full max-w-md">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded border border-white/20" />
                <div className="text-sm">
                  <p className="font-semibold text-green-400">{goodDies}</p>
                  <p className="text-xs text-muted-foreground">Functional</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded border border-white/20" />
                <div className="text-sm">
                  <p className="font-semibold text-orange-400">{defectiveDies}</p>
                  <p className="text-xs text-muted-foreground">Defective</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 opacity-30 rounded border border-white/20" />
                <div className="text-sm">
                  <p className="font-semibold text-red-400">{edgeLossDies}</p>
                  <p className="text-xs text-muted-foreground">Edge Loss</p>
                </div>
              </div>
            </div>

            {/* Stats summary */}
            <div className="mt-6 p-5 bg-gradient-to-br from-neutral-900/50 to-black/50 rounded-xl border border-white/[0.08] backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="space-y-1">
                  <p className="text-neutral-500 text-xs uppercase tracking-wider">Total Dies</p>
                  <p className="text-2xl font-display font-semibold">{dies.length}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-neutral-500 text-xs uppercase tracking-wider">Yield Rate</p>
                  <p className="text-2xl font-display font-semibold text-green-400">
                    {(results.yieldPercent * 100).toFixed(2)}%
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-neutral-500 text-xs uppercase tracking-wider">Usable Area</p>
                  <p className="text-2xl font-display font-semibold">
                    {((1 - edgeLossDies / dies.length) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-neutral-500 text-xs uppercase tracking-wider">Good Dies</p>
                  <p className="text-2xl font-display font-semibold text-blue-400">{goodDies}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

