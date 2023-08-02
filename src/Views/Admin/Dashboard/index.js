import CartDashboard from "@/Componens/Card/CartDasboard";
import { Backdrop, CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import DataOrderMenu from "./DataOrderMenu";
import CollapsibleTable from "./DataOrderTable";
import FilterCard from "@/Componens/Popover/FilterCard";
import { useDataSelectFilter } from "@/Context/SelectFilterCardContextProvider";
import { useLoadingCircularProgress } from "@/Context/LoadingCircularProgressContextProvider";

export default function DashboardView({ getOrderData }) {
  const { selectFilter, setSelectFilter } = useDataSelectFilter();
  const { setOpenLoadingCircular } = useLoadingCircularProgress();
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
      setOpenLoadingCircular(false);

      if (response.data.status !== "fail") {
        setOrderData(response.data.data.orderData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrderMenu();
    setOpenLoadingCircular(false);
  }, [selectFilter]);

  const columns = [
    {
      label: "User Name",
      field: "nama",
      routefield: "user-name",
      minWidth: 170,
      filter: "inputText",
      sort: false,
    },
    {
      label: "Order Time",
      field: "waktu_pemesanan",
      routefield: "order-time",
      minWidth: 170,
      filter: "inputSelect",
      sort: false,
      selectData: [
        { text: "all", value: "all" },
        { text: "siang", value: "siang" },
        { text: "sore", value: "sore" },
      ],
    },
    {
      label: "Order Date",
      field: "createdAt",
      routefield: "order-date",
      minWidth: 170,
      filter: "inputDate",
      sort: true,
    },
    {
      label: "Delivery Address",
      field: "alamat_antar",
      routefield: "delivery-address",
      minWidth: 170,
      filter: "inputText",
      sort: false,
    },
    {
      label: "Status",
      field: "status",
      routefield: "status",
      minWidth: 170,
      filter: "inputSelect",
      sort: false,
      selectData: [
        { text: "all", value: "all" },
        { text: "siang", value: "siang" },
        { text: "sore", value: "sore" },
      ],
    },
    {
      label: "Total Pay",
      field: "total_bayar",
      routefield: "total-pay",
      minWidth: 170,
      filter: "inputNumber",
      sort: true,
    },
    {
      label: "",
      field: "action",
      minWidth: 0,
      filter: "",
      sort: false,
      action: true,
      actionLable: "orderMenu",
    },
  ];
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
            height: "calc(100vh - 40px - 13px)",
            // height: "calc(100vh - 80px - 20px - 10rem - 40px - 20px)",
          }}
          width={"100%"}
          overflow={"hidden"}
          padding={3}
          display={"flex"}
          flexDirection={"column"}
          // gap={2}
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
