import { createSlice } from '@reduxjs/toolkit';

const FavoriteMenuSlice = createSlice({
  name: 'dataFavorite',
  initialState: {
    dataFavorite: [],
  },
  reducers: {
    setDataFavorite: (state, action) => {
      state.dataFavorite = action.payload;
    },

    deleteDataByIdMenu: (state, action) => {
      state.dataFavorite = state.dataFavorite.filter(
        (item) => item.id !== action.payload
      );
    },

    addDataFavorite: (state, action) => {
      state.dataFavorite = [...state.dataFavorite, { ...action.payload }];
    },

    ifHasDataFavorite: (state, action) => {},
  },
});

export const selectDataFavorite = (state) => state.dataFavorite.dataFavorite;
export const {
  setDataFavorite,
  deleteDataByIdMenu,
  addDataFavorite,
  ifHasDataFavorite,
} = FavoriteMenuSlice.actions;
export default FavoriteMenuSlice.reducer;
