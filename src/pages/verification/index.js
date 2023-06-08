import InputFormLogin from "@/Componens/InputForm.js";
import LoginVerifikasiLayout from "@/Layout/Login/LoginVerifikasiLayout";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import Image from "next/image";
import React from "react";
import style from "../../styles/LoginVerifikasi.module.scss";
import * as Yup from "yup";

export default function Verification() {
  const handleSubmit = (value, setFieldError) => {
    alert("bisa");
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(5).required(),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "confirm password is not correct"
    ),
  });

  // 8karakter
  // hurufbesar
  // huruf kecil
  // angka & special karakter

  return (
    <>
      <LoginVerifikasiLayout>
        <Grid sx={{ width: "35rem" }}>
          <Grid display={"flex"} justifyContent={"center"}>
            <Box
              sx={{ boxSizing: "border-box" }}
              display={"flex"}
              paddingX={3}
              // paddingY={2}
            >
              <Image
                src="/img/logo.svg"
                height={80}
                width={80}
                // layout="responsive"
                style={{ height: "50px", width: "100px" }}
              />
            </Box>
            <Typography
              variant="h3"
              fontFamily="Harlow Solid"
              className={style.foodieorder}
            >
              FoodieOrder
            </Typography>
          </Grid>
          <Grid pt={2}>
            <Typography
              paddingBottom={2}
              pt={5}
              variant="h5"
              fontFamily="Inter"
            >
              Account Verification
            </Typography>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { setFieldError }) =>
                handleSubmit(values, setFieldError)
              }
            >
              <Form>
                <InputFormLogin title="email" label="Email" />
                <InputFormLogin title="password" label="Password" />
                <InputFormLogin
                  title="confirmPassword"
                  label="Confirm Password"
                />
                <Box mt={2}>
                  <Button
                    sx={{
                      padding: "10px",
                      backgroundColor: "#FAA41A",
                      width: "100%",
                      color: "black",
                      borderRadius: "12px",
                      fontSize: { lg: "18px", xs: "10px" },
                      ":hover": {
                        bgcolor: "#FAA41A",
                      },
                    }}
                  >
                    Sign in
                  </Button>
                </Box>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </LoginVerifikasiLayout>
    </>
  );
}
