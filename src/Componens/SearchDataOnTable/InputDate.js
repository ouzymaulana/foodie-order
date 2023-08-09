import { usePageMenu } from "@/Context/PageContextProvider";
import { useDataSearchMenu } from "@/Context/SearchValueOnTableContextProvider";
import theme from "@/Helper/theme";
import { TextField, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CssTextField = styled(DatePicker)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiOutlinedInput-root": {
    fontSize: "1rem",
    height: "40px",

    "& fieldset": {
      borderColor: grey[400],
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

export default function InputDate({ title }) {
  const route = useRouter();
  const { searchValue, setSearchValue } = useDataSearchMenu();
  const [inputSearch, setInputSearch] = useState("");
  const { setPage } = usePageMenu();

  const handleSearch = (date) => {
    setPage(1);

    const priceWithoutRp = searchValue.price
      ? searchValue.price.replace("Rp", "")
      : "";
    const totalPayWithoutRp = searchValue["total-pay"]
      ? searchValue["total-pay"].replace("Rp", "")
      : "";

    const searchValueData = date !== null ? date.format("YYYY-MM-DD") : "";
    const newSearchValues = {
      ...route.query,
      ...searchValue,
      [title]: searchValueData,
      ["page"]: 1,
      price: priceWithoutRp,
      ["total-pay"]: totalPayWithoutRp,
    };
    const dataWithValue = Object.keys(newSearchValues)
      .filter(
        (key) =>
          newSearchValues[key] !== "" &&
          newSearchValues[key] !== "Rp" &&
          newSearchValues[key] !== "all"
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

        const dateObject = new Date(value);
        setInputSearch(dateObject.toISOString());
      } else {
        setInputSearch("");
      }
    }
  }, [route.isReady, title]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CssTextField
        type="date"
        autoComplete="off"
        sx={{
          width: "180px",
        }}
        // value={dayjs(inputSearch) || ""}
        onChange={(event) => {
          setInputSearch(event),
            handleSearch(event),
            setSearchValue({
              ...searchValue,
              [title]: event !== null ? event.format("YYYY-MM-DD") : "",
            });
        }}
      />
    </LocalizationProvider>
  );
}
