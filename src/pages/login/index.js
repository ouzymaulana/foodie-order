import React from "react";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import LoginView from "@/Views/Login";
import AlertMessageContextProvider from "@/Context/Alert/AlertContextProvider";

export default function Login() {
  return (
    <AlertMessageContextProvider>
      <LoginView />
    </AlertMessageContextProvider>
  );
}

export async function getServerSideProps(context) {
  let cookieHeader = context.req.headers.cookie;

  if (typeof cookieHeader !== "string") {
    cookieHeader = "";
  }
  const cookies = cookie.parse(cookieHeader).token;
  const jwtData = jwt.decode(cookies);
  let checkRole;
  if (jwtData) {
    checkRole = jwtData.role === "admin" ? "/admin" : "/";
  }

  if (cookies) {
    return {
      redirect: {
        destination: checkRole,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
