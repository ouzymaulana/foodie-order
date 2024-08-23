import React, { createContext, useContext, useState } from 'react';

export const ActionTable = createContext();
export const useActionTableModal = () => useContext(ActionTable);

const ActionTableContextProvider = ({ children }) => {
  const [openActionTable, setOpenActionTable] = useState({
    isOpen: false,
    isOpenUpdateMenu: false,
    isOpenUpdateUser: false,
    isOpenCollapse: false,
    isUpdateOrderStatus: false,
    isOpenCashWithDrawwal: false,
    data: null,
  });
  return (
    <ActionTable.Provider value={{ openActionTable, setOpenActionTable }}>
      {children}
    </ActionTable.Provider>
  );
};

export default ActionTableContextProvider;
