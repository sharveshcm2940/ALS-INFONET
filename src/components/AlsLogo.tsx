import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'hero-red' | 'dark' | 'light' | 'monochrome';
}

/**
 * ALS Infonet geometric cube mark inspired by isometric multi-faceted structure.
 * Designed with high contrast, sharp geometric clarity, and bold graphic definition.
 * 
 * - 'hero-red': Specially tuned for the signature red (#E50914) background — crisp white top face,
 *               solid deep-black facets, pure white internal lattice lines, and glowing white core.
 * - 'light': Tuned for dark backgrounds (#080808) — pristine white isometric facets with crisp definition.
 * - 'dark': Tuned for light/cream backgrounds (#F4F2EB) — deep black facets with red core.
 * - 'monochrome': Uses currentColor for inline adaptability.
 */
export const AlsLogo: React.FC<LogoProps> = ({
  className = '',
  size = 32,
  variant = 'hero-red'
}) => {
  // Color configuration according to theme context
  const colors = {
    // Specifically tailored for #E50914 background: high visual punch, sharp contrast, clearly legible
    'hero-red': {
      top: '#FFFFFF',          // High-contrast clean white top face
      left: '#000000',         // Deep solid black left facet
      right: '#171717',        // Solid charcoal black right facet
      stroke: '#000000',       // Bold perimeter line
      topStroke: '#000000',
      latticeLeft: '#FFFFFF',  // Crisp white inner grid lines on black facet
      latticeRight: '#FFFFFF', // Crisp white inner grid lines on dark facet
      latticeTop: '#000000',   // Black grid lines on white top facet
      latticeOpacity: '0.9',   // High visibility grid
      strokeWidth: '1.8',
      core: '#FFFFFF',         // Bright white focal core node
      coreStroke: '#000000'
    },
    // For dark backgrounds (like the black Footer #080808)
    light: {
      top: '#FFFFFF',
      left: '#E5E5E5',
      right: '#CCCCCC',
      stroke: '#FFFFFF',
      topStroke: '#111111',
      latticeLeft: '#111111',
      latticeRight: '#111111',
      latticeTop: '#111111',
      latticeOpacity: '0.4',
      strokeWidth: '1.5',
      core: '#E50914',
      coreStroke: '#FFFFFF'
    },
    // For light off-white / paper background (#F4F2EB)
    dark: {
      top: '#1E1E1E',
      left: '#0A0A0A',
      right: '#2D2D2D',
      stroke: '#000000',
      topStroke: '#000000',
      latticeLeft: '#FFFFFF',
      latticeRight: '#FFFFFF',
      latticeTop: '#FFFFFF',
      latticeOpacity: '0.5',
      strokeWidth: '1.6',
      core: '#E50914',
      coreStroke: '#000000'
    },
    monochrome: {
      top: 'currentColor',
      left: 'currentColor',
      right: 'currentColor',
      stroke: 'currentColor',
      topStroke: 'currentColor',
      latticeLeft: 'currentColor',
      latticeRight: 'currentColor',
      latticeTop: 'currentColor',
      latticeOpacity: '0.6',
      strokeWidth: '1.5',
      core: 'currentColor',
      coreStroke: 'currentColor'
    }
  }[variant];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none drop-shadow-sm ${className}`}
      aria-label="ALS Infonet Logo"
    >
      {/* Outer Isometric Hexagon / 3D Cube Silhouette */}
      <g>
        {/* Crisp protective perimeter stroke for high contrast against #E50914 */}
        {variant === 'hero-red' && (
          <path
            d="M20 4.2L34.6 12.6V28.4L20 36.8L5.4 28.4V12.6Z"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        )}

        {/* Top isometric facet */}
        <path
          d="M20 4.5L34.5 12.8V13.3L20 21.6L5.5 13.3V12.8L20 4.5Z"
          fill={colors.top}
          stroke={colors.stroke}
          strokeWidth={colors.strokeWidth}
          strokeLinejoin="round"
        />

        {/* Left isometric facet */}
        <path
          d="M5.5 13.3L20 21.6V37L5.5 28.7V13.3Z"
          fill={colors.left}
          stroke={colors.stroke}
          strokeWidth={colors.strokeWidth}
          strokeLinejoin="round"
        />

        {/* Right isometric facet */}
        <path
          d="M20 21.6L34.5 13.3V28.7L20 37V21.6Z"
          fill={colors.right}
          stroke={colors.stroke}
          strokeWidth={colors.strokeWidth}
          strokeLinejoin="round"
        />

        {/* Inner geometric sub-division lines (Rubik's / modular lattice structure) */}
        {/* Top face lattice */}
        <path
          d="M12.7 8.9L27.3 17.2"
          stroke={colors.latticeTop}
          strokeWidth="1.2"
          strokeOpacity={colors.latticeOpacity}
        />
        <path
          d="M27.3 8.9L12.7 17.2"
          stroke={colors.latticeTop}
          strokeWidth="1.2"
          strokeOpacity={colors.latticeOpacity}
        />

        {/* Left face lattice */}
        <path
          d="M12.7 17.4V32.8"
          stroke={colors.latticeLeft}
          strokeWidth="1.2"
          strokeOpacity={colors.latticeOpacity}
        />
        <path
          d="M5.5 21V21L20 29.3"
          stroke={colors.latticeLeft}
          strokeWidth="1.2"
          strokeOpacity={colors.latticeOpacity}
        />

        {/* Right face lattice */}
        <path
          d="M27.3 17.4V32.8"
          stroke={colors.latticeRight}
          strokeWidth="1.2"
          strokeOpacity={colors.latticeOpacity}
        />
        <path
          d="M20 29.3L34.5 21"
          stroke={colors.latticeRight}
          strokeWidth="1.2"
          strokeOpacity={colors.latticeOpacity}
        />

        {/* Center node / intersection anchor */}
        <circle
          cx="20"
          cy="21.6"
          r="2.6"
          fill={colors.core}
          stroke={colors.coreStroke}
          strokeWidth="1.2"
        />
      </g>
    </svg>
  );
};
