import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Cookies from "js-cookie";
import axios from "axios";
import UpdateItemCart from "../Modal/UpdateItemCart";
import { useDispatch } from "react-redux";
import {
  deleteOneItemCart,
  incrementDecrementQuantity,
} from "@/Redux/Slices/CartItemsSlice";
import { formatCurrency } from "@/Helper/formatCurrency";

export default function OrderItem({ menu, item }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [itemMenu, setItemMenu] = useState();
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  const getOneMenu = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/menus", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: item.idMenu,
        },
      });
      if (response) {
        setItemMenu(response.data.data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecrementQuantity = () => {
    if (item.quantity !== 1) {
      const data = {
        idMenu: item.idMenu,
        status: "decrement",
      };
      dispatch(incrementDecrementQuantity(data));
    } else {
      dispatch(deleteOneItemCart(item.idMenu));
    }
  };
  const handleIncrementQuantity = () => {
    const data = {
      idMenu: item.idMenu,
      status: "increment",
    };
    dispatch(incrementDecrementQuantity(data));
  };

  useEffect(() => {
    getOneMenu();
  }, []);

  console.log("==============cart======================");
  console.log(menu);
  console.log("====================================");

  return (
    <>
      <Box display={"flex"}>
        <Image
          // src="/img/cocktail.jpg"
          src={`http://localhost:5000/images/` + menu?.gambar || ""}
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
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "140px",
            }}
            variant="body2"
            fontWeight={600}
            gutterBottom
          >
            {/* {itemMenu?.nama || ""} */}
            {menu?.nama || ""}
          </Typography>
          <Typography variant="body2" color="secondary" gutterBottom>
            {formatCurrency(item.quantity * menu?.harga || "")}
            {/* IDR {itemMenu?.harga || ""} */}
          </Typography>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "140px",
            }}
            variant="body2"
            color="secondary"
            gutterBottom
          >
            {item.catatanTambahan}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flex={3}
          justifyContent={"space-evenly"}
          alignItems={"center"}
        >
          <RemoveIcon
            sx={{ cursor: "pointer" }}
            onClick={() => handleDecrementQuantity()}
          />

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
          <AddIcon
            sx={{ cursor: "pointer" }}
            onClick={() => handleIncrementQuantity()}
          />
        </Box>
        <Box
          flex={1}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"end"}
          // sx={{ backgroundColor: "red" }}
        >
          <Paper
            // onClick={() => updateOrderNote()}
            elevation={0}
            onClick={handleOpen}
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

      <UpdateItemCart
        open={open}
        handleClose={handleClose}
        item={item}
        title="Please Fill The Form"
      />
    </>
  );
}
