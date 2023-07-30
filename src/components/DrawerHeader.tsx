import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Typography } from "@mui/material";

interface DrawerHeaderProps {
  toggleCart: () => void;
  title: string;
}
const DrawerHeader = ({ toggleCart, title }: DrawerHeaderProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      bgcolor="primary.main"
      justifyContent={"space-between"}
      color="white"
      p={2}
    >
      <Typography variant="h5">{title}</Typography>
      <IconButton color="inherit" onClick={toggleCart}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default DrawerHeader;
