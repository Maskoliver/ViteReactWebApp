import create from "zustand";
import { Product } from "../lib/types";

interface ProductStoreState {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const useProductStore = create<ProductStoreState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
