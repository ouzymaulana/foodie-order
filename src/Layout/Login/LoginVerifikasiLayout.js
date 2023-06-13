import { Grid } from "@mui/material";
import Image from "next/image";
import React from "react";
import style from "./../../styles/LoginVerifikasi.module.scss";
import Head from "next/head";
import "@fontsource/inter/500.css"; // Specify weight

export default function LoginVerifikasiLayout({ children }) {
  return (
    <>
      {/* <Head>
        <link rel="stylesheet" href="/_next/fonts/HARLOWSI_1.woff" />
      </Head> */}
      <Grid
        display={"flex"}
        flexWrap={"wrap"}
        sx={{ height: "100vh" }}
        overflow={"hidden"}
      >
        <Grid flex={2}>
          <Image
            src="/img/pizza.png"
            className={style.gambar}
            width={1280}
            height={1280}
            // height={100}
            // width={100}
            // layout="responsive"
            alt="gambar"
          />
        </Grid>
        <Grid
          sx={{ backgroundColor: "white" }}
          display={"flex"}
          justifyContent={"center"}
          pt={25}
          flex={1.2}
        >
          {children}
        </Grid>
      </Grid>
    </>
  );
}
