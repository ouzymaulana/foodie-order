import * as React from "react";
import InputForm from "../InputForm/index.js";
import { Grid, MenuItem, TextField } from "@mui/material";
import ButtonModal from "./ButtonModal.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectDataCart, setCartItem } from "@/Redux/Slices/CartItemsSlice.js";
import ModalLayout from "./ModalLayout/index.js";

export default function IsHasCartItem({ open, handleClose, idMenu, title }) {
  const cartItem = useSelector(selectDataCart);
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    const menu = {
      idMenu: idMenu,
      catatanTambahan: formik.values.catatanTambahan,
      quantity: 1,
    };
    dispatch(setCartItem(menu));
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      catatanTambahan: "",
    },

    validationSchema: Yup.object({
      catatanTambahan: Yup.string().max(60),
    }),

    onSubmit: handleAddToCart,
  });
  const clearDataForm = () => {
    formik.resetForm();
  };

  return (
    <ModalLayout open={open} title={title}>
      <form onSubmit={formik.handleSubmit}>
        <Grid display={"flex"} flexDirection={"column"} gap={3}>
          <InputForm
            title={"catatanTambahan"}
            label={"Order Notes"}
            multiline={true}
            value={formik.values.catatanTambahan}
            onchange={formik.handleChange}
            dataError={formik.errors.catatanTambahan}
            touched={formik.touched.catatanTambahan}
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
