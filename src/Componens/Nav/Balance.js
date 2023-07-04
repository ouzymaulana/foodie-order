import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import TopUpSaldo from "../Modal/TopUpSaldo";
import TranferBalance from "../Modal/TranferBalance";

export default function Balance() {
  const [open, setOpen] = useState(false);
  const [openTfModal, setOpenTfModal] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenTfModal = () => setOpenTfModal(true);
  const handleCloseTfModal = () => setOpenTfModal(false);
  return (
    <>
      <Box
        sx={{ backgroundColor: "white" }}
        display={"flex"}
        height={100}
        borderRadius={5}
        padding={2}
      >
        <Grid
          flex={6}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Typography variant="h6" fontWeight={600}>
            Your Balance
          </Typography>
          <Typography variant="h6">Rp 500.000</Typography>
        </Grid>
        <Grid
          flex={6}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          <Tooltip title="TopUp" onClick={() => handleOpen()} arrow>
            <Button
              disableElevation
              variant="contained"
              size="medium"
              sx={{ borderRadius: "10px" }}
            >
              <AccountBalanceWalletOutlinedIcon
                fontWeight="400"
                fontSize="large"
              />
            </Button>
          </Tooltip>
          <Tooltip title="Tranfer" onClick={() => handleOpenTfModal()} arrow>
            <Button
              disableElevation
              variant="contained"
              sx={{ backgroundColor: "#E6E6E6", borderRadius: "10px" }}
              size="medium"
            >
              <SendIcon fontWeight="400" fontSize="large" />
            </Button>
          </Tooltip>
        </Grid>
      </Box>
      <TopUpSaldo
        title="please fill the input"
        open={open}
        handleClose={handleClose}
      />
      <TranferBalance
        title="please fill the input"
        open={openTfModal}
        handleClose={handleCloseTfModal}
      />
    </>
  );
}
