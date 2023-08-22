import { Alert } from '@mui/material';
import React from 'react';

export default function FormErrorResponse({ message }) {
  return (
    <Alert severity="error" sx={{ marginBottom: '10px' }}>
      {message}
    </Alert>
  );
}
