import {
  Box,
  Card,
  CardActions,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Inter } from "next/font/google";
import AddToCart from "../Modal/AddToCart";
const inter = Inter({ subsets: ["latin"] });
export default function CardMenu({
  item,
  isFavorite,
  handleAddFavoriteMenu,
  handleOpen,
}) {
  return (
    <>
      <Card
        elevation={0}
        sx={{
          width: 240,
          borderRadius: "20px",
          overflow: "hidden",
          padding: "10px",
        }}
      >
        <Box position={"relative"}>
          <Box
            onClick={() => handleAddFavoriteMenu(item.id)}
            aria-label="delete"
            size="small"
            sx={{
              position: "absolute",
              right: "10px",
              top: "5px",
              cursor: "pointer",
            }}
          >
            <FavoriteIcon
              sx={{
                color:
                  isFavorite === true ? "#CD1818" : "rgba(255, 255, 255, 0.5)",
                fontSize: 30,
              }}
            />
          </Box>
          <CardMedia
            sx={{ borderRadius: "15px" }}
            component="img"
            alt="green iguana"
            height="180"
            image="/img/cocktail.jpg"
          />
        </Box>
        <Box display={"flex"}>
          <Box sx={{ flex: 1, paddingX: "5px", paddingTop: "5px" }}>
            <Typography
              gutterBottom
              variant="h6"
              className={inter.className}
              fontWeight={600}
            >
              {item.nama}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              color={"primary"}
              fontWeight={500}
            >
              IDR {item.harga}
            </Typography>
          </Box>
          {/* <CardActions onClick={() => handleAddToCart(item.id)}> */}
          <CardActions onClick={handleOpen}>
            <IconButton color="primary" aria-label="add to shopping cart">
              <AddShoppingCartIcon />
            </IconButton>
          </CardActions>
        </Box>
      </Card>
    </>
  );
}
