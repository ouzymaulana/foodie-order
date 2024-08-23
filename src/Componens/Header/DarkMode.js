import { IconButton } from '@mui/material';
import React from 'react';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function DarkMode({ mode, toggleDarkMode }) {
  return (
    // <Grid
    //   onClick={() => toggleDarkMode()}
    //   display={'flex'}
    //   alignItems={'center'}
    //   justifyContent={'center'}
    //   borderRadius={5}
    //   width={{ md: 60, sm: 50 }}
    //   sx={{ backgroundColor: 'mode', cursor: 'pointer' }}
    // >
    <IconButton
      onClick={() => toggleDarkMode()}
      sx={{ paddingX: 2 }}
      aria-label="delete"
      size="large"
    >
      {mode === 'light' ? (
        <ModeNightIcon />
      ) : (
        <LightModeIcon fontSize="inherit" />
      )}
    </IconButton>
    // </Grid>
  );
}
