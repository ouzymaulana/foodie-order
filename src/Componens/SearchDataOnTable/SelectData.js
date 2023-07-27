import { usePageMenu } from "@/Context/PageContextProvider";
import { useDataSearchMenu } from "@/Context/SearchValueOnTableContextProvider";
import theme from "@/Helper/theme";
import {
  Grid,
  MenuItem,
  TableSortLabel,
  TextField,
  styled,
} from "@mui/material";
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

export default function SelectData({ title, selectData }) {
  const route = useRouter();
  const { searchValue, setSearchValue } = useDataSearchMenu();
  const { setPage } = usePageMenu();
  const [inputSearch, setInputSearch] = useState("");
  const [valueUseDebounce] = useDebounce(inputSearch, 1000);

  const handleSearch = () => {
    setPage(1);
    // const searchValueData =
    //   event.target.value === "all" ? "" : event.target.value;
    let searchValueData;
    if (inputSearch === "all") {
      searchValueData = "";
    } else {
      searchValueData = inputSearch;
    }
    const newSearchValues = {
      ...route.query,
      ...searchValue,
      [title]: searchValueData,
      ["page"]: 1,
    };

    const dataWithValue = Object.keys(newSearchValues)
      .filter(
        (key) => newSearchValues[key] !== "" && newSearchValues[key] !== "Rp"
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

  useEffect(() => {
    handleSearch();
  }, [valueUseDebounce]);

  return (
    <CssTextField
      id="outlined-select-currency"
      sx={{ width: "100%" }}
      select
      defaultValue={inputSearch || selectData[0].value}
      value={inputSearch || selectData[0].value}
      onChange={(event) => {
        // handleSearch(event),
        setInputSearch(event.target.value),
          setSearchValue({ ...searchValue, [title]: event.target.value });
      }}
    >
      {selectData.map((item, i) => (
        <MenuItem key={i} value={item.value}>
          {item.text}
        </MenuItem>
      ))}
    </CssTextField>
  );
}
