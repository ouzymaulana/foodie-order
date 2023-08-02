import { AppBar, Grid, Typography } from "@mui/material";
import style from "../../styles/LoginVerifikasi.module.scss";
import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

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
        zIndex: 990,
      }}
    >
      <Grid Grid display={"flex"} justifyContent={"space-between"} gap={1}>
        <Grid flex={4} display={"flex"}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { lg: "auto" } }}
            // display: { sm: "none", xs: "none" },
          >
            <MenuIcon fontSize="large" />
          </IconButton>
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
