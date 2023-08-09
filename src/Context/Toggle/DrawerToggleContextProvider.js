import React, { createContext, useContext, useState } from "react";

export const DrawerToggle = createContext();
export const useDrawerToggleContext = () => useContext(DrawerToggle);

const DrawerToggleContextProvider = ({ children }) => {
  const [drawer, setDrawer] = useState({ left: false });

  return (
    <DrawerToggle.Provider value={{ drawer, setDrawer }}>
      {children}
    </DrawerToggle.Provider>
  );
};

export default DrawerToggleContextProvider;
