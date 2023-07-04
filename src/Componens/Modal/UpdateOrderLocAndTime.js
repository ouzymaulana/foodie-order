import React, { useEffect } from "react";
import ModalLayout from "./ModalLayout";
import { Grid } from "@mui/material";
import InputForm from "../InputForm";
import ButtonModal from "./ButtonModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDataCart,
  updateOrderLocAndOrderTime,
} from "@/Redux/Slices/CartItemsSlice";

export default function UpdateOrderLocAndTime({ open, handleClose, title }) {
  const cartItem = useSelector(selectDataCart);
  const dispatch = useDispatch();

  const handleUpdateOrderLocAndTime = () => {
    if (
      formik.values.alamatAntar !== formik.initialValues.alamatAntar ||
      formik.values.waktuPesanan !== formik.initialValues.waktuPesanan
    ) {
      dispatch(updateOrderLocAndOrderTime(formik.values));
      handleClose();
    }
  };

  const formik = useFormik({
    initialValues: {
      waktuPesanan: "",
      alamatAntar: "",
    },

    validationSchema: Yup.object({
      waktuPesanan: Yup.string().required("Order Time is a required field"),
      alamatAntar: Yup.string()
        .max(30)
        .required("Table Location is a required field"),
    }),

    onSubmit: handleUpdateOrderLocAndTime,
  });

  useEffect(() => {
    formik.setValues({
      waktuPesanan: cartItem[0]?.waktuPesanan || "",
      alamatAntar: cartItem[0]?.alamatAntar || "",
    });
  }, [cartItem]);
  return (
    <ModalLayout open={open} title={title}>
      <form onSubmit={formik.handleSubmit}>
        <Grid display={"flex"} flexDirection={"column"} gap={3}>
          <InputForm
            title={"waktuPesanan"}
            label={"Order Time"}
            select={true}
            value={formik.values.waktuPesanan}
            onchange={formik.handleChange}
            dataError={formik.errors.waktuPesanan}
          />
          <InputForm
            title={"alamatAntar"}
            label={"Table Location"}
            value={formik.values.alamatAntar}
            onchange={formik.handleChange}
            dataError={formik.errors.alamatAntar}
          />
          <ButtonModal disable={false} open={open} handleClose={handleClose} />
        </Grid>
      </form>
    </ModalLayout>
  );
}
