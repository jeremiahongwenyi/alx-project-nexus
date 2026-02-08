
import { Category, Product, ShippingZone } from "@/types/product";

// Import product images
// import sofaEmerald from "@/assets/products/sofa-emerald.jpg";
// import bedModern from "@/assets/products/bed-modern.jpg";
// import diningSet from "@/assets/products/dining-set.jpg";
// import officeChair from "@/assets/products/office-chair.jpg";
// import cabinetOak from "@/assets/products/cabinet-oak.jpg";
// import outdoorSet from "@/assets/products/outdoor-set.jpg";

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
