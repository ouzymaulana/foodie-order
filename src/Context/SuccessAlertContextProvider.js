import React, { createContext, useContext, useState } from "react";

export const OpenSuccessSnackBar = createContext();
export const useOpenSuccessSnackBar = () => useContext(OpenSuccessSnackBar);

const SuccessAlertContextProvider = ({ children }) => {
  const [successSnackBar, setsuccessSnackBar] = useState(false);
  return (
    <OpenSuccessSnackBar.Provider
      value={{ successSnackBar, setsuccessSnackBar }}
    >
      {children}
    </OpenSuccessSnackBar.Provider>
  );
};

export default SuccessAlertContextProvider;
