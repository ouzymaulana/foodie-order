import LoginVerifikasiLayout from '@/Layout/Login/LoginVerifikasiLayout';
import React from 'react';
import VerificationView from '@/Views/Verification';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import AlertMessageContextProvider from '@/Context/Alert/AlertContextProvider';

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
  let checkRole;
  if (jwtData) {
    checkRole = jwtData.role === 'admin' ? '/admin' : '/';
  } else if (token === undefined) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
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
