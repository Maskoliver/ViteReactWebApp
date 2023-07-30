// filtersStore.ts

import create from "zustand";

interface FiltersStore {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  minPrice: number;
  maxPrice: number;
  setPriceFilter: (minPrice: number, maxPrice: number) => void;
}

export const useFiltersStore = create<FiltersStore>((set) => ({
  selectedCategories: [],
  setSelectedCategories: (categories) =>
    set((state) => ({ ...state, selectedCategories: categories })),
  minPrice: 0,
  maxPrice: Number.POSITIVE_INFINITY,
  setPriceFilter: (minPrice, maxPrice) =>
    set((state) => ({ ...state, minPrice, maxPrice })),
}));
