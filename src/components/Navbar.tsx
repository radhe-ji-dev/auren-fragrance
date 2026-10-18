import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import logoImg from '/public/assets/logo.png';
import { BRAND_NAME } from '../config';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategoryAndScroll: (category: 'perfume' | 'room-freshener') => void;
  onNavigateSection: (sectionId: string) => void;
  activeCategory: 'perfume' | 'room-freshener';
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onSelectCategoryAndScroll,
  onNavigateSection,
  activeCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCategoryClick = (category: 'perfume' | 'room-freshener') => {
    onSelectCategoryAndScroll(category);
    setMobileMenuOpen(false);
  };

  const handleSectionClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-[#ffd57a]/30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand on Left */}
          <button
            onClick={() => handleSectionClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
            aria-label={`${BRAND_NAME} - Home`}
          >
            <div className="w-10 h-10 border border-[#ffd57a] p-1 flex items-center justify-center bg-white shadow-xs group-hover:border-[#B8902F] transition-colors">
              <img
                src={logoImg}
                alt=""
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                }}
              />
              <span className="font-serif font-bold text-lg text-[#111111] leading-none select-none">
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wider text-[#111111] uppercase">
                {BRAND_NAME}
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#111111]/70 font-sans -mt-0.5">
                Haute Parfumerie
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            <button
              onClick={() => handleSectionClick('home')}
              className="text-xs font-semibold tracking-widest uppercase text-[#111111]/75 hover:text-[#111111] transition-colors cursor-pointer py-1"
            >
              Home
            </button>
            <button
              onClick={() => handleCategoryClick('perfume')}
              className={`text-xs font-semibold tracking-widest uppercase transition-all cursor-pointer relative py-1 ${
                activeCategory === 'perfume'
                  ? 'text-[#111111] after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#ffd57a]'
                  : 'text-[#111111]/75 hover:text-[#111111] after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#ffd57a] after:transition-all'
              }`}
            >
              Perfumes
            </button>
            <button
              onClick={() => handleCategoryClick('room-freshener')}
              className={`text-xs font-semibold tracking-widest uppercase transition-all cursor-pointer relative py-1 ${
                activeCategory === 'room-freshener'
                  ? 'text-[#111111] after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#ffd57a]'
                  : 'text-[#111111]/75 hover:text-[#111111] after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#ffd57a] after:transition-all'
              }`}
            >
              Room Fresheners
            </button>
            <button
              onClick={() => handleSectionClick('about')}
              className="text-xs font-semibold tracking-widest uppercase text-[#111111]/75 hover:text-[#111111] transition-colors cursor-pointer py-1"
            >
              About
            </button>
            <button
              onClick={() => handleSectionClick('contact')}
              className="text-xs font-semibold tracking-widest uppercase text-[#111111]/75 hover:text-[#111111] transition-colors cursor-pointer py-1"
            >
              Contact Us
            </button>
          </nav>

          {/* Right actions: Cart & Mobile toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-[#111111] border border-[#ffd57a]/40 hover:border-[#ffd57a] hover:bg-[#ffd57a]/10 transition-colors cursor-pointer"
              aria-label={`Shopping Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5 text-[#ffd57a]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#ffd57a] text-[#111111] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#111111] border border-[#ffd57a]/40 hover:border-[#ffd57a] cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#111111]" />
              ) : (
                <Menu className="w-6 h-6 text-[#111111]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#ffd57a]/30 py-5 bg-[#FFFDF8] animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-3 px-2">
              <button
                onClick={() => handleSectionClick('home')}
                className="text-left text-sm font-semibold tracking-wider uppercase text-[#111111] py-2 border-b border-[#ffd57a]/15 cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => handleCategoryClick('perfume')}
                className="text-left text-sm font-semibold tracking-wider uppercase text-[#111111] py-2 border-b border-[#ffd57a]/15 cursor-pointer"
              >
                Perfumes
              </button>
              <button
                onClick={() => handleCategoryClick('room-freshener')}
                className="text-left text-sm font-semibold tracking-wider uppercase text-[#111111] py-2 border-b border-[#ffd57a]/15 cursor-pointer"
              >
                Room Fresheners
              </button>
              <button
                onClick={() => handleSectionClick('about')}
                className="text-left text-sm font-semibold tracking-wider uppercase text-[#111111] py-2 border-b border-[#ffd57a]/15 cursor-pointer"
              >
                About
              </button>
              <button
                onClick={() => handleSectionClick('contact')}
                className="text-left text-sm font-semibold tracking-wider uppercase text-[#111111] py-2 cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
