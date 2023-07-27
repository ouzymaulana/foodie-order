import React, { createContext, useContext, useState } from "react";

export const SortBy = createContext();
export const useSortBy = () => useContext(SortBy);

const SortByContextProvider = ({ children }) => {
  const [sortBy, setSortBy] = useState("");
  return (
    <SortBy.Provider value={{ sortBy, setSortBy }}>{children}</SortBy.Provider>
  );
};

export default SortByContextProvider;
