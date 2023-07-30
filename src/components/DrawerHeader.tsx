import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";

interface DrawerHeaderProps {
  toggleDrawer: () => void;
  title: string;
}
const DrawerHeader = ({ toggleDrawer, title }: DrawerHeaderProps) => {
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
      <Tooltip title="Close">
        <IconButton color="inherit" onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default DrawerHeader;
