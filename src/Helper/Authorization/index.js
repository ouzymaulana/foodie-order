export default function isLogin(jwtData, cookies) {
  let checkRole;
  if (jwtData) {
    checkRole = jwtData.role === 'admin' ? '/admin' : '/';
  }

  if (cookies) {
    return {
      redirect: {
        destination: checkRole,
        permanent: false,
      },
    };
  }
}

// export function (params) {

// }
