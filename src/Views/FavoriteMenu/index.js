import { Grid } from "@mui/material";
import React from "react";
import FavoriteMenuItem from "./FavoriteMenuItem";
import Balance from "@/Componens/Nav/Balance";
import OrderMenu from "@/Componens/Nav/OrderMenu";

export default function FavoriteMenu() {
  return (
    <Grid display={"flex"} sx={{ height: "calc(100vh - 120px)", gap: "20px" }}>
      <Grid
        flex={9}
        display={"flex"}
        flexDirection={"column"}
        overflow={"auto"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "0em",
            // background: "transparent",
          },
        }}
      >
        <FavoriteMenuItem />
      </Grid>
      <Grid flex={3}>
        <Balance />
        <OrderMenu />
      </Grid>
    </Grid>
  );
}