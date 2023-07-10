import React, { createContext, useContext, useState } from "react";

export const DataMenuContext = createContext();
export const useMenuContext = () => useContext(DataMenuContext);

const DataMenuContextProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);

  return (
    <DataMenuContext.Provider value={{ menu, setMenu }}>
      {children}
    </DataMenuContext.Provider>
  );
};

export default DataMenuContextProvider;
