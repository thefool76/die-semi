# Die Yield Calculator

🎯 **Professional semiconductor die yield calculator** with multiple yield models for accurate wafer analysis.

## 🚀 Features

- ✅ **Multiple Yield Models**: Poisson, Murphy, and Bose-Einstein
- ✅ **Wafer Sizes**: Support for 150mm, 200mm, and 300mm wafers
- ✅ **Real-time Visualization**: Interactive wafer map showing functional and defective dies
- ✅ **Accurate Calculations**: Industry-standard formulas for gross dies, usable dies, and yield
- ✅ **Edge Exclusion**: Configurable edge exclusion zones
- ✅ **Defect Density**: Calculate yield based on defect density (D₀)
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Fast Performance**: Optimized with Next.js 14 and Tailwind CSS

## 📊 Yield Models

### Poisson Model (Default)
```
Y = e^(-D₀ × A)
```
Assumes random defect distribution. Most commonly used in industry for mature processes.

### Murphy Model
```
Y = [(1-e^(-D₀×A))/(D₀×A)]²
```
Accounts for defect clustering. More pessimistic than Poisson.

### Bose-Einstein Model
```
Y = [1/(1+D₀×A)]²
```
Based on statistical physics. Most conservative estimate for highly clustered defects.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Language**: TypeScript
- **Package Manager**: Bun
- **Analytics**: Vercel Analytics & Speed Insights

## 🎓 Key Formulas

- **Wafer Area**: `A = π × (D/2)²`
- **Die Area**: `A = W × H`
- **Gross Dies**: `GDW = ⌊A_wafer / A_die⌋`
- **Usable Dies**: Accounts for edge exclusion and circular edge loss
- **Net Functional Dies**: `N_net = ⌊Usable × Yield⌋`

## 🚀 Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

Open [http://localhost:3000](http://localhost:3000) to see the calculator.

## 📱 SEO Optimized

- ✅ Comprehensive metadata (Open Graph, Twitter Cards)
- ✅ Structured data (Schema.org JSON-LD)
- ✅ Semantic HTML
- ✅ Sitemap & robots.txt
- ✅ Core Web Vitals optimized
- ✅ Mobile-friendly
- ✅ Fast loading times

## 👨‍💻 Author

**thefool76**
- GitHub: [@thefool76](https://github.com/thefool76)

## 📄 License

MIT License - Feel free to use this calculator for your semiconductor analysis needs.

## 🔗 Links

- [Live Demo](https://die-semi.vercel.app)
- [Documentation](https://die-semi.vercel.app)
- [Wikipedia - Semiconductor Fabrication](https://en.wikipedia.org/wiki/Semiconductor_device_fabrication)
- [Wikipedia - Defect Density](https://en.wikipedia.org/wiki/Defect_density)

## 🌟 Keywords

die yield calculator, semiconductor calculator, wafer yield, defect density, Poisson yield model, Murphy yield model, Bose-Einstein yield model, gross dies per wafer, semiconductor manufacturing, IC fabrication, chip yield, wafer calculator, die per wafer, edge exclusion, semiconductor analysis

---

Made with ❤️ for the semiconductor industry
