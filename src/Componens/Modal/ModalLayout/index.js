import { Box, Modal, Typography } from "@mui/material";
import React from "react";

const style = {
  marginTop: "5rem",
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

export default function ModalLayout({ children, open, handleClose, title }) {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ marginTop: "100px" }}
      >
        <Box sx={style}>
          {/* <Grid display={"flex"} flexDirection={"column"} gap={3}> */}
          <Box display={"flex"} justifyContent={"center"}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              fontWeight={600}
              component="h2"
              paddingBottom={3}
            >
              {title}
            </Typography>
          </Box>
          {children}
        </Box>
      </Modal>
    </div>
  );
}
