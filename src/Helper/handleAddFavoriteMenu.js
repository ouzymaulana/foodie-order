import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { getDataFavorite } from "./FavoriteData/getDataFavorite";

export const handleAddFavoriteMenu = async (
  id_menu,
  dispatch,
  deleteDataByIdMenu,
  addDataFavorite,
  setDataFavorite,
  menu
) => {
  const token = Cookies.get("token");
  const emailLogin = jwt.decode(token);
  try {
    const response = await axios.post("http://localhost:5000/api/favorite", {
      data: {
        id_menu,
        email: emailLogin.email,
      },
    });

    console.log("JWT : ", response);

    if (response.data.data.message === "Delete") {
      dispatch(deleteDataByIdMenu(id_menu));
      getDataFavorite(dispatch, setDataFavorite);
    }

    if (response.data.data.message === "Create") {
      const getDataMenu = menu.find((menu) => menu.id === id_menu);
      dispatch(addDataFavorite(getDataMenu));
    }
  } catch (error) {
    console.error(error);
  }
};
