// App.tsx
import { Stack } from "@mui/material";
import { useEffect } from "react";
import "./App.css";
import Shop from "./Shop/Shop";
import Navbar from "./components/Navbar";
import { generateFakeProductData } from "./lib/utils";
import { useProductStore } from "./stores/productStore"; // Import the product store

function App() {
  const numberOfFakeProducts = 12;
  const allProducts = generateFakeProductData(numberOfFakeProducts);
  const uniqueCategories = Array.from(
    new Set(allProducts.map((product) => product.category))
  );
  const setProducts = useProductStore((state) => state.setProducts);
  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts, setProducts]);

  return (
    <Stack>
      <Navbar uniqueCategories={uniqueCategories} />
      <Shop uniqueCategories={uniqueCategories} />
    </Stack>
  );
}

export default App;
