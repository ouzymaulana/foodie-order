import { Box, Button } from '@mui/material';
import React from 'react';

export default function ButtonModal({
  disable,
  open,
  handleClose,
  resetInput,
}) {
  return (
    <Box display={'flex'} flexDirection={'row'} gap={2}>
      <Button
        onClick={() => {
          handleClose();
          resetInput();
        }}
        variant="contained"
        sx={{
          padding: '10px',
          backgroundColor: '#212A3E',
          width: '70%',
          color: 'white',
          borderRadius: '10px',
          fontSize: { lg: '18px', xs: '10px' },
          ':hover': {
            bgcolor: '#191825',
          },
        }}
      >
        cancel
      </Button>
      <Button
        type="submit"
        disabled={disable}
        variant="contained"
        sx={{
          padding: '10px',
          // backgroundColor: "#FAA41A",
          width: '100%',
          color: 'black',
          borderRadius: '10px',
          fontSize: { lg: '18px', xs: '10px' },
          ':hover': {
            bgcolor: '#FAA41A',
          },
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
