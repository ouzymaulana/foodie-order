import React, { createContext, useContext, useState } from "react";

export const UpdateUserModal = createContext();
export const useUpdateUserModal = () => useContext(UpdateUserModal);

const UpdateUserModalContextProvider = ({ children }) => {
  const [updateUserModal, setUpdateUserModal] = useState({
    isOpen: false,
    data: null,
  });
  return (
    <UpdateUserModal.Provider value={{ updateUserModal, setUpdateUserModal }}>
      {children}
    </UpdateUserModal.Provider>
  );
};

export default UpdateUserModalContextProvider;
