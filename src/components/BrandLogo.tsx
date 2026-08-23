import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  theme = 'light',
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const isLight = theme === 'light';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Emblem */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl blur-[5px] opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
        <div className={`relative w-full h-full rounded-xl flex items-center justify-center shadow-md overflow-hidden ${
          isLight ? 'bg-gradient-to-br from-slate-900 via-[#0B132B] to-[#042F2E] border border-teal-500/30' : 'bg-[#090E17] border border-teal-500/40 shadow-cyan-950/60'
        }`}>
          {/* Subtle brand gradient background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 via-transparent to-cyan-400/20" />
          
          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[78%] h-[78%] relative z-10"
          >
            {/* Bold Modern S geometric emblem */}
            <path
              d="M26 9.5H13C10.5147 9.5 8.5 11.5147 8.5 14V14.5C8.5 16.9853 10.5147 19 13 19H23C25.4853 19 27.5 21.0147 27.5 23.5V24C27.5 26.4853 25.4853 28.5 23 28.5H10"
              stroke="url(#sirin-logo-grad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Accent nodes */}
            <circle cx="26" cy="9.5" r="2.2" fill="#38BDF8" />
            <circle cx="10" cy="28.5" r="2.2" fill="#14B8A6" />
            <defs>
              <linearGradient id="sirin-logo-grad" x1="8.5" y1="9.5" x2="27.5" y2="28.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38BDF8" />
                <stop offset="0.55" stopColor="#14B8A6" />
                <stop offset="1" stopColor="#0EA5E9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="flex flex-col text-left">
        <div className="flex items-center tracking-tight">
          <span className={`font-black ${textSizes[size]} tracking-wider uppercase font-['Plus_Jakarta_Sans'] leading-none ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            SIRIN<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-500">BUILDS</span>
          </span>
        </div>
        {showTagline && (
          <span className="text-[9px] font-semibold tracking-[0.2em] text-teal-700 uppercase mt-0.5">
            Building Digital Success
          </span>
        )}
      </div>
    </div>
  );
};
