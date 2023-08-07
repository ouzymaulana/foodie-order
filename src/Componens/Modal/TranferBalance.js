import React from "react";
import ModalLayout from "./ModalLayout";
import { Button, Grid } from "@mui/material";
import InputForm from "../InputForm";
import ButtonModal from "./ButtonModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
import { decrementBalance } from "@/Redux/Slices/BalanceSlice";
import { Alert } from "../Alert";

export default function TranferBalance({ open, title, handleClose }) {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const handleTransferBalance = async () => {
    const response = await axios.post(
      "http://localhost:5000/user/transferBalance",
      {
        destinationEmail: formik.values.destinationEmail,
        transferAmount: formik.values.transferAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status === "success") {
      dispatch(decrementBalance(formik.values.transferAmount));
      handleClose();
      Alert("success", "Transfer was successful");
    }
  };

  const formik = useFormik({
    initialValues: {
      destinationEmail: "",
      transferAmount: "",
    },

    validationSchema: Yup.object({
      destinationEmail: Yup.string().email().required(),
      transferAmount: Yup.number("format number bro").max(900000).required(),
    }),

    onSubmit: handleTransferBalance,
  });
  const clearDataForm = () => {
    formik.resetForm();
  };
  return (
    <ModalLayout open={open} title={title}>
      <form onSubmit={formik.handleSubmit}>
        <Grid display={"flex"} flexDirection={"column"} gap={3}>
          <InputForm
            title={"destinationEmail"}
            label={"Destination Email"}
            value={formik.values.destinationEmail}
            onchange={formik.handleChange}
            dataError={formik.errors.destinationEmail}
          />
          <InputForm
            title={"transferAmount"}
            label={"Transfer Amount"}
            value={formik.values.transferAmount}
            onchange={formik.handleChange}
            dataError={formik.errors.transferAmount}
            touched={formik.touched.transferAmount}
          />
          <ButtonModal
            disable={false}
            open={open}
            handleClose={handleClose}
            resetInput={clearDataForm}
          />
        </Grid>
      </form>
    </ModalLayout>
  );
}
