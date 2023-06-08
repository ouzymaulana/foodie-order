import LoginVerifikasiLayout from "@/Layout/Login/LoginVerifikasiLayout";
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import style from "../../styles/LoginVerifikasi.module.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import InputFormLogin from "@/Componens/InputForm.js";
import Head from "next/head";
import Image from "next/image";
import * as Yup from "yup";
import Link from "next/link";

export default function Login() {
  const handleSubmit = (value, setFieldError) => {
    alert("bisa");
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(5).required(),
  });

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/_next/fonts/HARLOWSI_1.woff" />
      </Head>
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
          <Grid>
            <Typography
              paddingBottom={2}
              paddingTop={4}
              variant="h4"
              fontFamily="Harlow Solid"
              className={style.foodieorder}
            >
              Welcome Back...
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
                <Box mt={2}>
                  <Button
                    sx={{
                      padding: "10px",
                      backgroundColor: "#FAA41A",
                      width: "100%",
                      color: "black",
                      fontFamily: "Inter",
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
                <Box display={"flex"} justifyContent={"center"} padding={2}>
                  <Typography fontFamily="Inter">
                    want to verify account?{" "}
                    <Link
                      style={{ textDecoration: "underline", color: "#FAA41A" }}
                      href="/verification"
                    >
                      Verification
                    </Link>
                  </Typography>
                </Box>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </LoginVerifikasiLayout>
    </>
  );
}
