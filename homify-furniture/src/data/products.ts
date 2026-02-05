
import { Category, Product, ShippingZone } from "@/types/product";

// Import product images
import sofaEmerald from "@/assets/products/sofa-emerald.jpg";
import bedModern from "@/assets/products/bed-modern.jpg";
import diningSet from "@/assets/products/dining-set.jpg";
import officeChair from "@/assets/products/office-chair.jpg";
import cabinetOak from "@/assets/products/cabinet-oak.jpg";
import outdoorSet from "@/assets/products/outdoor-set.jpg";

export const categories: Category[] = [
  { id: "all", name: "All Products" },
  { id: "sofas", name: "Sofas & Couches" },
  { id: "beds", name: "Beds & Mattresses" },
  { id: "dining", name: "Dining Tables & Chairs" },
  { id: "office", name: "Office Furniture" },
  { id: "cabinets", name: "Cabinets & Storage" },
  { id: "outdoor", name: "Outdoor Furniture" },
  { id: "custom", name: "Custom Orders" },
];

export const products: Product[] = [
  {
    id: "prod-001",
    name: "Emerald Velvet 3-Seater Sofa",
    description: "Luxurious velvet sofa with a deep emerald green finish. Features high-density foam cushions and solid oak legs for durability and comfort.",
    price: 89500,
    originalPrice: 125000,
    category: "sofas",
    image: sofaEmerald,
    inStock: true,
    stockCount: 5,
    isNew: false,
    rating: 4.8,
    reviewCount: 24,
    specifications: {
      dimensions: "220cm x 90cm x 85cm",
      material: "Velvet upholstery, Oak wood frame",
      weight: "65kg",
      assembly: "Minimal assembly required",
      warranty: "2 years",
    },
  },
  {
    id: "prod-002",
    name: "Oslo King Platform Bed",
    description: "Scandinavian-inspired platform bed with a clean, minimalist design. Crafted from solid teak wood with a natural honey finish.",
    price: 145000,
    category: "beds",
    image: bedModern,
    inStock: true,
    stockCount: 3,
    isNew: true,
    rating: 4.9,
    reviewCount: 18,
    specifications: {
      dimensions: "210cm x 185cm x 45cm",
      material: "Solid Teak Wood",
      weight: "85kg",
      assembly: "Professional assembly recommended",
      warranty: "5 years",
    },
  },
  {
    id: "prod-003",
    name: "Heritage 6-Seater Dining Set",
    description: "Classic mahogany dining table with six matching chairs. Features intricate craftsmanship and cream upholstered seats.",
    price: 185000,
    originalPrice: 220000,
    category: "dining",
    image: diningSet,
    inStock: true,
    stockCount: 2,
    rating: 4.7,
    reviewCount: 12,
    specifications: {
      dimensions: "180cm x 100cm x 76cm (table)",
      material: "Solid Mahogany Wood",
      weight: "120kg (full set)",
      assembly: "Professional assembly required",
      warranty: "3 years",
    },
  },
  {
    id: "prod-004",
    name: "Executive Leather Office Chair",
    description: "Premium leather executive chair with ergonomic lumbar support. Features adjustable height, tilt mechanism, and chrome base.",
    price: 45000,
    category: "office",
    image: officeChair,
    inStock: true,
    stockCount: 8,
    rating: 4.6,
    reviewCount: 32,
    specifications: {
      dimensions: "70cm x 70cm x 115-125cm",
      material: "Genuine Leather, Chrome Steel",
      weight: "22kg",
      assembly: "Minimal assembly required",
      warranty: "2 years",
    },
  },
  {
    id: "prod-005",
    name: "Woven Rattan Storage Cabinet",
    description: "Handcrafted storage cabinet with natural rattan weave doors. Perfect for living rooms or bedrooms with a bohemian touch.",
    price: 38500,
    originalPrice: 48000,
    category: "cabinets",
    image: cabinetOak,
    inStock: true,
    stockCount: 6,
    isNew: true,
    rating: 4.5,
    reviewCount: 9,
    specifications: {
      dimensions: "100cm x 45cm x 80cm",
      material: "Oak Wood, Natural Rattan",
      weight: "35kg",
      assembly: "Pre-assembled",
      warranty: "1 year",
    },
  },
  {
    id: "prod-006",
    name: "Costa Wicker Patio Set",
    description: "All-weather wicker outdoor furniture set including loveseat, two armchairs, and coffee table with beige cushions.",
    price: 125000,
    category: "outdoor",
    image: outdoorSet,
    inStock: true,
    stockCount: 4,
    rating: 4.4,
    reviewCount: 15,
    specifications: {
      dimensions: "Various (4-piece set)",
      material: "All-weather Wicker, Aluminum Frame",
      weight: "75kg (full set)",
      assembly: "Minimal assembly required",
      warranty: "2 years",
    },
  },
];

export const shippingZones: ShippingZone[] = [
  {
    name: "Nairobi CBD",
    areas: ["City Center", "Westlands", "Kilimani"],
    standardFee: 500,
    expressFee: 800,
  },
  {
    name: "Nairobi Other",
    areas: ["Karen", "Runda", "Langata"],
    standardFee: 800,
    expressFee: 1200,
  },
  {
    name: "Outside Nairobi",
    areas: ["Mombasa", "Kisumu", "Nakuru"],
    standardFee: 2000,
    expressFee: 3000,
  },
];

export const formatPrice = (price: number): string => {
  return `KSh ${price.toLocaleString("en-KE")}`;
};

export const getDiscountPercentage = (original: number, current: number): number => {
  return Math.round(((original - current) / original) * 100);
};

export const SELLER_WHATSAPP = "+254719352072";
export const BUSINESS_NAME = "UrbanNest Furniture";
