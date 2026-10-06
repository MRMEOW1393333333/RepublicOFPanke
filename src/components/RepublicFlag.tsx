import React from 'react';

interface RepublicFlagProps {
  className?: string;
  spinSpeed?: 0 | 1 | 2 | 3;
  showShadow?: boolean;
}

export const RepublicFlag: React.FC<RepublicFlagProps> = ({
  className = '',
  spinSpeed = 1,
  showShadow = true,
}) => {
  const spinClass =
    spinSpeed === 0
      ? ''
      : spinSpeed === 1
      ? 'animate-spin-slow'
      : spinSpeed === 2
      ? 'animate-spin-normal'
      : 'animate-spin-fast';

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-2 border-amber-500/40 bg-stone-950 ${
        showShadow ? 'shadow-[0_16px_50px_rgba(0,0,0,0.7)]' : ''
      } ${className}`}
    >
      {/* Exact Official Republic of Panke Flag Image */}
      <img
        src="/official_flag.jpg"
        alt="پرچم رسمی جمهوری پنکه"
        className="w-full h-full object-cover select-none"
        onError={(e) => {
          // Fallback to SVG if image fails
          (e.target as HTMLImageElement).src = '/republic_of_panke_flag.svg';
        }}
      />

      {/* Interactive spinning blades overlay centered on the fan hub */}
      {spinSpeed > 0 && (
        <div
          className={`absolute top-[40%] left-[40%] w-[20%] h-[20%] ${spinClass} origin-center pointer-events-none opacity-80 mix-blend-screen flex items-center justify-center`}
        >
          <svg viewBox="0 0 50 50" className="w-full h-full drop-shadow">
            <g transform="translate(25, 25)">
              <circle cx="0" cy="0" r="4.5" fill="#f59e0b" />
              <path d="M 0,-4 C 5,-13 13,-18 21,-17 C 25,-12 21,-4 14,-1 Z" fill="#fbbf24" opacity="0.9" />
              <g transform="rotate(120)">
                <path d="M 0,-4 C 5,-13 13,-18 21,-17 C 25,-12 21,-4 14,-1 Z" fill="#fbbf24" opacity="0.9" />
              </g>
              <g transform="rotate(240)">
                <path d="M 0,-4 C 5,-13 13,-18 21,-17 C 25,-12 21,-4 14,-1 Z" fill="#fbbf24" opacity="0.9" />
              </g>
            </g>
          </svg>
        </div>
      )}

      {/* Elegant satin fabric gloss overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
    </div>
  );
};
