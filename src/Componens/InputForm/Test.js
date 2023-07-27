import theme from "@/Helper/theme";
import { TextField, styled } from "@mui/material";
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

export default function Test({
  title,
  value,
  onchange,
  dataError,
  touched,
  label,
}) {
  return (
    <Grid display={"flex"} flexDirection={"column"} gap={3}>
      <CssTextField
        type="file"
        name={title}
        label={label}
        autoComplete="off"
        value={value}
        onChange={onchange}
      />
      {touched && dataError && (
        <span style={{ color: "red", fontFamily: "Inter" }}>{dataError}</span>
      )}
    </Grid>
  );
}
