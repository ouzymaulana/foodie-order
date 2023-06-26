import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import Cookies from "js-cookie";
import { useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDataSearchMenu } from "@/Context/SearchValueContextProvider";
import CardMenuLoading from "@/Componens/Loading/CardMenuLoading";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { useDispatch, useSelector } from "react-redux";
import {
  addDataFavorite,
  deleteDataByIdMenu,
  selectDataFavorite,
  setDataFavorite,
} from "@/Redux/Slices/FavoriteMenuSlice";
import CardMenu from "@/Componens/Card";
import { Inter } from "next/font/google";
import AddToCart from "@/Componens/Modal/AddToCart";
const inter = Inter({ subsets: ["latin"] });

export default function MenuItem() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const { searchValue, setSearchValue } = useDataSearchMenu();
  const [totalItems, setTotalItems] = useState(0);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [loadingMenuTimer, setLoadingMenuTimer] = useState();
  const dataFavorite = useSelector(selectDataFavorite);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const route = useRouter();

  const token = Cookies.get("token");
  const listInnerRef = useRef(null);

  const fetchData = async () => {
    setLoadingMenu(true);
    try {
      setData([]);
      const response = await axios.get("http://localhost:5000/api/menu", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          kategori: route.query.kategori,
          page,
          limit,
          nama: route.query.search,
        },
      });

      if (data == "") {
        setData(response.data.data);
      } else {
        setData((prevData) => [...prevData, ...response.data.data]);
      }
      setTotalItems(response.data.totalItems);
      setHasMore(response.data.hasMore);
      // setPage(page + 1);
      setLoadingMenu(false);
    } catch (error) {
      console.error(error);
    }
    setLoadingMenu(false);
  };

  useEffect(() => {
    setPage(1);
    setData([]);
    fetchData();
  }, [route.query.kategori, route.query.search]);

  const handleAddFavoriteMenu = async (id_menu) => {
    const emailLogin = jwt.decode(token);
    // verify secretKey
    try {
      const response = await axios.post("http://localhost:5000/api/favorite", {
        data: {
          id_menu,
          email: emailLogin.email,
        },
      });

      if (response.data.data.message === "Delete") {
        dispatch(deleteDataByIdMenu(id_menu));
        // fetchData();
        getDataFavorite();
      }

      if (response.data.data.message === "Create") {
        const getDataMenu = data.find((menu) => menu.id === id_menu);
        dispatch(addDataFavorite(getDataMenu));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDataFavorite = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/favorite", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.data.data);

      if (response.status === 200) {
        dispatch(setDataFavorite(response.data.data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataFavorite();
  }, []);

  return (
    <>
      <Typography variant="h5" fontWeight={600}>
        Menu
      </Typography>
      <Grid
        display={"flex"}
        flexWrap={"wrap"}
        gap={"42.7px"}
        // gap={5.2}
        marginTop={2}
        paddingBottom={3}
      >
        {loadingMenu && <CardMenuLoading />}
        {!loadingMenu &&
          data.map((item, i) => {
            const isFavorite = dataFavorite.some(
              (favorite) => favorite.id === item.id
            );
            return (
              <CardMenu
                item={item}
                isFavorite={isFavorite}
                handleAddFavoriteMenu={handleAddFavoriteMenu}
                handleOpen={handleOpen}
                key={i}
              />
            );
          })}
      </Grid>
      <AddToCart open={open} handleClose={handleClose} />
      {/* <div
        id="scroll-trigger"
        style={{ height: "0px" }}
        // onScroll={handleScroll}
        ref={listInnerRef}
      ></div> */}
    </>
  );
}
