import CartOrderHistory from '@/Componens/Card/CartOrderHistory/CartOrderHistory';
import Balance from '@/Componens/Nav/Balance';
import OrderMenu from '@/Componens/Nav/OrderMenu';
import { useDataSelectMenu } from '@/Context/SelectMenuSidebarContexProvider';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

export default function OrderHistoryView() {
  const token = Cookies.get('token');
  const { setSelectMenu } = useDataSelectMenu();
  const [orderData, setOrderData] = useState([]);
  const isDesktop = useMediaQuery('(min-width:900px)');

  const getOrderData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pemesanan', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.data.orderData) {
        setOrderData(response.data.data.orderData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setSelectMenu('orderHistory');
    getOrderData();
  }, []);
  return (
    <Grid display={'flex'} sx={{ height: 'calc(100vh - 120px)', gap: '20px' }}>
      <Grid
        flex={9}
        display={'flex'}
        flexDirection={'column'}
        overflow={'auto'}
        sx={{
          '&::-webkit-scrollbar': {
            width: '0em',
          },
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Order History
        </Typography>
        <Grid
          display={'flex'}
          flexDirection={'column'}
          gap={2}
          marginTop={2}
          paddingBottom={3}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {orderData.map((item, i) => (
            <CartOrderHistory key={i} item={item} />
          ))}
        </Grid>
      </Grid>
      {isDesktop && (
        <Grid flex={3}>
          <Balance />
          <OrderMenu />
        </Grid>
      )}
    </Grid>
  );
}
