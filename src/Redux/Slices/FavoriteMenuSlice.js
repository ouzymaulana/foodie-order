import { createSlice } from "@reduxjs/toolkit";

const FavoriteMenuSlice = createSlice({
  name: "dataFavorite",
  initialState: {
    dataFavorite: [],
  },
  reducers: {
    setDataFavorite: (state, action) => {
      state.dataFavorite = action.payload;
    },

    deleteDataByIdMenu: (state, action) => {
      state.dataFavorite = state.dataFavorite.filter(
        (item) => item.id === action.payload
      );
    },

    ifHasDataFavorite: (state, action) => {
      console.log("==================ifHasDataFavorite==================");
      console.log(action.payload);
      console.log("====================================");
    },
  },
});

export const selectDataFavorite = (state) => state.dataFavorite.dataFavorite;
export const { setDataFavorite, deleteDataByIdMenu, ifHasDataFavorite } =
  FavoriteMenuSlice.actions;
export default FavoriteMenuSlice.reducer;
