import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useSelector } from 'react-redux';
import { selectDataCart } from '@/Redux/Slices/CartItemsSlice';
import UpdateOrderLocAndTime from '../Modal/UpdateOrderLocAndTime';
import { formatCurrency } from '@/Helper/formatCurrency';

function calculateTotal(cartItem, itemMenu) {
  let total = 0;
  const isHasCartItem = cartItem[0]?.menu || '';
  if (isHasCartItem !== '') {
    isHasCartItem.forEach((item) => {
      const menuItem = itemMenu.find((menu) => menu.id === item.idMenu);
      if (menuItem) {
        total += menuItem.harga * item.quantity;
      }
    });
  }
  return total;
}
export default function ListTotal({ total, setTotal, itemMenu }) {
  const cartItem = useSelector(selectDataCart);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = calculateTotal(cartItem, itemMenu);
    setTotal(newTotal);
  }, [cartItem, itemMenu]);

  return (
    <>
      <Box
        flex={2}
        display={'flex'}
        flexDirection={'column'}
        sx={{ backgroundColor: 'secondary.dark' }}
        // sx={{ backgroundColor: '#eeeeee' }}
        borderRadius={3}
        paddingX={2}
      >
        {cartItem.length !== 0 ? (
          <Box display={'flex'} flex={6}>
            <Box
              display={'flex'}
              flexDirection={'column'}
              // alignItems={"center"}
              pt={1}
              flex={5}
            >
              <Typography>{cartItem[0]?.waktuPesanan || ''}</Typography>
              <Typography>{cartItem[0]?.alamatAntar || ''}</Typography>
            </Box>
            <Grid
              display={'flex'}
              justifyContent={'end'}
              position={'relative'}
              alignItems={'center'}
              flex={5}
            >
              <Paper
                elevation={0}
                onClick={handleOpen}
                sx={{
                  backgroundColor: '#FAA41A',
                  padding: '2px',
                  display: 'flex',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ModeEditOutlineOutlinedIcon />
              </Paper>
            </Grid>
          </Box>
        ) : (
          ''
        )}
        <Box display={'flex'} flex={6} color="secondary">
          <Box display={'flex'} flex={5} alignItems={'center'}>
            <Typography variant="h5" fontWeight={600} color="secondary">
              Total
            </Typography>
          </Box>
          <Box
            display={'flex'}
            flex={5}
            justifyContent={'end'}
            alignItems={'center'}
          >
            <Typography variant="h5" fontWeight={600} color="secondary">
              {formatCurrency(total)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <UpdateOrderLocAndTime
        open={open}
        handleClose={handleClose}
        title="Please Fill The Form"
      />
    </>
  );
}
