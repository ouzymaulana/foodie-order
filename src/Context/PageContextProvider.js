import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";

export const PageMenu = createContext();
export const usePageMenu = () => useContext(PageMenu);

const PageContextProvider = ({ children }) => {
  // check page in route
  const { query } = useRouter();
  const [page, setPage] = useState();

  useEffect(() => {
    if (query.page) {
      setPage(query.page);
    } else {
      setPage(1);
    }
  }, []);
  return (
    <PageMenu.Provider value={{ page, setPage }}>{children}</PageMenu.Provider>
  );
};

export default PageContextProvider;
