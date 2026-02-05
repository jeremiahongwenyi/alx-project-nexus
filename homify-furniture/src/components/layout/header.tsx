"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, Search, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/store/hooks";

export default function Header () {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  return (
    <header className="sticky px-4 top-0 z-50 bg-background/95 border-b border-border backdrop-blur-sm">
      <div className="flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl md:text-2xl font-bold text-primary">
            Homify Furniture
          </span>
        </Link>
        <nav className=" hidden md:flex items-center gap-8 ">
          <Link
            href="/"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/customorders"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Custom Orders
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search data-icon="inline-start" className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User data-icon="inline-start" className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={openCart}
          >
            <ShoppingCart data-icon="inline-start" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5"></X>
            ) : (
              <Menu className="h-5 w-5"></Menu>
            )}
          </Button>
        </div>
      </div>
      {/* 
    //   Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-background animate-slide-up">
          <div className=" container flex flex-col gap-4 py-4 ">
            <Link
              href="/"
              className="text-sm font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href=""
              className="text-sm font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href=""
              className="text-sm font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Custom Orders
            </Link>
            <Link
              href=""
              className="text-sm font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

