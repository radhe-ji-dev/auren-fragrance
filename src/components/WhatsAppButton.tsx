import React from 'react';
import { WHATSAPP_NUMBER } from '../config';

export const WhatsAppButton: React.FC = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hello Auren Fragrance, I would like to inquire about your collections.'
  )}`;

  return (
    <aside aria-label="Direct customer assistance">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#ffd57a] hover:bg-[#B8902F] text-[#111111] border border-[#ffd57a] p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group active:scale-95"
        aria-label="Chat with Auren Fragrance on WhatsApp"
      >
        {/* WhatsApp Icon */}
        <svg
          className="w-6 h-6 fill-current text-[#111111]"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.301-.15-1.783-.878-2.06-.978-.276-.1-.477-.15-.678.15-.202.3-.78 .978-.956 1.18-.176.2-.352.226-.653.076-.301-.15-1.272-.469-2.424-1.496-.896-.799-1.5-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.151-.176.201-.3.301-.502.101-.2.051-.376-.025-.527-.076-.15-.678-1.635-.93-2.24-.246-.589-.496-.51-.678-.518-.176-.008-.377-.01-.578-.01-.2 0-.527.075-.804.376-.276.3-1.054 1.03-1.054 2.511s1.08 2.91 1.231 3.111c.151.2 2.125 3.245 5.15 4.551.72.311 1.282.497 1.72.636.724.23 1.382.197 1.902.12.58-.087 1.783-.728 2.034-1.431.251-.703.251-1.306.176-1.431-.075-.125-.276-.201-.577-.351zM12.04 2c-5.523 0-10 4.477-10 10 0 1.767.458 3.428 1.258 4.872L2 22l5.282-1.252A9.957 9.957 0 0 0 12.04 22c5.523 0 10-4.477 10-10s-4.477-10-10-10z" />
        </svg>

        {/* Hover pill badge label */}
        <span className="hidden sm:inline-block max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold uppercase tracking-wider pl-0 group-hover:pl-2 text-[#111111]">
          Chat With Us
        </span>
      </a>
    </aside>
  );
};
