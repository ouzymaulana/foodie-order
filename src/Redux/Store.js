import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import FavoriteMenuReducer from "./Slices/FavoriteMenuSlice";
import persistedItemCartReducer from "./Slices/CartItemsSlice";
import persistedBalanceReducer from "./Slices/BalanceSlice";
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
    cartItem: persistedItemCartReducer,
    balance: persistedBalanceReducer,
  },
  devTools: true,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export default store;
