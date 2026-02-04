"use client";

import { useEffect, useState, useMemo } from "react";
import { useAppSelector } from "@/store";
import { products as allProducts } from "@/data/products";
import { type Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { FilterControls } from "./FilterControls";
import { PaginationControls } from "./PaginationControls";
import { Loader2 } from "lucide-react";
import  EmptyState  from "./EmptyState";

export function ProductCatalog() {
  const {
    selectedCategory,
    sortBy,
    priceRange,
    inStockOnly,
    searchQuery,
    viewMode,
    currentPage,
    itemsPerPage,
  } = useAppSelector((state) => state.products);

  const [accumulatedProducts, setAccumulatedProducts] = useState<Product[]>([]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    console.log('all products', filtered);
    
    // Category filter
    if (selectedCategory !== "all") {
        console.log("category is not all");
        
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
        console.log("i have a search query", searchQuery);   
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query),
      );
    }

    // Price range filter
    // filtered = filtered.filter(
    //   (p) => p.price >= priceRange.min && p.price <= priceRange.max,
    // );

    // Stock filter
    if (inStockOnly) {
      filtered = filtered.filter((p) => p.inStock);
    }

    // Sort
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      // Sort by ID or name as newest indicator (since createdAt doesn't exist)
      filtered.sort((a, b) => b.id.localeCompare(a.id));
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    console.log("final filtered", filtered);
    
    return filtered;
  }, [selectedCategory, searchQuery, priceRange, inStockOnly, sortBy]);

  // Pagination calculations
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // Get paginated products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Update accumulated products for infinite scroll
  useEffect(() => {
    if (viewMode === "infinite") {
      setAccumulatedProducts((prev) => {
        if (currentPage === 1) {
          return paginatedProducts;
        }
        // Avoid duplicates
        const existingIds = new Set(prev.map((p) => p.id));
        const newProducts = paginatedProducts.filter(
          (p) => !existingIds.has(p.id),
        );
        return [...prev, ...newProducts];
      });
    }
  }, [paginatedProducts, viewMode, currentPage]);

  // Get products based on view mode
  const displayProducts =
    viewMode === "infinite" ? accumulatedProducts : paginatedProducts;

  const hasMore = currentPage < totalPages;

  // Debug log
  if (typeof window !== "undefined") {
    console.log("ProductCatalog Debug:", {
      filteredProducts: filteredProducts.length,
      displayProducts: displayProducts.length,
      paginatedProducts: paginatedProducts.length,
      viewMode,
      currentPage,
      totalPages,
    });
  }

  return (
    <div>
      {/* Filter Controls */}
      <FilterControls totalResults={totalProducts} />

      {/* Empty State */}
      {filteredProducts.length === 0 && <EmptyState />}

      {/* Products Grid */}
      {filteredProducts.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 ">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Infinite scroll loading indicator */}
          {viewMode === "infinite" && hasMore && (
            <div className="py-8 px-4 flex justify-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading more products...</span>
              </div>
            </div>
          )}

          {/* Pagination Controls */}
          <PaginationControls
            totalPages={totalPages}
            hasMore={hasMore}
            isLoadingMore={false}
          />
        </>
      )}
    </div>
  );
}
