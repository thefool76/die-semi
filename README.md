# Die Yield Calculator

A professional semiconductor die yield calculator built with Next.js and shadcn/ui. Calculate wafer yield, die counts, and functional dies based on industry-standard formulas.

## Features

- **Real-time Calculations**: Instant updates as you modify parameters
- **Multiple Yield Models**: Poisson, Murphy, and Bose-Einstein models
- **Advanced Settings**: Scribe line, reticle limits, and edge exclusion
- **Beautiful UI**: Vercel-style black & white theme with smooth animations
- **Mobile Responsive**: Works seamlessly on all devices
- **Tooltips & Explanations**: Learn about semiconductor manufacturing concepts

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the calculator.

### Build

```bash
npm run build
npm start
```

## Usage

1. **Wafer Diameter**: Select from standard sizes (150mm, 200mm, 300mm) or enter custom
2. **Die Dimensions**: Enter die width and height in millimeters
3. **Edge Exclusion**: Set the unusable edge area (default: 3mm)
4. **Defect Density**: Enter defects per cm² (typical: 0.01-1.0)
5. **Advanced Settings**: Configure scribe lines, reticle limits, and yield models

## Formulas

### Wafer Area
```
A_wafer = π × (D/2)²
```

### Die Area
```
A_die = width × height
```

### Gross Dies Per Wafer
```
GDW = A_wafer / A_die
```

### Usable Dies (Edge Loss Correction)
```
Usable = GDW - (π × D) / √(2 × A_die)
```

### Poisson Yield Model
```
Y = e^(-D₀ × A_die_cm²)
```

### Net Functional Dies
```
Net = Usable × Yield
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: shadcn/ui
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **Icons**: Lucide React

## License

MIT

## Acknowledgments

Inspired by SemiAnalysis die yield calculator with industry-standard semiconductor formulas.
