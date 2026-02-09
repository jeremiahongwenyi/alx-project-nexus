"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { api } from "@/services/api";

export default function HeroSection() {
  // const addProduct = async () => {
  //   try {
  //     const newProduct: any = {
  //       name: "Woven Rattan Storage Cabinet",
  //   description: "Handcrafted storage cabinet with natural rattan weave doors. Perfect for living rooms or bedrooms with a bohemian touch.",
  //   price: 38500,
  //   originalPrice: 48000,
  //   category: "cabinets",
  //   image: "https://res.cloudinary.com/dnmc3a0ty/image/upload/v1770570457/custom-orders/sqqmcddtxdglfx40nthw.jpg",
  //   inStock: true,
  //   stockCount: 6,
  //   isNew: true,
  //   rating: 4.5,
  //   reviewCount: 9,
  //   specifications: {
  //     dimensions: "100cm x 45cm x 80cm",
  //     material: "Oak Wood, Natural Rattan",
  //     weight: "35kg",
  //     assembly: "Pre-assembled",
  //     warranty: "1 year",
  //   },
  //     };
  //     const response = await api.saveProduct(newProduct);
  //     console.log("Product added:", response);
  //   } catch (error) {
  //     console.error("Error adding product:", error);
  //   }
  // };
  return (
    <section className="relative px-4  h-[70vh] md:h-[80vh] min-h-125 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero-living-room.png"
        alt="Modern living room with elegant furniture"
        width={1200}
        height={600}
        priority
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative container h-full flex flex-col justify-center">
        <div className="max-w-xl text-primary-foreground">
          <p className="text-sm md:text-base font-medium mb-3 opacity-90 tracking-wider uppercase">
            Custom Comfort for Modern Living
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
            Transform Your Space with Premium Furniture
          </h1>
          <p className="text-base md:text-lg opacity-90 mb-8 leading-relaxed">
            Discover our curated collection of handcrafted furniture, designed
            to bring elegance and comfort to your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              asChild
            >
              <Link href="/products">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              asChild
            >
              <Link href="/customorders">Custom Orders</Link>
            </Button>
{/* 
            <Button onClick={addProduct}>Add Product</Button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
