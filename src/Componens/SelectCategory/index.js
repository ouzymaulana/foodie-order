import { Box, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function SelectByCategory({
  selectByCategory,
  setSelectByCategory,
}) {
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
        <Paper
          onClick={() => {
            setSelectByCategory("heavy meal");
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
          <Image
            src="/img/makananberat.svg"
            height={50}
            width={50}
            alt="icon"
          />
        </Paper>
        <Paper
          onClick={() => {
            setSelectByCategory("snack");
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
          <Image src="/img/Snack.svg" height={50} width={50} alt="icon" />
        </Paper>
        <Paper
          onClick={() => {
            setSelectByCategory("drinks");
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
          <Image src="/img/drink.svg" height={50} width={50} alt="icon" />
        </Paper>
        <Paper
          onClick={() => {
            setSelectByCategory("juice");
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
          <Image src="/img/Juice.svg" height={50} width={50} alt="icon" />
        </Paper>
      </Box>
    </Grid>
  );
}
