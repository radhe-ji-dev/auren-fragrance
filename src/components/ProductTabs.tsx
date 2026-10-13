import React from 'react';

interface ProductTabsProps {
  activeTab: 'perfume' | 'room-freshener';
  onTabChange: (tab: 'perfume' | 'room-freshener') => void;
  perfumeCount?: number;
  roomFreshenerCount?: number;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({
  activeTab,
  onTabChange,
  perfumeCount,
  roomFreshenerCount,
}) => {
  return (
    <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 max-w-xl mx-auto mb-10 sm:mb-12 px-3 sm:px-4 w-full">
      {/* Perfumes Tab */}
      <button
        type="button"
        onClick={() => onTabChange('perfume')}
        className={`flex-1 py-3.5 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold tracking-wider sm:tracking-widest uppercase transition-all duration-200 cursor-pointer text-center text-[#111111] ${
          activeTab === 'perfume'
            ? 'bg-[#ffd57a] shadow-sm border border-[#ffd57a]'
            : 'bg-white hover:bg-[#F9F7F0] border border-[#ffd57a]/60 hover:border-[#ffd57a]'
        }`}
        aria-selected={activeTab === 'perfume'}
        role="tab"
      >
        <span className="whitespace-nowrap">Perfumes</span>
        {perfumeCount !== undefined && (
          <span className="ml-1 sm:ml-2 text-[11px] sm:text-xs opacity-75 font-normal">
            ({perfumeCount})
          </span>
        )}
      </button>

      {/* Room Fresheners Tab */}
      <button
        type="button"
        onClick={() => onTabChange('room-freshener')}
        className={`flex-1 py-3.5 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-semibold tracking-wider sm:tracking-widest uppercase transition-all duration-200 cursor-pointer text-center text-[#111111] ${
          activeTab === 'room-freshener'
            ? 'bg-[#ffd57a] shadow-sm border border-[#ffd57a]'
            : 'bg-white hover:bg-[#F9F7F0] border border-[#ffd57a]/60 hover:border-[#ffd57a]'
        }`}
        aria-selected={activeTab === 'room-freshener'}
        role="tab"
      >
        <span className="whitespace-nowrap">Room Fresheners</span>
        {roomFreshenerCount !== undefined && (
          <span className="ml-1 sm:ml-2 text-[11px] sm:text-xs opacity-75 font-normal">
            ({roomFreshenerCount})
          </span>
        )}
      </button>
    </div>
  );
};
