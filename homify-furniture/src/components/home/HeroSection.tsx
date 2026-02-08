"use client"

import React, { use } from 'react'
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { api } from "@/services/api"

export default function HeroSection() {

  const addProduct = async ()=>{

    try {
      const newProduct: any = {
    name: "Oslo King Platform Bed",
    description: "Scandinavian-inspired platform bed with a clean, minimalist design. Crafted from solid teak wood with a natural honey finish.",
    price: 145000,
    category: "beds",
    image: "https://res.cloudinary.com/dnmc3a0ty/image/upload/v1770493230/custom-orders/j5edfzuncmgvhdytdwqg.jpg",
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
  }
  // {
  //   id: "prod-003",
  //   name: "Heritage 6-Seater Dining Set",
  //   description: "Classic mahogany dining table with six matching chairs. Features intricate craftsmanship and cream upholstered seats.",
  //   price: 185000,
  //   originalPrice: 220000,
  //   category: "dining",
  //   image: diningSet,
  //   inStock: true,
  //   stockCount: 2,
  //   rating: 4.7,
  //   reviewCount: 12,
  //   specifications: {
  //     dimensions: "180cm x 100cm x 76cm (table)",
  //     material: "Solid Mahogany Wood",
  //     weight: "120kg (full set)",
  //     assembly: "Professional assembly required",
  //     warranty: "3 years",
  //   },
  // },

      const response = await api.saveProduct(newProduct);
      console.log("Product added:", response);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }
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

            <Button onClick={addProduct}>Add Product</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
