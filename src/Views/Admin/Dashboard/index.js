import CartDashboard from "@/Componens/Card/CartDasboard";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import DataOrderMenu from "./DataOrderMenu";
import CollapsibleTable from "./DataOrderTable";
import FilterCard from "@/Componens/Popover/FilterCard";
import { useDataSelectFilter } from "@/Context/SelectFilterCardContextProvider";

export default function DashboardView({ getOrderData }) {
  const { selectFilter, setSelectFilter } = useDataSelectFilter();
  const [orderData, setOrderData] = useState([]);
  const token = Cookies.get("token");

  const getOrderMenu = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/order-menu", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          createdAt: selectFilter,
        },
      });

      if (response.status === 200) {
        setOrderData(response.data.data.orderData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrderMenu();
  }, [selectFilter]);

  return (
    <>
      <Grid display={"flex"} flexDirection={"column"} gap={5}>
        <CartDashboard
          selectFilter={selectFilter}
          orderData={orderData}
          getOrderMenu={getOrderMenu}
        />
        <Grid
          borderRadius={4}
          sx={{
            backgroundColor: "white",
            height: "calc(100vh - 80px - 20px - 10rem - 40px - 20px)",
          }}
          width={"100%"}
          overflow={"hidden"}
          padding={3}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
        >
          <Grid>
            <Typography variant="h6" fontWeight={600}>
              Order Menu
            </Typography>
          </Grid>
          <DataOrderMenu orderData={orderData} getOrderData={getOrderData} />
        </Grid>
      </Grid>
    </>
  );
}
