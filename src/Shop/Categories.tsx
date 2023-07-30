import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

import { Box, Typography } from "@mui/material";

interface CategoriesProps {
  categories: string[];
  onCategoryChange: (selectedCategories: string[]) => void;
}
const Categories: React.FC<CategoriesProps> = ({
  categories,
  onCategoryChange,
}) => {
  const [checked, setChecked] = React.useState<string[]>([]);

  const handleToggle = (category: string) => () => {
    const currentIndex = checked.indexOf(category);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(category);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    onCategoryChange(newChecked);
  };

  return (
    <Box bgcolor="lightblue" flex={1} p={2}>
      <Typography variant="h6" color="initial">
        Categories
      </Typography>
      <List dense sx={{ width: "100%", maxWidth: 360 }}>
        {categories.map((category) => {
          const labelId = `category-list-${category}`;
          return (
            <ListItem
              key={category}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(category)}
                  checked={checked.indexOf(category) !== -1}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton onClick={handleToggle(category)}>
                <ListItemText id={labelId} primary={category} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Categories;
