import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputForm from "../InputForm.js";
import { Grid, MenuItem, TextField } from "@mui/material";
import ButtonModal from "./ButtonModal.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import theme from "@/Helper/theme";
import { useDispatch } from "react-redux";
import { setCartItem } from "@/Redux/Slices/CartItemsSlice.js";

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

export default function AddToCart({ open, handleClose }) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    console.log(formik.values.waktuPesanan);
    console.log(formik.values.alamatAntar);
    console.log(formik.values.catatanTambahan);

    const data = [
      {
        waktuPesanan: formik.values.waktuPesanan,
        alamatAntar: formik.values.alamatAntar,
        catatanTambahan: formik.values.catatanTambahan,
      },
    ];
    dispatch(setCartItem(data));
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
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ marginTop: "100px" }}
      >
        <Box sx={style}>
          {/* <Grid display={"flex"} flexDirection={"column"} gap={3}> */}
          <Box display={"flex"} justifyContent={"center"}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              fontWeight={600}
              component="h2"
              paddingBottom={3}
            >
              Please Fill The Form
            </Typography>
          </Box>
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
              <InputForm
                title={"catatanTambahan"}
                label={"Order Notes"}
                multiline={true}
                value={formik.values.catatanTambahan}
                onchange={formik.handleChange}
                dataError={formik.errors.catatanTambahan}
              />
              <ButtonModal
                disable={false}
                open={open}
                handleClose={handleClose}
              />
            </Grid>
          </form>
          {/* </Grid> */}
        </Box>
      </Modal>
    </div>
  );
}
