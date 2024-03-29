import React from 'react';
import ModalLayout from './ModalLayout';
import { Grid } from '@mui/material';
import InputForm from '../InputForm';
import ButtonModal from './ButtonModal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { topUpBalance } from '@/Redux/Slices/BalanceSlice';
import { Alert } from '../Alert';

export default function TopUpSaldo({ open, title, handleClose }) {
  const token = Cookies.get('token');
  const dispatch = useDispatch();
  const handleTopUpBalance = async () => {
    const response = await axios.post(
      'http://localhost:5000/user/topUpBalance',
      {
        topupAmount: formik.values.topupAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status === 'success') {
      dispatch(topUpBalance(formik.values.topupAmount));
      handleClose();
      Alert('success', 'Balance has been added');
    }
  };

  const formik = useFormik({
    initialValues: {
      topupAmount: '',
    },

    validationSchema: Yup.object({
      topupAmount: Yup.number('format number bro').max(1000000).required(),
    }),

    onSubmit: handleTopUpBalance,
  });

  const clearDataForm = () => {
    formik.resetForm();
  };
  return (
    <ModalLayout open={open} title={title}>
      <form onSubmit={formik.handleSubmit}>
        <Grid display={'flex'} flexDirection={'column'} gap={3}>
          <InputForm
            title={'topupAmount'}
            label={'TopUp Amount'}
            value={formik.values.topupAmount}
            onchange={formik.handleChange}
            dataError={formik.errors.topupAmount}
            touched={formik.touched.topupAmount}
          />
          <ButtonModal
            disable={false}
            open={open}
            handleClose={handleClose}
            resetInput={clearDataForm}
          />
        </Grid>
      </form>
    </ModalLayout>
  );
}
