// Shop.tsx

// ... Existing imports
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Product } from "../lib/types";
import { useFiltersStore } from "../stores/filtersStore";
import { useProductStore } from "../stores/productStore";
import Filters from "./Filters";
import Products from "./Products";
import SearchSortSection from "./SearchSortSection";
interface ShopProps {
  uniqueCategories: string[];
}

const Shop = ({ uniqueCategories }: ShopProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const { selectedCategories, minPrice, maxPrice, setSelectedCategories } =
    useFiltersStore();
  const { products, loading, generateMoreProducts } = useProductStore();

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (isAtBottom) {
        generateMoreProducts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, generateMoreProducts]);

  const handleCategoryChange = (selectedCategories: string[]) => {
    setSelectedCategories(selectedCategories);
  };
  const handleSearchChange = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };
  const handleSortChange = (sortOption: string) => {
    setSortOption(sortOption);
  };

  const filteredProducts = products.filter((product: Product) => {
    const isInSelectedCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const isInPriceRange =
      product.price >= minPrice && product.price <= maxPrice;

    const isInSearchQuery = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return isInSelectedCategory && isInPriceRange && isInSearchQuery;
  });

  const sortedProducts = filteredProducts
    .slice()
    .sort((a: Product, b: Product) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "category-asc":
          return a.category.localeCompare(b.category);
        case "category-desc":
          return b.category.localeCompare(a.category);
        default:
          return 0;
      }
    });

  return (
    <Grid container mt={8}>
      <Grid item xs={2} p={2} sx={{ display: { xs: "none", lg: "block" } }}>
        <Typography variant="h5" textAlign={"center"}>
          Filters
        </Typography>
        <Filters
          categories={uniqueCategories}
          onCategoryChange={handleCategoryChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </Grid>
      <Grid item xs={12} lg={10} p={2}>
        <SearchSortSection
          onSearch={handleSearchChange}
          onSortChange={handleSortChange}
        />
        <Products products={sortedProducts} />
        {loading && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Shop;
