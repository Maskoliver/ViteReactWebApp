import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
  debounce,
} from "@mui/material";
import { useCartStore } from "../stores/cartStore";
import { Product } from "../types";

interface CartItemProps {
  item: Product;
}
const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, addToCart } = useCartStore();

  const handleRemoveFromCart = () => {
    removeFromCart(item.id, true);
  };

  const calculateTotal = () => {
    return item.price * (item.quantityInCart ?? 1);
  };

  const handleIncreaseQuantity = debounce(() => {
    addToCart({ ...item, quantityInCart: (item.quantityInCart ?? 0) + 1 });
  }, 50);

  const handleDecreaseQuantity = debounce(() => {
    if (item.quantityInCart === 1) {
      return;
    }
    removeFromCart(item.id, false);
  }, 50);

  return (
    <Card
      sx={{
        m: 2,
        "&:hover": {
          boxShadow: 8,
        },
      }}
      elevation={0}
    >
      <Grid container>
        <Grid item xs={12} sm={4}>
          <Avatar
            src={item.image}
            sx={{
              width: "100%",
              height: "100%",
              aspectRatio: "1 / 1",
              borderRadius: "0px",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <CardHeader
            action={
              <IconButton aria-label="delete" onClick={handleRemoveFromCart}>
                <CloseIcon color="error" />
              </IconButton>
            }
            disableTypography
            title={<Typography variant="h6">{item.name}</Typography>}
          ></CardHeader>
          <CardContent></CardContent>
          <CardActions>
            <Box display="flex" alignItems="center">
              <IconButton
                aria-label="decrease"
                onClick={handleDecreaseQuantity}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="h6">{item.quantityInCart}</Typography>
              <IconButton
                aria-label="increase"
                onClick={handleIncreaseQuantity}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Box flexGrow={1} />
            <Typography variant="subtitle1">
              {item.price} * {item.quantityInCart} =
            </Typography>
            <Typography variant="h6"> ₺ {calculateTotal()}</Typography>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartItem;
