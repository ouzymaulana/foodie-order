import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import ListTotal from './ListTotal';
import { useSelector } from 'react-redux';
import { selectDataCart } from '@/Redux/Slices/CartItemsSlice';
import axios from 'axios';
import Cookies from 'js-cookie';
import ConfirmCheckOut from '../Modal/ConfirmCheckOut';

export default function OrderMenu() {
  const cartItem = useSelector(selectDataCart);
  const [dataItemCart, setDataItemCart] = useState([]);
  const [itemMenu, setItemMenu] = useState([]);
  const token = Cookies.get('token');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [total, setTotal] = useState(0);

  const getOneMenu = async () => {
    try {
      const isDataItemCart = cartItem[0]?.menu || '';
      if (isDataItemCart) {
        const response = await axios.get(
          'http://localhost:5000/api/getMenuByidMenu',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              data: cartItem[0].menu,
            },
          }
        );
        if (response) {
          setItemMenu(response.data.data.menu);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setDataItemCart(cartItem[0]?.menu || []);
    getOneMenu();
  }, [cartItem]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'secondary.light',
          height: 'calc(100vh - 240px)',
        }}
        borderRadius={5}
        marginTop={'20px'}
        padding={2}
        display={'flex'}
        flexDirection={'column'}
      >
        <Box flex={1}>
          <Typography variant="h5" fontWeight={600}>
            Order Menu
          </Typography>
        </Box>
        <Typography variant="h6">Item</Typography>

        <Box
          flex={8}
          display={'flex'}
          flexDirection={'column'}
          gap={1}
          overflow={'auto'}
          marginBottom={1}
          sx={{
            '&::-webkit-scrollbar': {
              width: '0.3em',
              background: '#eeeeee',
            },
          }}
        >
          {dataItemCart.map((item, i) => {
            const isHasMenu = itemMenu.find((menu) => menu.id === item.idMenu);
            return <OrderItem key={i} menu={isHasMenu} item={item} />;
          })}
        </Box>
        <ListTotal total={total} setTotal={setTotal} itemMenu={itemMenu} />
        <Box flex={1} paddingTop={2}>
          <Button
            onClick={handleOpen}
            variant="contained"
            size="large"
            color="primary"
            sx={{
              borderRadius: '10px',
              height: '90%',
              width: '100%',
              fontWeight: '600',
            }}
            disableElevation
          >
            Checkout
          </Button>
        </Box>
      </Box>
      <ConfirmCheckOut
        dataItemCart={dataItemCart}
        menu={itemMenu}
        total={total}
        open={open}
        handleClose={handleClose}
        title="confirm order menu"
      />
    </>
  );
}
