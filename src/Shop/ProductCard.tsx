import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  debounce,
} from "@mui/material";
import { useState } from "react";
import { Product } from "../lib/types";
import { useCartStore } from "../stores/cartStore";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  const handleDecreaseQuantity = debounce(() => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  }, 50);

  const handleIncreaseQuantity = debounce(() => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }, 50);

  const handleAddToCart = debounce(() => {
    addToCart({ ...product, quantityInCart: quantity });
    setQuantity(1);
  }, 50);

  return (
    <Card
      sx={{
        boxShadow: 2,
        "&:hover": {
          boxShadow: 8,
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia component="img" image={product.image} loading="lazy" />

      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" width={"70%"}>
            {product.name} ({product.category})
          </Typography>
          <Typography variant="h6">₺ {product.price}</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>

      <Divider light />

      <CardActions>
        <Box flexGrow={1} display="flex" alignItems="center">
          <Tooltip title="Decrease Quantity">
            <IconButton aria-label="decrease" onClick={handleDecreaseQuantity}>
              <RemoveIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6">{quantity}</Typography>
          <Tooltip title="Increase Quantity">
            <IconButton aria-label="increase" onClick={handleIncreaseQuantity}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Tooltip title="Add to Cart">
          <IconButton aria-label="add to cart" onClick={handleAddToCart}>
            <ShoppingCartIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
