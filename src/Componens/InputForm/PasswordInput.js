import theme from "@/Helper/theme";
import { Box, LinearProgress, TextField, styled } from "@mui/material";
import React, { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

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

export default function PasswordInput({
  name,
  label,
  value,
  onChange,
  dataError,
  touched,
  handleBlur,
  strengthPwd,
  strengthColor,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box position={"relative"}>
        <CssTextField
          sx={{ width: "100%" }}
          type={showPassword ? "text" : "password"}
          name={name}
          label={label}
          autoComplete="off"
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
        />
        <Box
          position={"absolute"}
          right={"20px"}
          top={"18px"}
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? (
            <VisibilityOutlinedIcon />
          ) : (
            <VisibilityOffOutlinedIcon />
          )}
        </Box>
      </Box>
      {name === "newPassword" && value && (
        <Box sx={{ width: "100%" }} paddingY={1} paddingBottom={0.5}>
          <LinearProgress
            variant="determinate"
            color={strengthColor}
            value={strengthPwd}
          />
        </Box>
      )}
      {touched && dataError && (
        <span style={{ color: "red", fontFamily: "Inter" }}>{dataError}</span>
      )}
    </Box>
  );
}
