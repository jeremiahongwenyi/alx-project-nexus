"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/hooks";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Loader2,
  PackageOpen,
} from "lucide-react";
import { formatPrice, getDiscountPercentage } from "@/data/products";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch product details using TanStack Query
  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await api.getProduct(productId);
      console.log("fetched product details", response);
      return response;
    },
    enabled: !!productId,
  });

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`Added ${quantity} item(s) to cart`);
    setQuantity(1);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleShare = () => {
    if (navigator.share && product) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      toast.success("Link copied to clipboard");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center text-center gap-4">
          <PackageOpen className="h-16 w-16 text-destructive" />
          <div>
            <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              {error instanceof Error
                ? error.message
                : "The product you're looking for doesn't exist or has been removed."}
            </p>
            <Link href="/products">
              <Button>Browse All Products</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? getDiscountPercentage(product.originalPrice!, product.price)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              href="/products"
              className="text-muted-foreground hover:text-foreground"
            >
              Products
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              href={`/products?category=${product.category}`}
              className="text-muted-foreground hover:text-foreground capitalize"
            >
              {product.category}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex items-start justify-center">
            <div className="w-full max-w-md aspect-4/3 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  <p className="text-muted-foreground mt-2 capitalize">
                    Category: {product.category}
                  </p>
                </div>
              </div>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating || 0)
                            ? "fill-warning text-warning"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{product.rating}</span>
                  {product.reviewCount && (
                    <span className="text-muted-foreground">
                      ({product.reviewCount} reviews)
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="border-t border-b py-6">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-4xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice!)}
                    </span>
                    <span className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm font-semibold">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              {product.inStock ? (
                <div className="flex items-center gap-2 text-success">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="font-medium">In Stock</span>
                  {product.stockCount && product.stockCount <= 5 && (
                    <span className="text-warning text-sm ml-2">
                      Only {product.stockCount} left
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-destructive">
                  <div className="w-2 h-2 rounded-full bg-destructive" />
                  <span className="font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="font-semibold text-lg mb-3">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div>
                <h2 className="font-semibold text-lg mb-3">Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  {product.specifications.dimensions && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Dimensions
                      </p>
                      <p className="font-medium">
                        {product.specifications.dimensions}
                      </p>
                    </div>
                  )}
                  {product.specifications.material && (
                    <div>
                      <p className="text-sm text-muted-foreground">Material</p>
                      <p className="font-medium">
                        {product.specifications.material}
                      </p>
                    </div>
                  )}
                  {product.specifications.weight && (
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="font-medium">
                        {product.specifications.weight}
                      </p>
                    </div>
                  )}
                  {product.specifications.assembly && (
                    <div>
                      <p className="text-sm text-muted-foreground">Assembly</p>
                      <p className="font-medium">
                        {product.specifications.assembly}
                      </p>
                    </div>
                  )}
                  {product.specifications.warranty && (
                    <div>
                      <p className="text-sm text-muted-foreground">Warranty</p>
                      <p className="font-medium">
                        {product.specifications.warranty}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-4 pt-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-muted transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>

              {/* Secondary Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlist}
                  className="flex-1"
                >
                  <Heart
                    className={`h-5 w-5 mr-2 ${
                      isWishlisted ? "fill-destructive text-destructive" : ""
                    }`}
                  />
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShare}
                  className="flex-1"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6 space-y-3 text-sm text-muted-foreground">
              <p>✓ Free shipping on orders over KES 5,000</p>
              <p>✓ 30-day money-back guarantee</p>
              <p>✓ Secure checkout and payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
