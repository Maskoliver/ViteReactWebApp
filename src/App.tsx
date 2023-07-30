import { Stack } from "@mui/material"; // Import Skeleton from MUI
import { useEffect, useState } from "react";
import "./App.css";
import Shop from "./Shop/Shop";
import Navbar from "./components/Navbar";
import SiteSkeleton from "./components/SiteSkeleton";
import { generateFakeProductData } from "./lib/utils";

function App() {
  const numberOfFakeProducts = 120;
  const allProducts = generateFakeProductData(numberOfFakeProducts);
  const uniqueCategories = Array.from(
    new Set(allProducts.map((product) => product.category))
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Stack>
      <Navbar uniqueCategories={uniqueCategories} />
      {isLoading ? (
        <SiteSkeleton />
      ) : (
        <Shop uniqueCategories={uniqueCategories} />
      )}
    </Stack>
  );
}

export default App;
