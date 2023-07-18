import React, { createContext, useContext, useState } from "react";

export const DataSelectFilter = createContext();
export const useDataSelectFilter = () => useContext(DataSelectFilter);

const SelectFilterCardContexProvider = ({ children }) => {
  const [selectFilter, setSelectFilter] = useState({});
  return (
    <DataSelectFilter.Provider value={{ selectFilter, setSelectFilter }}>
      {children}
    </DataSelectFilter.Provider>
  );
};

export default SelectFilterCardContexProvider;
