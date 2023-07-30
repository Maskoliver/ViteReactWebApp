import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TuneIcon from "@mui/icons-material/Tune";
import { Badge, Box, Drawer, Hidden, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Cart from "../Cart/Cart";
import Filters from "../Shop/Filters";
import { useCartStore } from "../stores/cartStore";
import { useFiltersStore } from "../stores/filtersStore";
import DrawerHeader from "./DrawerHeader";

interface NavbarProps {
  uniqueCategories: string[];
}

const Navbar = ({ uniqueCategories }: NavbarProps) => {
  const { isCartOpen, toggleCart, cartItems } = useCartStore();
  const { setSelectedCategories, minPrice, maxPrice } = useFiltersStore();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const toggleFilters = () => {
    setIsFiltersOpen((prev) => !prev);
  };

  return (
    <AppBar color="primary">
      <Toolbar>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={toggleFilters}>
            <TuneIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}></Box>
        </Hidden>
        <Typography variant="h6">BipWebCase</Typography>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Tooltip title="Open Cart">
          <IconButton color="inherit" onClick={toggleCart}>
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={toggleCart}
        PaperProps={{
          sx: {
            width: {
              xs: "100%",
              sm: 600,
            },
          },
        }}
      >
        <Box height="100%">
          <Cart />
        </Box>
      </Drawer>
      <Drawer
        anchor="left"
        open={isFiltersOpen}
        onClose={toggleFilters}
        PaperProps={{
          sx: {
            width: {
              xs: "100%",
              sm: 600,
            },
          },
        }}
      >
        <Box height="100%">
          <DrawerHeader toggleDrawer={toggleFilters} title="Filters" />
          <Filters
            categories={uniqueCategories}
            onCategoryChange={setSelectedCategories}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
