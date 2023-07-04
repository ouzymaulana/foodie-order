import React from "react";
import { Grid } from "@mui/material";
import ModalLayout from "./ModalLayout/index.js";
import InputForm from "../InputForm/index.js";
import ButtonModal from "./ButtonModal.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateOrderNote } from "@/Redux/Slices/CartItemsSlice.js";

export default function UpdateItemCart({ open, handleClose, item, title }) {
  const dispatch = useDispatch();

  const handleUpdateOrderNote = () => {
    if (
      formik.values.catatanTambahan !== formik.initialValues.catatanTambahan
    ) {
      const data = {
        currentNote: formik.values.catatanTambahan,
        idMenu: item.idMenu,
      };
      dispatch(updateOrderNote(data));
      handleClose();
    } else {
      console.log("tidak ada yang diedit");
    }
  };

  const formik = useFormik({
    initialValues: {
      catatanTambahan: item.catatanTambahan || "",
    },

    validationSchema: Yup.object({
      catatanTambahan: Yup.string().max(60),
    }),

    onSubmit: handleUpdateOrderNote,
  });
  return (
    <ModalLayout open={open} title={title}>
      <form onSubmit={formik.handleSubmit}>
        <Grid display={"flex"} flexDirection={"column"} gap={3}>
          <InputForm
            title={"catatanTambahan"}
            label={"Order Notes"}
            multiline={true}
            // value={item.catatanTambahan}
            value={formik.values.catatanTambahan}
            onchange={formik.handleChange}
            dataError={formik.errors.catatanTambahan}
          />
          <ButtonModal disable={false} open={open} handleClose={handleClose} />
        </Grid>
      </form>
    </ModalLayout>
  );
}
