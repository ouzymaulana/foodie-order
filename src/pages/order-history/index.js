import { useDataSelectMenu } from "@/Context/SelectMenuSidebarContexProvider";
import MainLayout from "@/Layout";
import OrderHistoryView from "@/Views/OrderHistory";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export default function OrderHistory() {
  return (
    <>
      <Head>
        <title>Foodie Order</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MainLayout>
        <OrderHistoryView />
      </MainLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  let cookieHeader = context.req.headers.cookie;

  if (typeof cookieHeader !== "string") {
    cookieHeader = "";
  }
  const cookies = cookie.parse(cookieHeader).token;
  if (!cookies) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const jwtData = jwt.decode(cookies);
  if (jwtData.role === "admin") {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
