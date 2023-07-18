import { AppBar, Grid, Typography } from "@mui/material";
import style from "../../styles/LoginVerifikasi.module.scss";
import React from "react";

export default function AdminHeader() {
  return (
    <AppBar
      position="fixed"
      sx={{
        padding: "20px",
        backgroundColor: "#F1F1F1",
        height: "80px",
        display: "flex",
        justifyContent: "center",
        boxShadow: "none",
        width: "110rem",
      }}
    >
      <Grid Grid display={"flex"} justifyContent={"space-between"} gap={1}>
        <Grid flex={3}>
          <Typography
            fontFamily="Harlow Solid"
            className={style.foodieorder}
            fontSize={38}
            fontWeight={500}
          >
            F0odieOrder
          </Typography>
        </Grid>
        <Grid flex={6}></Grid>
      </Grid>
    </AppBar>
  );
}
