import { Box, Button, Grid, styled } from "@mui/material";
import React, { useState } from "react";
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
import SecoundModalLayout from "../ModalLayout/SecoundModalLayout";

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
  const [selectValue, setSelectValue] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [lastDate, setLastDate] = useState(null);

  console.log(startDate);

  const handleDateChange = (date) => {
    setSelectValue(date);
  };

  const handleSubmit = () => {
    if (filterBy === "Daily" && selectValue) {
      const formattedDate = selectValue.format("YYYY-MM-DD");
      setSelectFilter({ daily: formattedDate });
    } else if (filterBy === "Mounthly" && selectValue) {
      const formattedMonth = selectValue.format("YYYY-MM");
      setSelectFilter({ mounthly: formattedMonth });
    } else if (filterBy === "Year" && selectValue) {
      const formattedYear = selectValue.format("YYYY");
      setSelectFilter({ year: formattedYear });
    } else if (filterBy === "Customise" && startDate && lastDate) {
      const formattedStartDate = startDate.format("YYYY-MM-DD");
      const formattedLastDate = lastDate.format("YYYY-MM-DD");
      setSelectFilter({
        startDate: formattedStartDate,
        lastDate: formattedLastDate,
      });
    }

    handleClose();
  };

  return (
    <SecoundModalLayout
      open={open}
      handleClose={handleClose}
      title={"filter by apa"}
    >
      <Grid display={"flex"} flexDirection={"column"}>
        <form onSubmit={() => console.log("bisa")}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {filterBy === "Daily" && (
              <DateCalendar
                // sx={{ width: "100%" }}
                onChange={handleDateChange}
              />
            )}
            {filterBy === "Mounthly" && (
              <MonthCalendar onChange={handleDateChange} />
            )}
            {filterBy === "Year" && (
              <YearCalendar
                sx={{ width: "100%" }}
                onChange={handleDateChange}
              />
            )}
            {filterBy === "Customise" && (
              <Grid display={"flex"} flexDirection={"column"} gap={2}>
                <DatePickerStyled
                  label="Start Date"
                  onChange={(event) => setStartDate(event)}
                />
                <DatePickerStyled
                  label="Last Date"
                  onChange={(event) => setLastDate(event)}
                />
              </Grid>
            )}
          </LocalizationProvider>
          <Box display={"flex"} paddingTop={3}>
            <Button
              onClick={handleSubmit}
              size="small"
              // type="submit"
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
        </form>
      </Grid>
    </SecoundModalLayout>
  );
}
