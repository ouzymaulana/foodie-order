import React, { createContext, useContext, useState } from "react";

export const MenuContext = createContext();
export const useMenuContext = () => useContext(MenuContext);

const MenuContextProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  return (
    <MenuContext.Provider value={{ menu, setMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;
