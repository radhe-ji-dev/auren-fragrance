export interface ProductSize {
  ml: number;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'perfume' | 'room-freshener';
  image: string;
  description: string;
  inStock: boolean;
  sizes: ProductSize[];
}

export interface CartItem {
  id: string; // unique cart line key: `${productId}-${ml}`
  productId: string;
  name: string;
  image: string;
  ml: number;
  price: number;
  quantity: number;
}

export interface Coupon {
  code: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder?: number;
  isVisible: boolean; // true = displayed publicly in UI; false = secret coupon given directly to customers
}
