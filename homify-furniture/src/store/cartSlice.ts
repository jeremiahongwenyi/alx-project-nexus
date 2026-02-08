import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, CartItem } from "@/types/product";
import { toast } from "sonner";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>,
    ) => {
      const { product, quantity = 1 } = action.payload;

      if (!product.inStock) {
        toast.error("This item is currently out of stock");
        return;
      }

      const existingItem = state.items.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        const maxQuantity = product.stockCount || 10;

        if (newQuantity > maxQuantity) {
          toast.warning(`Only ${maxQuantity} items available in stock`);
          existingItem.quantity = maxQuantity;
          return;
        }

        existingItem.quantity = newQuantity;
        toast.success("Quantity updated in cart");
      } else {
        state.items.push({ product, quantity });
        toast.success("Item added to cart successfully");
      }

    //   state.isOpen = true;
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload,
      );
      toast.success("Item removed from cart");
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) => {
      const { productId, quantity } = action.payload;

      if (quantity < 1) {
        state.items = state.items.filter(
          (item) => item.product.id !== productId,
        );
        return;
      }

      const item = state.items.find((item) => item.product.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
      toast.success("Cart cleared");
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  openCart,
  closeCart,
} = cartSlice.actions;
export default cartSlice.reducer;
