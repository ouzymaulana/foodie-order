import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const dataCartPersistConfig = {
  key: "menuCart",
  storage: storage,
  whitelist: ["cartItems"],
};

const CartItemsSlice = createSlice({
  name: "menuCart",
  initialState: {
    cartItem: [],
  },
  reducers: {
    setCartItem: (state, action) => {
      if (Array.isArray(state.cartItem) !== 0) {
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, quantity: 1 },
        ];
      } else {
        state.cartItem = action.payload;
      }
    },
  },
});

const persistedDataCartReducer = persistReducer(
  dataCartPersistConfig,
  CartItemsSlice.reducer
);

export const selectDataCart = (state) => state.dataCart;
export const { setCartItem } = CartItemsSlice.actions;
export default persistedDataCartReducer;
