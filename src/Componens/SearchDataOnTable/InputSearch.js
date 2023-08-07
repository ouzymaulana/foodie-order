import { useLoadingCircularProgress } from "@/Context/LoadingCircularProgressContextProvider";
import { usePageMenu } from "@/Context/PageContextProvider";
import { useDataSearchMenu } from "@/Context/SearchValueOnTableContextProvider";
import theme from "@/Helper/theme";
import { TextField, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

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
  const [inputSearch, setInputSearch] = useState("");
  const { setPage } = usePageMenu();
  const [valueUseDebounce] = useDebounce(inputSearch, 1000);
  const route = useRouter();

  const { searchValue, setSearchValue } = useDataSearchMenu();

  const handleSearch = () => {
    setPage(1);

    const priceWithoutRp = searchValue.price
      ? searchValue.price.replace("Rp", "")
      : "";
    const totalPayWithoutRp = searchValue["total-pay"]
      ? searchValue["total-pay"].replace("Rp", "")
      : "";
    const searchValueData = inputSearch;

    let newSearchValues = {
      ...route.query,
      ...searchValue,
      [title]: searchValueData,
      ["page"]: 1,
      price: priceWithoutRp,
      ["total-pay"]: totalPayWithoutRp,
    };

    const dataWithValue = Object.keys(newSearchValues)
      .filter(
        (key) => newSearchValues[key] !== ""
        //  && newSearchValues[key] !== "Rp"
        // newSearchValues[key] !== "all"
      )
      .reduce((obj, key) => {
        obj[key] = newSearchValues[key];
        return obj;
      }, {});

    route.push({
      pathname: route.pathname,
      query: dataWithValue,
    });
  };

  useEffect(() => {
    handleSearch();
  }, [valueUseDebounce]);

  useEffect(() => {
    if (route.isReady) {
      const entry = Object.entries(route.query).find(
        ([key, value]) => key === title
      );

      if (entry) {
        const [key, value] = entry;
        setInputSearch(value);
      } else {
        setInputSearch("");
      }
    }
  }, []);
  return (
    <CssTextField
      autoComplete="off"
      sx={{
        width: "100%",
      }}
      // value={searchValue[title] || ""}
      value={inputSearch || ""}
      onChange={(event) => {
        setInputSearch(event.target.value),
          setSearchValue({
            ...searchValue,
            [title]: event.target.value !== "" ? event.target.value : "",
          });
        // handleSearch(event);
      }}
    />
  );
}
