"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useMemo } from "react";
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  openCart,
  closeCart,
} from "./cartSlice";
import { Product } from "@/types/product";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector);

export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const isOpen = useAppSelector((state) => state.cart.isOpen);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );
  const total = useMemo(
    () =>
      items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  return {
    items,
    itemCount,
    total,
    isOpen,
    addItem: (product: Product, quantity?: number) =>
      dispatch(addItem({ product, quantity })),
    removeItem: (productId: string) => dispatch(removeItem(productId)),
    updateQuantity: (productId: string, quantity: number) =>
      dispatch(updateQuantity({ productId, quantity })),
    clearCart: () => dispatch(clearCart()),
    openCart: () => dispatch(openCart()),
    closeCart: () => dispatch(closeCart()),
  };
}
