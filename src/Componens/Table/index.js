import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useLimitTable } from "@/Context/DashboardLimitTableContextProvider";
import PaginationTable from "./PaginationTable";
import { Grid, IconButton, TableSortLabel, Typography } from "@mui/material";
import { useSortBy } from "@/Context/SortByContextProvider";
import { useSortType } from "@/Context/SortTypeContextProvider";
import ActionTable from "./ActionTable";
import { useRouter } from "next/router";
import {
  actionFieldTableConditional,
  filterSearchConditional,
  formatDataConditional,
  sortDataConditional,
} from "@/Helper/filterSearchConditional";

export default function ReusableTable({ DataTabel, columns }) {
  const [dataRows, setDataRows] = React.useState([]);
  const { limitTable, setLimitTable } = useLimitTable();
  const { sortBy, setSortBy } = useSortBy();
  const { sortType, setSortType } = useSortType();
  const { push, pathname, query } = useRouter();

  const handleSort = (value) => {
    let newSortType = "asc";
    if (value === sortBy && sortType === "asc") {
      newSortType = "desc";
    }
    setSortType(newSortType);
    setSortBy(value);
    const currentRoute = pathname;
    // push(`${currentRoute}?sortType=${newSortType}&sortBy=${value}`);
    let newSearchValues = {
      ...query,
      ["sortType"]: newSortType,
      ["sortBy"]: value,
    };
    push({
      pathname: currentRoute,
      query: newSearchValues,
    });
  };

  React.useEffect(() => {
    setDataRows(DataTabel);
  }, [DataTabel]);
  return (
    <Paper sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      {/* <TableContainer sx={{ height: "calc(100vh - 40px - 80px - 120px)" }}> */}
      <TableContainer
        sx={{
          maxHeight: 700,
          "&::-webkit-scrollbar": {
            width: "0.4em",
            // background: "#eeeeee",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "#eeeeee",
            borderRadius: "10px",
          },
        }}
      >
        <Table stickyHeader aria-label="sticky table" sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  // align={column.align}
                  sx={{
                    minWidth: column.minWidth,
                    fontWeight: "bold",
                  }}
                >
                  <Typography
                    fontSize={{ lg: "1.2rem", sm: "0.5rem" }}
                    fontWeight={"bold"}
                  >
                    {column.label}
                  </Typography>
                  <Grid display={"flex"} alignItems={"center"} gap={0.6}>
                    {filterSearchConditional(column)}
                    {sortDataConditional(column, sortBy, sortType, handleSort)}
                  </Grid>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRows.map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map((column, colIndex) => (
                  <TableCell
                    sx={{ fontSize: "1rem", paddingY: "20px" }}
                    key={colIndex}
                  >
                    {formatDataConditional(row, column)}

                    {actionFieldTableConditional(row, column)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationTable dataRows={dataRows} limitTable={limitTable} />
    </Paper>
  );
}