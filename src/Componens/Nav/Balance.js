import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

export default function Balance() {
  return (
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
        <Tooltip title="TopUp" arrow>
          <Button
            variant="contained"
            size="large"
            sx={{ borderRadius: "10px" }}
          >
            <AccountBalanceWalletOutlinedIcon fontSize="large" />
          </Button>
        </Tooltip>
        <Tooltip title="Tranfer" arrow>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#E6E6E6", borderRadius: "10px" }}
            size="large"
          >
            <SendIcon fontSize="large" />
          </Button>
        </Tooltip>
      </Grid>
    </Box>
  );
}
