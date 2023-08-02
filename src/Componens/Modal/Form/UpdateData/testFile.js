import React from "react";
import ModalLayout from "../../ModalLayout";
import { Typography } from "@mui/material";
import { useFormik } from "formik";

export default function testFile({ dataMenu, title, open, handleClose }) {
  console.log(dataMenu);
  const formik = useFormik({
    nama: "ouzy",
  });
  return (
    <ModalLayout open={open} handleClose={handleClose} title={title}>
      <Typography>{formik.values.nama}</Typography>
    </ModalLayout>
  );
}
