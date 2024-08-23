import React, { createContext, useContext, useState } from 'react';

export const DarkModeContext = createContext();
export const useDarkModeContext = () => useContext(DarkModeContext);

const DarkModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('dark');

  return (
    <DarkModeContext.Provider value={{ mode, setMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeContextProvider;
