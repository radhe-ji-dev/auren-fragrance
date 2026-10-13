import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { FragranceImage } from './FragranceImage';

interface HeroProps {
  onSelectCategoryAndScroll: (category: 'perfume' | 'room-freshener') => void;
}

interface SlideItem {
  id: 'perfume' | 'room-freshener';
  badge: string;
  title: string;
  tagline: string;
  description: string;
  ctaText: string;
  image: string;
}

const SLIDE_INTERVAL = 5500; // ms, yahan se speed badlo

const slides: SlideItem[] = [
  {
    id: 'perfume',
    badge: 'Artisanal Extrait De Parfum',
    title: 'Luxury Perfumes',
    tagline: 'Fragrance that tells your story',
    description:
      'Handcrafted with rare Cambodian agarwood, velvety Damask rose, and golden amber crystals.',
    ctaText: 'Explore Perfumes',
    image:
      '/assets/perfume_hero.png',
  },
  {
    id: 'room-freshener',
    badge: 'Sanctuary Ambient Essences',
    title: 'Room Fresheners',
    tagline: 'Aura of Serenity For Your Space',
    description:
      'Bespoke mist formulas infused with Kyoto Hinoki cedar, toasted vanilla bean, and sun-ripened citrus.',
    ctaText: 'Explore Room Fresheners',
    image: '/assets/room_Freshener_hero.png',
  },
];

export const Hero: React.FC<HeroProps> = ({ onSelectCategoryAndScroll }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = slides.length;

  // Auto-slide timer. currentSlide dependency me hai, isliye dot click par
  // timer apne aap reset ho jata hai (click ke baad poora 5.5 sec milta hai).
  useEffect(() => {
    if (isPaused) return;
    const id = window.setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, SLIDE_INTERVAL);
    return () => window.clearTimeout(id);
  }, [currentSlide, isPaused, totalSlides]);

  return (
    <section
      id="home"
      aria-label="Fragrance Highlights Slide"
      className="relative w-full h-[65vh] sm:h-[75vh] md:h-[82vh] min-h-[480px] bg-[#FFFDF8] overflow-hidden select-none border-b border-[#ffd57a]/30"
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') setIsPaused(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') setIsPaused(false);
      }}
    >
      {/* Slides Background Container */}
      {slides.map((item, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Warm Ivory & Gold Gradients */}
            <div className="absolute inset-0">
              <FragranceImage
                src={item.image}
                alt={item.title}
                eager
                className="w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out"
              />
              {/* Luxury Tint Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF8] via-[#FFFDF8]/90 to-transparent sm:w-2/3 z-10" />
              <div className="absolute inset-0 bg-[#FFFDF8]/40 sm:bg-transparent z-10" />
            </div>

            {/* Slide Content Box */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-center">
              <div className="max-w-xl py-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#ffd57a] bg-white/95 backdrop-blur-xs shadow-2xs mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#ffd57a]" />
                  <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-medium text-[#111111]">
                    {item.badge}
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#111111] leading-[1.12] mb-3">
                  {item.title}
                </h1>

                {/* Tagline */}
                <p className="font-serif italic text-base sm:text-xl text-[#111111]/85 mb-4">
                  "{item.tagline}"
                </p>

                {/* Gold Divider */}
                <div className="w-20 h-[1.5px] bg-[#ffd57a] mb-5" />

                {/* Description */}
                <p className="text-xs sm:text-sm md:text-base text-[#111111]/80 font-light leading-relaxed mb-8 max-w-md">
                  {item.description}
                </p>

                {/* Call To Action Button */}
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onSelectCategoryAndScroll(item.id)}
                    className="px-7 py-4 bg-[#f5ce7a] hover:bg-[#B8902F] text-[#111111] font-semibold text-xs sm:text-sm tracking-widest uppercase transition-all duration-200 border border-[#ffd57a] shadow-sm hover:shadow-md active:scale-95 cursor-pointer flex items-center gap-2.5"
                  >
                    <span>{item.ctaText}</span>
                    <ArrowDown className="w-4 h-4 text-[#111111]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Bottom Switcher Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((s, index) => {
          const isActive = index === currentSlide;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 flex items-center gap-2 px-3 py-1.5 border text-[11px] font-medium tracking-wider uppercase cursor-pointer ${
                isActive
                  ? 'bg-[#ffd57a] text-[#111111] border-[#ffd57a] shadow-xs'
                  : 'bg-white/80 hover:bg-white text-[#111111]/70 border-[#ffd57a]/40'
              }`}
              aria-label={`Go to slide ${index + 1}: ${s.title}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
              <span className="hidden sm:inline">
                {s.id === 'perfume' ? 'Perfumes' : 'Room Fresheners'}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};