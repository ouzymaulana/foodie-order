import AddToCart from '@/Componens/Modal/AddToCart';
import IsHasCartItem from '@/Componens/Modal/IsHasCartItem';
import { formatCurrency } from '@/Helper/formatCurrency';
import { selectDataCart } from '@/Redux/Slices/CartItemsSlice';
import { Button, CardMedia, Divider, Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function ItemOrderHistory({ itemOrder }) {
  const [open, setOpen] = useState(false);
  const [isHasCartopen, setIsHasCartOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleCloseIsHasCart = () => setIsHasCartOpen(false);
  const cartItem = useSelector(selectDataCart);
  const [idMenuAddToCart, setIdMenuAddToCart] = useState();

  const handleOpen = (id_menu) => {
    const dataCart = cartItem[0]?.menu || [];
    const isHasData = dataCart.find((item) => item.idMenu === id_menu);

    if (isHasData === undefined) {
      cartItem.length > 0 ? setIsHasCartOpen(true) : setOpen(true);
      setIdMenuAddToCart(id_menu);
    }
  };

  return (
    <>
      <Grid display={'flex'} flexWrap={'wrap'} paddingY={1.5}>
        <Grid flex={{ md: 1.2, xs: '70%' }}>
          <CardMedia
            sx={{ borderRadius: '15px', paddingX: { xs: 12, md: 0 } }}
            component="img"
            alt="green"
            height={'100'}
            image="/img/cocktail.jpg"
          />
        </Grid>
        <Grid paddingX={1.2} flex={7}>
          <Grid>
            <Typography variant="h6">{itemOrder.tb_menu.nama}</Typography>
            <Typography>{formatCurrency(itemOrder.tb_menu.harga)}</Typography>
          </Grid>
          <Grid>
            <Typography variant="subtitle2" fontWeight={600} color={grey[500]}>
              note
            </Typography>
            <Typography variant="subtitle2">{itemOrder.catatan}</Typography>
          </Grid>
        </Grid>
        <Grid
          flex={2}
          display={'flex'}
          flexDirection={'column'}
          // justifyContent={"end"}
          alignItems={'end'}
          position={'relative'}
        >
          <Grid flex={3}>
            <Typography variant="subtitle1" color={grey[600]}>
              Quantity {itemOrder.quantity}
            </Typography>
          </Grid>
          <Grid flex={3}>
            <Typography variant="subtitle2" color={grey[500]}>
              subTotal
            </Typography>
            <Typography color={grey[600]}>20.000</Typography>
          </Grid>
          <Grid
            flex={8}
            display={'flex'}
            justifyContent={'end'}
            alignItems={'end'}
          >
            <Button
              onClick={() => handleOpen(itemOrder.tb_menu.id)}
              variant="contained"
              size="small"
              color="primary"
              disableElevation
              sx={{
                borderRadius: '6px',
                textTransform: 'none',
              }}
            >
              order again
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="middle" />
      {cartItem.length === 0 ? (
        <AddToCart
          open={open}
          handleClose={handleClose}
          idMenu={idMenuAddToCart}
          title="Please Fill The Form"
        />
      ) : (
        <IsHasCartItem
          open={isHasCartopen}
          handleClose={handleCloseIsHasCart}
          idMenu={idMenuAddToCart}
          title="Please Fill The Form"
        />
      )}
    </>
  );
}
