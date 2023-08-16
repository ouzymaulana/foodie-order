import InputForm from '@/Componens/InputForm';
import { Grid } from '@mui/material';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import React from 'react';
import ModalLayout from '../../ModalLayout';
import * as Yup from 'yup';
import ButtonModal from '../../ButtonModal';
import axios from 'axios';
import { Alert } from '@/Componens/Alert';
import { useRouter } from 'next/router';

export default function AddUserForm({ title, handleClose, open }) {
  const token = Cookies.get('token');
  const { replace, asPath } = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/admin/user/create',
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
        }
      );

      handleClose();
      formik.resetForm();
      if (response.data.status === 'success') {
        replace(asPath);
        Alert('success', 'successfully added new user');
      } else {
        Alert('warning', 'Failed to add new user');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    // setting initial values
    initialValues: {
      nama: '',
      email: '',
      divisi: '',
      role: '',
    },

    validationSchema: Yup.object({
      nama: Yup.string().required(),
      email: Yup.string().email().required(),
      divisi: Yup.string().required(),
      role: Yup.string().required(),
    }),

    // handle submission
    onSubmit: handleSubmit,
  });

  const clearDataForm = () => {
    formik.resetForm();
  };
  return (
    <ModalLayout open={open} title={title}>
      <form onSubmit={formik.handleSubmit}>
        <Grid display={'flex'} flexDirection={'column'} gap={3}>
          <InputForm
            title={'nama'}
            label={'Name'}
            value={formik.values.nama}
            onchange={formik.handleChange}
            dataError={formik.errors.nama}
            touched={formik.touched.nama}
          />
          <InputForm
            title={'email'}
            label={'Email'}
            value={formik.values.email}
            onchange={formik.handleChange}
            dataError={formik.errors.email}
            touched={formik.touched.email}
          />
          <InputForm
            title={'divisi'}
            label={'Division'}
            select={true}
            dataSelect={['IT Dev', 'Pro Dev', 'frontend engineer']}
            value={formik.values.divisi}
            onchange={formik.handleChange}
            dataError={formik.errors.divisi}
            touched={formik.touched.divisi}
          />
          <InputForm
            title={'role'}
            label={'Role'}
            select={true}
            dataSelect={['admin', 'user']}
            value={formik.values.role}
            onchange={formik.handleChange}
            dataError={formik.errors.role}
            touched={formik.touched.role}
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
