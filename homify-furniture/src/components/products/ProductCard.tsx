"use client"

import  Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { formatPrice, getDiscountPercentage } from "@/data/products";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? getDiscountPercentage(product.originalPrice!, product.price)
    : 0;

  return (
    <div className="product-card group bg-card rounded-xl overflow-hidden shadow-product">
      {/* Image container */}
      <Link href={`/product/${product.id}`} className="relative block aspect-4/3 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {hasDiscount && (
            <span className="badge-sale px-2 py-1 text-xs font-bold rounded">
              -{discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span className="badge-new px-2 py-1 text-xs font-bold rounded">
              NEW
            </span>
          )}
        </div>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
            <span className="bg-background text-foreground px-4 py-2 rounded-md font-medium">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick add button - shows on hover */}
        {product.inStock && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="secondary"
              className="w-full"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product);
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        )}
      </Link>

      {/* Product info */}
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-foreground line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mt-2">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="text-sm font-medium">{product.rating}</span>
            {product.reviewCount && (
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="price-current">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="price-original">
              {formatPrice(product.originalPrice!)}
            </span>
          )}
        </div>

        {/* Stock status */}
        {product.inStock && product.stockCount && product.stockCount <= 5 && (
          <p className="text-xs text-warning mt-2">
            Only {product.stockCount} left in stock
          </p>
        )}
      </div>
    </div>
  );
}
