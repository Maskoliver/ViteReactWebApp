// stores/productStore.ts
import create from "zustand";
import { Product } from "../lib/types";
import { generateFakeProductData } from "../lib/utils";

const defaultProductCount = 12;
const additionalProductCount = 12;

interface ProductStoreState {
  products: Product[];
  uniqueCategories: string[];
  loading: boolean;
  setProducts: (products: Product[]) => void;
  generateMoreProducts: () => void;
}

export const useProductStore = create<ProductStoreState>((set) => ({
  products: generateFakeProductData(defaultProductCount),
  uniqueCategories: [],
  loading: false,

  setProducts: (products) => {
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category))
    );
    set({ products, uniqueCategories });
  },

  generateMoreProducts: async () => {
    set({ loading: true });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    set((state) => {
      const newProducts = [
        ...state.products,
        ...generateFakeProductData(additionalProductCount),
      ];
      const uniqueCategories = Array.from(
        new Set([
          ...state.uniqueCategories,
          ...newProducts.map((product) => product.category),
        ])
      );
      return { products: newProducts, uniqueCategories, loading: false };
    });
  },
}));
