import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  Sparkles,
  Minus,
  Plus,
} from 'lucide-react';
import { Product, ProductSize } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { FragranceImage } from './FragranceImage';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, selectedSize: ProductSize, quantity: number) => void;
  onBuyNow: (product: Product, selectedSize: ProductSize, quantity: number) => void;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  onBack,
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const isOutOfStock = !product.inStock;

  const handleDecreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQty = () => {
    setQuantity(quantity + 1);
  };

  const handleAdd = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedSize, quantity);
  };

  const handleBuy = () => {
    if (isOutOfStock) return;
    onBuyNow(product, selectedSize, quantity);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-[#111111] hover:opacity-70 transition-opacity mb-8 cursor-pointer group py-2"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#111111]" />
          <span>Back to Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column: Large Image */}
          <div className="relative border border-[#ffd57a]/35 bg-white p-3 sm:p-6 shadow-sm">
            <div className="relative aspect-square w-full overflow-hidden bg-[#FAF7F0]">
              <FragranceImage
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {isOutOfStock && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1.5 bg-[#111111] text-white text-xs font-semibold tracking-widest uppercase border border-[#111111]">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Subtle Luxury Caption */}
            <div className="mt-4 pt-4 border-t border-[#ffd57a]/20 flex items-center justify-between text-xs text-[#111111]/70">
              <span className="uppercase tracking-widest">
                {product.category === 'perfume' ? 'Extrait De Parfum' : 'Artisanal Ambience'}
              </span>
              <span className="font-serif italic">Pure Essence Formula</span>
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col">
            {/* Category Subtitle */}
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#ffd57a]" />
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#111111]/70">
                {product.category === 'perfume' ? 'Fine Fragrance' : 'Room & Linen Freshener'}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#111111] mb-4">
              {product.name}
            </h1>

            {/* Live Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#ffd57a]/30">
              <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111]">
                {formatCurrency(selectedSize.price * quantity)}
              </span>
              {quantity > 1 && (
                <span className="text-sm text-[#111111]/60">
                  ({formatCurrency(selectedSize.price)} each)
                </span>
              )}
              {isOutOfStock ? (
                <span className="ml-auto text-xs uppercase tracking-wider font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 border border-rose-200">
                  Currently Unavailable
                </span>
              ) : (
                <span className="ml-auto text-xs uppercase tracking-wider font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                  In Stock & Ready to Dispatch
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xs uppercase tracking-widest font-semibold text-[#111111]/80 mb-2">
                Fragrance Profile
              </h2>
              <p className="text-base text-[#111111]/85 font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#111111]">
                  Bottle Volume
                </span>
                <span className="text-xs text-[#111111]/60">
                  Selected: {selectedSize.ml} ml
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size, idx) => {
                  const isSelected = selectedSizeIndex === idx;
                  return (
                    <button
                      key={size.ml}
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`px-5 py-3 text-sm font-semibold tracking-wider transition-all duration-200 cursor-pointer flex flex-col items-center min-w-[90px] ${
                        isOutOfStock
                          ? 'opacity-40 cursor-not-allowed bg-stone-100 border border-stone-200 text-[#111111]'
                          : isSelected
                          ? 'bg-[#ffd57a] text-[#111111] border border-[#ffd57a] shadow-xs'
                          : 'bg-white text-[#111111] border border-[#ffd57a]/40 hover:border-[#ffd57a]'
                      }`}
                    >
                      <span>{size.ml} ml</span>
                      <span className="text-xs font-normal opacity-85 mt-0.5">
                        {formatCurrency(size.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            {!isOutOfStock && (
              <div className="mb-8">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#111111] block mb-2.5">
                  Quantity
                </span>
                <div className="inline-flex items-center border border-[#ffd57a]/50 bg-white">
                  <button
                    type="button"
                    onClick={handleDecreaseQty}
                    disabled={quantity <= 1}
                    className="p-3 text-[#111111] hover:bg-[#ffd57a]/15 transition-colors disabled:opacity-40 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4 text-[#111111]" />
                  </button>
                  <span className="w-14 text-center font-medium text-sm text-[#111111]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncreaseQty}
                    className="p-3 text-[#111111] hover:bg-[#ffd57a]/15 transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4 text-[#111111]" />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons: Add to Cart and Buy Now / Out of Stock */}
            <div className="flex flex-col sm:flex-row gap-3.5 mb-10">
              {isOutOfStock ? (
                <button
                  type="button"
                  disabled
                  className="w-full py-4 bg-stone-200 text-[#111111]/50 border border-stone-300 font-semibold text-sm tracking-widest uppercase cursor-not-allowed text-center"
                >
                  Out of Stock
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="flex-1 py-4 px-6 bg-white hover:bg-[#F9F7F0] text-[#111111] border border-[#ffd57a] font-semibold text-sm tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#ffd57a]" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBuy}
                    className="flex-1 py-4 px-6 bg-[#ffd57a] hover:bg-[#B8902F] text-[#111111] border border-[#ffd57a] font-semibold text-sm tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-[0.99]"
                  >
                    <Zap className="w-4 h-4 text-[#111111]" />
                    <span>Buy Now</span>
                  </button>
                </>
              )}
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#ffd57a]/20 text-xs text-[#111111]/80">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#ffd57a] shrink-0" />
                <span>Express Pan-India Delivery (2-4 Days)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#ffd57a] shrink-0" />
                <span>100% Authentic Artisanal Formulation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
