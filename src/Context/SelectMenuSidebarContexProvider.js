import React, { createContext, useContext, useState } from "react";

export const DataSelectMenu = createContext();
export const useDataSelectMenu = () => useContext(DataSelectMenu);

const SelectMenuSidebarContexProvider = ({ children }) => {
  const [selectMenu, setSelectMenu] = useState("");
  return (
    <DataSelectMenu.Provider value={{ selectMenu, setSelectMenu }}>
      {children}
    </DataSelectMenu.Provider>
  );
};

export default SelectMenuSidebarContexProvider;
