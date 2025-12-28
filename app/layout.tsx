import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://die-semi.vercel.app'), // Update with your actual domain
  title: {
    default: "Die Yield Calculator | Semiconductor Wafer Analysis Tool",
    template: "%s | Die Yield Calculator",
  },
  description: "Professional semiconductor die yield calculator with Poisson, Murphy, and Bose-Einstein models. Calculate wafer yield, defect density, and die per wafer for 150mm, 200mm, and 300mm wafers.",
  keywords: [
    "die yield calculator",
    "semiconductor calculator",
    "wafer yield",
    "defect density calculator",
    "Poisson yield model",
    "Murphy yield model",
    "Bose-Einstein yield model",
    "gross dies per wafer",
    "semiconductor manufacturing",
    "IC fabrication",
    "chip yield",
    "wafer calculator",
    "die per wafer",
    "edge exclusion",
    "semiconductor analysis",
  ],
  authors: [{ name: "thefool76", url: "https://github.com/thefool76" }],
  creator: "thefool76",
  publisher: "thefool76",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://die-semi.vercel.app",
    title: "Die Yield Calculator | Semiconductor Wafer Analysis Tool",
    description: "Free professional semiconductor die yield calculator. Calculate wafer yield with Poisson, Murphy, and Bose-Einstein models. Support for 150mm, 200mm, 300mm wafers.",
    siteName: "Die Yield Calculator",
    images: [
      {
        url: "/og-image.png", // You'll need to create this
        width: 1200,
        height: 630,
        alt: "Die Yield Calculator - Semiconductor Analysis Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Die Yield Calculator | Semiconductor Analysis",
    description: "Professional die yield calculator with Poisson, Murphy, and Bose-Einstein models. Free semiconductor wafer analysis tool.",
    creator: "@thefool76", // Update with your Twitter handle
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://die-semi.vercel.app",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <TooltipProvider delayDuration={200}>
          {children}
        </TooltipProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
