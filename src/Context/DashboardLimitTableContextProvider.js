import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const LimitTable = createContext();
export const useLimitTable = () => useContext(LimitTable);

const DashboardLimitTableContextProvider = ({ children }) => {
  const { query, push, pathname } = useRouter();
  const [limitTable, setLimitTable] = useState();

  useEffect(() => {
    if (query.limit) {
      setLimitTable(query.limit);
      console.log('====================================');
      console.log('CONTEXT 1');
      console.log('====================================');
    } else {
      setLimitTable(10);
      console.log('====================================');
      console.log('CONTEXT 2');
      console.log('====================================');
      // const dataRoute = {
      //   ...query,
      //   limit: 10,
      // };
      // push({
      //   pathname,
      //   query: dataRoute,
      // });
    }
  }, []);
  return (
    <LimitTable.Provider value={{ limitTable, setLimitTable }}>
      {children}
    </LimitTable.Provider>
  );
};

export default DashboardLimitTableContextProvider;
