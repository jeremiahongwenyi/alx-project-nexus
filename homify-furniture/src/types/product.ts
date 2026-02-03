// Product and Category types for UrbanNest Furniture
import { StaticImageData } from "next/image"

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: CategoryId;
  image: StaticImageData;
  images?: StaticImageData[];
  inStock: boolean;
  stockCount?: number;
  isNew?: boolean;
  rating?: number;
  reviewCount?: number;
  specifications?: {
    dimensions?: string;
    material?: string;
    weight?: string;
    assembly?: string;
    warranty?: string;
  };
}

export type CategoryId = 
  | 'all'
  | 'sofas'
  | 'beds'
  | 'dining'
  | 'office'
  | 'cabinets'
  | 'outdoor'
  | 'custom';

export interface Category {
  id: CategoryId;
  name: string;
  icon?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingZone {
  name: string;
  areas: string[];
  standardFee: number;
  expressFee: number;
}
