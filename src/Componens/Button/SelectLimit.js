import { useLimitTable } from "@/Context/DashboardLimitTableContextProvider";
import { useDataSearchMenu } from "@/Context/SearchValueOnTableContextProvider";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function SelectLimit({ orderData }) {
  const { limitTable, setLimitTable } = useLimitTable();
  const { searchValue, setSearchValue } = useDataSearchMenu();
  const { push, pathname, query } = useRouter();

  const handleSetlimit = () => {
    const newSearchValues = { ...searchValue, ["limit"]: limitTable };
    push({
      pathname: pathname,
      query: { ...query, ...newSearchValues },
    });
  };

  useEffect(() => {
    console.log("jalan");
    handleSetlimit();
  }, [limitTable]);
  return (
    <FormControl sx={{ m: 1, minWidth: 80, border: 0, outline: "none" }}>
      <Select
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        size="small"
        sx={{
          "& > div": {
            border: "none",
          },
        }}
        defaultValue={limitTable}
        onChange={(event) => setLimitTable(event.target.value)}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={40}>40</MenuItem>
        <MenuItem value={80}>80</MenuItem>
      </Select>
    </FormControl>
  );
}
