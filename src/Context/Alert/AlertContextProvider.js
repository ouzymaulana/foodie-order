import React, { createContext, useContext, useEffect, useState } from 'react';

export const AlertMessage = createContext();
export const useAlertMessage = () => useContext(AlertMessage);

const AlertMessageContextProvider = ({ children }) => {
  const [alertMessage, setAlertMessage] = useState({
    isAlertToken: false,
    message: null,
  });

  useEffect(() => {
    if (alertMessage.isAlertToken !== false) {
      setAlertMessage({ ...alertMessage });
    }
  }, []);

  return (
    <AlertMessage.Provider value={{ alertMessage, setAlertMessage }}>
      {children}
    </AlertMessage.Provider>
  );
};

export default AlertMessageContextProvider;
