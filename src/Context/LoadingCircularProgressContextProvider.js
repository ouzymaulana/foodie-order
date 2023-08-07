import React, { createContext, useContext, useState } from "react";

export const LoadingCircularProgress = createContext();
export const useLoadingCircularProgress = () =>
  useContext(LoadingCircularProgress);

const LoadingCircularProgressContextProvider = ({ children }) => {
  const [openLoadingCircular, setOpenLoadingCircular] = useState();
  // const [openLoadingCircular, setOpenLoadingCircular] = useState(true);
  return (
    <LoadingCircularProgress.Provider
      value={{ openLoadingCircular, setOpenLoadingCircular }}
    >
      {children}
    </LoadingCircularProgress.Provider>
  );
};

export default LoadingCircularProgressContextProvider;
