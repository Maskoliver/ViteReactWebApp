import SearchIcon from "@mui/icons-material/Search";
import {
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

interface SearchSortSectionProps {
  onSearch: (searchQuery: string) => void;
  onSortChange: (sortOption: string) => void;
}

const SearchSortSection: React.FC<SearchSortSectionProps> = ({
  onSearch,
  onSortChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    setSearchQuery(searchQuery);
    onSearch(searchQuery);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const sortOption = event.target.value;
    setSortOption(sortOption);
    onSortChange(sortOption);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} lg={8}>
        <TextField
          id="searchBar"
          label="Search"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={0} lg={1}>
        {" "}
      </Grid>
      <Grid item xs={12} lg={3}>
        <Select
          value={sortOption}
          onChange={handleSortChange}
          variant="standard"
          fullWidth
        >
          <MenuItem value="default">Sorting Options... </MenuItem>
          <MenuItem value="price-asc">Price - Ascending</MenuItem>
          <MenuItem value="price-desc">Price - Descending</MenuItem>
          <MenuItem value="name-asc">Name - Ascending</MenuItem>
          <MenuItem value="name-desc">Name - Descending</MenuItem>
          <MenuItem value="category-asc">Category - Ascending</MenuItem>
          <MenuItem value="category-desc">Category - Descending</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
};

export default SearchSortSection;
