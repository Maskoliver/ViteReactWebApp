import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { Button, Divider, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import DrawerHeader from "../components/DrawerHeader";
import { useCartStore } from "../stores/cartStore";
import CartItem from "./CartItem";

const Cart = () => {
  const { toggleCart, cartItems, clearCart } = useCartStore();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantityInCart ?? 1),
      0
    );
  };

  return (
    <Stack direction="column">
      <DrawerHeader toggleCart={toggleCart} title="My Cart" />
      <Box>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </Box>
      <Divider />
      {cartItems.length !== 0 && (
        <Box m={2} flexDirection={"column"} display={"sticky"}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Total Price: </Typography>
            <Typography variant="h6">₺ {calculateTotal()}</Typography>
          </Box>

          <Box
            mt={1}
            width="100%"
            justifyContent="space-between"
            display="flex"
          >
            <Button variant="contained" color="error" onClick={clearCart}>
              Clear Cart
            </Button>

            <Button variant="contained" color="primary">
              Checkout
            </Button>
          </Box>
        </Box>
      )}
      {cartItems.length === 0 && (
        <Box
          flexDirection={"column"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          p={2}
        >
          <ProductionQuantityLimitsIcon sx={{ width: 100, height: 100 }} />
          <Typography variant="h6" color="GrayText">
            Your cart is empty
          </Typography>
        </Box>
      )}
    </Stack>
  );
};

export default Cart;
