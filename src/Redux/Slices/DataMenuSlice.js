import { createSlice } from '@reduxjs/toolkit';

const DataMenuSlice = createSlice({
  name: 'dataMenu',
  initialState: {
    dataMenu: {},
  },
  reducers: {
    setDataMenu: (state, action) => {
      state.dataMenu = action.payload;
    },

    deleteDataByIdMenu: (state, action) => {
      const filterData = state.dataMenu.filter(
        (item) => item.id !== action.payload
      );

      state.dataMenu = filterData;
    },

    addDataMenu: (state, action) => {
      const newPayload = {
        ...action.payload,
        createdAt: new Date().toISOString(),
      };

      const updateDataMenu = [...state.dataMenu, newPayload];

      updateDataMenu.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      const newDataMenu = updateDataMenu.slice(0, -1);

      state.dataMenu = newDataMenu;
      // state.dataMenu = [...newDataMenu, newPayload];
    },
  },
});

export const selectDataMenu = (state) => state.dataMenu.dataMenu;
export const { setDataMenu, deleteDataByIdMenu, addDataMenu } =
  DataMenuSlice.actions;
export default DataMenuSlice.reducer;
