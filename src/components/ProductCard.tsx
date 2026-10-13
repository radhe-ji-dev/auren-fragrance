import React, { useState } from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product, ProductSize } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { FragranceImage } from './FragranceImage';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedSize: ProductSize) => void;
  onSelectProduct: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onSelectProduct,
}) => {
  // Default to the first available size
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const isOutOfStock = !product.inStock;

  const handleCardClick = () => {
    onSelectProduct(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    onAddToCart(product, selectedSize);
  };

  return (
    <article className="group bg-white border border-[#ffd57a]/35 hover:border-[#ffd57a] transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md relative overflow-hidden">
      {/* Out of Stock or Category indicator */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {isOutOfStock ? (
          <span className="px-2.5 py-1 bg-[#111111] text-white text-[10px] font-semibold tracking-widest uppercase border border-[#111111]">
            Out of Stock
          </span>
        ) : (
          <span className="px-2 py-0.5 bg-white/90 backdrop-blur-xs text-[#111111] text-[10px] font-medium tracking-wider uppercase border border-[#ffd57a]/30">
            {product.category === 'perfume' ? 'Parfum' : 'Home Essence'}
          </span>
        )}
      </div>

      {/* Product Image (clickable) */}
      <div
        onClick={handleCardClick}
        className="relative aspect-square w-full cursor-pointer overflow-hidden bg-white"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        aria-label={`View details for ${product.name}`}
      >
        <FragranceImage
          src={product.image}
          alt={product.name}
          bgClassName="bg-white"
          fit="contain"
          className="w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="bg-white/95 px-3 py-1.5 border border-[#ffd57a] shadow-xs flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[#111111]" />
            <span className="text-xs font-medium tracking-wider uppercase text-[#111111]">
              View Details
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Title (clickable) */}
          <h3
            onClick={handleCardClick}
            className="font-serif text-lg sm:text-xl font-normal text-[#111111] hover:opacity-75 transition-opacity cursor-pointer mb-2 line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#111111]/75 font-light line-clamp-2 mb-4 leading-relaxed min-h-[2.5rem]">
            {product.description}
          </p>
        </div>

        <div>
          {/* Size Selector */}
          <div className="mb-4">
            <span className="text-[10px] uppercase tracking-wider text-[#111111]/60 block mb-1.5 font-medium">
              Select Size
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((size, idx) => {
                const isSelected = selectedSizeIndex === idx;
                return (
                  <button
                    key={size.ml}
                    type="button"
                    disabled={isOutOfStock}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSizeIndex(idx);
                    }}
                    className={`px-2.5 py-1 text-xs font-medium transition-all duration-150 cursor-pointer ${
                      isOutOfStock
                        ? 'opacity-40 cursor-not-allowed bg-stone-100 border border-stone-200 text-[#111111]'
                        : isSelected
                        ? 'bg-[#ffd57a] text-[#111111] font-semibold border border-[#ffd57a] shadow-2xs'
                        : 'bg-white text-[#111111] border border-[#ffd57a]/40 hover:border-[#ffd57a]'
                    }`}
                    aria-label={`${size.ml} ml`}
                  >
                    {size.ml} ml
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price & Add to Cart button */}
          <div className="pt-3 border-t border-[#ffd57a]/20 flex items-center justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[#111111]/60">
                Price
              </span>
              <span className="font-serif text-lg sm:text-xl font-semibold text-[#111111]">
                {formatCurrency(selectedSize.price)}
              </span>
            </div>

            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className={`px-3.5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 ${
                isOutOfStock
                  ? 'bg-stone-200 text-[#111111]/50 cursor-not-allowed border border-stone-300'
                  : 'bg-[#ffd57a] hover:bg-[#B8902F] text-[#111111] cursor-pointer border border-[#ffd57a] shadow-2xs active:scale-95'
              }`}
              aria-label={
                isOutOfStock
                  ? 'Out of stock'
                  : `Add ${product.name} ${selectedSize.ml}ml to cart`
              }
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#111111]" />
              <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};