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
import { Inter } from "next/font/google";
import axios from "axios";
import Cookies from "js-cookie";
import { useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDataSearchMenu } from "@/Context/SearchValueContextProvider";
import CardMenuLoading from "@/Componens/Loading/CardMenuLoading";
import { useRouter } from "next/router";
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

  const route = useRouter();

  const token = Cookies.get("token");
  const listInnerRef = useRef(null);

  const fetchData = async () => {
    setLoadingMenu(true);
    try {
      console.log("jalan");
      setData([]);
      const response = await axios.get("http://localhost:5000/menu", {
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
    try {
      const response = await axios.post("http://localhost:5000/favorite", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          id_menu,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
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
          data.map((item, i) => (
            <Card
              elevation={0}
              sx={{
                width: 240,
                borderRadius: "20px",
                overflow: "hidden",
                padding: "10px",
              }}
              key={i}
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
                      color: "rgba(255, 255, 255, 0.5)",
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
                <CardActions>
                  <IconButton color="primary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon />
                  </IconButton>
                </CardActions>
              </Box>
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
