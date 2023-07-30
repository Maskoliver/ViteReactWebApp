import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useState } from "react";
import { useFiltersStore } from "../stores/filtersStore";
import { useProductStore } from "../stores/productStore";

interface FiltersProps {
  categories: string[];
  onCategoryChange: (selectedCategories: string[]) => void;
  minPrice: number;
  maxPrice: number;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  onCategoryChange,
  minPrice,
  maxPrice,
}) => {
  const { selectedCategories, setPriceFilter } = useFiltersStore();
  const [expanded, setExpanded] = useState<string | false>("filters1");
  const [expanded2, setExpanded2] = useState<string | false>("filters2");
  const { uniqueCategories, loading } = useProductStore((state) => state);

  useEffect(() => {
    useProductStore.setState({ uniqueCategories: [...categories] });
  }, [categories]);

  useEffect(() => {
    if (loading) {
      setExpanded(false);
    } else {
      setExpanded("filters1");
    }
  }, [loading]);

  const handleFilterSectionChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      if (panel === "filters1") {
        setExpanded(newExpanded ? panel : false);
      } else if (panel === "filters2") {
        setExpanded2(newExpanded ? panel : false);
      }
    };

  const handleCategoryToggle = (category: string) => () => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    onCategoryChange(newSelectedCategories);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice =
      event.target.value === "" ? 0 : parseFloat(event.target.value);
    setPriceFilter(
      newMinPrice,
      maxPrice > newMinPrice ? maxPrice : newMinPrice
    );
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice =
      event.target.value === ""
        ? Number.POSITIVE_INFINITY
        : parseFloat(event.target.value);
    setPriceFilter(
      minPrice < newMaxPrice ? minPrice : newMaxPrice,
      newMaxPrice
    );
  };

  return (
    <Box flex={1} p={2}>
      <Accordion
        elevation={0}
        expanded={expanded === "filters1"}
        onChange={handleFilterSectionChange("filters1")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height={200}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Divider />
              <List dense sx={{ width: "100%", overflowWrap: "anywhere" }}>
                {uniqueCategories.map((category) => (
                  <ListItem
                    key={category}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={handleCategoryToggle(category)}
                        checked={selectedCategories.includes(category)}
                        inputProps={{
                          "aria-labelledby": `category-list-${category}`,
                        }}
                      />
                    }
                    disablePadding
                  >
                    <ListItemButton onClick={handleCategoryToggle(category)}>
                      <ListItemText
                        id={`category-list-${category}`}
                        primary={category}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded2 === "filters2"}
        onChange={handleFilterSectionChange("filters2")}
        elevation={0}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <Grid container spacing={2} p={2}>
            <Grid item xs={6} lg={12}>
              <TextField
                type="number"
                fullWidth
                label="Min Price"
                value={minPrice}
                onChange={handleMinPriceChange}
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={6} lg={12}>
              <TextField
                type="number"
                fullWidth
                label="Max Price"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Filters;
