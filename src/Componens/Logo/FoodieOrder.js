import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import style from "../../styles/LoginVerifikasi.module.scss";
import Image from "next/image";

export default function FoodieOrder() {
  return (
    <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Box
        sx={{ boxSizing: "border-box" }}
        display={"flex"}
        paddingX={{ md: 3 }}
        paddingRight={{ xs: 3 }}
      >
        <Image
          src="/img/logo.svg"
          height={80}
          width={80}
          // layout="responsive"
          style={{
            md: { height: "50px", width: "100px" },
          }}
          alt="logo"
        />
      </Box>
      <Typography
        variant="h3"
        fontFamily="Harlow Solid"
        className={style.foodieorder}
      >
        FoodieOrder
      </Typography>
    </Grid>
  );
}
