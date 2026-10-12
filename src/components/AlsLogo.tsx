import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'hero-red' | 'dark' | 'light' | 'monochrome';
}

/**
 * ALS Infonet Tri-Vector Nexus — Bespoke Architectural Monogram & Topological Circuit.
 * 
 * Unlike common isometric boxes or generic letter-in-circle marks, this rare emblem represents:
 * 1. The three foundational pillars of ALS (Architecture, Logic, Systems) and dual engineering hubs (Chennai & Bangalore).
 * 2. An impossible, continuous interlocking ribbon (Möbius topology) symbolizing 100% uptime and the unbroken software lifecycle.
 * 3. Chiseled, dual-faceted aerodynamic wings with precision-etched micro-conduits echoing optical data routing.
 * 4. A central inverted optical aperture with an illuminated core nexus node (the Infonet signal pulse).
 * 
 * Tuned with high-contrast perimeter strokes for razor-sharp legibility on the signature #E50914 red background,
 * dark canvases, and clean paper surfaces alike.
 */
export const AlsLogo: React.FC<LogoProps> = ({
  className = '',
  size = 36,
  variant = 'hero-red'
}) => {
  // Theme color mapping for maximum contrast, aesthetic depth, and legibility
  const theme = {
    // Tuned specifically for the signature crimson red (#E50914) background:
    // Pure brilliant white illuminated facets contrasted against deep obsidian facets with crisp white borders.
    'hero-red': {
      faceLit: '#FFFFFF',
      faceBevel: '#0A0A0A',
      strokeOuter: '#FFFFFF',
      strokeFacet: '#000000',
      strokeWidthOuter: '3',
      strokeWidthFacet: '1.8',
      conduit: '#FFFFFF',
      conduitWidth: '2',
      apertureFill: '#0A0A0A',
      apertureStroke: '#FFFFFF',
      coreHalo: '#0A0A0A',
      coreHaloStroke: '#FFFFFF',
      coreDiamond: '#FFFFFF',
      coreDot: '#E50914'
    },
    // For deep dark/black backgrounds (#080808 Footer, console panels)
    light: {
      faceLit: '#FFFFFF',
      faceBevel: '#E2E8F0',
      strokeOuter: '#FFFFFF',
      strokeFacet: '#0F172A',
      strokeWidthOuter: '2.5',
      strokeWidthFacet: '1.5',
      conduit: '#E50914',
      conduitWidth: '2.2',
      apertureFill: '#0A0A0A',
      apertureStroke: '#FFFFFF',
      coreHalo: '#1E293B',
      coreHaloStroke: '#FFFFFF',
      coreDiamond: '#E50914',
      coreDot: '#FFFFFF'
    },
    // For light off-white / architectural paper backgrounds (#F4F2EB)
    dark: {
      faceLit: '#0A0A0A',
      faceBevel: '#262626',
      strokeOuter: '#000000',
      strokeFacet: '#FFFFFF',
      strokeWidthOuter: '2.8',
      strokeWidthFacet: '1.5',
      conduit: '#E50914',
      conduitWidth: '2',
      apertureFill: '#0A0A0A',
      apertureStroke: '#000000',
      coreHalo: '#0A0A0A',
      coreHaloStroke: '#000000',
      coreDiamond: '#E50914',
      coreDot: '#FFFFFF'
    },
    // Monochrome currentColor adaptability
    monochrome: {
      faceLit: 'currentColor',
      faceBevel: 'currentColor',
      strokeOuter: 'currentColor',
      strokeFacet: 'currentColor',
      strokeWidthOuter: '2',
      strokeWidthFacet: '1.5',
      conduit: 'currentColor',
      conduitWidth: '2',
      apertureFill: 'none',
      apertureStroke: 'currentColor',
      coreHalo: 'currentColor',
      coreHaloStroke: 'currentColor',
      coreDiamond: 'currentColor',
      coreDot: 'currentColor'
    }
  }[variant];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none drop-shadow-sm ${className}`}
      aria-label="ALS Infonet Rare Emblem"
    >
      {/* Protective High-Contrast Perimeter Silhouette for #E50914 */}
      {variant === 'hero-red' && (
        <path
          d="M 50,4 
             L 56,12 L 68,26 L 73,43 L 88,71 L 81,77 L 60,77 L 44,77 L 16,77 L 11,71 L 26,43 L 31,26 L 43,12 Z"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinejoin="round"
          fill="none"
          opacity="0.9"
        />
      )}

      {/* Origin Center Group: (50, 52) */}
      <g transform="translate(50, 52)">
        {/* =========================================================
            BLADE 1: TOP ASCENDER ('A' Apex / Architecture) at 0°
            ========================================================= */}
        <g transform="rotate(0)">
          {/* Secondary Bevel Face (Depth & Shadow) */}
          <path
            d="M 0,-42 L 18,-22 L 23,-4 L 14,12 L 2,7 L 0,-11 Z"
            fill={theme.faceBevel}
            stroke={theme.strokeFacet}
            strokeWidth={theme.strokeWidthFacet}
            strokeLinejoin="round"
          />
          {/* Primary Lit Face (High-Contrast Blade) */}
          <path
            d="M 0,-42 L -12,-22 L -4,-6 L 0,-11 Z"
            fill={theme.faceLit}
            stroke={theme.strokeFacet}
            strokeWidth={theme.strokeWidthFacet}
            strokeLinejoin="round"
          />
          {/* Micro Data Conduit Channel (Infonet routing line) */}
          <path
            d="M 0,-35 L 0,-16"
            stroke={theme.conduit}
            strokeWidth={theme.conduitWidth}
            strokeLinecap="round"
          />
        </g>

        {/* =========================================================
            BLADE 2: BOTTOM-RIGHT HORIZON ANCHOR ('L' Foundation) at 120°
            ========================================================= */}
        <g transform="rotate(120)">
          {/* Secondary Bevel Face */}
          <path
            d="M 0,-42 L 18,-22 L 23,-4 L 14,12 L 2,7 L 0,-11 Z"
            fill={theme.faceBevel}
            stroke={theme.strokeFacet}
            strokeWidth={theme.strokeWidthFacet}
            strokeLinejoin="round"
          />
          {/* Primary Lit Face */}
          <path
            d="M 0,-42 L -12,-22 L -4,-6 L 0,-11 Z"
            fill={theme.faceLit}
            stroke={theme.strokeFacet}
            strokeWidth={theme.strokeWidthFacet}
            strokeLinejoin="round"
          />
          {/* Micro Data Conduit Channel */}
          <path
            d="M 0,-35 L 0,-16"
            stroke={theme.conduit}
            strokeWidth={theme.conduitWidth}
            strokeLinecap="round"
          />
        </g>

        {/* =========================================================
            BLADE 3: BOTTOM-LEFT KINETIC LOOP ('S' Wave) at 240°
            ========================================================= */}
        <g transform="rotate(240)">
          {/* Secondary Bevel Face */}
          <path
            d="M 0,-42 L 18,-22 L 23,-4 L 14,12 L 2,7 L 0,-11 Z"
            fill={theme.faceBevel}
            stroke={theme.strokeFacet}
            strokeWidth={theme.strokeWidthFacet}
            strokeLinejoin="round"
          />
          {/* Primary Lit Face */}
          <path
            d="M 0,-42 L -12,-22 L -4,-6 L 0,-11 Z"
            fill={theme.faceLit}
            stroke={theme.strokeFacet}
            strokeWidth={theme.strokeWidthFacet}
            strokeLinejoin="round"
          />
          {/* Micro Data Conduit Channel */}
          <path
            d="M 0,-35 L 0,-16"
            stroke={theme.conduit}
            strokeWidth={theme.conduitWidth}
            strokeLinecap="round"
          />
        </g>

        {/* =========================================================
            TOPOLOGICAL INTERLOCKING CAP:
            Rerenders the illuminated crest of Blade 1 to weave OVER Blade 3,
            completing the impossible, continuous Möbius loop.
            ========================================================= */}
        <g transform="rotate(0)">
          <path
            d="M 0,-42 L -12,-22 L -4,-6 L 0,-11 Z"
            fill={theme.faceLit}
            stroke={theme.strokeFacet}
            strokeWidth={theme.strokeWidthFacet}
            strokeLinejoin="round"
          />
          <path
            d="M 0,-35 L 0,-20"
            stroke={theme.conduit}
            strokeWidth={theme.conduitWidth}
            strokeLinecap="round"
          />
        </g>

        {/* =========================================================
            CENTRAL INFONET APERTURE & CORE NEXUS (Data Crosshair)
            ========================================================= */}
        {/* Negative Space Aperture Frame (Equilateral Delta) */}
        <polygon
          points="0,-11 9.53,5.5 -9.53,5.5"
          fill={theme.apertureFill}
          stroke={theme.apertureStroke}
          strokeWidth="1.2"
          opacity="0.95"
        />

        {/* Precision Floating Diamond Nexus Core */}
        <path
          d="M 0,-6 L 4.5,0 L 0,6 L -4.5,0 Z"
          fill={theme.coreDiamond}
          stroke={theme.coreHaloStroke}
          strokeWidth="1"
        />

        {/* Luminous Central Node / Pulse Beacon */}
        <circle
          cx="0"
          cy="0"
          r="1.8"
          fill={theme.coreDot}
        />
      </g>
    </svg>
  );
};
