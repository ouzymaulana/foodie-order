import React from "react";
import ModalLayout from "./ModalLayout";
import { Button, Grid } from "@mui/material";
import InputForm from "../InputForm";
import ButtonModal from "./ButtonModal";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function TopUpSaldo({ open, title, handleClose }) {
  const handleTopUpBalance = () => {
    alert("bisa");
  };

  const formik = useFormik({
    initialValues: {
      topupAmount: "",
    },

    validationSchema: Yup.object({
      topupAmount: Yup.number("format number bro").max(1000000).required(),
    }),

    onSubmit: handleTopUpBalance,
  });
  return (
    <ModalLayout open={open} title={title}>
      <form onSubmit={formik.handleSubmit}>
        <Grid display={"flex"} flexDirection={"column"} gap={3}>
          <InputForm
            title={"topupAmount"}
            label={"TopUp Amount"}
            value={formik.values.topupAmount}
            onchange={formik.handleChange}
            dataError={formik.errors.topupAmount}
          />
          <ButtonModal disable={false} open={open} handleClose={handleClose} />
        </Grid>
      </form>
    </ModalLayout>
  );
}
