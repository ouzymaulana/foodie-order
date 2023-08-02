import React, { createContext, useContext, useState } from "react";

export const PopoverActionMenuTable = createContext();
export const usePopoverActionMenuTable = () =>
  useContext(PopoverActionMenuTable);

const PopoverActionMenuTableContextProvider = ({ children }) => {
  const [popoverActionMenuTable, setPopoverActionMenuTable] = useState(null);
  return (
    <PopoverActionMenuTable.Provider
      value={{ popoverActionMenuTable, setPopoverActionMenuTable }}
    >
      {children}
    </PopoverActionMenuTable.Provider>
  );
};

export default PopoverActionMenuTableContextProvider;
