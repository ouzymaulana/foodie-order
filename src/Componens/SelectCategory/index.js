import { usePageMenu } from "@/Context/PageContextProvider";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function SelectByCategory() {
  const { page, setPage } = usePageMenu();
  const route = useRouter();

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
            width: 115,
            height: 120,
          },
        }}
        gap={6}
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
            <Image src={item.img} height={50} width={50} alt="icon" />
          </Paper>
        ))}
      </Box>
    </Grid>
  );
}
