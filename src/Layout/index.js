import {
  AppBar,
  Box,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import Navbar from "@/Componens/Header/Index";
import { IconContext } from "react-icons";
import { FaHandHoldingHeart, FaHandsHolding } from "react-icons/fa";
import { RiHandHeartLine } from "react-icons/ri";
import SideBarMenu from "@/Componens/SideBar";
import SearchValueContextProvider from "@/Context/SearchValueContextProvider";

export default function MainLayout({ children }) {
  return (
    <>
      <SearchValueContextProvider>
        <Navbar />
        <SideBarMenu />

        <Grid
          sx={{
            backgroundColor: "#F1F1F1",
            // height: "20vh",
            height: "calc(100vh - 80px)",
            marginTop: "80px",
            marginLeft: "10rem",
            padding: "20px",
          }}
        >
          {children}
        </Grid>
      </SearchValueContextProvider>
    </>
  );
}
