// cartStore.ts
import { create } from "zustand";
import { Product } from "../types";

type CartStore = {
  isCartOpen: boolean;
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string, deleteAll: boolean) => void;
  toggleCart: () => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  isCartOpen: false,
  cartItems: [],
  addToCart: (product) =>
    set((state) => {
      const existingCartItem = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingCartItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantityInCart: (item.quantityInCart ?? 0) + 1 }
              : item
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, { ...product }],
        };
      }
    }),
  removeFromCart: (productId, deleteIt) =>
    set((state) =>
      deleteIt
        ? {
            cartItems: state.cartItems.filter((item) => item.id !== productId),
          }
        : {
            cartItems: state.cartItems.map((item) =>
              item.id === productId
                ? { ...item, quantityInCart: (item.quantityInCart ?? 0) - 1 }
                : item
            ),
          }
    ),

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  clearCart: () => set((state) => ({ cartItems: [] })),
}));
