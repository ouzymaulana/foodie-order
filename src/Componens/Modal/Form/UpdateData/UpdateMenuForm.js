import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ModalLayout from "../../ModalLayout";
import InputForm from "@/Componens/InputForm";
import ButtonModal from "../../ButtonModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { useUpdateMenuModal } from "@/Context/MenuManagement/UpdateMenuModalContextProvider";
import { Alert } from "@/Componens/Alert/Alert";
import { useRouter } from "next/router";
import { textFieldImage } from "@/Helper/formValidation";

export default function UpdateMenuForm({ title }) {
  const { updateMenuModal, setUpdateMenuModal } = useUpdateMenuModal();
  const [isImageFailed, setIsImageFailed] = useState({
    status: null,
    message: null,
  });
  const [selectFile, setSelectFile] = useState("");
  const token = Cookies.get("token");
  const { reload, replace, asPath } = useRouter();

  const handleCloseUpdateMenu = () =>
    setUpdateMenuModal({ ...updateMenuModal, isOpen: false });

  const dataMenu = updateMenuModal.data || "";

  const handleChangeFile = (value) => {
    const validationImage = textFieldImage(value);

    if (validationImage.status === "failed") {
      setIsImageFailed(validationImage);
    } else {
      setIsImageFailed(validationImage);
      setSelectFile(value);
    }
  };

  const handleSubmit = async () => {
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

    if (response.data.status === "success") {
      handleCloseUpdateMenu();
      Alert("success", "successfully added new menu");
      replace(asPath);
    }
  };

  const formik = useFormik({
    // setting initial values
    initialValues: {
      nama: "",
      kategori: "",
      harga: "",
      nama_tempat: "",
      alamat: "",
      gambar: "",
    },

    validationSchema: Yup.object({
      nama: Yup.string().required(),
      kategori: Yup.string().required(),
      harga: Yup.number().required(),
      nama_tempat: Yup.string().required(),
      alamat: Yup.string().required(),
      // gambar: Yup.string(),
    }),

    onSubmit: handleSubmit,
  });

  const clearDataForm = () => {
    return null;
  };

  useEffect(() => {
    formik.setValues({
      waktuPesanan: updateMenuModal.data?.waktuPesanan || "",
      alamatAntar: updateMenuModal.data?.alamatAntar || "",
      nama: updateMenuModal.data?.nama || "",
      kategori: updateMenuModal.data?.kategori || "",
      harga: updateMenuModal.data?.harga || "",
      nama_tempat: updateMenuModal.data?.nama_tempat || "",
      alamat: updateMenuModal.data?.alamat || "",
      gambar: updateMenuModal.data?.gambar || "",
    });
  }, [updateMenuModal]);

  return (
    <ModalLayout
      open={updateMenuModal.isOpen}
      handleClose={handleCloseUpdateMenu}
      title={title}
    >
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
            onchange={handleChangeFile}
            isImageFailed={isImageFailed}
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
            open={updateMenuModal.isOpen}
            handleClose={handleCloseUpdateMenu}
            resetInput={clearDataForm}
          />
        </Grid>
      </form>
    </ModalLayout>
  );
}
