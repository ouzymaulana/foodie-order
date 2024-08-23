import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import FavoriteMenuReducer from './Slices/FavoriteMenuSlice';
import persistedItemCartReducer from './Slices/CartItemsSlice';
import persistedBalanceReducer from './Slices/BalanceSlice';
import DataMenuReducer from './Slices/DataMenuSlice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

const store = configureStore({
  reducer: {
    dataFavorite: FavoriteMenuReducer,
    cartItem: persistedItemCartReducer,
    balance: persistedBalanceReducer,
    dataMenu: DataMenuReducer,
  },
  devTools: true,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export default store;
