import { usePageMenu } from "@/Context/PageContextProvider";
import { Box, Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function SelectByCategory() {
  const isDesktop = useMediaQuery("(min-width:900px)");
  const { page, setPage } = usePageMenu();
  const route = useRouter();

  const data = isDesktop ? 50 : 30;

  const kategori = [
    { nama: "heavy-meal", img: "/img/makananberat.svg" },
    { nama: "snack", img: "/img/Snack.svg" },
    { nama: "drink", img: "/img/drink.svg" },
    { nama: "juice", img: "/img/Juice.svg" },
  ];
  return (
    <Grid>
      <Typography variant="h6" fontWeight={500}>
        Category
      </Typography>
      <Box
        justifyContent={"center"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: { md: 115, xs: 60 },
            height: { md: 120, xs: 65 },
          },
        }}
        gap={{ md: 6, xs: 2 }}
      >
        {kategori.map((item, i) => (
          <Paper
            key={i}
            onClick={() => {
              setPage(1), route.push(`/kategori/${item.nama}`);
            }}
            elevation={0}
            sx={{
              borderRadius: "15px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src={item.img} height={data} width={data} alt="icon" />
          </Paper>
        ))}
      </Box>
    </Grid>
  );
}
