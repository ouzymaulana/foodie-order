import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const PageMenu = createContext();
export const usePageMenu = () => useContext(PageMenu);

const PageContextProvider = ({ children }) => {
  // check page in route
  const { query, push, pathname } = useRouter();
  const [page, setPage] = useState();

  useEffect(() => {
    if (query.page) {
      setPage(query.page);
    } else {
      setPage(1);
      const dataRoute = {
        ...query,
        page: 1,
      };
      push({
        pathname,
        query: dataRoute,
      });
    }
  }, []);
  return (
    <PageMenu.Provider value={{ page, setPage }}>{children}</PageMenu.Provider>
  );
};

export default PageContextProvider;
