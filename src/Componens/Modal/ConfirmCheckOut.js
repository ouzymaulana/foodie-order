import React from "react";
import ModalLayout from "./ModalLayout";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { formatCurrency } from "@/Helper/formatCurrency";
import { useSelector } from "react-redux";
import { selectDataCart } from "@/Redux/Slices/CartItemsSlice";
import { grey } from "@mui/material/colors";

export default function ConfirmCheckOut({
  dataItemCart,
  menu,
  total,
  open,
  handleClose,
  title,
}) {
  const cartItem = useSelector(selectDataCart);
  return (
    <ModalLayout open={open} handleClose={handleClose} title={title}>
      <Grid display={"flex"} flexDirection={"column"}>
        {dataItemCart.map((item, i) => {
          const isHasMenu = menu.find((menu) => menu.id === item.idMenu);
          return (
            <Grid
              key={i}
              display={"flex"}
              flexDirection={"column"}
              borderBottom={1}
              color={grey[400]}
              paddingX={1}
              paddingTop={1}
            >
              <Box display={"flex"}>
                <Box paddingBottom={0} flex={1}>
                  <Image
                    src="/img/cocktail.jpg"
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
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  paddingX={1}
                  flex={8}
                >
                  <Typography
                    fontSize={18}
                    variant="subtitle1"
                    fontWeight={600}
                    color={"grey"}
                  >
                    {isHasMenu?.nama || ""}
                  </Typography>
                  <Typography fontSize={16} variant="subtitle2" color={"grey"}>
                    Quantity {item.quantity}
                  </Typography>
                </Box>
                <Box
                  flex={4}
                  display={"flex"}
                  justifyContent={"end"}
                  alignItems={"center"}
                >
                  <Typography variant="h6" color={"grey"}>
                    {formatCurrency(item.quantity * isHasMenu?.harga || "")}
                  </Typography>
                </Box>
              </Box>
              <Box paddingBottom={1}>
                <Typography variant="subtitle1" fontWeight={500} color={"grey"}>
                  Order Note
                </Typography>
                <Typography variant="subtitle1" color={"grey"}>
                  {item.catatanTambahan}
                </Typography>
              </Box>
            </Grid>
          );
        })}
        <Grid display={"flex"} flexDirection={"column"}>
          <Box display={"flex"} paddingX={1} paddingTop={1}>
            <Typography fontSize={18} flex={6}>
              Order time
            </Typography>
            <Typography fontSize={18} flex={6} textAlign={"end"} color={"grey"}>
              {cartItem[0].waktuPesanan}
            </Typography>
          </Box>
          <Box display={"flex"} paddingX={1}>
            <Typography fontSize={18} flex={6}>
              Table Location
            </Typography>
            <Typography fontSize={18} flex={6} textAlign={"end"} color={"grey"}>
              {cartItem[0].alamatAntar}
            </Typography>
          </Box>
        </Grid>
        <Grid display={"flex"} paddingX={1} paddingTop={1}>
          <Typography variant="h6" flex={6}>
            Total
          </Typography>
          <Typography variant="h6" flex={6} textAlign={"end"} color={"grey"}>
            {formatCurrency(total)}
          </Typography>
        </Grid>
        <Box flex={1} paddingTop={2}>
          <Button
            onClick={handleClose}
            variant="contained"
            size="large"
            color="primary"
            sx={{
              borderRadius: "10px",
              height: "90%",
              width: "100%",
              fontWeight: "600",
            }}
            disableElevation
          >
            Checkout
          </Button>
        </Box>
      </Grid>
    </ModalLayout>
  );
}
