import React, { createContext, useContext, useState } from "react";

export const DataSearchMenu = createContext();
export const useDataSearchMenu = () => useContext(DataSearchMenu);

const SearchValueContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <DataSearchMenu.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </DataSearchMenu.Provider>
  );
};

export default SearchValueContextProvider;
