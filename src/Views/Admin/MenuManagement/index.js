import AddMenuForm from "@/Componens/Modal/Form/AddData/AddMenuForm";
import ReusableTable from "@/Componens/Table";
import { useLoadingCircularProgress } from "@/Context/LoadingCircularProgressContextProvider";
import { useSortBy } from "@/Context/SortByContextProvider";
import { useSortType } from "@/Context/SortTypeContextProvider";
import { useDataTotalItem } from "@/Context/TotalItemContextProvider";
import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function MenuManagementView({
  getDataMenu,
  getTotalItem,
  sortByData,
  sortTypeData,
}) {
  const { totalItem, setTotalItem } = useDataTotalItem();
  const { sortBy, setSortBy } = useSortBy();
  const { sortType, setSortType } = useSortType();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const { setOpenLoadingCircular } = useLoadingCircularProgress();

  // Atur setOpenLoadingCircular saat server-side rendering selesai
  useEffect(() => {
    setOpenLoadingCircular(false);
  }, []);

  useEffect(() => {
    setSortBy(sortByData);
    setSortType(sortTypeData);
  }, [sortByData, sortTypeData]);

  useEffect(() => {
    setTotalItem(getTotalItem);
  }, [totalItem]);

  const columns = [
    {
      label: "Name",
      field: "nama",
      routefield: "name",
      minWidth: 170,
      filter: "inputText",
      sort: false,
    },
    {
      label: "Category",
      field: "kategori",
      routefield: "category",
      minWidth: 170,
      filter: "inputSelect",
      sort: false,
      selectData: [
        { text: "all", value: "all" },
        { text: "heavy meal", value: "heavy-meal" },
        { text: "snack", value: "snack" },
        { text: "drinks", value: "drinks" },
        { text: "juice", value: "juice" },
      ],
      // selectData: ["all", "heavy-meal", "snack", "drinks", "juice"],
    },
    {
      label: "Price",
      field: "harga",
      routefield: "price",
      minWidth: 170,
      filter: "inputNumber",
      sort: true,
    },
    {
      label: "Restaurant Name",
      field: "nama_tempat",
      routefield: "restaurant-name",
      minWidth: 170,
      filter: "inputText",
      sort: false,
    },
    {
      label: "Address",
      field: "alamat",
      routefield: "address",
      minWidth: 170,
      filter: "inputText",
      sort: false,
    },
    {
      label: "Registered Date",
      field: "createdAt",
      routefield: "registered-date",
      minWidth: 170,
      filter: "inputDate",
      sort: true,
    },
    {
      label: "",
      field: "action",
      minWidth: 0,
      filter: "",
      sort: false,
      action: true,
      actionLable: "menuManagement",
    },
    // bisa search & sort??
  ];
  return (
    <>
      <Grid
        borderRadius={4}
        sx={{
          backgroundColor: "white",
          height: "calc(100vh - 40px - 80px)",
        }}
        width={"100%"}
        overflow={"hidden"}
        padding={3}
        display={"flex"}
        flexDirection={"column"}
        // gap={2}
      >
        <Grid display={"flex"}>
          <Grid flex={6}>
            <Typography paddingBottom={1} variant="h6" fontWeight={600}>
              Data Menu
            </Typography>
          </Grid>
          <Grid flex={6} textAlign={"end"}>
            <Button
              disableElevation
              size="small"
              variant="contained"
              onClick={handleOpen}
            >
              Add Menu
            </Button>
          </Grid>
        </Grid>
        <Grid>
          <ReusableTable DataTabel={getDataMenu} columns={columns} />
        </Grid>
      </Grid>
      <AddMenuForm
        title={"Please Fill The Form"}
        handleClose={handleClose}
        open={open}
      />
      {/* pop up action here */}
    </>
  );
}
