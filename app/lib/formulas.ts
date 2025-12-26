import { CalculatorInputs, CalculatorResults, YieldModel } from './types';

/**
 * Calculate wafer area in mm²
 * Formula: π * (D/2)²
 */
export function calculateWaferArea(diameter: number): number {
  return Math.PI * Math.pow(diameter / 2, 2);
}

/**
 * Calculate die area in mm²
 * Formula: width * height
 */
export function calculateDieArea(width: number, height: number): number {
  return width * height;
}

/**
 * Calculate gross dies per wafer (ideal, no edge loss)
 * Formula: (π * (D/2)²) / die_area
 */
export function calculateGrossDies(waferDiameter: number, dieArea: number): number {
  const waferArea = calculateWaferArea(waferDiameter);
  return Math.floor(waferArea / dieArea);
}

/**
 * Calculate usable dies with edge loss correction
 * Formula: gross_dies - (π * D) / sqrt(2 * die_area)
 */
export function calculateUsableDies(
  waferDiameter: number,
  dieArea: number,
  grossDies: number
): number {
  const edgeLoss = (Math.PI * waferDiameter) / Math.sqrt(2 * dieArea);
  return Math.max(0, Math.floor(grossDies - edgeLoss));
}

/**
 * Calculate yield using Poisson model
 * Formula: exp(-D0 * die_area_cm²)
 */
export function calculatePoissonYield(defectDensity: number, dieAreaCm2: number): number {
  return Math.exp(-defectDensity * dieAreaCm2);
}

/**
 * Calculate yield using Murphy model
 * Formula: ((1 - exp(-D0 * die_area_cm²)) / (D0 * die_area_cm²))²
 */
export function calculateMurphyYield(defectDensity: number, dieAreaCm2: number): number {
  const product = defectDensity * dieAreaCm2;
  if (product === 0) return 1;
  return Math.pow((1 - Math.exp(-product)) / product, 2);
}

/**
 * Calculate yield using Bose-Einstein model
 * Formula: 1 / (1 + D0 * die_area_cm²)²
 */
export function calculateBoseEinsteinYield(defectDensity: number, dieAreaCm2: number): number {
  return Math.pow(1 / (1 + defectDensity * dieAreaCm2), 2);
}

/**
 * Calculate yield based on selected model
 */
export function calculateYield(
  model: YieldModel,
  defectDensity: number,
  dieAreaCm2: number
): number {
  switch (model) {
    case 'poisson':
      return calculatePoissonYield(defectDensity, dieAreaCm2);
    case 'murphy':
      return calculateMurphyYield(defectDensity, dieAreaCm2);
    case 'bose-einstein':
      return calculateBoseEinsteinYield(defectDensity, dieAreaCm2);
    default:
      return calculatePoissonYield(defectDensity, dieAreaCm2);
  }
}

/**
 * Calculate net functional dies
 * Formula: usable_dies * yield
 */
export function calculateNetDies(usableDies: number, yieldPercent: number): number {
  return Math.floor(usableDies * yieldPercent);
}

/**
 * Main calculation function - computes all results
 */
export function calculateResults(inputs: CalculatorInputs): CalculatorResults {
  // Calculate areas
  const waferAreaMm2 = calculateWaferArea(inputs.waferDiameter);
  const waferAreaCm2 = waferAreaMm2 / 100;
  const dieAreaMm2 = calculateDieArea(inputs.dieWidth, inputs.dieHeight);
  const dieAreaCm2 = dieAreaMm2 / 100;

  // Calculate dies
  const grossDies = calculateGrossDies(inputs.waferDiameter, dieAreaMm2);
  const usableDies = calculateUsableDies(inputs.waferDiameter, dieAreaMm2, grossDies);

  // Calculate yield
  const yieldPercent = calculateYield(inputs.yieldModel, inputs.defectDensity, dieAreaCm2);

  // Calculate net dies
  const netFunctionalDies = calculateNetDies(usableDies, yieldPercent);

  return {
    waferAreaMm2,
    waferAreaCm2,
    dieAreaMm2,
    dieAreaCm2,
    grossDies,
    usableDies,
    yieldPercent,
    netFunctionalDies,
  };
}

