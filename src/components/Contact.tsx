import React from 'react';
import { MessageCircle, Instagram, Clock, MapPin } from 'lucide-react';
import {
  WHATSAPP_NUMBER,
  INSTAGRAM_URL,
  BRAND_NAME,
  BRAND_LOCATION,
} from '../config';

export const Contact: React.FC = () => {
  // Format WhatsApp number visually (e.g. +91 78787 41031)
  const formattedPhone = `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2, 7)} ${WHATSAPP_NUMBER.slice(7)}`;
  const whatsappChatUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hello Auren Fragrance, I would like to inquire about your collections.'
  )}`;

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-white border-t border-[#ffd57a]/30"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#111111]/70 block mb-2">
            Private Concierge
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#111111] mb-4">
            Connect With Us
          </h2>
          <div className="w-16 h-px bg-[#ffd57a] mx-auto mb-6" />
          <p className="text-sm text-[#111111]/75 font-light leading-relaxed">
            Whether inquiring about personalized olfactory consultations, custom corporate gifts, or direct orders, our fragrance atelier concierge is pleased to assist you.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* WhatsApp Direct Line */}
          <a
            href={whatsappChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 border border-[#ffd57a]/40 bg-[#FFFDF8] hover:border-[#ffd57a] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 border border-[#ffd57a] bg-white flex items-center justify-center mb-6 group-hover:bg-[#ffd57a]/10 transition-colors">
                <MessageCircle className="w-6 h-6 text-[#ffd57a]" />
              </div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#111111]/70 block mb-1">
                WhatsApp Order Desk
              </span>
              <p className="font-serif text-2xl font-semibold text-[#111111] mb-2">
                {formattedPhone}
              </p>
              <p className="text-xs text-[#111111]/70 leading-relaxed">
                Click to start an instant private chat. Place direct orders or request scent recommendations.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#ffd57a]/20 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#111111] group-hover:underline">
              <span>Chat on WhatsApp</span>
              <span aria-hidden="true">→</span>
            </div>
          </a>

          {/* Instagram Follow */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 border border-[#ffd57a]/40 bg-[#FFFDF8] hover:border-[#ffd57a] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 border border-[#ffd57a] bg-white flex items-center justify-center mb-6 group-hover:bg-[#ffd57a]/10 transition-colors">
                <Instagram className="w-6 h-6 text-[#ffd57a]" />
              </div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#111111]/70 block mb-1">
                Visual Stories
              </span>
              <p className="font-serif text-2xl font-semibold text-[#111111] mb-2">
                @aurenfragrance
              </p>
              <p className="text-xs text-[#111111]/70 leading-relaxed">
                Explore our olfactory journeys, behind-the-scenes distillation stills, and release previews.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#ffd57a]/20 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#111111] group-hover:underline">
              <span>Visit Instagram</span>
              <span aria-hidden="true">→</span>
            </div>
          </a>
        </div>

        {/* Operating Hours and Location */}
        <div className="mt-12 pt-8 border-t border-[#ffd57a]/20 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#111111]/75">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#ffd57a]" />
            <span>Concierge Hours: Mon – Sat, 10:00 AM – 8:00 PM IST</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#ffd57a]" />
            <span>{BRAND_LOCATION}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
