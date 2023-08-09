import React, { useState } from "react";
import ModalLayout from "../../ModalLayout";
import { useActionTableModal } from "@/Context/ModalActionTable/ActionTableContextProvider";
import { Alert, Grid } from "@mui/material";
import InputForm from "@/Componens/InputForm";
import ButtonModal from "../../ButtonModal";
import PasswordInput from "@/Componens/InputForm/PasswordInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import axios from "axios";
import NumberInput from "@/Componens/InputForm/NumberInput";

export default function CashWithDrawwal({ title }) {
  const { openActionTable, setOpenActionTable } = useActionTableModal();
  const token = Cookies.get("token");
  const [isAlert, setIsAlart] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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

      if (response.data.status === "success") {
        handleClose();
        Alert("success", "Successful balance withdrawal");
      }

      if (response.data.status === "fail") {
        console.log(response.data.data.message);
        setAlertMessage(response.data.data.message);
        setIsAlart(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      withdrawalAmount: "",
      password: "",
    },

    validationSchema: Yup.object({
      withdrawalAmount: Yup.number()
        .typeError("Withdrawal Amount harus berupa angka")
        .required("Withdrawal Amount harus diisi"),
      password: Yup.string().required(),
    }),

    onSubmit: handleSubmit,
  });

  const clearDataForm = () => {
    formik.resetForm();
    setIsAlart(false);
  };
  return (
    <ModalLayout
      open={openActionTable.isOpenCashWithDrawwal}
      handleClose={handleClose}
      title={title}
    >
      {isAlert && (
        <Alert severity="error" sx={{ marginBottom: "20px" }}>
          {alertMessage}
        </Alert>
      )}
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
