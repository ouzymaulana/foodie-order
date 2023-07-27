import React, { createContext, useContext, useState } from "react";

export const DataTotalItem = createContext();
export const useDataTotalItem = () => useContext(DataTotalItem);

const TotalItemContexProvider = ({ children }) => {
  const [totalItem, setTotalItem] = useState();
  return (
    <DataTotalItem.Provider value={{ totalItem, setTotalItem }}>
      {children}
    </DataTotalItem.Provider>
  );
};

export default TotalItemContexProvider;
