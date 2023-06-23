import { Box, Button, Typography } from "@mui/material";
import React from "react";
import OrderItem from "./OrderItem";
import ListTotal from "./ListTotal";

export default function OrderMenu() {
  return (
    <Box
      sx={{ backgroundColor: "white", height: "calc(100vh - 240px)" }}
      borderRadius={5}
      marginTop={"20px"}
      padding={2}
      display={"flex"}
      flexDirection={"column"}
    >
      <Box flex={1}>
        <Typography variant="h5" fontWeight={600}>
          Order Menu
        </Typography>
      </Box>
      <Box
        flex={8}
        display={"flex"}
        flexDirection={"column"}
        gap={1}
        overflow={"auto"}
        marginBottom={1}
        sx={{
          "&::-webkit-scrollbar": {
            width: "0.3em",
            background: "#eeeeee",
          },
        }}
      >
        <Typography variant="h6">Item</Typography>
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
      </Box>
      <ListTotal />
      <Box flex={1} paddingTop={2}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          sx={{
            borderRadius: "10px",
            height: "90%",
            width: "100%",
            fontWeight: "600",
          }}
          disableElevation
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
}
