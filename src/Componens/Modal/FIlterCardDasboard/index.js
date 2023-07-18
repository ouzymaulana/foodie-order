import {
  Box,
  Button,
  FormControl,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import ModalLayout from "../ModalLayout";
import {
  DateCalendar,
  DatePicker,
  LocalizationProvider,
  MonthCalendar,
  YearCalendar,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDataSelectFilter } from "@/Context/SelectFilterCardContextProvider";
import theme from "@/Helper/theme";

const DatePickerStyled = styled(DatePicker)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#FFAF37",
      borderRadius: theme.spacing(1.3), // Atur border-radius di sini
      borderWidth: 3,
    },
    "&:hover fieldset": {
      borderColor: "#FFAF37",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FFAF37",
      borderWidth: 3,
    },
  },
});

export default function FilterCartModal({ open, handleClose, filterBy }) {
  const { selectFilter, setSelectFilter } = useDataSelectFilter();

  const handleDateChange = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    setSelectFilter({ daily: formattedDate });
  };
  const handleMountChange = (date) => {
    const formattedDate = date.format("YYYY-MM");
    setSelectFilter({ mounthly: formattedDate });
  };
  const handleYearChange = (date) => {
    const formattedDate = date.format("YYYY");
    setSelectFilter({ year: formattedDate });
  };

  return (
    <ModalLayout open={open} handleClose={handleClose} title={"filter by apa"}>
      <Grid display={"flex"} flexDirection={"column"}>
        <FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {filterBy === "Daily" && (
              <DateCalendar
                sx={{ width: "100%" }}
                onChange={handleDateChange}
              />
            )}
            {filterBy === "Mounthly" && (
              <MonthCalendar
                sx={{ width: "100%" }}
                onChange={handleMountChange}
              />
            )}
            {filterBy === "Year" && (
              <YearCalendar
                sx={{ width: "100%" }}
                onChange={handleYearChange}
              />
            )}
            {filterBy === "Customise" && (
              // <YearCalendar sx={{ width: "100%" }} onChange={handleYearChange} />
              <Grid display={"flex"} flexDirection={"column"} gap={2}>
                <DatePickerStyled label="Date start" />
                <DatePickerStyled label="Date end" />
              </Grid>
            )}
          </LocalizationProvider>
          {/* <Button
            sx={{ borderRadius: "10px" }}
            disableElevation
            variant="contained"
            size="large"
            onClick={handleClose}
          >
            close
          </Button> */}
          <Box display={"flex"} paddingTop={3} flexDirection={"row"} gap={2}>
            <Button
              onClick={() => handleClose()}
              variant="contained"
              sx={{
                // padding: "10px",
                backgroundColor: "#212A3E",
                width: "70%",
                color: "white",
                borderRadius: "10px",
                fontSize: { lg: "16px", xs: "10px" },
                ":hover": {
                  bgcolor: "#191825",
                },
              }}
              size="small"
            >
              cancel
            </Button>
            <Button
              size="small"
              type="submit"
              variant="contained"
              sx={{
                padding: "10px",
                // backgroundColor: "#FAA41A",
                width: "100%",
                color: "black",
                borderRadius: "10px",
                fontSize: { lg: "16px", xs: "10px" },
                ":hover": {
                  bgcolor: "#FAA41A",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </FormControl>
      </Grid>
    </ModalLayout>
  );
}
