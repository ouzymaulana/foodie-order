import {
  AppBar,
  Box,
  Drawer,
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
import Navbar from "@/Componens/Navbar/Index";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <Drawer
        sx={{
          position: "relative",
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
        <List>
          {["Menu", "Favorite", "Order History"].map((text, index) => (
            <ListItem key={text}>
              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "20px",
                  width: "20rem",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#FFCF81",
                  },
                }}
              >
                {/* <ListItemIcon> */}
                <WidgetsOutlinedIcon sx={{ fontSize: 40 }} color="action" />
                {/* </ListItemIcon> */}
                <Typography>{text}</Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
