import { Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectLimit from "../Button/SelectLimit";
import { usePageMenu } from "@/Context/PageContextProvider";
import { useRouter } from "next/router";
import { useDataSearchMenu } from "@/Context/SearchValueOnTableContextProvider";
import { useDataTotalItem } from "@/Context/TotalItemContextProvider";
import { useLoadingCircularProgress } from "@/Context/LoadingCircularProgressContextProvider";

export default function PaginationTable({ dataRows, limitTable }) {
  const { setOpenLoadingCircular } = useLoadingCircularProgress();
  const { searchValue, setSearchValue } = useDataSearchMenu();
  const { totalItem } = useDataTotalItem();
  const { page, setPage } = usePageMenu();
  const router = useRouter();

  const handleSetPage = () => {
    const parsedPage = parseInt(page);
    const newSearchValues = {
      ...router.query,
      ...searchValue,
      ["page"]: parsedPage,
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
    router.push({
      pathname: router.pathname,
      query: dataWithValue,
      // query: { ...router.query, ...newSearchValues },
    });
  };

  useEffect(() => {
    handleSetPage();
  }, [page, router.query.page]);
  return (
    <Stack
      spacing={2}
      padding={2}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"end"}
      alignItems={"end"}
      gap={5}
    >
      <SelectLimit />
      <Pagination
        count={Math.ceil(totalItem / limitTable)}
        page={parseInt(page)}
        variant="outlined"
        size="large"
        color="primary"
        onChange={(event, value) => setPage(event.target.textContent)}
        // onChange={(event) => setPage(event.target.textContent)}
      />
    </Stack>
  );
}
