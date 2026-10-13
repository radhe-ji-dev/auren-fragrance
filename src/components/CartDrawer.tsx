import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, AlertCircle } from 'lucide-react';
import { CartItem, Coupon } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { FragranceImage } from './FragranceImage';
import { WHATSAPP_NUMBER } from '../config';
import couponsDataRaw from '../data/coupons.json';

const coupons: Coupon[] = couponsDataRaw as Coupon[];

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onExplore,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [hasInteractedWithName, setHasInteractedWithName] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponFeedback, setCouponFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const drawerRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Esc key listener for keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Calculate subtotal
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate discount based on applied coupon and subtotal
  let discountAmount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.minOrder && subtotal < appliedCoupon.minOrder) {
      discountAmount = 0;
    } else if (appliedCoupon.type === 'percentage') {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'fixed') {
      discountAmount = Math.min(appliedCoupon.value, subtotal);
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);
  const isCartEmpty = items.length === 0;
  const isNameValid = customerName.trim().length > 0;
  const canOrderOnWhatsApp = !isCartEmpty && isNameValid;

  // Coupon application handler
  const handleApplyCoupon = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanCode = couponInput.trim().toUpperCase();

    if (!cleanCode) {
      setCouponFeedback({
        type: 'error',
        text: 'Please enter a coupon code.',
      });
      return;
    }

    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode);

    if (!found) {
      const publicCodes = coupons
        .filter((c) => c.isVisible)
        .map((c) => c.code)
        .join(', ');
      setCouponFeedback({
        type: 'error',
        text: `Invalid coupon code. Available offers: ${publicCodes}`,
      });
      return;
    }

    if (found.minOrder && subtotal < found.minOrder) {
      setCouponFeedback({
        type: 'error',
        text: `Minimum order of ${formatCurrency(found.minOrder)} required for code ${found.code}.`,
      });
      return;
    }

    setAppliedCoupon(found);
    setCouponInput('');
    const discountLabel =
      found.type === 'percentage'
        ? `${found.value}% off`
        : `${formatCurrency(found.value)} off`;

    setCouponFeedback({
      type: 'success',
      text: found.isVisible
        ? `Coupon "${found.code}" applied: ${discountLabel}!`
        : `Exclusive VIP Secret Privilege "${found.code}" unlocked: ${discountLabel}!`,
    });
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponFeedback(null);
  };

  // WhatsApp order message formatting
  const trimmedName = customerName.trim();
  const itemLines = items.map((item) => {
    const lineTotal = item.price * item.quantity;
    return `${item.name} (${item.ml} ml) x ${item.quantity} = ${formatCurrency(lineTotal)}`;
  });

  const messageLines: string[] = [
    `Hi, I am ${trimmedName}. I want to order:`,
    ...itemLines,
  ];

  if (appliedCoupon && discountAmount > 0) {
    messageLines.push(`Subtotal: ${formatCurrency(subtotal)}`);
    messageLines.push(
      `Coupon Applied: ${appliedCoupon.code} (-${formatCurrency(discountAmount)})`
    );
    messageLines.push(`Final Bill: ${formatCurrency(finalTotal)}`);
  } else {
    messageLines.push(`Total: ${formatCurrency(subtotal)}`);
  }

  const whatsappMessage = messageLines.join('\n');
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Your Shopping Bag"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          ref={drawerRef}
          className="w-screen max-w-md bg-[#FFFDF8] border-l border-[#ffd57a]/40 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#ffd57a]/30 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#ffd57a]" />
              <h2 className="font-serif text-xl font-medium text-[#111111]">
                Your Shopping Bag
              </h2>
              <span className="text-xs text-[#111111]/60 font-sans">
                ({items.reduce((acc, item) => acc + item.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#111111] hover:bg-[#ffd57a]/15 border border-[#ffd57a]/30 transition-colors cursor-pointer"
              aria-label="Close Shopping Bag"
            >
              <X className="w-5 h-5 text-[#111111]" />
            </button>
          </div>

          {/* Cart Item List or Empty State */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {isCartEmpty ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full border border-[#ffd57a]/40 flex items-center justify-center mb-4 bg-white">
                  <ShoppingBag className="w-8 h-8 text-[#ffd57a]" />
                </div>
                <h3 className="font-serif text-lg text-[#111111] mb-2">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#111111]/70 max-w-xs mb-6">
                  Discover our curated extrait de parfum and serene room essence collection.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExplore();
                  }}
                  className="px-6 py-3 bg-[#ffd57a] hover:bg-[#B8902F] text-[#111111] text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer border border-[#ffd57a]"
                >
                  Explore Fragrances
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-[#ffd57a]/20">
                {items.map((item) => {
                  const lineTotal = item.price * item.quantity;
                  return (
                    <li
                      key={item.id}
                      className="py-4 flex gap-4 items-center justify-between"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-16 h-16 shrink-0 border border-[#ffd57a]/30 overflow-hidden bg-white">
                        <FragranceImage
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0 pr-2">
                        <h4 className="font-serif text-sm font-medium text-[#111111] truncate">
                          {item.name}
                        </h4>
                        <div className="text-xs text-[#111111]/70 mt-0.5">
                          Size: {item.ml} ml
                        </div>
                        <div className="text-xs font-semibold text-[#111111] mt-1">
                          {formatCurrency(item.price)} each
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-1.5 mt-2">
                          <div className="inline-flex items-center border border-[#ffd57a]/40 bg-white">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 hover:bg-[#ffd57a]/15 text-[#111111] cursor-pointer"
                              aria-label={`Decrease ${item.name} quantity`}
                            >
                              <Minus className="w-3 h-3 text-[#111111]" />
                            </button>
                            <span className="w-8 text-center text-xs font-medium text-[#111111]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 hover:bg-[#ffd57a]/15 text-[#111111] cursor-pointer"
                              aria-label={`Increase ${item.name} quantity`}
                            >
                              <Plus className="w-3 h-3 text-[#111111]" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Line Price & Remove */}
                      <div className="flex flex-col items-end justify-between h-full py-1">
                        <span className="font-serif text-sm font-semibold text-[#111111]">
                          {formatCurrency(lineTotal)}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#111111]/50 hover:text-rose-700 transition-colors p-1 cursor-pointer mt-3"
                          aria-label={`Remove ${item.name} ${item.ml}ml from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Drawer Footer with Checkout & Coupon Controls */}
          {!isCartEmpty && (
            <div className="p-6 border-t border-[#ffd57a]/30 bg-white space-y-4 max-h-[55vh] overflow-y-auto">
              {/* Mandatory Customer Name Input */}
              <div className="space-y-1">
                <label
                  htmlFor="customerName"
                  className="block text-xs uppercase tracking-wider font-semibold text-[#111111]"
                >
                  Your Name <span className="text-rose-600">*</span>
                </label>
                <input
                  ref={nameInputRef}
                  id="customerName"
                  type="text"
                  placeholder="e.g. Aarav Sharma"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (!hasInteractedWithName) setHasInteractedWithName(true);
                  }}
                  onBlur={() => setHasInteractedWithName(true)}
                  className="w-full px-3.5 py-2 text-sm bg-[#FFFDF8] border border-[#ffd57a]/50 focus:border-[#ffd57a] focus:outline-hidden text-[#111111] placeholder:text-stone-400"
                />
                {!isNameValid && hasInteractedWithName && (
                  <p className="text-[11px] text-rose-600 font-medium">
                    Please enter your name to continue
                  </p>
                )}
              </div>

              {/* Apply Coupon Section (Directly after name) */}
              <div className="pt-2 border-t border-[#ffd57a]/15 space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="couponCode"
                    className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#111111]"
                  >
                    <Tag className="w-3.5 h-3.5 text-[#ffd57a]" />
                    <span>Apply Coupon</span>
                  </label>
                  {appliedCoupon && (
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-[11px] text-rose-700 hover:underline cursor-pointer"
                    >
                      Remove Coupon
                    </button>
                  )}
                </div>

                {/* Coupon Input + Apply Button */}
                <form
                  onSubmit={handleApplyCoupon}
                  className="flex items-center gap-2"
                >
                  <input
                    id="couponCode"
                    type="text"
                    placeholder="Enter Coupon Code (e.g. AUREN10)"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value.toUpperCase());
                      if (couponFeedback) setCouponFeedback(null);
                    }}
                    className="flex-1 px-3.5 py-2 text-xs uppercase tracking-wider bg-[#FFFDF8] border border-[#ffd57a]/50 focus:border-[#ffd57a] focus:outline-hidden text-[#111111] placeholder:normal-case placeholder:text-stone-400 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#ffd57a] hover:bg-[#B8902F] text-[#111111] text-xs font-semibold tracking-wider uppercase border border-[#ffd57a] transition-colors cursor-pointer shrink-0 shadow-2xs"
                  >
                    Apply
                  </button>
                </form>

                {/* Coupon Feedback Message */}
                {couponFeedback && (
                  <div
                    className={`flex items-center gap-1.5 text-[11px] p-2 border ${
                      couponFeedback.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {couponFeedback.type === 'success' ? (
                      <Check className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                    )}
                    <span>{couponFeedback.text}</span>
                  </div>
                )}

                {/* Available Public Coupon Quick Chips (Only isVisible: true) */}
                {!appliedCoupon && (
                  <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[10px]">
                    <span className="text-[#111111]/60">Available Offers:</span>
                    {coupons
                      .filter((c) => c.isVisible)
                      .map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setCouponInput(c.code);
                            setAppliedCoupon(c);
                            const discountLabel =
                              c.type === 'percentage'
                                ? `${c.value}% off`
                                : `${formatCurrency(c.value)} off`;
                            setCouponFeedback({
                              type: 'success',
                              text: `Coupon "${c.code}" applied: ${discountLabel}!`,
                            });
                          }}
                          className="px-2 py-0.5 border border-[#ffd57a]/40 hover:border-[#ffd57a] bg-[#FFFDF8] text-[#111111] cursor-pointer tracking-wider font-mono hover:bg-[#ffd57a]/10 transition-colors"
                        >
                          {c.code} ({c.type === 'percentage' ? `${c.value}%` : `₹${c.value}`})
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-[#ffd57a]/20 space-y-1.5">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-xs text-[#111111]/80">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#111111]">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                {/* Applied Discount */}
                {appliedCoupon && discountAmount > 0 && (
                  <div className="flex items-center justify-between text-xs text-emerald-800 font-medium">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      <span>
                        {appliedCoupon.isVisible ? 'Coupon Discount' : 'Secret VIP Privilege'} ({appliedCoupon.code})
                      </span>
                    </span>
                    <span>- {formatCurrency(discountAmount)}</span>
                  </div>
                )}

                {/* Shipping notice */}
                <div className="flex items-center justify-between text-[11px] text-[#111111]/70">
                  <span>Pan-India Delivery</span>
                  <span className="text-emerald-800 font-medium">Complimentary</span>
                </div>

                {/* Final Total / Final Bill */}
                <div className="flex items-baseline justify-between pt-2 border-t border-[#ffd57a]/20">
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#111111]">
                    {appliedCoupon && discountAmount > 0 ? 'Final Bill' : 'Total'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    {appliedCoupon && discountAmount > 0 && (
                      <span className="text-xs text-[#111111]/50 line-through">
                        {formatCurrency(subtotal)}
                      </span>
                    )}
                    <span className="font-serif text-2xl font-bold text-[#111111]">
                      {formatCurrency(finalTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Checkout Button */}
              {canOrderOnWhatsApp ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 text-sm font-semibold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2.5 bg-[#ffd57a] hover:bg-[#B8902F] text-[#111111] cursor-pointer shadow-sm active:scale-[0.99] border border-[#ffd57a]"
                  aria-label="Order on WhatsApp"
                >
                  <svg
                    className="w-4 h-4 fill-current text-[#111111]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.301-.15-1.783-.878-2.06-.978-.276-.1-.477-.15-.678.15-.202.3-.78 .978-.956 1.18-.176.2-.352.226-.653.076-.301-.15-1.272-.469-2.424-1.496-.896-.799-1.5-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.151-.176.201-.3.301-.502.101-.2.051-.376-.025-.527-.076-.15-.678-1.635-.93-2.24-.246-.589-.496-.51-.678-.518-.176-.008-.377-.01-.578-.01-.2 0-.527.075-.804.376-.276.3-1.054 1.03-1.054 2.511s1.08 2.91 1.231 3.111c.151.2 2.125 3.245 5.15 4.551.72.311 1.282.497 1.72.636.724.23 1.382.197 1.902.12.58-.087 1.783-.728 2.034-1.431.251-.703.251-1.306.176-1.431-.075-.125-.276-.201-.577-.351zM12.04 2c-5.523 0-10 4.477-10 10 0 1.767.458 3.428 1.258 4.872L2 22l5.282-1.252A9.957 9.957 0 0 0 12.04 22c5.523 0 10-4.477 10-10s-4.477-10-10-10z" />
                  </svg>
                  <span>Order on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 text-[#111111]" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full py-4 px-6 text-sm font-semibold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2.5 bg-stone-200 text-[#111111]/40 border border-stone-300 cursor-not-allowed"
                  aria-label="Order on WhatsApp"
                >
                  <svg
                    className="w-4 h-4 fill-current text-[#111111]/40"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.301-.15-1.783-.878-2.06-.978-.276-.1-.477-.15-.678.15-.202.3-.78 .978-.956 1.18-.176.2-.352.226-.653.076-.301-.15-1.272-.469-2.424-1.496-.896-.799-1.5-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.151-.176.201-.3.301-.502.101-.2.051-.376-.025-.527-.076-.15-.678-1.635-.93-2.24-.246-.589-.496-.51-.678-.518-.176-.008-.377-.01-.578-.01-.2 0-.527.075-.804.376-.276.3-1.054 1.03-1.054 2.511s1.08 2.91 1.231 3.111c.151.2 2.125 3.245 5.15 4.551.72.311 1.282.497 1.72.636.724.23 1.382.197 1.902.12.58-.087 1.783-.728 2.034-1.431.251-.703.251-1.306.176-1.431-.075-.125-.276-.201-.577-.351zM12.04 2c-5.523 0-10 4.477-10 10 0 1.767.458 3.428 1.258 4.872L2 22l5.282-1.252A9.957 9.957 0 0 0 12.04 22c5.523 0 10-4.477 10-10s-4.477-10-10-10z" />
                  </svg>
                  <span>Order on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 text-[#111111]/40" />
                </button>
              )}

              <p className="text-[10px] text-center text-[#111111]/60">
                You will be connected directly with our concierge team to confirm address and delivery.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
