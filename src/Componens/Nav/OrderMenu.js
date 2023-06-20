import { Box, Typography } from "@mui/material";
import React from "react";

export default function OrderMenu() {
  return (
    <Box
      sx={{ backgroundColor: "white", height: "calc(100vh - 240px)" }}
      borderRadius={5}
      marginTop={"20px"}
      padding={2}
    >
      <Typography variant="h5" fontWeight={600}>
        Order Menu
      </Typography>
    </Box>
  );
}
