import React, { createContext, useContext, useState } from "react";

export const SortType = createContext();
export const useSortType = () => useContext(SortType);

const SortTypeContextProvider = ({ children }) => {
  const [sortType, setSortType] = useState("");
  return (
    <SortType.Provider value={{ sortType, setSortType }}>
      {children}
    </SortType.Provider>
  );
};

export default SortTypeContextProvider;
