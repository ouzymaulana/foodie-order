import { Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import Slider from 'react-slick';
import axios from 'axios';
import CardMenu from '@/Componens/Card';
import { handleAddFavoriteMenu } from '@/Helper/handleAddFavoriteMenu';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDataFavorite,
  deleteDataByIdMenu,
  selectDataFavorite,
  setDataFavorite,
} from '@/Redux/Slices/FavoriteMenuSlice';
import { useMenuContext } from '@/Context/DataMenuContextProvider';
import { getDataFavorite } from '@/Helper/FavoriteData/getDataFavorite';
import { selectDataCart } from '@/Redux/Slices/CartItemsSlice';
import AddToCart from '@/Componens/Modal/AddToCart';
import IsHasCartItem from '@/Componens/Modal/IsHasCartItem';

function SampleNextArrow({ onClick, style, className }) {
  return (
    <div
      onClick={onClick}
      style={{
        ...style,
        // background: "green",
        // padding: "8px 8px",
        // borderRadius: "50px",
        // opacity: "50%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        width: 'auto',
        zIndex: 1,
        position: 'absolute',
        fontSize: 0,
        lineHeight: 0,
        top: '40%',
        right: '0%',
        cursor: 'pointer',
      }}
    >
      <ArrowForwardIosOutlinedIcon fontSize="large" sx={{ color: 'grey' }} />
    </div>
  );
}

function SamplePrevArrow({ onClick, style, className }) {
  // const { className, , onClick } = props;
  return (
    // <div
    //   className={className}
    //   style={{ ...style, display: "block", background: "green" }}
    //   onClick={onClick}
    // />
    <div
      // className={className}
      onClick={onClick}
      style={{
        ...style,
        // background: "green",
        // padding: "8px 8px",
        // borderRadius: "50px",
        // opacity: "50%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        width: 'auto',
        zIndex: 1,
        position: 'absolute',
        fontSize: 0,
        lineHeight: 0,
        top: '40%',
        left: '0%',
        cursor: 'pointer',
      }}
    >
      <ArrowBackIosOutlinedIcon fontSize="large" sx={{ color: 'grey' }} />
    </div>
  );
}

export default function BestSellers() {
  const dataFavorite = useSelector(selectDataFavorite);
  const cartItem = useSelector(selectDataCart);
  const [dataBestSellers, setDataBestSellers] = useState([]);
  const { menu } = useMenuContext();
  const [idMenuAddToCart, setIdMenuAddToCart] = useState();
  const [open, setOpen] = useState(false);
  const [isHasCartopen, setIsHasCartOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleCloseIsHasCart = () => setIsHasCartOpen(false);
  const isDesktop = useMediaQuery('(min-width:900px)');
  const isTablet = useMediaQuery('(min-width:600px)');

  let slidesAmount;
  if (isDesktop) {
    slidesAmount = 5;
  } else if (isTablet) {
    slidesAmount = 2;
  } else {
    slidesAmount = 1;
  }

  const dispatch = useDispatch();

  const getDataBestSellers = async () => {
    const response = await axios.get('http://localhost:5000/api/best-sellers');

    if (response.data.status === 'success') {
      setDataBestSellers(response.data.data.menuBestSellers);
    }
  };

  const addFavoriteMenu = async (id_menu) => {
    handleAddFavoriteMenu(
      id_menu,
      dispatch,
      deleteDataByIdMenu,
      addDataFavorite,
      setDataFavorite,
      menu
    );
  };

  useEffect(() => {
    getDataBestSellers();
  }, []);

  const handleOpen = (id_menu) => {
    const dataCart = cartItem[0]?.menu || [];
    const isHasData = dataCart.find((item) => item.idMenu === id_menu);

    if (isHasData === undefined) {
      cartItem.length > 0 ? setIsHasCartOpen(true) : setOpen(true);
      setIdMenuAddToCart(id_menu);
    }
  };

  useEffect(() => {
    getDataFavorite(dispatch, setDataFavorite);
  }, []);

  const settings = {
    infinite: true,
    centerPadding: '10px',
    slidesToShow: slidesAmount,
    paddingLeft: '20px',
    swipeToSlide: true,
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <>
      <Typography variant="h5" fontWeight={600}>
        Best Sellers
      </Typography>
      <Slider
        {...settings}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4.8,
          marginTop: 2,
          paddingLeft: '70px',
          paddingRight: '60px',
          justifyContent: 'center',
          alignItems: 'center',
          // paddingRight: "40px",
          paddingBottom: 3,
          // display: "flex",
        }}
      >
        {dataBestSellers.map((item, i) => {
          const isFavorite = dataFavorite.some(
            (favorite) => favorite.id === item.tb_menu.id
          );
          return (
            <CardMenu
              item={item.tb_menu}
              isFavorite={isFavorite}
              handleAddFavoriteMenu={addFavoriteMenu}
              handleOpen={handleOpen}
              key={i}
            />
          );
        })}
      </Slider>
      {/* </Grid> */}
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
