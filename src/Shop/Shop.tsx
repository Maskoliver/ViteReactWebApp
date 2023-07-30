import { Grid, Typography } from "@mui/material";
import { Product } from "../lib/types";
import { useFiltersStore } from "../stores/filtersStore";
import Filters from "./Filters";
import Products from "./Products";
import SearchBar from "./SearchBar";
interface ShopProps {
  allProducts: Product[];
  uniqueCategories: string[];
}

const Shop = ({ allProducts, uniqueCategories }: ShopProps) => {
  const {
    selectedCategories,
    minPrice,
    maxPrice,
    setSelectedCategories,
    setPriceFilter,
  } = useFiltersStore();

  const handleCategoryChange = (selectedCategories: string[]) => {
    setSelectedCategories(selectedCategories);
  };

  // Function to handle price change
  const handlePriceChange = (minPrice: number, maxPrice: number) => {
    setPriceFilter(minPrice, maxPrice);
  };

  // Filtering the products based on the selected categories and price
  const filteredProducts = allProducts.filter((product) => {
    const isInSelectedCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const isInPriceRange =
      product.price >= minPrice && product.price <= maxPrice;
    return isInSelectedCategory && isInPriceRange;
  });

  return (
    <Grid container mt={8}>
      <Grid item xs={2} p={2} sx={{ display: { xs: "none", lg: "block" } }}>
        <Typography variant="h6">Filters</Typography>
        <Filters
          categories={uniqueCategories}
          onCategoryChange={handleCategoryChange}
          onPriceChange={handlePriceChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </Grid>
      <Grid item xs={12} lg={10} p={2}>
        <SearchBar />
        <Products products={filteredProducts} />
      </Grid>
    </Grid>
  );
};

export default Shop;
