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

const style = {
  marginTop: "5rem",
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

export default function AddToCart({ open, handleClose, idMenu, title }) {
  const cartItem = useSelector(selectDataCart);
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  const handleAddToCart = async () => {
    try {
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
            idUser: response.data.data.user.id,
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

  return (
    <ModalLayout open={open} handleClose={handleClose} title={title}>
      <form onSubmit={formik.handleSubmit}>
        {/* {cartItem == "" ? ( */}
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
          <InputForm
            title={"catatanTambahan"}
            label={"Order Notes"}
            multiline={true}
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
