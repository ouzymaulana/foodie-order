import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";

export const ScrollPageMenu = createContext();
export const useScrollPageMenu = () => useContext(ScrollPageMenu);

const ScrollPageContextProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  return (
    <ScrollPageMenu.Provider value={{ page, setPage }}>
      {children}
    </ScrollPageMenu.Provider>
  );
};

export default ScrollPageContextProvider;
