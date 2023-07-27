import AdminLayout from "@/Layout/AdminLayout";
import MenuManagementView from "@/Views/Admin/MenuManagement";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import axios from "axios";

export default function menuManagement({
  getDataMenu,
  getTotalItem,
  sortByData,
  sortTypeData,
}) {
  return (
    <>
      <Head>
        <title>foodie order</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AdminLayout>
        <MenuManagementView
          getDataMenu={getDataMenu}
          getTotalItem={getTotalItem}
          sortByData={sortByData}
          sortTypeData={sortTypeData}
        />
      </AdminLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  let cookieHeader = context.req.headers.cookie;
  const { sortType, sortBy, search, field, page, limit, ...searchValues } =
    context.query;

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
  if (jwtData.role === "user") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let getDataMenu = [];
  let getTotalItem;
  let sortByData;
  let sortTypeData;
  try {
    const response = await axios.get("http://localhost:5000/api/admin/menu", {
      headers: {
        Authorization: `Bearer ${cookies}`,
      },
      params: {
        sortBy: sortBy || "createdAt",
        sortType: sortType || "desc",
        limit: limit || "10",
        page: page || "1",
        ...searchValues,
      },
    });

    if (response.status === 200) {
      getDataMenu = response.data.data.DataMenu || null;
      getTotalItem = response.data.data.totalItems || null;
      sortByData = response.data.data.sortBy;
      sortTypeData = response.data.data.sortType;
    }
  } catch (error) {
    console.error(error);
  }

  return {
    props: { getDataMenu, getTotalItem, sortByData, sortTypeData },
  };
}
