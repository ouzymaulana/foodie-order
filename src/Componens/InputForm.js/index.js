import { Box } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import React from "react";

export default function InputFormLogin({ title, label }) {
  return (
    <Box paddingBottom={1}>
      <label htmlFor={title} style={{ fontSize: "20px", fontFamily: "Inter" }}>
        {label}
      </label>
      <Field
        style={{
          width: "100%",
          margin: "8px 0",
          padding: "10px",
          fontSize: "20px",
          borderRadius: "12px",
          border: "3.1px solid #FAA41A",
        }}
        autoComplete="off"
        name={title}
        id={title}
      />
      <span style={{ color: "red", fontFamily: "Inter" }}>
        <ErrorMessage name={title} />
      </span>
    </Box>
  );
}
