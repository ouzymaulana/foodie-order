import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function ButtonModal({ disable, open, handleClose }) {
  const route = useRouter();
  return (
    <Box display={"flex"} flexDirection={"row"} gap={2}>
      <Button
        onClick={handleClose}
        variant="contained"
        sx={{
          padding: "10px",
          backgroundColor: "#212A3E",
          width: "70%",
          color: "white",
          borderRadius: "10px",
          fontSize: { lg: "18px", xs: "10px" },
          ":hover": {
            bgcolor: "#191825",
          },
        }}
      >
        cancel
      </Button>
      <Button
        type="submit"
        disabled={disable}
        variant="contained"
        className={inter.className}
        sx={{
          padding: "10px",
          // backgroundColor: "#FAA41A",
          width: "100%",
          color: "black",
          borderRadius: "10px",
          fontSize: { lg: "18px", xs: "10px" },
          ":hover": {
            bgcolor: "#FAA41A",
          },
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
