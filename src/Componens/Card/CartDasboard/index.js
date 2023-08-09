import FilterCard from "@/Componens/Popover/FilterCard";
import { useDataSelectFilter } from "@/Context/SelectFilterCardContextProvider";
import { formatCurrency } from "@/Helper/formatCurrency";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

export default function CartDashboard({
  selectFilter,
  orderData,
  getOrderMenu,
}) {
  const orderOnProgress = orderData.filter(
    (item) => item.status === "progress"
  );
  const orderDone = orderData.filter((item) => item.status === "done");

  const incomingBalance = orderData.reduce(
    (total, order) => total + order.total_bayar,
    0
  );

  useEffect(() => {
    getOrderMenu();
  }, [selectFilter]);

  return (
    <Grid display={"flex"} flexDirection={"column"} gap={3}>
      <Grid display={"flex"} flexDirection={"column"} gap={1}>
        <FilterCard />
        <Grid
          display={"flex"}
          flexWrap={"wrap"}
          gap={{ md: 4, xs: 2 }}
          // flexDirection={{ lg: "row", sm: "column" }}
          justifyContent={"space-between"}
        >
          <Grid
            width={"25rem"}
            height={"10rem"}
            borderRadius={4}
            sx={{ backgroundColor: "white" }}
            padding={2}
            display={"flex"}
            flexDirection={"column"}
          >
            <Grid flex={6}>
              <Typography variant="h5" fontWeight={600}>
                Order Total
              </Typography>
            </Grid>
            <Grid
              flex={6}
              display={"flex"}
              justifyContent={"end"}
              alignItems={"end"}
            >
              <Typography variant="h4" fontWeight={600}>
                {orderData.length || 0}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            width={"25rem"}
            height={"10rem"}
            borderRadius={4}
            sx={{ backgroundColor: "white" }}
            padding={2}
            display={"flex"}
            flexDirection={"column"}
          >
            <Grid flex={6}>
              <Typography variant="h5" fontWeight={600}>
                Order On Progress
              </Typography>
            </Grid>
            <Grid
              flex={6}
              display={"flex"}
              justifyContent={"end"}
              alignItems={"end"}
            >
              <Typography variant="h4" fontWeight={600}>
                {orderOnProgress.length || 0}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            width={"25rem"}
            height={"10rem"}
            borderRadius={4}
            sx={{ backgroundColor: "white" }}
            padding={2}
            display={"flex"}
            flexDirection={"column"}
          >
            <Grid flex={6}>
              <Typography variant="h5" fontWeight={600}>
                Order Completed
              </Typography>
            </Grid>
            <Grid
              flex={6}
              display={"flex"}
              justifyContent={"end"}
              alignItems={"end"}
            >
              <Typography variant="h4" fontWeight={600}>
                {orderDone.length || 0}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            width={"25rem"}
            height={"10rem"}
            borderRadius={4}
            sx={{ backgroundColor: "white" }}
            padding={2}
            display={"flex"}
            flexDirection={"column"}
          >
            <Grid flex={6}>
              <Typography variant="h5" fontWeight={600}>
                Incoming Balance
              </Typography>
            </Grid>
            <Grid
              flex={6}
              display={"flex"}
              justifyContent={"end"}
              alignItems={"end"}
            >
              <Typography variant="h4" fontWeight={600}>
                {formatCurrency(incomingBalance)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
