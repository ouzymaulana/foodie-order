import React, { createContext, useContext, useState } from "react";

export const UpdateMenuModal = createContext();
export const useUpdateMenuModal = () => useContext(UpdateMenuModal);

const UpdateMenuModalContextProvider = ({ children }) => {
  const [updateMenuModal, setUpdateMenuModal] = useState({
    isOpen: false,
    data: null,
  });
  return (
    <UpdateMenuModal.Provider value={{ updateMenuModal, setUpdateMenuModal }}>
      {children}
    </UpdateMenuModal.Provider>
  );
};

export default UpdateMenuModalContextProvider;
