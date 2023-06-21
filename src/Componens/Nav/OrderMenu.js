import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import OrderItem from "./OrderItem";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

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
      <Box
        flex={2}
        display={"flex"}
        flexDirection={"column"}
        sx={{ backgroundColor: "#eeeeee" }}
        borderRadius={3}
        paddingX={2}
      >
        <Box display={"flex"} flex={6}>
          <Box display={"flex"} justifyContent={"end"} alignItems={"center"}>
            <Typography>makan siang, Lantai 3, Ruang 2</Typography>
          </Box>
          <Box display={"flex"} justifyContent={"end"} alignItems={"center"}>
            <Typography>makan siang, Lantai 3, Ruang 2</Typography>
          </Box>
        </Box>
        <Box display={"flex"} flex={6}>
          <Box display={"flex"} justifyContent={"end"} alignItems={"center"}>
            <Typography>Total</Typography>
          </Box>
          <Box display={"flex"} justifyContent={"end"} alignItems={"center"}>
            <Typography>IDR 100.000</Typography>
          </Box>
        </Box>
        {/* <Box
          gap={2}
          display={"flex"}
          justifyContent={"end"}
          sx={{ backgroundColor: "red" }}
        >
          sdfs */}
        {/* <Paper
            sx={{
              backgroundColor: "#FAA41A",
              padding: "2px",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ModeEditOutlineOutlinedIcon color="dark" />
          </Paper> */}
        {/* </Box> */}
      </Box>
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
