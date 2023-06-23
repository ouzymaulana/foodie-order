import CardMenuLoading from "@/Componens/Loading/CardMenuLoading";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Inter } from "next/font/google";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDataByIdMenu,
  ifHasDataFavorite,
  selectDataFavorite,
  setDataFavorite,
} from "@/Redux/Slices/FavoriteMenuSlice";
import jwt from "jsonwebtoken";
import InfiniteScroll from "react-infinite-scroll-component";
const inter = Inter({ subsets: ["latin"] });

export default function FavoriteMenuItem() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const token = Cookies.get("token");
  const listInnerRef = useRef(null);

  const dataFavorite = useSelector(selectDataFavorite);
  const dispatch = useDispatch();

  const getDataFavorite = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api-favorite/favorite",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(setDataFavorite(response.data.data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const renderIfDeleteFavoriteMenu = (id_menu) => {
  //   dispatch(deleteDataByIdMenu(id_menu));

  // }

  const handleAddFavoriteMenu = async (id_menu) => {
    const emailLogin = jwt.decode(token);

    try {
      const response = await axios.post(
        "http://localhost:5000/api-favorite/favorite",
        {
          data: {
            id_menu,
            email: emailLogin.email,
          },
        }
      );

      if (response.data.status === "success") {
        dispatch(deleteDataByIdMenu(id_menu));
        getDataFavorite();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataFavorite();
  }, []);

  console.log(hasMore);
  return (
    <>
      {/* <InfiniteScroll
        dataLength={dataFavorite.length}
        next={getDataFavorite}
        hasMore={hasMore}
        loader={<h4>Looding...</h4>}
      ></InfiniteScroll> */}
      <Typography variant="h5" fontWeight={600}>
        Favorite Menu
      </Typography>
      <Grid
        display={"flex"}
        flexWrap={"wrap"}
        gap={"42.7px"}
        // gap={5.2}
        marginTop={2}
        paddingBottom={3}
      >
        {/* {loadingMenu && <CardMenuLoading />}
        {!loadingMenu && */}
        {dataFavorite.map((item, i) => (
          <Card
            elevation={0}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: 240,
              borderRadius: "20px",
              overflow: "hidden",
              padding: "10px",
            }}
            key={i}
          >
            <Box position={"relative"} flex={6}>
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
                    color: "#CD1818",
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
            <Grid flex={6} display={"flex"} flexDirection={"column"}>
              {/* <Box sx={{ flex: 1, paddingX: "5px", paddingTop: "5px" }}> */}
              <Grid flex={1}>
                <Typography
                  gutterBottom
                  fontSize={19}
                  className={inter.className}
                  fontWeight={600}
                  paddingTop={0.5}
                >
                  {item.nama}
                </Typography>
              </Grid>
              <Grid
                flex={1}
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                // sx={{ backgroundColor: "blue" }}
                height={2}
              >
                <Typography
                  flex={5}
                  gutterBottom
                  fontSize={18}
                  color={"primary"}
                  fontWeight={600}
                >
                  IDR {item.harga}
                </Typography>
                <CardActions
                  sx={{
                    flex: 2,
                    // backgroundColor: "yellow",
                    justifyContent: "end",
                    display: "flex",
                  }}
                >
                  <IconButton color="primary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon />
                  </IconButton>
                </CardActions>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Grid>
      <div
        id="scroll-trigger"
        style={{ height: "0px" }}
        // onScroll={handleScroll}
        ref={listInnerRef}
      ></div>
    </>
  );
}
