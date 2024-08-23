import axios from 'axios';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { getDataFavorite } from './FavoriteData/getDataFavorite';
import { useRouter } from 'next/router';

export const handleAddFavoriteMenu = async (
  id_menu,
  dispatch,
  deleteDataByIdMenu,
  addDataFavorite,
  setDataFavorite,
  menu,
  push
) => {
  const token = Cookies.get('token');
  // const { push } = useRouter();
  try {
    if (token) {
      const emailLogin = jwt.decode(token);
      const response = await axios.post('http://localhost:5000/api/favorite', {
        data: {
          id_menu,
          email: emailLogin.email,
        },
      });

      if (response.data.data.message === 'Delete') {
        dispatch(deleteDataByIdMenu(id_menu));
        getDataFavorite(dispatch, setDataFavorite);
      }

      if (response.data.data.message === 'Create') {
        const getDataMenu = menu.find((menu) => menu.id === id_menu);
        dispatch(addDataFavorite(getDataMenu));
      }
    } else {
      push('/login');
    }
  } catch (error) {
    console.error(error);
  }
};
