import React from "react";
import ModalLayout from "../../ModalLayout";
import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";
import { useDetailMenuModal } from "@/Context/MenuManagement/DetailMenuContextProvider";
import { useDataDetailMenuModal } from "@/Context/MenuManagement/UpdateMenuModalContextProvider";
import Image from "next/image";
import { format } from "date-fns";
import { formatDate, homanFormatDate } from "@/Helper/formarDate";
import theme from "@/Helper/theme";
import { grey } from "@mui/material/colors";
import { formatCurrency } from "@/Helper/formatCurrency";

export default function DetailDataMenu({ title }) {
  const { openDetailMenu, setOpenDetailMenu } = useDetailMenuModal();
  const handleCloseDetailMenu = () =>
    setOpenDetailMenu({ ...openDetailMenu, isOpen: false });

  // const data = URL.createObjectURL()

  return (
    <ModalLayout
      open={openDetailMenu.isOpen}
      handleClose={handleCloseDetailMenu}
      title={title}
    >
      <Grid>
        <Grid width={"100%"}>
          <CardMedia
            sx={{
              borderRadius: "15px",
              objectFit: "cover",
              objectPosition: "center",
            }}
            component="img"
            alt="image-menu"
            height="300"
            image={
              `http://localhost:5000/images/` + openDetailMenu.data?.gambar ||
              ""
            }
          />
        </Grid>
        <Grid paddingTop={2}>
          <Grid
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h6" fontWeight={600}>
              {openDetailMenu.data?.nama || ""}
            </Typography>
            <Typography color={grey[600]} paddingTop={{ lg: 1 }}>
              {homanFormatDate(openDetailMenu.data?.createdAt) || ""}
            </Typography>
          </Grid>
          <Typography variant="h6">
            {formatCurrency(openDetailMenu.data?.harga) || ""}
          </Typography>
          <Typography>{openDetailMenu.data?.nama_tempat || ""}</Typography>
          <Typography width={"80%"}>
            {openDetailMenu.data?.alamat || ""}
          </Typography>
        </Grid>
        <Box flex={1} paddingTop={2}>
          <Button
            onClick={handleCloseDetailMenu}
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
            Close
          </Button>
        </Box>
      </Grid>
    </ModalLayout>
  );
}
