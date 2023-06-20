import LoginVerifikasiLayout from "@/Layout/Login/LoginVerifikasiLayout";
import {
  Box,
  Grid,
  LinearProgress,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import SubmitButton from "@/Componens/Button/SubmitButton";
import FoodieOrder from "@/Componens/Logo/FoodieOrder";
import zxcvbn from "zxcvbn";
import theme from "@/Helper/theme";
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

export default function Verification() {
  const [strengthPwd, setStrengthPwd] = useState(0);
  const [strengthColor, setStrengthColor] = useState("inherit");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (value) => {
    setTimeout(() => {
      formik.setSubmitting(false);
      formik.resetForm();
    }, 2000);
  };

  const formik = useFormik({
    // setting initial values
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string()
        .min(8, "Password harus terdiri dari minimal 8 karakter")
        .matches(/[a-z]/, "Password harus mengandung huruf kecil")
        .matches(/[A-Z]/, "Password harus mengandung huruf besar")
        .matches(/\d/, "Password harus mengandung angka")
        .matches(/[^a-zA-Z\d]/, "Password harus mengandung karakter khusus")
        .test(
          "no-consecutive-characters",
          "Tidak boleh memiliki 3 huruf yang sama secara berurutan",
          (value) => {
            const consecutiveRegex = /(.)\1{2}/;
            return !consecutiveRegex.test(value);
          }
        )
        .required(),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "confirm password tidak benar")
        .required(),
    }),

    // handle submission
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const pwdStrength = zxcvbn(formik.errors);
    const isMinValid = Yup.string().min(8).isValidSync(formik.values.password);
    const isLowerCaseValid = Yup.string()
      .matches(/[a-z]/)
      .isValidSync(formik.values.password);
    const isUpperCaseValid = Yup.string()
      .matches(/[A-Z]/)
      .isValidSync(formik.values.password);
    const isSpecialCharValid = Yup.string()
      .matches(/[^a-zA-Z\d]/)
      .test(
        "no-consecutive-characters",
        "Tidak boleh memiliki 3 huruf yang sama secara berurutan",
        (value) => {
          const consecutiveRegex = /(.)\1{2}/;
          return !consecutiveRegex.test(value);
        }
      )
      .isValidSync(formik.values.password);

    if (isMinValid && isLowerCaseValid && isUpperCaseValid) {
      setStrengthPwd(50);
      setStrengthColor("error");
    } else if (
      isMinValid &&
      isLowerCaseValid &&
      isUpperCaseValid &&
      isSpecialCharValid
    ) {
      setStrengthPwd(75);
    } else if (pwdStrength.score === 1) {
      setStrengthPwd(25);
      setStrengthColor("error");
    } else if (pwdStrength.score === 2) {
      setStrengthPwd(50);
      setStrengthColor("primary");
    } else if (pwdStrength.score === 3) {
      setStrengthPwd(75);
      setStrengthColor("secondary");
    } else if (pwdStrength.score === 4) {
      setStrengthPwd(100);
      setStrengthColor("success");
    } else {
      setStrengthPwd(0);
    }

    console.log(pwdStrength);
  }, [formik.values.password]);

  // useEffect(() => {
  //   const pwdStrength = zxcvbn(formik.values.password);

  //   if (pwdStrength.score === 1) {
  //     setStrengthPwd(25);
  //     setStrengthColor("error");
  //   } else if (pwdStrength.score === 2) {
  //     setStrengthPwd(50);
  //     setStrengthColor("primary");
  //   } else if (pwdStrength.score === 3) {
  //     setStrengthPwd(75);
  //     setStrengthColor("secondary");
  //   } else if (pwdStrength.score === 4) {
  //     setStrengthPwd(100);
  //     setStrengthColor("success");
  //   } else {
  //     setStrengthPwd(0);
  //   }

  //   console.log(pwdStrength);
  // }, [formik.values.password]);

  return (
    <>
      <LoginVerifikasiLayout>
        <Grid sx={{ width: "35rem" }}>
          <FoodieOrder />
          <Grid pt={2}>
            <Typography
              paddingBottom={2}
              pt={5}
              variant="h5"
              fontFamily="Inter"
            >
              Account Verification
            </Typography>
            <form
              onSubmit={formik.handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "30px" }}
            >
              <Box display={"flex"} flexDirection={"column"}>
                <CssTextField
                  name="email"
                  label="email"
                  autoComplete="off"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <span style={{ color: "red", fontFamily: "Inter" }}>
                    {formik.errors.email}
                  </span>
                )}
              </Box>
              <Box display={"flex"} flexDirection={"column"}>
                <Box position={"relative"}>
                  <CssTextField
                    sx={{ width: "100%" }}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    label="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                {formik.values.password && (
                  <Box sx={{ width: "100%" }} paddingY={1} paddingBottom={0.5}>
                    <LinearProgress
                      variant="determinate"
                      color={strengthColor}
                      value={strengthPwd}
                    />
                  </Box>
                )}
                {formik.touched.password && formik.errors.password && (
                  <span style={{ color: "red", fontFamily: "Inter" }}>
                    {formik.errors.password}
                  </span>
                )}
              </Box>
              <Box display={"flex"} flexDirection={"column"}>
                <Box position={"relative"}>
                  <CssTextField
                    sx={{ width: "100%" }}
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    label="Confirm Password"
                    autoComplete="off"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Box
                    position={"absolute"}
                    right={"20px"}
                    top={"18px"}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {!showConfirmPassword ? (
                      <VisibilityOutlinedIcon sx={{ fontWeight: "100" }} />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </Box>
                </Box>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <span style={{ color: "red", fontFamily: "Inter" }}>
                      {formik.errors.confirmPassword}
                    </span>
                  )}
              </Box>
              <SubmitButton disable={formik.isSubmitting} />
            </form>
          </Grid>
        </Grid>
      </LoginVerifikasiLayout>
    </>
  );
}
