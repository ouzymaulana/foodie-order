import CartDashboard from '@/Componens/Card/CartDasboard';
import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDataSelectFilter } from '@/Context/SelectFilterCardContextProvider';
import { useLoadingCircularProgress } from '@/Context/LoadingCircularProgressContextProvider';
import ReusableTable from '@/Componens/Table';
import { useDataTotalItem } from '@/Context/TotalItemContextProvider';
import UpdateStatusOrderMenu from '@/Componens/Modal/Form/UpdateData/UpdateStatusOrderMenu';
import { useRouter } from 'next/router';

export default function DashboardView({ getOrderData, totalOrderItems }) {
  const { selectFilter } = useDataSelectFilter();
  const { setOpenLoadingCircular } = useLoadingCircularProgress();
  const { totalItem, setTotalItem } = useDataTotalItem();
  const [orderData, setOrderData] = useState([]);
  const token = Cookies.get('token');
  const { push } = useRouter();

  const getOrderMenu = async () => {
    try {
      if (token) {
        const response = await axios.get(
          'http://localhost:5000/api/order-menu',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              createdAt: selectFilter,
            },
          }
        );
        setOpenLoadingCircular(false);

        if (response.data.status !== 'fail') {
          setOrderData(response.data.data.orderData);
        }
      } else {
        push('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setTotalItem(totalOrderItems);
    // dispatch(setDataMenu(getDataMenu));
    console.log('====================================');
    console.log('BERAPA');
    console.log('====================================');
  }, [totalItem, getOrderData]);

  useEffect(() => {
    getOrderMenu();
    setOpenLoadingCircular(false);
  }, [selectFilter]);

  const columns = [
    {
      label: '',
      field: 'action',
      minWidth: 0,
      filter: '',
      sort: false,
      collapse: true,
      collapseLable: 'orderMenu',
    },
    {
      label: 'User Name',
      field: 'nama',
      routefield: 'user-name',
      minWidth: 170,
      filter: 'inputText',
      sort: true,
    },
    {
      label: 'Order Time',
      field: 'waktu_pemesanan',
      routefield: 'order-time',
      minWidth: 170,
      filter: 'inputSelect',
      sort: false,
      selectData: [
        { text: 'all', value: 'all' },
        { text: 'siang', value: 'siang' },
        { text: 'sore', value: 'sore' },
      ],
    },
    {
      label: 'Order Date',
      field: 'createdAt',
      routefield: 'order-date',
      minWidth: 170,
      filter: 'inputDate',
      sort: true,
    },
    {
      label: 'Delivery Address',
      field: 'alamat_antar',
      routefield: 'delivery-address',
      minWidth: 170,
      filter: 'inputText',
      sort: false,
    },
    {
      label: 'Status',
      field: 'status',
      routefield: 'status',
      minWidth: 170,
      filter: 'inputSelect',
      sort: false,
      fieldWithUpdate: true,
      selectData: [
        { text: 'all', value: 'all' },
        { text: 'progress', value: 'progress' },
        { text: 'done', value: 'done' },
      ],
    },
    {
      label: 'Total Pay',
      field: 'total_bayar',
      routefield: 'total-pay',
      minWidth: 170,
      filter: 'inputNumber',
      sort: true,
    },
  ];

  return (
    <>
      <Grid display={'flex'} flexDirection={'column'} gap={5}>
        <CartDashboard
          selectFilter={selectFilter}
          orderData={orderData}
          getOrderMenu={getOrderMenu}
        />
        <Grid
          borderRadius={4}
          sx={{
            backgroundColor: 'white',
            // height: "calc(100vh - 40px - 13px)",
          }}
          width={'100%'}
          overflow={'hidden'}
          padding={3}
          display={'flex'}
          flexDirection={'column'}
        >
          <Grid>
            <Typography variant="h6" fontWeight={600}>
              Order Menu
            </Typography>
          </Grid>
          <Grid>
            <ReusableTable dataTabel={getOrderData} columns={columns} />
          </Grid>
        </Grid>
      </Grid>
      <UpdateStatusOrderMenu title="Update Order Status" />
    </>
  );
}
