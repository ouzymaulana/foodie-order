import {
  Divider,
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
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import { useDataSelectMenu } from "@/Context/SelectMenuSidebarContexProvider";

export default function AdminSideBar() {
  const { selectMenu, setSelectMenu } = useDataSelectMenu();
  return (
    <Drawer
      sx={{
        position: "relative",
        border: "0",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "18rem",
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar
        sx={{
          height: "80px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image src="/img/logo.svg" height={100} width={100} alt="logo" />
      </Toolbar>
      <Divider variant="middle" />
      <List>
        <ListItem sx={{ paddingX: 3 }}>
          <ListItemButton
            sx={{
              borderRadius: 3.5,
              ...(selectMenu === "" && {
                backgroundColor: "#FFBA53",
                "&:hover": {
                  backgroundColor: "#FFBA53",
                },
              }),
            }}
          >
            <ListItemIcon>
              <DashboardCustomizeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ paddingX: 3 }}>
          <ListItemButton sx={{ borderRadius: 3.5 }}>
            <ListItemIcon>
              <FastfoodRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"Menu Management"} />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ paddingX: 3 }}>
          <ListItemButton sx={{ borderRadius: 3.5 }}>
            <ListItemIcon>
              <GroupRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"User Management"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
