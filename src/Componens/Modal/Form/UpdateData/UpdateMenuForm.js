import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import ModalLayout from "../../ModalLayout";
import InputForm from "@/Componens/InputForm";
import ButtonModal from "../../ButtonModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";

export default function UpdateMenuForm({ dataMenu, title, open, handleClose }) {
  const [selectFile, setSelectFile] = useState("");
  const token = Cookies.get("token");

  const handleChangeFile = (value) => {
    setSelectFile(value);
  };

  const handleSubmit = async () => {
    console.log("masuk");
    const response = await axios.put(
      "http://localhost:5000/api/admin/menu",
      {
        nama: formik.values.nama,
        kategori: formik.values.kategori,
        harga: formik.values.harga,
        nama_tempat: formik.values.nama_tempat,
        alamat: formik.values.alamat,
        gambar: formik.values.gambar,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: dataMenu.id,
        },
      }
    );

    console.log(response.data);
  };

  const formik = useFormik({
    // setting initial values
    initialValues: {
      nama: dataMenu.nama,
      kategori: dataMenu.kategori,
      harga: dataMenu.harga,
      nama_tempat: dataMenu.nama_tempat,
      alamat: dataMenu.alamat,
      gambar: dataMenu.gambar,
    },

    validationSchema: Yup.object({
      nama: Yup.string().required(),
      kategori: Yup.string().required(),
      harga: Yup.number().required(),
      nama_tempat: Yup.string().required(),
      alamat: Yup.string().required(),
      // gambar: Yup.string(),
    }),

    // handle submission
    onSubmit: handleSubmit,
  });

  const clearDataForm = () => {
    formik.resetForm();
  };

  return (
    <ModalLayout open={open} handleClose={handleClose} title={title}>
      {/* <form> */}
      <form onSubmit={formik.handleSubmit}>
        <Grid display={"flex"} flexDirection={"column"} gap={3}>
          <InputForm
            title={"nama"}
            label={"Menu Name"}
            value={formik.values.nama}
            onchange={formik.handleChange}
            dataError={formik.errors.nama}
            touched={formik.touched.nama}
          />
          <InputForm
            title={"kategori"}
            label={"Category"}
            select={true}
            dataSelect={["heavy-meal", "snack", "drinks", "juice"]}
            value={formik.values.kategori}
            onchange={formik.handleChange}
            dataError={formik.errors.kategori}
            touched={formik.touched.kategori}
          />
          <InputForm
            title={"harga"}
            label={"Menu Price"}
            value={formik.values.harga}
            onchange={formik.handleChange}
            dataError={formik.errors.harga}
            touched={formik.touched.harga}
          />
          <InputForm
            title={"nama_tempat"}
            label={"Restaurant Name"}
            value={formik.values.nama_tempat}
            onchange={formik.handleChange}
            dataError={formik.errors.nama_tempat}
            touched={formik.touched.nama_tempat}
          />
          <InputForm
            fileType={true}
            title={"gambar"}
            label={"gambar"}
            // value={dataMenu.gambar}
            onchange={handleChangeFile}
            // onchange={formik.handleChange}
            // dataError={formik.errors.gambar}
            // touched={formik.touched.gambar}
          />
          <InputForm
            multiline={true}
            title={"alamat"}
            label={"Address"}
            value={formik.values.alamat}
            onchange={formik.handleChange}
            dataError={formik.errors.alamat}
            touched={formik.touched.alamat}
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
