import { Box, MenuItem, TextField, styled } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import theme from "@/Helper/theme";
import React from "react";

const CssTextField = styled(TextField)({
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

export default function InputForm({
  title,
  label,
  multiline,
  select,
  value,
  onchange,
  dataError,
  touched,
}) {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      {multiline === true ? (
        <CssTextField
          multiline
          name={title}
          label={label}
          autoComplete="off"
          rows={4}
          // maxRows={4}
          value={value}
          onChange={onchange}
        />
      ) : select === true ? (
        <CssTextField
          select
          name={title}
          label={label}
          autoComplete="off"
          value={value || ""}
          onChange={onchange}
          // onBlur={formik.handleBlur}
        >
          <MenuItem value={"siang"}>siang</MenuItem>
          <MenuItem value={"sore"}>sore</MenuItem>
        </CssTextField>
      ) : (
        <CssTextField
          name={title}
          label={label}
          autoComplete="off"
          value={value}
          onChange={onchange}
        />
      )}
      {touched && dataError && (
        <span style={{ color: "red", fontFamily: "Inter" }}>{dataError}</span>
      )}
    </Box>
  );
}
