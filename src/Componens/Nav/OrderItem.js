import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Cookies from "js-cookie";

export default function OrderItem({ item }) {
  const token = Cookies.get("token");

  // useEffect(async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/one-menu", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //   } catch (error) {}
  // }, []);

  console.log("===item=================================");
  console.log(item);
  console.log("====================================");
  return (
    <Box display={"flex"}>
      <Image
        src="/img/cocktail.jpg"
        height={80}
        width={80}
        alt="gambar-menu"
        style={{
          borderRadius: "15px",
          flex: "1.5",
          objectPosition: "center",
          objectFit: "cover",
        }}
      />
      <Box
        flex={3}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"start"}
        justifyContent={"center"}
        paddingLeft={1}
      >
        <Typography variant="body2" fontWeight={600} gutterBottom>
          Nasi Uduk
        </Typography>
        <Typography variant="body2" color="secondary" gutterBottom>
          IDR 50.000.00
        </Typography>
      </Box>
      <Box
        display={"flex"}
        flex={3}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <RemoveIcon sx={{ cursor: "pointer" }} />

        <Paper
          sx={{
            padding: "5px",
            height: "25px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {item.quantity}
        </Paper>
        <AddIcon sx={{ cursor: "pointer" }} />
      </Box>
      <Box
        flex={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"end"}
        // sx={{ backgroundColor: "red" }}
      >
        <Paper
          sx={{
            backgroundColor: "#FAA41A",
            padding: "2px",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ModeEditOutlineOutlinedIcon color="dark" />
        </Paper>
      </Box>
    </Box>
  );
}
