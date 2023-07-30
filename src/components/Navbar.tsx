import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TuneIcon from "@mui/icons-material/Tune";
import { Badge, Box, Drawer, Hidden } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Cart from "../Cart/Cart";
import { useCartStore } from "../stores/cartStore";

const Navbar = () => {
  const { isCartOpen, toggleCart, cartItems } = useCartStore();

  return (
    <AppBar color="primary">
      <Toolbar>
        <Hidden mdUp>
          <IconButton color="inherit">
            <TuneIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}></Box>
        </Hidden>
        <Typography variant="h6">BipWebCase</Typography>
        <Box sx={{ flexGrow: 1 }}></Box>

        <IconButton color="inherit" onClick={toggleCart}>
          <Badge badgeContent={cartItems.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
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
    </AppBar>
  );
};

export default Navbar;
