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
import React from "react";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontSize: "1rem",
    height: "40px",
    width: "100%",

    "& fieldset": {
      borderRadius: theme.spacing(1),
      width: "100%",
      // border: "none",
    },
    "&:hover fieldset": {
      borderColor: grey[400],
      // borderColor: "#FFAF37",
    },
  },
});

export default function SelectData({
  title,
  selectData1,
  selectData2,
  selectData3,
  selectData,
}) {
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
    // if (
    //   searchValueData !== "" &&
    //   searchValueData !== "progress/done" &&
    //   searchValueData !== "siang/sore"
    // ) {
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
      id="outlined-select-currency"
      sx={{ width: "100%" }}
      select
      defaultValue={selectData3}
      onChange={(event) => {
        handleSearch(event),
          setSearchValue({ ...searchValue, [title]: event.target.value });
      }}
    >
      {selectData.map((item, i) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
      {/* <MenuItem key={selectData2} value={selectData2}>
        {selectData2}
      </MenuItem>
      <MenuItem key={selectData3} value={selectData3}>
        {selectData3}
      </MenuItem> */}
    </CssTextField>
  );
}
