import React, { useEffect } from "react";
import ModalLayout from "../../ModalLayout";
import { Grid } from "@mui/material";
import InputForm from "@/Componens/InputForm";
import { useActionTableModal } from "@/Context/ModalActionTable/ActionTableContextProvider";
import ButtonModal from "../../ButtonModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Alert } from "@/Componens/Alert";
import { useAlertMessage } from "@/Context/Alert/AlertContextProvider";

export default function UpdateStatusOrderMenu({ title }) {
  const { openActionTable, setOpenActionTable } = useActionTableModal();
  const { alertMessage, setAlertMessage } = useAlertMessage();
  const token = Cookies.get("token");
  const { replace, asPath, push } = useRouter();

  const handleClose = () => {
    setOpenActionTable({ ...openActionTable, isUpdateOrderStatus: false });
  };

  const handleSubmit = async () => {
    const defaultStatus = openActionTable.data?.status || "";
    if (formik.values.status !== defaultStatus) {
      try {
        if (token) {
          const response = await axios.patch(
            "http://localhost:5000/api/order-menu",
            {
              status: formik.values.status,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                id: openActionTable.data?.id || "",
              },
            }
          );
          console.log("=======jwt=============================");
          console.log(response);
          console.log("====================================");

          if (response.data.status === "success") {
            handleClose();
            replace(asPath);
            Alert("success", "Order Status Updated");
          }
        } else {
          push("/login");
          setAlertMessage({
            ...alertMessage,
            isAlertToken: true,
            message: "sesi anda habis, harap login kembali!",
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      status: "",
    },

    validationSchema: Yup.object({
      status: Yup.string().required("Status is a required field"),
    }),

    onSubmit: handleSubmit,
  });

  const clearDataForm = () => {
    return null;
  };

  useEffect(() => {
    formik.setValues({
      status: openActionTable.data?.status || "",
    });
  }, [openActionTable]);

  return (
    <ModalLayout open={openActionTable.isUpdateOrderStatus} title={title}>
      <form onSubmit={formik.handleSubmit}>
        <Grid display={"flex"} flexDirection={"column"} gap={3}>
          <InputForm
            title={"status"}
            label={"Status"}
            select={true}
            dataSelect={["done", "progress"]}
            value={formik.values.status}
            onchange={formik.handleChange}
            dataError={formik.errors.status}
          />
          <ButtonModal
            disable={false}
            open={openActionTable.isUpdateOrderStatus}
            handleClose={handleClose}
            resetInput={clearDataForm}
          />
        </Grid>
      </form>
    </ModalLayout>
  );
}
