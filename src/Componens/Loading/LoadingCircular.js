import { useLoadingCircularProgress } from '@/Context/LoadingCircularProgressContextProvider';
import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

export default function LoadingCircular() {
  const { openLoadingCircular } = useLoadingCircularProgress();

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: openLoadingCircular ? 991 : -1 }}
      color="white"
      open={openLoadingCircular || false}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
