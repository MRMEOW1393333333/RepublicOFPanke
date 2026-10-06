import React from 'react';

interface RepublicLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  spinSpeed?: 0 | 1 | 2 | 3;
  showText?: boolean;
  subtext?: string;
}

export const RepublicLogo: React.FC<RepublicLogoProps> = ({
  className = '',
  size = 'md',
  spinSpeed = 1,
  showText = false,
  subtext = 'REPUBLIC OF PANKE',
}) => {
  const sizeMap = {
    sm: 'w-9 h-9',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
    '2xl': 'w-48 h-48',
  };

  const spinClass =
    spinSpeed === 0
      ? ''
      : spinSpeed === 1
      ? 'animate-spin-slow'
      : spinSpeed === 2
      ? 'animate-spin-normal'
      : 'animate-spin-fast';

  return (
    <div className={`relative inline-flex items-center gap-3.5 ${className}`}>
      <div className={`relative shrink-0 ${sizeMap[size]}`}>
        {/* Glow halo */}
        <div className="absolute inset-0 rounded-full bg-amber-500/25 blur-md pointer-events-none" />

        {/* Circular Gold Seal Container with Exact Image */}
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-amber-400 shadow-[0_4px_16px_rgba(245,158,11,0.4)] relative z-10 bg-stone-950 flex items-center justify-center">
          <img
            src="/official_logo.jpg"
            alt="نشان رسمی جمهوری پنکه"
            className="w-full h-full object-cover select-none"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/republic_of_panke_logo.svg';
            }}
          />

          {/* Dynamic Spinning Rotor Accent in the center */}
          {spinSpeed > 0 && (
            <div
              className={`absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 mix-blend-screen ${spinClass}`}
            >
              <svg viewBox="0 0 50 50" className="w-[45%] h-[45%] drop-shadow">
                <g transform="translate(25, 25)">
                  <circle cx="0" cy="0" r="4" fill="#fbbf24" />
                  <path d="M 0,-3 C 5,-12 12,-16 18,-15 C 22,-10 18,-3 12,-1 Z" fill="#fde047" />
                  <g transform="rotate(120)">
                    <path d="M 0,-3 C 5,-12 12,-16 18,-15 C 22,-10 18,-3 12,-1 Z" fill="#fde047" />
                  </g>
                  <g transform="rotate(240)">
                    <path d="M 0,-3 C 5,-12 12,-16 18,-15 C 22,-10 18,-3 12,-1 Z" fill="#fde047" />
                  </g>
                </g>
              </svg>
            </div>
          )}
        </div>
      </div>

      {showText && (
        <div className="flex flex-col text-right">
          <span className="font-lalezar text-stone-100 text-xl sm:text-2xl leading-none tracking-normal drop-shadow">
            جمهوری پنکه
          </span>
          <span className="text-[10px] text-amber-400 font-bold tracking-widest font-mono uppercase mt-1">
            {subtext}
          </span>
        </div>
      )}
    </div>
  );
};
