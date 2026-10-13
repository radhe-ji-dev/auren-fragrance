import React from 'react';
import { Sparkles } from 'lucide-react';
import { BRAND_NAME } from '../config';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-24 sm:py-32 bg-[#FFFDF8] border-t border-[#ffd57a]/20 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtitle */}
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#ffd57a]" />
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#111111]/70">
            Our Heritage
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] mb-6">
          The Art of {BRAND_NAME}
        </h2>

        {/* Gold Divider (requested) */}
        <div className="w-24 h-px bg-[#ffd57a] mx-auto mb-8" />

        {/* Short brand story (2-3 lines) */}
        <p className="font-serif italic text-lg sm:text-2xl text-[#111111]/90 leading-relaxed max-w-3xl mx-auto mb-6">
          Born from a devotion to transcendent aromas, {BRAND_NAME} marries rare botanical distillations with old-world perfumery rituals.
        </p>

        <p className="text-sm sm:text-base text-[#111111]/75 font-light leading-relaxed max-w-2xl mx-auto">
          Every perfume extrait and ambient room infusion is compounded by hand in micro-batches, curated to linger gracefully and awaken memories that words cannot speak.
        </p>

        {/* Three Micro Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-10 border-t border-[#ffd57a]/20">
          <div className="p-4 border border-[#ffd57a]/20 bg-white">
            <h3 className="font-serif text-base text-[#111111] mb-1">Precious Resins</h3>
            <p className="text-xs text-[#111111]/70">Ethically sourced agarwood, ambergris accords, and rare blossoms.</p>
          </div>
          <div className="p-4 border border-[#ffd57a]/20 bg-white">
            <h3 className="font-serif text-base text-[#111111] mb-1">Macerated in Silence</h3>
            <p className="text-xs text-[#111111]/70">Aged for sixty days in dark barrels to harmonize top and base accords.</p>
          </div>
          <div className="p-4 border border-[#ffd57a]/20 bg-white">
            <h3 className="font-serif text-base text-[#111111] mb-1">Cruelty-Free</h3>
            <p className="text-xs text-[#111111]/70">Pure artisanal botanical formulas, free from phthalates and harsh parabens.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
