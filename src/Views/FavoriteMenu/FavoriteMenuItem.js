import { Grid, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteDataByIdMenu,
  selectDataFavorite,
  setDataFavorite,
} from '@/Redux/Slices/FavoriteMenuSlice';
import jwt from 'jsonwebtoken';
import CardMenu from '@/Componens/Card';
import { useDataSelectMenu } from '@/Context/SelectMenuSidebarContexProvider';
// import { useScrollPageMenu } from "@/Context/ScrollPageContextProvider";

export default function FavoriteMenuItem() {
  // const { page, setPage } = useScrollPageMenu();
  const { setSelectMenu } = useDataSelectMenu();
  // const [limit, setLimit] = useState(10);
  // const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);
  const token = Cookies.get('token');
  const listInnerRef = useRef(null);

  const dataFavorite = useSelector(selectDataFavorite);
  const dispatch = useDispatch();

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

  const handleAddFavoriteMenu = async (id_menu) => {
    const emailLogin = jwt.decode(token);

    try {
      const response = await axios.post('http://localhost:5000/api/favorite', {
        data: {
          id_menu,
          email: emailLogin.email,
        },
      });

      if (response.data.status === 'success') {
        dispatch(deleteDataByIdMenu(id_menu));
        // getDataFavorite();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setSelectMenu('favorite');
    getDataFavorite();
  }, []);

  return (
    <>
      <Typography variant="h5" fontWeight={600}>
        Favorite Menu
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
        {dataFavorite.map((item, i) => (
          <CardMenu
            item={item}
            isFavorite={true}
            handleAddFavoriteMenu={handleAddFavoriteMenu}
            key={i}
          />
        ))}
      </Grid>
      <div
        id="scroll-trigger"
        style={{ height: '0px' }}
        // onScroll={handleScroll}
        ref={listInnerRef}
      ></div>
    </>
  );
}
