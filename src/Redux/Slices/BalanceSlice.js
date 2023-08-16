import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const balancePersistConfig = {
  key: 'balance',
  storage,
  // storage: storage,
  whitelist: ['balance'],
};

const BalanceSlice = createSlice({
  name: 'balance',
  initialState: {
    balance: 0,
  },
  reducers: {
    setbalance: (state, action) => {
      state.balance = action.payload;
    },

    topUpBalance: (state, action) => {
      const amount = parseInt(action.payload);
      state.balance += amount;
    },

    decrementBalance: (state, action) => {
      const amount = parseInt(action.payload);
      state.balance -= amount;
    },
  },
});

const persistedBalanceReducer = persistReducer(
  balancePersistConfig,
  BalanceSlice.reducer
);

export const selectBalance = (state) => state.balance.balance;
export const { setbalance, topUpBalance, decrementBalance } =
  BalanceSlice.actions;
export default persistedBalanceReducer;
