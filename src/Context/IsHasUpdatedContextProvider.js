import React, { createContext, useContext, useState } from "react";

export const IsHasUpdated = createContext();
export const useIsHasUpdated = () => useContext(IsHasUpdated);

const IsHasUpdatedProvider = ({ children }) => {
  const [ishasUpdated, setIshasUpdated] = useState(false);

  return (
    <IsHasUpdated.Provider value={{ ishasUpdated, setIshasUpdated }}>
      {children}
    </IsHasUpdated.Provider>
  );
};

export default IsHasUpdatedProvider;
