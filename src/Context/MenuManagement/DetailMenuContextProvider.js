import React, { createContext, useContext, useState } from "react";

export const DetailMenu = createContext();
export const useDetailMenuModal = () => useContext(DetailMenu);

const DetailMenuContextProvider = ({ children }) => {
  const [openDetailMenu, setOpenDetailMenu] = useState({
    isOpen: false,
    data: null,
  });
  return (
    <DetailMenu.Provider value={{ openDetailMenu, setOpenDetailMenu }}>
      {children}
    </DetailMenu.Provider>
  );
};

export default DetailMenuContextProvider;
