import React, { createContext, useContext, useState } from "react";

export const LimitMenu = createContext();
export const useLimitMenu = () => useContext(LimitMenu);

const LimitContextProvider = ({ children }) => {
  const [limit, setLimit] = useState(10);
  return (
    <LimitMenu.Provider value={{ limit, setLimit }}>
      {children}
    </LimitMenu.Provider>
  );
};

export default LimitContextProvider;
