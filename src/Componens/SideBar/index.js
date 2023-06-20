import { Drawer, List, ListItem, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import Navbar from "@/Componens/Header/Index";
import { IconContext } from "react-icons";
import { FaHandHoldingHeart, FaHandsHolding } from "react-icons/fa";
import { RiHandHeartLine } from "react-icons/ri";
import { GoHistory } from "react-icons/go";
import { GrHistory } from "react-icons/gr";

export default function SideBarMenu() {
  return (
    <Drawer
      sx={{
        position: "relative",
        border: "0",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "10rem",
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar sx={{ height: "80px" }}>
        <Image src="/img/logo.svg" height={100} width={100} alt="logo" />
      </Toolbar>
      <List sx={{ paddingX: "20px" }}>
        {/* {["Menu", "Favorite", "Order History"].map((text, index) => ( */}
        <ListItem
          sx={{
            display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            flexDirection: "column",
            borderRadius: "20px",
            cursor: "pointer",
            marginY: "10px",
            "&:hover": {
              backgroundColor: "#FFCF81",
            },
          }}
        >
          <WidgetsOutlinedIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              fontSize: 40,
            }}
            color="action"
          />
          {/* <FaHandHoldingHeart />
          <VolunteerActivismOutlinedIcon /> */}
          <Typography textAlign={"center"}>Menu</Typography>
        </ListItem>
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "20px",
            cursor: "pointer",
            marginY: "10px",
            "&:hover": {
              backgroundColor: "#FFCF81",
            },
          }}
        >
          <RiHandHeartLine fontSize={35} color="grey" />
          <Typography textAlign={"center"}>Menu</Typography>
        </ListItem>
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "20px",
            cursor: "pointer",
            marginY: "10px",
            "&:hover": {
              backgroundColor: "#FFCF81",
            },
          }}
        >
          <HistoryOutlinedIcon sx={{ fontSize: 45 }} color="action" />
          <Typography textAlign={"center"}>Menu</Typography>
        </ListItem>
        {/* ))} */}
      </List>
    </Drawer>
  );
}
