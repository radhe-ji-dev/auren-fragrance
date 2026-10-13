import React, { useState, useEffect, useRef } from 'react';

interface FragranceImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  eager?: boolean;
  bgClassName?: string;
  fit?: 'cover' | 'contain';
}

export const FragranceImage: React.FC<FragranceImageProps> = ({
  src,
  alt,
  className = '',
  eager = false,
  bgClassName = 'bg-[#FBF9F2]',
  fit = 'cover',
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // src badalne par reset, lekin cached/already-loaded image ko loaded maano
  useEffect(() => {
    setError(false);
    const img = imgRef.current;
    setLoaded(!!(img && img.complete && img.naturalWidth > 0));
  }, [src]);

  if (error || !src) {
    return (
      <div
        className={`bg-[#F7F4EB] flex flex-col items-center justify-center p-6 text-center border border-[#ffd57a]/30 ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          className="w-16 h-16 text-[#ffd57a] mb-2 opacity-80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M9 3h6v3H9z" />
          <path d="M10 6v2h4V6" />
          <path d="M7 8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" />
          <path d="M12 12v5" />
          <circle cx="12" cy="14.5" r="2.5" />
        </svg>
        <span className="font-serif text-xs text-[#111111] uppercase tracking-widest">
          Auren Fragrance
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${bgClassName} ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-stone-100 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full ${
          fit === 'contain' ? 'object-contain' : 'object-cover'
        } transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};