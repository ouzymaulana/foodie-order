import LoginVerifikasiLayout from '@/Layout/Login/LoginVerifikasiLayout';
import React from 'react';
import VerificationView from '@/Views/Verification';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import AlertMessageContextProvider from '@/Context/Alert/AlertContextProvider';
import isLogin from '@/Helper/Authorization';

export default function Verification() {
  return (
    <AlertMessageContextProvider>
      <LoginVerifikasiLayout>
        <VerificationView />
      </LoginVerifikasiLayout>
    </AlertMessageContextProvider>
  );
}

export async function getServerSideProps(context) {
  let cookieHeader = context.req.headers.cookie;
  const { token } = context.query;

  if (typeof cookieHeader !== 'string') {
    cookieHeader = '';
  }
  const cookies = cookie.parse(cookieHeader).token;
  const jwtData = jwt.decode(cookies);

  const authStatus = isLogin(jwtData, cookies);
  if (token === undefined && !authStatus) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  if (authStatus) return authStatus;

  return {
    props: {},
  };
}
