import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import FavoriteMenuReducer from "./Slices/FavoriteMenuSlice";
import CartItemsReducer from "./Slices/CartItemsSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const store = configureStore({
  reducer: {
    dataFavorite: FavoriteMenuReducer,
    cartItem: CartItemsReducer,
  },
  devTools: true,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export default store;
