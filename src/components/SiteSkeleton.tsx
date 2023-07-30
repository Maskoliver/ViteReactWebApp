import { Box, Grid, Skeleton } from "@mui/material";

const SiteSkeleton = () => {
  return (
    <Grid container mt={8}>
      <Grid item xs={2} p={2} sx={{ display: { xs: "none", lg: "block" } }}>
        <Skeleton variant="rectangular" height="90vh" animation="wave" />
      </Grid>
      <Grid item xs={12} lg={10} p={2}>
        <Box
          justifyContent={"space-between"}
          display={"flex"}
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
        >
          <Skeleton
            variant="rectangular"
            height="5vh"
            animation="wave"
            sx={{ width: { xs: "100%", sm: "66%" }, mb: { xs: 2, sm: 0 } }}
          />
          <Skeleton
            variant="rectangular"
            height="5vh"
            animation="wave"
            sx={{ width: { xs: "100%", sm: "25%" } }}
          />
        </Box>
        <Grid container justifyContent={"space-between"} display={"flex"}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} pt={2} pr={2} key={index}>
              <Skeleton variant="rectangular" height="40vh" animation="wave" />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SiteSkeleton;
