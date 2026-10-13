import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';
import { BRAND_NAME, INSTAGRAM_URL, WHATSAPP_NUMBER } from '../config';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hello Auren Fragrance, I would like to inquire about your collections.'
  )}`;

  return (
    <footer className="bg-[#FFFDF8] border-t border-[#ffd57a]/30 pt-16 pb-12 text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#ffd57a]/20">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-[#ffd57a] flex items-center justify-center font-serif text-sm font-bold bg-white">
                A
              </div>
              <span className="font-serif text-xl tracking-wider uppercase font-semibold text-[#111111]">
                {BRAND_NAME}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#111111]/70 max-w-md font-light leading-relaxed">
              Crafting timeless extrait de parfum and serene room ambience sprays with authentic artisanal ingredients. Each bottle is an ode to understated luxury.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-[#ffd57a]/40 hover:border-[#ffd57a] hover:bg-[#ffd57a]/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-[#ffd57a]" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-[#ffd57a]/40 hover:border-[#ffd57a] hover:bg-[#ffd57a]/10 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-[#ffd57a]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#111111]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#111111]/75">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:underline transition-all cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:underline transition-all cursor-pointer"
                >
                  Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:underline transition-all cursor-pointer"
                >
                  About Brand
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:underline transition-all cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care / Social Media */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#111111]">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-[#111111]/75">
              <li>Pan-India Secured Shipping</li>
              <li>Complimentary Scent Strips</li>
              <li>Hand-poured Small Batches</li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                  <span className="text-[10px] text-[#ffd57a]">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#111111]/70">
          <p>© {currentYear} {BRAND_NAME}. All rights reserved.</p>
          <p className="tracking-widest uppercase text-[10px]">
            Designed with Timeless Elegance
          </p>
        </div>
      </div>
    </footer>
  );
};
