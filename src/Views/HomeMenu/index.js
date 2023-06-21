import { Grid } from "@mui/material";
import { Inter } from "next/font/google";
import React, { useState } from "react";
import OrderMenu from "@/Componens/Nav/OrderMenu";
import Balance from "@/Componens/Nav/Balance";
import BestSellers from "./BestSellers";
import SelectByCategory from "@/Componens/SelectCategory";
import MenuItem from "./Menu";
const inter = Inter({ subsets: ["latin"] });

export default function HomeMenu() {
  return (
    <>
      <Grid
        display={"flex"}
        sx={{ height: "calc(100vh - 120px)", gap: "20px" }}
      >
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
          <BestSellers />
          <SelectByCategory />
          <MenuItem />
        </Grid>
        <Grid flex={3}>
          <Balance />
          <OrderMenu />
        </Grid>
      </Grid>
    </>
  );
}
