import { Alert, Snackbar, Stack } from "@mui/material";
import React from "react";

export default function SnackBar({ handleCloseSnackBar, openSnackBar }) {
  return (
    <Stack spacing={2} sx={{ width: "100%", zIndex: "999" }}>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          sx={{ width: "100%" }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </Stack>
  );
}
