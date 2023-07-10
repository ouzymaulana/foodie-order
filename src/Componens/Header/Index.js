import {
  AppBar,
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import style from "../../styles/LoginVerifikasi.module.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import theme from "@/Helper/theme";
import { useDataSearchMenu } from "@/Context/SearchValueContextProvider";
import { useRouter } from "next/router";
import { usePageMenu } from "@/Context/PageContextProvider";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Profile from "./Profile";

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
  const token = Cookies.get("token");
  const jwtData = jwt.decode(token);
  const { searchValue, setSearchValue } = useDataSearchMenu();
  const router = useRouter();
  const { page, setPage } = usePageMenu();

  const handleSearch = (event) => {
    const searchValueData = event.target.value;

    if (searchValueData !== "") {
      setPage(1);
      router.push({
        pathname: router.query.kategori,
        query: { search: searchValueData },
      });
    } else {
      setPage(1);
      router.push({
        pathname: router.query.kategori,
      });
    }
  };
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
              value={searchValue}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon fontSize="large" />{" "}
                  </InputAdornment>
                ),
              }}
              onChange={(event) => setSearchValue(event.target.value)}
              onKeyDown={(event) =>
                event.key === "Enter" ? handleSearch(event) : ""
              }
            />
          </Box>
        </Grid>
        <Profile nama={jwtData?.nama || ""} />
      </Grid>
    </AppBar>
  );
}
