// Created by Raihan Patel
// Slovak flag-inspired logo component

import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Slovak Flag */}
      <div className="relative w-10 h-7 overflow-hidden rounded shadow-sm">
        {/* White stripe */}
        <div className="absolute top-0 w-full h-1/3 bg-white"></div>
        {/* Blue stripe */}
        <div className="absolute top-1/3 w-full h-1/3 bg-[#0b4ea2]"></div>
        {/* Red stripe */}
        <div className="absolute top-2/3 w-full h-1/3 bg-[#ee1c25]"></div>
        {/* Slovak Double Cross */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-5">
          <div className="w-full h-full bg-white"
               style={{
                 clipPath: 'polygon(40% 0, 60% 0, 60% 35%, 100% 35%, 100% 45%, 60% 45%, 60% 55%, 100% 55%, 100% 65%, 60% 65%, 60% 100%, 40% 100%, 40% 65%, 0 65%, 0 55%, 40% 55%, 40% 45%, 0 45%, 0 35%, 40% 35%)'
               }}>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-tight text-white">SVCSM</span>
        <span className="text-xs text-blue-100">Slovenské Centrum</span>
      </div>
    </div>
  );
};

export default Logo;