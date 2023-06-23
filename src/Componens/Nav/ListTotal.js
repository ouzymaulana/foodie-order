import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

export default function ListTotal() {
  return (
    <Box
      flex={2}
      display={"flex"}
      flexDirection={"column"}
      sx={{ backgroundColor: "#eeeeee" }}
      borderRadius={3}
      paddingX={2}
    >
      <Box display={"flex"} flex={6}>
        <Box display={"flex"} alignItems={"center"} flex={5}>
          <Typography>makan siang, Lantai 3, Ruang 2</Typography>
        </Box>
        <Grid
          display={"flex"}
          justifyContent={"end"}
          position={"relative"}
          alignItems={"center"}
          flex={5}
        >
          <Paper
            sx={{
              backgroundColor: "#FAA41A",
              padding: "2px",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ModeEditOutlineOutlinedIcon />
          </Paper>
        </Grid>
      </Box>
      <Box display={"flex"} flex={6} color="secondary">
        <Box display={"flex"} flex={5} alignItems={"center"}>
          <Typography variant="h5" fontWeight={600} color="secondary">
            Total
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flex={5}
          justifyContent={"end"}
          alignItems={"center"}
        >
          <Typography variant="h5" fontWeight={600} color="secondary">
            IDR 100.000
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
