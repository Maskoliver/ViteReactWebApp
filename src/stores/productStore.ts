// stores/productStore.ts
import create from "zustand";
import { Product } from "../lib/types";
import { generateFakeProductData } from "../lib/utils";

const defaultProductCount = 12;
const additionalProductCount = 12;

interface ProductStoreState {
  products: Product[];
  uniqueCategories: string[];
  loading: boolean; // Add a loading state variable
  setProducts: (products: Product[]) => void;
  generateMoreProducts: () => void;
}

export const useProductStore = create<ProductStoreState>((set) => ({
  products: generateFakeProductData(defaultProductCount),
  uniqueCategories: [],
  loading: false, // Initialize loading as false
  setProducts: (products) => {
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category))
    );
    set({ products, uniqueCategories });
  },
  generateMoreProducts: async () => {
    set({ loading: true }); // Set loading to true while generating more products
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Introduce a 1.5-second delay
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
      return { products: newProducts, uniqueCategories, loading: false }; // Set loading back to false after generating new products
    });
  },
}));
