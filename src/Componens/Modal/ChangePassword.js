import React, { useEffect, useState } from "react";
import ModalLayout from "./ModalLayout";
import { Alert, Box, Button, Snackbar, Stack, TextField } from "@mui/material";
import PasswordInput from "../InputForm/PasswordInput";
import ButtonModal from "./ButtonModal";
import InputForm from "../InputForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import zxcvbn from "zxcvbn";

export default function ChangePassword({ open, handleClose, title }) {
  const token = Cookies.get("token");
  const [strengthPwd, setStrengthPwd] = useState(0);
  const [strengthColor, setStrengthColor] = useState("inherit");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const handleOpenSnackBar = () => setOpenSnackBar(true);
  const handleCloseSnackBar = () => setOpenSnackBar(false);

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpenSnackBar(false);
  // };
  const HandleChangePassword = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:5000/user/change-password",
        {
          oldPassword: formik.values.oldPassword,
          newPassword: formik.values.newPassword,
          confirmPassword: formik.values.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        formik.resetForm();
        handleClose();
        // setOpenSnackBar(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old Password is a required field"),
      newPassword: Yup.string()
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
        .oneOf([Yup.ref("newPassword")], "confirm password tidak benar")
        .required(),
    }),

    onSubmit: HandleChangePassword,
  });
  const clearDataForm = () => {
    formik.resetForm();
  };

  const strengthPwdzxcvbn = zxcvbn(formik.values.newPassword);

  useEffect(() => {
    const pwdStrength = zxcvbn(formik.values.newPassword);
    const error = formik.errors.newPassword;
    const passwordErrorsCount = Object.keys(formik.errors).filter(
      (key) => key === "newPassword"
    ).length;

    if (passwordErrorsCount === 0 && pwdStrength.guesses_log10 >= 10) {
      setStrengthPwd(100);
      setStrengthColor("success");
    } else if (passwordErrorsCount === 0 && pwdStrength.score >= 2) {
      setStrengthPwd(75);
      setStrengthColor("primary");
      // setStrengthColor("success");
    } else if (passwordErrorsCount === 0 && pwdStrength.score < 2) {
      setStrengthPwd(50);
      setStrengthColor("error");
    } else if (passwordErrorsCount >= 1 && pwdStrength.score < 4) {
      setStrengthPwd(25);
      setStrengthColor("error");
    } else {
      setStrengthPwd(25);
      setStrengthColor("error");
    }
  }, [formik.values.newPassword, formik.errors.newPassword, strengthPwdzxcvbn]);

  return (
    <>
      <ModalLayout open={open} handleClose={handleClose} title={title}>
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "30px" }}
        >
          <PasswordInput
            name={"oldPassword"}
            label={"Old Password"}
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            dataError={formik.errors.oldPassword}
            touched={formik.touched.oldPassword}
            handleBlur={formik.handleBlur}
          />
          <PasswordInput
            name={"newPassword"}
            label={"New Password"}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            dataError={formik.errors.newPassword}
            touched={formik.touched.newPassword}
            handleBlur={formik.handleBlur}
            strengthPwd={strengthPwd}
            strengthColor={strengthColor}
          />
          <PasswordInput
            name={"confirmPassword"}
            label={"Confirm New Password"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            dataError={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
            handleBlur={formik.handleBlur}
          />
          <ButtonModal
            disable={false}
            open={open}
            handleClose={handleClose}
            resetInput={clearDataForm}
          />
        </form>
      </ModalLayout>
    </>
  );
}
