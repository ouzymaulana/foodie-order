import { Button, CardMedia, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

export default function CartOrderHistory({ item }) {
  return (
    <Grid
      display={"flex"}
      width={600}
      sx={{ backgroundColor: "white" }}
      padding={1.6}
      borderRadius={4}
    >
      <Grid flex={3.5}>
        <CardMedia
          sx={{ borderRadius: "15px" }}
          component="img"
          alt="green"
          height="150"
          image="/img/cocktail.jpg"
        />
      </Grid>
      <Grid padding={1.2} flex={7}>
        <Grid>
          <Typography variant="h6">nama</Typography>
          <Typography>20.000</Typography>
        </Grid>
        <Grid>
          <Typography variant="subtitle2" color={grey[600]}>
            note
          </Typography>
        </Grid>
      </Grid>
      <Grid
        flex={3}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"end"}
        justifyContent={"end"}
      >
        <Grid flex={10}>
          <Typography color={grey[500]} variant="button" fontWeight={700}>
            12-12-2023
          </Typography>
        </Grid>
        <Grid flex={2}>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            disableElevation
            sx={{ borderRadius: "6px", textTransform: "none" }}
          >
            order again
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
