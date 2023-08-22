import {
  Box,
  Grid,
  LinearProgress,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import SubmitButton from '@/Componens/Button/SubmitButton';
import FoodieOrder from '@/Componens/Logo/FoodieOrder';
import zxcvbn from 'zxcvbn';
import theme from '@/Helper/theme';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAlertMessage } from '@/Context/Alert/AlertContextProvider';
import { Alert } from '@/Componens/Alert';
import FormErrorResponse from '@/Componens/Alert/FormErrorResponse';

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

export default function VerificationView() {
  const [strengthPwd, setStrengthPwd] = useState(0);
  const [strengthColor, setStrengthColor] = useState('inherit');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { alertMessage, setAlertMessage } = useAlertMessage();
  const { push } = useRouter();

  const route = useRouter();

  const token = route.query.token;

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        'http://localhost:5000/users/verify',
        {
          password: formik.values.password,
          confirmPassword: formik.values.confirmPassword,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.status === 'success') {
        Alert('success', 'Verification is successful, you can login now');
        push('/login');
      }
    } catch (error) {
      setAlertMessage({
        ...alertMessage,
        isAlertToken: true,
        message: error.response.data.message,
      });
    }

    setTimeout(() => {
      formik.setSubmitting(false);
      formik.resetForm();
    }, 2000);
  };

  const formik = useFormik({
    initialValues: {
      // email: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: Yup.object({
      // email: Yup.string().email().required(),
      password: Yup.string()
        .min(8, 'Password harus terdiri dari minimal 8 karakter')
        .matches(/[a-z]/, 'Password harus mengandung huruf kecil')
        .matches(/[A-Z]/, 'Password harus mengandung huruf besar')
        .matches(/\d/, 'Password harus mengandung angka')
        .matches(/[^a-zA-Z\d]/, 'Password harus mengandung karakter khusus')
        .test(
          'no-consecutive-characters',
          'Tidak boleh memiliki 3 huruf yang sama secara berurutan',
          (value) => {
            const consecutiveRegex = /(.)\1{2}/;
            return !consecutiveRegex.test(value);
          }
        )
        .required(),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'confirm password tidak benar')
        .required(),
    }),

    // handle submission
    onSubmit: handleSubmit,
  });

  const strengthPwdzxcvbn = zxcvbn(formik.values.password);

  useEffect(() => {
    const pwdStrength = zxcvbn(formik.values.password);
    const passwordErrorsCount = Object.keys(formik.errors).filter(
      (key) => key === 'password'
    ).length;

    // if (pwdStrength.score === 1) {
    //   setStrengthPwd(25);
    //   setStrengthColor("error");
    // } else
    if (passwordErrorsCount === 0 && pwdStrength.guesses_log10 >= 10) {
      setStrengthPwd(100);
      setStrengthColor('success');
    } else if (passwordErrorsCount === 0 && pwdStrength.score >= 2) {
      setStrengthPwd(75);
      setStrengthColor('primary');
      // setStrengthColor("success");
    } else if (passwordErrorsCount === 0 && pwdStrength.score < 2) {
      setStrengthPwd(50);
      setStrengthColor('error');
    } else if (passwordErrorsCount >= 1 && pwdStrength.score < 4) {
      setStrengthPwd(25);
      setStrengthColor('error');
    } else {
      setStrengthPwd(25);
      setStrengthColor('error');
    }
  }, [formik.values.password, formik.errors.password, strengthPwdzxcvbn]);

  return (
    <Grid sx={{ width: { lg: '35rem' } }}>
      <FoodieOrder />
      <Grid pt={2}>
        <Typography paddingBottom={2} pt={5} variant="h5" fontFamily="Inter">
          Account Verification
        </Typography>
        {alertMessage.isAlertToken && (
          <FormErrorResponse message={alertMessage.message} />
        )}
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
        >
          <Box display={'flex'} flexDirection={'column'}>
            <Box position={'relative'}>
              <CssTextField
                sx={{ width: '100%' }}
                type={showPassword ? 'text' : 'password'}
                name="password"
                label="Create Password"
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
            {formik.values.password && (
              <Box sx={{ width: '100%' }} paddingY={1} paddingBottom={0.5}>
                <LinearProgress
                  variant="determinate"
                  color={strengthColor}
                  value={strengthPwd}
                />
              </Box>
            )}
            {formik.touched.password && formik.errors.password && (
              <span style={{ color: 'red', fontFamily: 'Inter' }}>
                {formik.errors.password}
              </span>
            )}
          </Box>
          <Box display={'flex'} flexDirection={'column'}>
            <Box position={'relative'}>
              <CssTextField
                sx={{ width: '100%' }}
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                label="Confirm Password"
                autoComplete="off"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Box
                position={'absolute'}
                right={'20px'}
                top={'18px'}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {!showConfirmPassword ? (
                  <VisibilityOutlinedIcon sx={{ fontWeight: '100' }} />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </Box>
            </Box>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <span style={{ color: 'red', fontFamily: 'Inter' }}>
                  {formik.errors.confirmPassword}
                </span>
              )}
          </Box>
          <SubmitButton disable={false} />
        </form>
      </Grid>
    </Grid>
  );
}
