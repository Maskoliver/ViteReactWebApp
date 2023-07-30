import { Box, Grid } from "@mui/material";
import { Product } from "../types";
import ProductCard from "./ProductCard";

interface ProductProps {
  products: Product[];
}

const Products: React.FC<ProductProps> = ({ products }) => {
  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;
