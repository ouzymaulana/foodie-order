import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const itemCartPersistConfig = {
  key: 'cartItem',
  storage,
  whitelist: ['cartItem'],
};

const CartItemsSlice = createSlice({
  name: 'cartItem',
  initialState: {
    cartItem: [],
  },
  reducers: {
    setCartItem: (state, action) => {
      if (state.cartItem.length === 0) {
        state.cartItem = action.payload;
      } else {
        state.cartItem[0].menu.push(action.payload);
      }
    },

    updateOrderNote: (state, action) => {
      const { idMenu, currentNote } = action.payload;

      const result = state.cartItem[0].menu.map((item) => {
        if (item.idMenu === idMenu) {
          return {
            ...item,
            catatanTambahan: currentNote,
          };
        }
        return item;
      });

      const updatedCartItem = {
        ...state.cartItem[0],
        menu: result,
      };

      const updatedState = {
        ...state,
        cartItem: [updatedCartItem],
      };

      return updatedState;
    },

    updateOrderLocAndOrderTime: (state, action) => {
      const { waktuPesanan, alamatAntar } = action.payload;
      const data = {
        ...state.cartItem[0],
        waktuPesanan,
        alamatAntar,
      };

      const updatedState = {
        ...state,
        cartItem: [data],
      };

      return updatedState;
    },

    incrementDecrementQuantity: (state, action) => {
      const { idMenu, status } = action.payload;

      const result = state.cartItem[0].menu.map((item) => {
        if (item.idMenu === idMenu) {
          return {
            ...item,
            quantity:
              status === 'increment' ? item.quantity + 1 : item.quantity - 1,
          };
        }
        return item;
      });

      const updatedCartItem = {
        ...state.cartItem[0],
        menu: result,
      };

      const updatedState = {
        ...state,
        cartItem: [updatedCartItem],
      };

      return updatedState;
    },

    deleteOneItemCart: (state, action) => {
      const idMenu = action.payload;

      const updatedCartItem = {
        ...state.cartItem[0],
        menu: state.cartItem[0].menu.filter((item) => item.idMenu !== idMenu),
      };

      const updatedState = {
        ...state,
        cartItem: [updatedCartItem],
      };

      if (updatedState.cartItem[0].menu.length === 0) {
        state.cartItem = [];
      } else {
        return updatedState;
      }
    },

    deleteCartItem: (state, action) => {
      state.cartItem = [];
    },
  },
});

const persistedItemCartReducer = persistReducer(
  itemCartPersistConfig,
  CartItemsSlice.reducer
);

export const selectDataCart = (state) => state.cartItem.cartItem;
export const {
  setCartItem,
  updateOrderNote,
  updateOrderLocAndOrderTime,
  incrementDecrementQuantity,
  deleteOneItemCart,
  deleteCartItem,
} = CartItemsSlice.actions;
export default persistedItemCartReducer;
