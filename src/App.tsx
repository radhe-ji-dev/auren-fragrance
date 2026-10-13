import React, { useState, useEffect, useMemo } from 'react';
import productsDataRaw from './data/products.json';
import { Product, ProductSize, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductTabs } from './components/ProductTabs';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { CartDrawer } from './components/CartDrawer';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BRAND_NAME } from './config';

const CART_STORAGE_KEY = 'auren_fragrance_cart';
const products: Product[] = productsDataRaw as Product[];

export default function App() {
  // Category tab state ('perfume' or 'room-freshener')
  const [activeCategory, setActiveCategory] = useState<'perfume' | 'room-freshener'>('perfume');

  // Client-side Hash Route state
  const [currentHash, setCurrentHash] = useState<string>(() => window.location.hash || '');

  // Cart drawer open/close
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart items with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse cart from localStorage:', e);
    }
    return [];
  });

  // Save cart to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  // Listen to hash changes for client-side routing (e.g. #/product/oud-noir)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Determine active product based on hash
  const activeProduct = useMemo(() => {
    const match = currentHash.match(/^#\/?product\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      const found = products.find((p) => p.id === match[1]);
      return found || null;
    }
    return null;
  }, [currentHash]);

  // Navigate to product detail
  const handleSelectProduct = (productId: string) => {
    window.location.hash = `#/product/${productId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to collection
  const handleBackToCollection = () => {
    window.location.hash = '#collection';
    setTimeout(() => {
      const el = document.getElementById('collection');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  // Category selection with smooth scroll to products
  const handleSelectCategoryAndScroll = (category: 'perfume' | 'room-freshener') => {
    setActiveCategory(category);
    if (activeProduct) {
      window.location.hash = '#collection';
    }
    setTimeout(() => {
      const el = document.getElementById('collection');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Section navigation
  const handleNavigateSection = (sectionId: string) => {
    if (activeProduct) {
      window.location.hash = '';
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    selectedSize: ProductSize,
    quantity: number = 1
  ) => {
    if (!product.inStock) return;

    setCartItems((prevItems) => {
      const cartItemId = `${product.id}-${selectedSize.ml}`;
      const existingIndex = prevItems.findIndex((item) => item.id === cartItemId);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          image: product.image,
          ml: selectedSize.ml,
          price: selectedSize.price,
          quantity,
        };
        return [...prevItems, newItem];
      }
    });
  };

  // Buy Now handler: adds item and immediately opens cart drawer
  const handleBuyNow = (
    product: Product,
    selectedSize: ProductSize,
    quantity: number = 1
  ) => {
    if (!product.inStock) return;
    handleAddToCart(product, selectedSize, quantity);
    setIsCartOpen(true);
  };

  // Update cart item quantity
  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove cart item
  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Filtered products for current active category
  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const perfumeCount = products.filter((p) => p.category === 'perfume').length;
  const roomFreshenerCount = products.filter(
    (p) => p.category === 'room-freshener'
  ).length;

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#111111] flex flex-col font-sans selection:bg-[#ffd57a]/20 selection:text-[#111111]">
      {/* 1. Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategoryAndScroll={handleSelectCategoryAndScroll}
        onNavigateSection={handleNavigateSection}
        activeCategory={activeCategory}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeProduct ? (
          /* Product Detail View */
          <ProductDetail
            product={activeProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onBack={handleBackToCollection}
          />
        ) : (
          /* Page Flow: Hero Slide -> Products -> About -> Contact */
          <>
            {/* 2. Hero Image Slide (1 for Perfumes, 1 for Room Fresheners) */}
            <Hero
              onSelectCategoryAndScroll={handleSelectCategoryAndScroll}
            />

            {/* 3. Products Section */}
            <section
              id="collection"
              className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
            >
              {/* Category Tabs */}
              <ProductTabs
                activeTab={activeCategory}
                onTabChange={setActiveCategory}
                perfumeCount={perfumeCount}
                roomFreshenerCount={roomFreshenerCount}
              />

              {/* Product Grid */}
              <div
                key={activeCategory}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 transition-opacity duration-300 animate-in fade-in"
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={(p, size) => handleAddToCart(p, size, 1)}
                    onSelectProduct={handleSelectProduct}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16 text-sm text-[#111111]/70 font-light">
                  No products found in this category.
                </div>
              )}
            </section>

            {/* 4. About Brand Section */}
            <About />

            {/* 5. Contact Us & Social Media Section */}
            <Contact />
          </>
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onExplore={() => {
          if (activeProduct) {
            window.location.hash = '#collection';
          }
          const el = document.getElementById('collection');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Floating WhatsApp Chat Button */}
      <WhatsAppButton />

      {/* Full Footer with Social Media & Navigation */}
      <Footer onNavigate={handleNavigateSection} />
    </div>
  );
}
