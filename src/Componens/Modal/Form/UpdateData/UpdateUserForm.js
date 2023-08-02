import React, { useEffect } from "react";
import ModalLayout from "../../ModalLayout";
import { Button, Grid, Typography } from "@mui/material";
import { useUpdateUserModal } from "@/Context/UserManagement/UpdateUserModalContextProvider";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputForm from "@/Componens/InputForm";
import ButtonModal from "../../ButtonModal";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function UpdateUserForm({ title }) {
  const { updateUserModal, setUpdateUserModal } = useUpdateUserModal();
  const token = Cookies.get("token");
  const { replace, asPath } = useRouter();

  const handleCloseUpdateUser = () =>
    setUpdateUserModal({ ...updateUserModal, isOpen: false });

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/admin/user/update",
        {
          nama: formik.values.nama,
          email: formik.values.email,
          divisi: formik.values.divisi,
          role: formik.values.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            id: updateUserModal.data.id,
          },
        }
      );

      if (response.data.status === "success") {
        Alert("success", "successfully update new user");
        replace(asPath);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    // setting initial values
    initialValues: {
      nama: "",
      email: "",
      divisi: "",
      role: "",
    },

    validationSchema: Yup.object({
      nama: Yup.string().required(),
      email: Yup.string().email().required(),
      divisi: Yup.string().required(),
      role: Yup.string().required(),
    }),

    onSubmit: handleSubmit,
  });

  const clearDataForm = () => {
    return null;
  };

  useEffect(() => {
    formik.setValues({
      nama: updateUserModal.data?.nama,
      email: updateUserModal.data?.email,
      divisi: updateUserModal.data?.divisi,
      role: updateUserModal.data?.role,
    });
  }, [updateUserModal]);
  return (
    <ModalLayout
      open={updateUserModal.isOpen}
      handleClose={handleCloseUpdateUser}
      title={title}
    >
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
            title={"email"}
            label={"Email"}
            value={formik.values.email}
            onchange={formik.handleChange}
            dataError={formik.errors.email}
            touched={formik.touched.email}
          />
          <InputForm
            title={"divisi"}
            label={"Division"}
            select={true}
            dataSelect={["IT Dev", "Pro Dev"]}
            value={formik.values.divisi}
            onchange={formik.handleChange}
            dataError={formik.errors.divisi}
            touched={formik.touched.divisi}
          />
          <InputForm
            title={"role"}
            label={"Role"}
            select={true}
            dataSelect={["user", "admin"]}
            value={formik.values.role}
            onchange={formik.handleChange}
            dataError={formik.errors.role}
            touched={formik.touched.role}
          />
          <ButtonModal
            disable={false}
            open={updateUserModal.isOpen}
            handleClose={handleCloseUpdateUser}
            resetInput={clearDataForm}
          />
        </Grid>
      </form>
    </ModalLayout>
  );
}
