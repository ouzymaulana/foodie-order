import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function Navbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "transparent",
        height: "80px",
        width: "118rem",
        display: "flex",
        justifyContent: "center",
        boxShadow: "none",
      }}
    >
      <Typography variant="h6" noWrap component="div">
        Permanent drawer
      </Typography>
    </AppBar>
  );
}
