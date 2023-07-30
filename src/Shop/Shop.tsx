import { Grid } from "@mui/material";
import { useState } from "react";
import { generateFakeProductData } from "../lib/utils";
import { Product } from "../types";
import Categories from "./Categories";
import Products from "./Products";
import SearchBar from "./SearchBar";

const Shop = () => {
  const numberOfFakeProducts = 12;
  const [allProducts] = useState<Product[]>(() =>
    generateFakeProductData(numberOfFakeProducts)
  );
  const uniqueCategories = Array.from(
    new Set(allProducts.map((product) => product.category))
  );

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (selectedCategories: string[]) => {
    setSelectedCategories(selectedCategories);
  };

  // Filtering the products based on the selected categories
  const filteredProducts =
    selectedCategories.length === 0
      ? allProducts
      : allProducts.filter((product) =>
          selectedCategories.includes(product.category)
        );

  return (
    <Grid container mt={8}>
      <Grid item xs={2} p={2} sx={{ display: { xs: "none", md: "block" } }}>
        <Categories
          categories={uniqueCategories}
          onCategoryChange={handleCategoryChange}
        />
      </Grid>
      <Grid item xs={12} md={10} p={2}>
        <SearchBar />
        <Products products={filteredProducts} />
      </Grid>
    </Grid>
  );
};

export default Shop;
