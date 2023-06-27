import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const itemCartPersistConfig = {
  key: "cartItem",
  storage: storage,
  whitelist: ["cartItem"],
};

const CartItemsSlice = createSlice({
  name: "cartItem",
  initialState: {
    cartItem: [],
  },
  reducers: {
    setCartItem: (state, action) => {
      console.log(action.payload);
      if (state.cartItem == "") {
        state.cartItem = action.payload;
      } else {
        state.cartItem[0].menu.push(action.payload);
      }
    },
  },
});

const persistedItemCartReducer = persistReducer(
  itemCartPersistConfig,
  CartItemsSlice.reducer
);

export const selectDataCart = (state) => state.cartItem.cartItem;
export const { setCartItem } = CartItemsSlice.actions;
export default persistedItemCartReducer;
