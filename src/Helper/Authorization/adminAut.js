export default function adminAut(jwtData, cookies) {
  if (!cookies) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  if (jwtData.role === 'user') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}
