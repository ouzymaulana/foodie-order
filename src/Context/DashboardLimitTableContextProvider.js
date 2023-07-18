import React, { createContext, useContext, useState } from "react";

export const LimitTable = createContext();
export const useLimitTable = () => useContext(LimitTable);

const DashboardLimitTableContextProvider = ({ children }) => {
  const [limitTable, setLimitTable] = useState(10);
  return (
    <LimitTable.Provider value={{ limitTable, setLimitTable }}>
      {children}
    </LimitTable.Provider>
  );
};

export default DashboardLimitTableContextProvider;
