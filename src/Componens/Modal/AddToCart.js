import * as React from "react";
import InputForm from "../InputForm/index.js";
import { Grid, MenuItem, TextField } from "@mui/material";
import ButtonModal from "./ButtonModal.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectDataCart, setCartItem } from "@/Redux/Slices/CartItemsSlice.js";
import Cookies from "js-cookie";
import axios from "axios";
import ModalLayout from "./ModalLayout/index.js";
import jwt from "jsonwebtoken";

export default function AddToCart({ open, handleClose, idMenu, title }) {
  const cartItem = useSelector(selectDataCart);
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const jwtData = jwt.decode(token);

  const handleAddToCart = async () => {
    try {
      // create id in token
      const response = await axios.get("http://localhost:5000/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = [
          {
            menu: [
              {
                idMenu: idMenu,
                catatanTambahan: formik.values.catatanTambahan,
                quantity: 1,
              },
            ],
            // idUser: response.data.data.user.id,
            idUser: jwtData.id,
            waktuPesanan: formik.values.waktuPesanan,
            alamatAntar: formik.values.alamatAntar,
          },
        ];
        dispatch(setCartItem(data));
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      waktuPesanan: "",
      alamatAntar: "",
      catatanTambahan: "",
    },

    validationSchema: Yup.object({
      waktuPesanan: Yup.string().required("Order Time is a required field"),
      alamatAntar: Yup.string()
        .max(30)
        .required("Table Location is a required field"),
      catatanTambahan: Yup.string()
        .max(60)
        .required("Order Notes is a required field"),
    }),

    onSubmit: handleAddToCart,
  });

  const clearDataForm = () => {
    formik.resetForm();
  };

  return (
    <ModalLayout open={open} handleClose={handleClose} title={title}>
      <form onSubmit={formik.handleSubmit}>
        {/* {cartItem == "" ? ( */}
        <Grid display={"flex"} flexDirection={"column"} gap={3}>
          <InputForm
            title={"waktuPesanan"}
            label={"Order Time"}
            select={true}
            dataSelect={["siang", "sore"]}
            value={formik.values.waktuPesanan}
            onchange={formik.handleChange}
            dataError={formik.errors.waktuPesanan}
            touched={formik.touched.waktuPesanan}
          />
          <InputForm
            title={"alamatAntar"}
            label={"Table Location"}
            value={formik.values.alamatAntar}
            onchange={formik.handleChange}
            dataError={formik.errors.alamatAntar}
            touched={formik.touched.alamatAntar}
          />
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
