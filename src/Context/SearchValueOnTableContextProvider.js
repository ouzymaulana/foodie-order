import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";

export const DataSearchMenu = createContext();
export const useDataSearchMenu = () => useContext(DataSearchMenu);

const SearchDataOnTableContexProvider = ({ children }) => {
  const { query } = useRouter();
  const [searchValue, setSearchValue] = useState({});
  useEffect(() => {
    if (query.searchValues) {
      setSearchValue(query.searchValues);
    }
  }, []);
  return (
    <DataSearchMenu.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </DataSearchMenu.Provider>
  );
};

export default SearchDataOnTableContexProvider;
