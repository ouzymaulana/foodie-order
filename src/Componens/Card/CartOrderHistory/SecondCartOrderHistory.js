import { Button, CardMedia, Divider, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { formatCurrency } from "@/Helper/formatCurrency";
import SecondItemOrderHistory from "./SecondItemOrderHistory";

export default function SecondCartOrderHistory({ item }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      // second: "2-digit",
    });
  };
  return (
    <Grid
      display={"flex"}
      width={800}
      sx={{ backgroundColor: "white" }}
      padding={1.6}
      borderRadius={2.5}
      flexDirection={"column"}
    >
      <Grid display={"flex"} paddingY={1}>
        <Grid flex={4}>
          <Typography variant="h6" color={grey[500]}>
            order time : {item.waktu_pemesanan}
          </Typography>
        </Grid>
        <Grid flex={4}>
          <Typography variant="h6" color={grey[500]}>
            total amount : {formatCurrency(item.total_bayar)}
          </Typography>
        </Grid>
        <Grid flex={4} display={"flex"} justifyContent={"end"}>
          <Typography variant="h6" color={grey[500]}>
            {formatDate(item.createdAt)}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      {item.tb_order_details.map((menu, i) => (
        <SecondItemOrderHistory itemOrder={menu} key={i} />
      ))}
    </Grid>
  );
}
