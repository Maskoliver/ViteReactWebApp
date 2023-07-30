import { Stack } from "@mui/material";
import "./App.css";
import Shop from "./Shop/Shop";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Stack>
      <Navbar />
      <Shop />
    </Stack>
  );
}

export default App;
