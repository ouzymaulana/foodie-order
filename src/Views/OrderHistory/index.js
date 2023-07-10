import CartOrderHistory from "@/Componens/Card/CartOrderHistory";
import Balance from "@/Componens/Nav/Balance";
import OrderMenu from "@/Componens/Nav/OrderMenu";
import { useDataSelectMenu } from "@/Context/SelectMenuSidebarContexProvider";
import { Button, CardMedia, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

export default function OrderHistoryView() {
  const token = Cookies.get("token");
  const { selectMenu, setSelectMenu } = useDataSelectMenu();
  const [orderData, setOrderData] = useState();

  const getOrderData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/pemesanan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.data.orderData) {
        setOrderData(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log("====================================");
  console.log(orderData);
  console.log("====================================");
  useEffect(() => {
    setSelectMenu("orderHistory");
    getOrderData();
  }, []);
  return (
    <Grid display={"flex"} sx={{ height: "calc(100vh - 120px)", gap: "20px" }}>
      <Grid
        flex={9}
        display={"flex"}
        flexDirection={"column"}
        overflow={"auto"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "0em",
          },
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Order History
        </Typography>
        <Grid
          display={"flex"}
          flexWrap={"wrap"}
          columnGap={11.3}
          rowGap={5}
          paddingX={5}
          // gap={5.2}
          marginTop={2}
          paddingBottom={3}
        >
          {/* {orderData.map((item, i) => ( */}
          <CartOrderHistory item={"item"} />

          {/* <CartOrderHistory /> */}
          {/* {dataFavorite.map((item, i) => (
          <CardMenu
            item={item}
            isFavorite={true}
            handleAddFavoriteMenu={handleAddFavoriteMenu}
            key={i}
          />
        ))} */}
        </Grid>
      </Grid>
      <Grid flex={3}>
        <Balance />
        <OrderMenu />
      </Grid>
    </Grid>
  );
}
