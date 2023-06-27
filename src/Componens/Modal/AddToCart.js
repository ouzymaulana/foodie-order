import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputForm from "../InputForm.js";
import { Grid, MenuItem, TextField } from "@mui/material";
import ButtonModal from "./ButtonModal.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectDataCart, setCartItem } from "@/Redux/Slices/CartItemsSlice.js";
import Cookies from "js-cookie";
import axios from "axios";

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

export default function AddToCart({ open, handleClose, idMenu }) {
  const cartItem = useSelector(selectDataCart);
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  const handleAddToCart = async () => {
    if (cartItem == "") {
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
    } else {
      const menu = {
        idMenu: idMenu,
        catatanTambahan: formik.values.catatanTambahan,
        quantity: 1,
      };
      dispatch(setCartItem(menu));
      handleClose();
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
            {cartItem == "" ? (
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
            ) : (
              <Grid display={"flex"} flexDirection={"column"} gap={3}>
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
            )}
          </form>
          {/* </Grid> */}
        </Box>
      </Modal>
    </div>
  );
}
