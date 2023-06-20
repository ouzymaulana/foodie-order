import {
  AppBar,
  Box,
  Grid,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import style from "../../styles/LoginVerifikasi.module.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import theme from "@/Helper/theme";
import { useDataSearchMenu } from "@/Context/SearchValueContextProvider";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontSize: "20px",
    height: "50px",
    "& fieldset": {
      borderRadius: theme.spacing(6.3), // Atur border-radius di sini
      border: "none",
    },
  },
});

export default function Navbar() {
  const { setSearchValue } = useDataSearchMenu();
  return (
    <AppBar
      position="fixed"
      sx={{
        padding: "20px",
        backgroundColor: "#F1F1F1",
        height: "80px",
        display: "flex",
        justifyContent: "center",
        boxShadow: "none",
        paddingLeft: "12rem",
      }}
    >
      <Grid display={"flex"} justifyContent={"space-between"} gap={1}>
        <Grid flex={3}>
          <Typography
            fontFamily="Harlow Solid"
            className={style.foodieorder}
            fontSize={38}
            fontWeight={500}
          >
            F0odieOrder
          </Typography>
        </Grid>
        <Grid flex={6}>
          <Box
            sx={{
              width: 600,
              maxWidth: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CssTextField
              fullWidth
              sx={{
                backgroundColor: "white",
                borderRadius: "25px",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon fontSize="large" />{" "}
                  </InputAdornment>
                ),
              }}
              onKeyDown={(event) =>
                event.key === "Enter" ? setSearchValue(event.target.value) : ""
              }
            />
          </Box>
        </Grid>
        <Grid display={"flex"} flex={3} gap={5} justifyContent={"end"}>
          <Box
            sx={{ backgroundColor: "white" }}
            borderRadius={5}
            // flex={0.2}
            width={60}
          ></Box>
          <Box
            sx={{ backgroundColor: "white" }}
            borderRadius={5}
            // flex={0.3}
            width={60}
          ></Box>
        </Grid>
      </Grid>
    </AppBar>
  );
}
