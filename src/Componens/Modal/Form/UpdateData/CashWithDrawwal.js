import React from "react";
import ModalLayout from "../../ModalLayout";
import { useActionTableModal } from "@/Context/ModalActionTable/ActionTableContextProvider";
import { Grid } from "@mui/material";
import InputForm from "@/Componens/InputForm";
import ButtonModal from "../../ButtonModal";
import PasswordInput from "@/Componens/InputForm/PasswordInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import axios from "axios";

export default function CashWithDrawwal({ title }) {
  const { openActionTable, setOpenActionTable } = useActionTableModal();
  const token = Cookies.get("token");

  const handleClose = () => {
    setOpenActionTable({ ...openActionTable, isOpenCashWithDrawwal: false });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/user/cashWithDrawwal",
        {
          withdrawalAmount: formik.values.withdrawalAmount,
          password: formik.values.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("tarik tunai : ", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    // setting initial values
    initialValues: {
      withdrawalAmount: "",
      password: "",
    },

    validationSchema: Yup.object({
      withdrawalAmount: Yup.number("Withdrawal Amount").required(
        "Withdrawal Amount harus diisi"
      ),
      password: Yup.string().required(),
    }),

    onSubmit: handleSubmit,
  });

  const clearDataForm = () => {
    formik.resetForm();
  };
  return (
    <ModalLayout
      open={openActionTable.isOpenCashWithDrawwal}
      handleClose={handleClose}
      title={title}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid display={"flex"} flexDirection={"column"} gap={3}>
          <InputForm
            title={"withdrawalAmount"}
            label={"Withdrawal Amount"}
            value={formik.values.withdrawalAmount}
            onchange={formik.handleChange}
            dataError={formik.errors.withdrawalAmount}
            touched={formik.touched.withdrawalAmount}
          />
          <PasswordInput
            name={"password"}
            label={"Your Password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            dataError={formik.errors.password}
            touched={formik.touched.password}
            handleBlur={formik.handleBlur}
          />
          <ButtonModal
            disable={false}
            open={openActionTable.isOpenCashWithDrawwal}
            handleClose={handleClose}
            resetInput={clearDataForm}
          />
        </Grid>
      </form>
    </ModalLayout>
  );
}
