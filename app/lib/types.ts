export type YieldModel = 'poisson' | 'murphy' | 'bose-einstein';

export interface CalculatorInputs {
  waferDiameter: number; // mm
  dieWidth: number; // mm
  dieHeight: number; // mm
  edgeExclusion: number; // mm
  defectDensity: number; // defects per cm²
  scribeLine: number; // µm
  reticleLimit: number;
  yieldModel: YieldModel;
}

export interface CalculatorResults {
  waferAreaMm2: number;
  waferAreaCm2: number;
  dieAreaMm2: number;
  dieAreaCm2: number;
  grossDies: number;
  usableDies: number;
  yieldPercent: number;
  netFunctionalDies: number;
}

