import { useDataSearchMenu } from "@/Context/SearchValueOnTableContextProvider";
import theme from "@/Helper/theme";
import { TextField, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontSize: "1rem",
    height: "40px",
    width: "100%",

    "& fieldset": {
      borderRadius: theme.spacing(1),
    },
    "&:hover fieldset": {
      borderColor: grey[400],
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FFAF37",
      borderWidth: 3,
    },
  },
});

export default function InputSearch({ title }) {
  const [isLoading, setIsLoading] = useState();
  const route = useRouter();

  const { searchValue, setSearchValue } = useDataSearchMenu();

  const handleSearch = (event) => {
    clearTimeout(isLoading);
    const newTimer = setTimeout(() => {
      const searchValueData = event.target.value;
      const newSearchValues = { ...searchValue, [title]: searchValueData };

      const filteredSearchValues = Object.keys(newSearchValues)
        .filter((key) => newSearchValues[key] !== "") // Menghapus kunci dengan value kosong
        .reduce((obj, key) => {
          obj[key] = newSearchValues[key]; // Membuat objek baru dengan kunci yang memiliki value
          return obj;
        }, {});

      // if (searchValueData !== "") {
      route.push({
        pathname: route.pathname,
        query: { ...route.query, ...filteredSearchValues },
      });
      // }
    }, 1000);

    setIsLoading(newTimer);
  };

  useEffect(() => {
    console.log("====================================");
    console.log(searchValue);
    console.log("====================================");
  }, [searchValue]);

  return (
    <CssTextField
      autoComplete="off"
      sx={{
        width: "100%",
      }}
      // value={searchValue}
      value={searchValue[title] || ""}
      onChange={(event) => {
        setSearchValue({
          ...searchValue,
          [title]: event.target.value !== "" ? event.target.value : "",
        }),
          handleSearch(event);
      }}
      // onKeyDown={(event) => (event.key === "Enter" ? handleSearch(event) : "")}
    />
  );
}
