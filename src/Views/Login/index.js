import LoginVerifikasiLayout from '@/Layout/Login/LoginVerifikasiLayout';
import {
  Alert,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import FoodieOrder from '@/Componens/Logo/FoodieOrder';
import theme from '@/Helper/theme';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import style from '../../styles/LoginVerifikasi.module.scss';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import { useAlertMessage } from '@/Context/Alert/AlertContextProvider';
import { useLoadingCircularProgress } from '@/Context/LoadingCircularProgressContextProvider';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#FFAF37',
      borderRadius: theme.spacing(1.3), // Atur border-radius di sini
      borderWidth: 3,
    },
    '&:hover fieldset': {
      borderColor: '#FFAF37',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFAF37',
      borderWidth: 3,
    },
  },
});
export default function LoginView() {
  const [showPassword, setShowPassword] = useState(false);
  const [setIsAlart] = useState(false);
  const [setAlertMessageOne] = useState('');
  const { alertMessage, setAlertMessage } = useAlertMessage();
  const { setOpenLoadingCircular } = useLoadingCircularProgress();
  const route = useRouter();

  const handleSubmit = async () => {
    setOpenLoadingCircular(true);
    const url = 'http://localhost:5000/login';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formik.values.email,
        password: formik.values.password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.status !== 'fail') {
        Cookies.set('token', data.data.token, { expires: 1 / 24 });

        const jwtData = jwt.decode(data.data.token);

        if (jwtData.role === 'admin') {
          route.push('/admin');
        } else {
          route.push('/');
        }
      } else {
        setAlertMessageOne(data.data.message);
        setAlertMessage({
          ...alertMessage,
          isAlertToken: true,
          message: data.data.message,
        });
        setIsAlart(true);
      }
    } else {
      setIsAlart(true);
      const data = await response.json();
      setAlertMessageOne(data.data.message);
      setAlertMessage({
        ...alertMessage,
        isAlertToken: true,
        message: data.data.message,
      });
    }

    setTimeout(() => {
      formik.setSubmitting(false);
      formik.resetForm();
    }, 2000);
  };

  const formik = useFormik({
    // setting initial values
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(8).required(),
    }),

    // handle submission
    onSubmit: handleSubmit,
  });

  return (
    <>
      <LoginVerifikasiLayout>
        <Grid sx={{ width: { lg: '35rem' } }}>
          <FoodieOrder />
          <Grid pt={2}>
            <Typography
              paddingBottom={2}
              paddingTop={4}
              variant="h5"
              fontFamily="Harlow Solid"
              className={style.foodieorder}
            >
              Welcome Back...
            </Typography>
            {/* {isAlert && ( */}
            {alertMessage.isAlertToken && (
              <Alert severity="error" sx={{ marginBottom: '10px' }}>
                {alertMessage.message}
              </Alert>
            )}
            <form
              onSubmit={formik.handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
            >
              <Box display={'flex'} flexDirection={'column'}>
                <CssTextField
                  name="email"
                  label="email"
                  autoComplete="off"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <span style={{ color: 'red', fontFamily: 'Inter' }}>
                    {formik.errors.email}
                  </span>
                )}
              </Box>
              <Box display={'flex'} flexDirection={'column'}>
                <Box position={'relative'}>
                  <CssTextField
                    sx={{ width: '100%' }}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    label="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Box
                    position={'absolute'}
                    right={'20px'}
                    top={'18px'}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </Box>
                </Box>
                {formik.touched.password && formik.errors.password && (
                  <span style={{ color: 'red', fontFamily: 'Inter' }}>
                    {formik.errors.password}
                  </span>
                )}
              </Box>

              <Button
                type="submit"
                disabled={formik.isSubmitting}
                variant="contained"
                sx={{
                  padding: '10px',
                  // backgroundColor: "#FAA41A",
                  width: '100%',
                  color: 'black',
                  fontFamily: 'Inter',
                  borderRadius: '10px',
                  fontSize: { lg: '18px', xs: '10px' },
                  ':hover': {
                    bgcolor: '#FAA41A',
                  },
                }}
              >
                Sign in
              </Button>
              <Box display={'flex'} justifyContent={'center'}>
                <Typography fontFamily="Inter">
                  want to verify account?{' '}
                  <Link
                    style={{ textDecoration: 'underline', color: '#FAA41A' }}
                    href="/verification?token=kokk"
                  >
                    Verification
                  </Link>
                </Typography>
              </Box>
            </form>
          </Grid>
        </Grid>
      </LoginVerifikasiLayout>
    </>
  );
}
