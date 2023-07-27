import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";

export const LimitTable = createContext();
export const useLimitTable = () => useContext(LimitTable);

const DashboardLimitTableContextProvider = ({ children }) => {
  const { query, push, pathname } = useRouter();
  const [limitTable, setLimitTable] = useState();

  useEffect(() => {
    if (query.limit) {
      setLimitTable(query.limit);
    } else {
      setLimitTable(10);
      // const dataRoute = {
      //   ...query,
      //   ["limit"]: 10,
      // };
      // push({
      //   pathname: pathname,
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
