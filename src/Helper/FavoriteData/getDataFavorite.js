import axios from 'axios';
import Cookies from 'js-cookie';
// import React from "react";
// import { useDispatch } from "react-redux";
// import {
//   addDataFavorite,
//   deleteDataByIdMenu,
//   selectDataFavorite,
//   setDataFavorite,
// } from "@/Redux/Slices/FavoriteMenuSlice";
// import jwt from "jsonwebtoken";

export const getDataFavorite = async (dispatch, setDataFavorite) => {
  const token = Cookies.get('token');

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
