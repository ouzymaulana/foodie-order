import {
  AppBar,
  Avatar,
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
import { useRouter } from "next/router";
import { usePageMenu } from "@/Context/PageContextProvider";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { grey } from "@mui/material/colors";

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

  function stringAvatar(name) {
    // return {
    //   children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    // };
    const nameArray = name.split(" ");
    if (nameArray.length >= 2) {
      return {
        children: `${nameArray[0][0]}${nameArray[1][0]}`,
      };
    } else if (nameArray.length === 1) {
      return {
        children: `${nameArray[0][0]}`,
      };
    } else {
      return {
        children: "",
      };
    }
  }
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
        <Grid display={"flex"} flex={3} gap={5} justifyContent={"end"}>
          <Box
            sx={{ backgroundColor: "white" }}
            borderRadius={5}
            // flex={0.2}
            width={60}
          ></Box>
          <Grid width={180} display={"flex"} flexDirection={"row"}>
            <Typography
              width={130}
              variant="subtitle1"
              display={"flex"}
              alignItems={"center"}
              paddingX={1}
              justifyContent={"end"}
            >
              {jwtData.nama}
            </Typography>
            <Box
              width={60}
              // sx={{ backgroundColor: "white" }}
              borderRadius={5}
              // flex={0.3}
            >
              {/* <Typography variant="h6">
                {...stringAvatar("Kent Dodds")}
              </Typography> */}
              <Avatar
                {...stringAvatar(jwtData.nama)}
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "10",
                  backgroundColor: "white",
                  color: grey[400],
                  fontWeight: "500",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
}
