import React from 'react';

interface PalashLogoProps {
  className?: string;
  size?: number | string;
}

/**
 * PALASH Vani Official Brand Icon
 * Flame of the Forest (पलाश पुष्प) motif with traditional tribal circle and radiating acoustic waves.
 * Rendered inline as SVG for 100% offline, zero-asset-failure reliability in Electron and browser.
 */
export const PalashLogo: React.FC<PalashLogoProps> = ({ className = "w-8 h-8", size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      role="img"
      aria-label="PALASH Vani Logo"
    >
      <defs>
        <linearGradient id="palashGradBrand" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#bf360c" />
          <stop offset="40%" stopColor="#ea580c" />
          <stop offset="80%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fde047" />
        </linearGradient>
        <linearGradient id="leafGradBrand" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2d6a4f" />
          <stop offset="100%" stopColor="#1b4332" />
        </linearGradient>
        <filter id="glowDropBrand" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#ea580c" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Background Disc */}
      <circle cx="50" cy="50" r="46" fill="#fff7ed" stroke="#ea580c" strokeWidth="2.5" />

      {/* Tribal motif dots around ring */}
      <circle cx="50" cy="8" r="2.5" fill="#c2410c" />
      <circle cx="80" cy="20" r="2.5" fill="#c2410c" />
      <circle cx="92" cy="50" r="2.5" fill="#c2410c" />
      <circle cx="80" cy="80" r="2.5" fill="#c2410c" />
      <circle cx="50" cy="92" r="2.5" fill="#c2410c" />
      <circle cx="20" cy="80" r="2.5" fill="#c2410c" />
      <circle cx="8" cy="50" r="2.5" fill="#c2410c" />
      <circle cx="20" cy="20" r="2.5" fill="#c2410c" />

      {/* Palash Flower Petals (Flame of Forest) */}
      <path d="M 50 82 C 38 65 30 45 42 22 C 48 35 52 40 50 82 Z" fill="url(#palashGradBrand)" filter="url(#glowDropBrand)" />
      <path d="M 50 82 C 62 65 70 45 58 22 C 52 35 48 40 50 82 Z" fill="url(#palashGradBrand)" opacity="0.9" />
      <path d="M 50 82 C 44 68 40 50 50 28 C 60 50 56 68 50 82 Z" fill="#ffedd5" opacity="0.9" />
      <path d="M 50 80 C 47 62 48 48 50 36 C 52 48 53 62 50 80 Z" fill="#d84315" />

      {/* Base Calyx / Stem */}
      <path d="M 44 80 C 47 88 53 88 56 80 C 53 77 47 77 44 80 Z" fill="url(#leafGradBrand)" />

      {/* Sound / Speech Waves radiating */}
      <path d="M 68 36 A 25 25 0 0 1 76 56" fill="none" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
      <path d="M 74 30 A 35 35 0 0 1 85 58" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 32 36 A 25 25 0 0 0 24 56" fill="none" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
      <path d="M 26 30 A 35 35 0 0 0 15 58" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};
