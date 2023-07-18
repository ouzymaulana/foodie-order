import { useDataSearchMenu } from "@/Context/SearchValueOnTableContextProvider";
import theme from "@/Helper/theme";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { IMaskInput } from "react-imask";

export default function InputNumber({ title }) {
  const [isFocused, setIsFocused] = useState(false);
  const { searchValue, setSearchValue } = useDataSearchMenu();
  const [isLoading, setIsLoading] = useState();
  const route = useRouter();
  const ref = useRef(null);
  const inputRef = useRef(null);

  const handleSearch = (event) => {
    clearTimeout(isLoading);
    const newTimer = setTimeout(() => {
      const searchValueData = event.target.value;
      const newSearchValues = { ...searchValue, [title]: searchValueData };
      if (searchValueData !== "") {
        route.push({
          pathname: route.pathname,
          query: { ...route.query, ...newSearchValues },
        });
      }
    }, 1000);
    setIsLoading(newTimer);
  };

  const inputStyle = {
    borderRadius: theme.spacing(1),
    width: "100%",
    height: "40px",
    fontSize: "1rem",
    paddingLeft: "0.8rem",
    paddingRight: "0.8rem",
    borderColor: isFocused ? theme.palette.primary.main : grey[400],
    borderWidth: isFocused ? 3 : "1px",
    outline: "none",
    // boxShadow: "none",
    borderStyle: "solid",
  };
  return (
    <IMaskInput
      style={inputStyle}
      radix="."
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      mask={Number}
      ref={ref}
      inputRef={inputRef}
      onAccept={(value, mask) => console.log(value)}
      onChange={(event) => {
        setSearchValue({ ...searchValue, [title]: event.target.value }),
          handleSearch(event);
      }}
      onKeyDown={(event) => (event.key === "Enter" ? handleSearch(event) : "")}
    />
  );
}
