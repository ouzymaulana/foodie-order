import { useDataSearchMenu } from "@/Context/SearchValueOnTableContextProvider";
import theme from "@/Helper/theme";
import { TextField, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import React, { useState } from "react";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontSize: "1rem",
    height: "40px",

    "& fieldset": {
      borderRadius: theme.spacing(1),
    },

    "&:hover fieldset": {
      borderColor: grey[400],
    },
  },
});

export default function InputDate({ title }) {
  const route = useRouter();
  const { searchValue, setSearchValue } = useDataSearchMenu();

  const handleSearch = (event) => {
    const searchValueData = event.target.value;
    const newSearchValues = { ...searchValue, [title]: searchValueData };
    if (searchValueData !== "") {
      route.push({
        pathname: route.pathname,
        query: { ...route.query, ...newSearchValues },
      });
    }
    // if (searchValueData !== "") {
    //   route.push({
    //     pathname: route.pathname,
    //     query: { ...route.query, field: title, search: searchValueData },
    //   });
    //   // setSearchValue(searchValueData);
    // } else {
    //   route.push({
    //     pathname: route.pathname,
    //   });
    // }
  };
  return (
    <CssTextField
      type="date"
      autoComplete="off"
      sx={{
        width: "180px",
      }}
      onChange={(event) => {
        handleSearch(event),
          setSearchValue({ ...searchValue, [title]: event.target.value });
      }}
    />
  );
}
