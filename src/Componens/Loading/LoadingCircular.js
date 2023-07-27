import { useLoadingCircularProgress } from "@/Context/LoadingCircularProgressContextProvider";
import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

export default function LoadingCircular() {
  const { openLoadingCircular, setOpenLoadingCircular } =
    useLoadingCircularProgress();

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: openLoadingCircular ? 991 : -1 }}
      color="white"
      open={openLoadingCircular}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
