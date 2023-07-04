import React from "react";
import ModalLayout from "./ModalLayout";
import { Button, Grid } from "@mui/material";
import InputForm from "../InputForm";
import ButtonModal from "./ButtonModal";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function TranferBalance({ open, title, handleClose }) {
  const handleTransferBalance = () => {
    alert("bisa");
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
          />
          <ButtonModal disable={false} open={open} handleClose={handleClose} />
        </Grid>
      </form>
    </ModalLayout>
  );
}
