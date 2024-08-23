import React, { useState } from 'react';
import ModalLayout from '../../ModalLayout';
import { Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import InputForm from '@/Componens/InputForm';
import ButtonModal from '../../ButtonModal';
import { Alert } from '../../../Alert';
import { useDispatch } from 'react-redux';
import { addDataMenu } from '@/Redux/Slices/DataMenuSlice';
import { useRouter } from 'next/router';
import { textFieldImage } from '@/Helper/formValidation';
import UpdateInputFile from '@/Componens/InputForm/UpdateInputFile';

export default function AddMenuForm({ open, handleClose, title }) {
  const [selectFile, setSelectFile] = useState('');
  const token = Cookies.get('token');
  const dispatch = useDispatch();
  const route = useRouter();
  const [isImageFailed, setIsImageFailed] = useState({
    status: null,
    message: null,
  });

  const handleChangeFile = (value) => {
    const validationImage = textFieldImage(value);

    if (validationImage.status === 'failed') {
      setIsImageFailed(validationImage);
    } else {
      setIsImageFailed(validationImage);
      setSelectFile(value);
    }
  };

  const handleSubmit = async () => {
    if (isImageFailed.status === null) {
      return setIsImageFailed({
        status: 'failed',
        message: 'File is required',
      });
    }
    const selectFileCopy = { ...selectFile };
    selectFileCopy.name = selectFile.name.replace(/\s/g, '');

    const formData = new FormData();
    formData.append('gambar', selectFile);
    formData.append('nama', formik.values.nama);
    formData.append('kategori', formik.values.kategori);
    formData.append('harga', formik.values.harga);
    formData.append('nama_tempat', formik.values.nama_tempat);
    formData.append('alamat', formik.values.alamat);

    const getMenu = {
      nama: formik.values.nama,
      kategori: formik.values.kategori,
      harga: formik.values.harga,
      nama_tempat: formik.values.nama_tempat,
      alamat: formik.values.alamat,
      gambar: selectFile.name.replace(/\s/g, ''),
    };

    const response = await axios.post(
      'http://localhost:5000/api/admin/menu/create',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    formik.resetForm();
    if (response.data.status === 'success') {
      dispatch(addDataMenu(getMenu));
      handleClose();
      Alert('success', 'successfully added new menu');
      route.replace(route.asPath);
    }
  };
  const formik = useFormik({
    // setting initial values
    initialValues: {
      nama: '',
      kategori: '',
      harga: '',
      nama_tempat: '',
      gambar: '',
      alamat: '',
    },

    validationSchema: Yup.object({
      nama: Yup.string().required(),
      kategori: Yup.string().required(),
      harga: Yup.number().required(),
      nama_tempat: Yup.string().required(),
      alamat: Yup.string().required(),
    }),

    // handle submission
    onSubmit: handleSubmit,
  });

  const clearDataForm = () => {
    formik.resetForm();
    setSelectFile('');
  };

  return (
    <ModalLayout open={open} title={title}>
      <form onSubmit={formik.handleSubmit}>
        {/* <form> */}
        <Grid display={'flex'} flexDirection={'column'} gap={3}>
          <InputForm
            title={'nama'}
            label={'Menu Name'}
            value={formik.values.nama}
            onchange={formik.handleChange}
            dataError={formik.errors.nama}
            touched={formik.touched.nama}
          />
          <InputForm
            title={'kategori'}
            label={'Category'}
            select={true}
            dataSelect={['heavy-meal', 'snack', 'drinks', 'juice']}
            value={formik.values.kategori}
            onchange={formik.handleChange}
            dataError={formik.errors.kategori}
            touched={formik.touched.kategori}
          />
          <InputForm
            title={'harga'}
            label={'Menu Price'}
            value={formik.values.harga}
            onchange={formik.handleChange}
            dataError={formik.errors.harga}
            touched={formik.touched.harga}
          />
          <InputForm
            title={'nama_tempat'}
            label={'Restaurant Name'}
            value={formik.values.nama_tempat}
            onchange={formik.handleChange}
            dataError={formik.errors.nama_tempat}
            touched={formik.touched.nama_tempat}
          />
          <UpdateInputFile
            title={'gambar'}
            onchange={handleChangeFile}
            isImageFailed={isImageFailed}
            currentValue={selectFile || ''}
            // value={openActionTable.data?.gambar || ""}
          />
          <InputForm
            multiline={true}
            title={'alamat'}
            label={'Address'}
            value={formik.values.alamat}
            onchange={formik.handleChange}
            dataError={formik.errors.alamat}
            touched={formik.touched.alamat}
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
