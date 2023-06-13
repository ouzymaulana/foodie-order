import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import cookie from "cookie";
import { Typography } from "@mui/material";
import MainLayout from "@/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MainLayout>
        <Typography variant="h3">Ouzy</Typography>
      </MainLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookieHeader = context.req.headers.cookie;

  if (!cookieHeader) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  // Mendapatkan header cookies dari permintaan
  const cookies = cookie.parse(cookieHeader).token;
  // Lakukan sesuatu dengan cookies
  console.log(cookies);
  if (!cookies) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      // ...
    },
  };
}