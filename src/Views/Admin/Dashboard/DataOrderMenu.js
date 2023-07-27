import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import DataOrderTable from "./DataOrderTable";
import { Grid, IconButton, Pagination, Stack } from "@mui/material";
import SelectData from "@/Componens/SearchDataOnTable/SelectData";
import InputDate from "@/Componens/SearchDataOnTable/InputDate";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useRouter } from "next/router";
import InputSearch from "@/Componens/SearchDataOnTable/InputSearch";
import InputNumber from "@/Componens/SearchDataOnTable/InputNumber";
import { usePageMenu } from "@/Context/PageContextProvider";
import { useDataSearchMenu } from "@/Context/SearchValueOnTableContextProvider";
import SelectLimit from "@/Componens/Button/SelectLimit";
import { useLimitTable } from "@/Context/DashboardLimitTableContextProvider";

export default function DataOrderMenu({ orderData, getOrderData }) {
  const { limitTable, setLimitTable } = useLimitTable();
  const { searchValue, setSearchValue } = useDataSearchMenu();
  const [allOrderData, setAllOrderData] = useState([]);
  const { page, setPage } = usePageMenu();
  const [hashMore, setHashMore] = useState(true);
  // const [searchValue, setSearchValue] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortBy, setSortBy] = useState("");
  const router = useRouter();

  const handleSetPage = () => {
    const newSearchValues = { ...searchValue, ["page"]: page };
    router.push({
      pathname: router.pathname,
      query: { ...router.query, ...newSearchValues },
    });
  };

  useEffect(() => {
    handleSetPage();
  }, [page]);

  const createSortHandler = (value) => {
    let newSortType = "asc";
    if (value === sortBy && sortType === "asc") {
      newSortType = "desc";
    }
    setSortType(newSortType);
    setSortBy(value);
    const currentRoute = router.pathname;
    router.push(`${currentRoute}?sortType=${newSortType}&sortBy=${value}`);
    // setSortBy(sortBy === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    setAllOrderData(getOrderData.orderData);
    setHashMore(getOrderData.hashMore);
    // getDataOrderMenu();
  }, [sortBy, getOrderData]);

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          height: "98%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "89%",
            // maxHeight: 700,

            "&::-webkit-scrollbar": {
              width: "0.3em",
              background: "#eeeeee",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "#c1c1c1",
              borderRadius: "10px",
            },
          }}
        >
          <Table
            stickyHeader
            aria-label="collapsible table"
            sx={{ position: "relative", borderBottom: "none" }}
          >
            <TableHead>
              <TableRow sx={{ borderBottom: "none" }}>
                <TableCell />
                <TableCell>
                  <Grid display={"flex"} flexDirection={"column"}>
                    <Typography fontSize={"1rem"} fontWeight={600}>
                      User Name
                    </Typography>
                    <Grid display={"flex"} gap={0.6} alignItems={"center"}>
                      <InputSearch title="nama" />
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => createSortHandler("nama")}
                      >
                        <SwapVertIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid display={"flex"} flexDirection={"column"}>
                    <Typography fontSize={"1rem"} fontWeight={600}>
                      Order Time
                    </Typography>
                    <Grid display={"flex"} alignItems={"center"} gap={0.6}>
                      <SelectData
                        title="order-time"
                        selectData3={"siang/sore"}
                        selectData={["siang/sore", "siang", "sore"]}
                      />
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => createSortHandler("waktu_pemesanan")}
                      >
                        <SwapVertIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid display={"flex"} flexDirection={"column"}>
                    <Typography fontSize={"1rem"} fontWeight={600}>
                      Order Date
                    </Typography>
                    <Grid display={"flex"} gap={0.6} alignItems={"center"}>
                      <InputDate title={"order-date"} />
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => createSortHandler("createdAt")}
                      >
                        <SwapVertIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid display={"flex"} flexDirection={"column"}>
                    <Typography fontSize={"1rem"} fontWeight={600}>
                      Delivery Address
                    </Typography>
                    <Grid display={"flex"} gap={0.6} alignItems={"center"}>
                      <InputSearch title="delivery-address" />
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => createSortHandler("alamat_antar")}
                      >
                        <SwapVertIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid display={"flex"} flexDirection={"column"}>
                    <Typography fontSize={"1rem"} fontWeight={600}>
                      Status
                    </Typography>
                    <Grid display={"flex"} alignItems={"center"} gap={0.6}>
                      <SelectData
                        title="status"
                        selectData3={"progress/done"}
                        selectData={["progress/done", "progress", "done"]}
                      />
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => createSortHandler("status")}
                      >
                        <SwapVertIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid display={"flex"} flexDirection={"column"}>
                    <Typography fontSize={"1rem"} fontWeight={600}>
                      Total Pay
                    </Typography>
                    <Grid display={"flex"}>
                      <Grid display={"flex"} alignItems={"center"} gap={0.6}>
                        {/* <InputSearch title="total-pay" /> */}
                        <InputNumber title={"total-pay"} />
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => createSortHandler("total_bayar")}
                        >
                          <SwapVertIcon />
                        </IconButton>
                      </Grid>
                      {/* <TableSortLabel
                    active={true}
                    direction={sortBy}
                    onClick={() => createSortHandler()}
                  /> */}
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allOrderData.map((row, i) => (
                <DataOrderTable key={i} orderData={row} />
              ))}
            </TableBody>
            {/* <TableFooter
            style={{
              display: "flex",
              justifyContent: "center",
              position: "sticky",
              bottom: 0,
              backgroundColor: "red",
              width: "100%",
            }}
          >
            <TableRow>
              <TableCell colSpan={7}>
                <TablePagination colSpan={7}>data</TablePagination>
              </TableCell>
            </TableRow>
          </TableFooter> */}
          </Table>
        </TableContainer>
        <Stack
          // sx={{ backgroundColor: "red" }}
          spacing={2}
          // paddingY={1}
          paddingRight={1}
          display={"flex"}
          alignItems={"center"}
          flexDirection={"row"}
          justifyContent={"end"}
          position={"absolute"}
          bottom={0}
          right={0}
        >
          <SelectLimit />
          <Pagination
            variant="outlined"
            shape="rounded"
            sx={{ paddingBottom: 2 }}
            color={"primary"}
            count={Math.ceil(orderData.length / limitTable)}
            page={parseInt(page)}
            size="large"
            onClick={(event) => {
              // handleSetPage(event.target.textContent);
              setPage(event.target.textContent);
            }}
          />
        </Stack>
      </Paper>
    </>
  );
}
