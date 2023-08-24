import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDataFavorite,
  deleteDataByIdMenu,
  selectDataFavorite,
  setDataFavorite,
} from '@/Redux/Slices/FavoriteMenuSlice';
import CardMenu from '@/Componens/Card';
import AddToCart from '@/Componens/Modal/AddToCart';
import { selectDataCart } from '@/Redux/Slices/CartItemsSlice';
import IsHasCartItem from '@/Componens/Modal/IsHasCartItem';
import { useLimitMenu } from '@/Context/LimitContextProvider';
import CardMenuLoading from '@/Componens/Loading/CardMenuLoading';
import { useMenuContext } from '@/Context/DataMenuContextProvider';
import { useScrollPageMenu } from '@/Context/ScrollPageContextProvider';

export default function MenuItem() {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  // const [totalItems, setTotalItems] = useState(0);
  const [loadingMenu, setLoadingMenu] = useState(false);
  // const [loadingMenuTimer, setLoadingMenuTimer] = useState();
  const [idMenuAddToCart, setIdMenuAddToCart] = useState();
  const [open, setOpen] = useState(false);
  const [isHasCartopen, setIsHasCartOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleCloseIsHasCart = () => setIsHasCartOpen(false);
  const dataFavorite = useSelector(selectDataFavorite);
  const dispatch = useDispatch();
  const { limit } = useLimitMenu();
  const { page, setPage } = useScrollPageMenu();
  const route = useRouter();
  const token = Cookies.get('token');
  const listInnerRef = useRef(null);
  const cartItem = useSelector(selectDataCart);
  const { setMenu } = useMenuContext();

  const fetchData = async () => {
    try {
      setLoadingMenu(true);
      const response = await axios.get('http://localhost:5000/api/menu', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          kategori: route.query.kategori,
          page,
          limit,
          nama: route.query.search,
        },
      });

      // if (data == '') {
      if (data.length === 0) {
        setData(response.data.data);
        setMenu(response.data.data);
      } else {
        setData((prevData) => [...prevData, ...response.data.data]);
        setMenu((prevData) => [...prevData, ...response.data.data]);
      }

      setHasMore(response.data.hasMore);
      // setTotalItems(response.data.totalItems);

      setPage(page + 1);

      setLoadingMenu(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setHasMore(!hasMore);
    // setPage(1);
    setData([]);
    fetchData();
  }, [route.query.kategori, route.query.search]);

  function onIntersection(entries) {
    const firstEntery = entries[0];
    if (firstEntery.isIntersecting && hasMore) {
      fetchData();
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && listInnerRef.current) {
      observer.observe(listInnerRef.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [data]);

  const handleAddFavoriteMenu = async (id_menu) => {
    const emailLogin = jwt.decode(token);
    // verify secretKey
    try {
      const response = await axios.post('http://localhost:5000/api/favorite', {
        data: {
          id_menu,
          email: emailLogin.email,
        },
      });

      if (response.data.data.message === 'Delete') {
        dispatch(deleteDataByIdMenu(id_menu));
        getDataFavorite();
      }

      if (response.data.data.message === 'Create') {
        const getDataMenu = data.find((menu) => menu.id === id_menu);
        dispatch(addDataFavorite(getDataMenu));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getDataFavorite = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/favorite', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        dispatch(setDataFavorite(response.data.data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = (id_menu) => {
    const dataCart = cartItem[0]?.menu || [];
    const isHasData = dataCart.find((item) => item.idMenu === id_menu);

    if (isHasData === undefined) {
      // setOpen(true);
      cartItem.length > 0 ? setIsHasCartOpen(true) : setOpen(true);
      setIdMenuAddToCart(id_menu);
    }
  };

  useEffect(() => {
    getDataFavorite();
  }, []);

  return (
    <>
      <Typography variant="h5" fontWeight={600}>
        Menu
      </Typography>
      <Grid
        display={'flex'}
        flexWrap={'wrap'}
        gap={'42.7px'}
        // gap={5.2}
        marginTop={2}
        paddingBottom={3}
        justifyContent={{ xs: 'center', md: 'start' }}
      >
        {data.map((item, i) => {
          const isFavorite = dataFavorite.some(
            (favorite) => favorite.id === item.id
          );
          return (
            <CardMenu
              item={item}
              isFavorite={isFavorite}
              handleAddFavoriteMenu={handleAddFavoriteMenu}
              handleOpen={handleOpen}
              key={i}
            />
          );
        })}
      </Grid>

      {loadingMenu && <CardMenuLoading />}

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

      {hasMore && (
        <div
          id="scroll-trigger"
          style={{ minHeight: '25px', minWidth: '200px' }}
          ref={listInnerRef}
        ></div>
      )}
    </>
  );
}
