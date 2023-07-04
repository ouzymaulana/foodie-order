import React, { createContext, useContext, useState } from "react";

export const PageMenu = createContext();
export const usePageMenu = () => useContext(PageMenu);

const PageContextProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  return (
    <PageMenu.Provider value={{ page, setPage }}>{children}</PageMenu.Provider>
  );
};

export default PageContextProvider;
