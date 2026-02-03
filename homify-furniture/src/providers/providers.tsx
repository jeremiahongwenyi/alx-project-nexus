// app/providers.tsx
"use client";

import { Toaster } from "sonner";
import { CartProvider } from "@/contexts/CartContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}

      <Toaster
        position="top-right"
        richColors
        closeButton
        theme="system"
      />
    </CartProvider>
  );
}
