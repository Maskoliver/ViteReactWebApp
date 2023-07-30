import { Stack } from "@mui/material";
import "./App.css";
import Shop from "./Shop/Shop";
import Navbar from "./components/Navbar";
import { generateFakeProductData } from "./lib/utils";

function App() {
  const numberOfFakeProducts = 12;
  const allProducts = generateFakeProductData(numberOfFakeProducts);
  const uniqueCategories = Array.from(
    new Set(allProducts.map((product) => product.category))
  );

  return (
    <Stack>
      <Navbar uniqueCategories={uniqueCategories} />
      <Shop allProducts={allProducts} uniqueCategories={uniqueCategories} />
    </Stack>
  );
}

export default App;
