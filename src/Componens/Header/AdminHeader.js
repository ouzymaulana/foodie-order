import { AppBar, Grid, Typography, useMediaQuery } from "@mui/material";
import style from "../../styles/LoginVerifikasi.module.scss";
import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import jwt from "jsonwebtoken";
import Profile from "./Profile";
import Cookies from "js-cookie";
import { useDrawerToggleContext } from "@/Context/Toggle/DrawerToggleContextProvider";

export default function AdminHeader() {
  const { drawer, setDrawer } = useDrawerToggleContext();
  const isNotDesktop = useMediaQuery("(max-width:600px)");
  const token = Cookies.get("token");
  const jwtData = jwt.decode(token);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer({ [anchor]: open });
  };

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
        width: { lg: "110rem" },
        zIndex: 990,
      }}
    >
      <Grid display={"flex"} justifyContent={"space-between"} gap={1}>
        <Grid flex={4} display={"flex"} alignItems={"center"}>
          {isNotDesktop && (
            <IconButton
              onClick={toggleDrawer("left", true)}
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { lg: "auto" } }}
              // display: { sm: "none", xs: "none" },
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* {!isNotDesktop && ( */}
          <Typography
            fontFamily="Harlow Solid"
            className={style.foodieorder}
            fontSize={{ md: 38, xs: 23 }}
            fontWeight={500}
          >
            F0odieOrder
          </Typography>
          {/* )} */}
        </Grid>
        <Grid flex={6}>
          <Profile nama={jwtData?.nama || ""} role={jwtData?.role || ""} />
        </Grid>
      </Grid>
    </AppBar>
  );
}
