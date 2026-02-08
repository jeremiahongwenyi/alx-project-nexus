"use client";

import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { PackageOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

interface ProductGridProps {
  products?: Product[];
  category?: string;
  isLoading?: boolean;
}

export default function ProductGrid({ category }: ProductGridProps) {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: () => fetchProducts(category),
    enabled: true,
  });

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  useEffect(() => {
    console.log("products in grid", products);
    // Set featured products (first 4)
    setFeaturedProducts(products.slice(0, 4));
  }, [products]);

  const fetchProducts = async (category?: string) => {
    try {
      const response = await api.getProducts(category);
      console.log("fetched products", response);
      return response;
    } catch (error) {
      console.log("error fetching products", error);
      throw error;
    }
  };
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-card rounded-xl overflow-hidden animate-pulse"
          >
            <div className="aspect-4/3 bg-muted" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-5 bg-muted rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <PackageOpen className="h-16 w-16 text-destructive mb-4" />
        <h3 className="font-semibold text-lg mb-2">Error loading products</h3>
        <p className="text-muted-foreground">
          {error instanceof Error
            ? error.message
            : "An error occurred while fetching products"}
        </p>
      </div>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <PackageOpen className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="font-semibold text-lg mb-2">No products found</h3>
        <p className="text-muted-foreground">
          Try selecting a different category or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
