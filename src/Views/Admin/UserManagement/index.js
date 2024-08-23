import AddUserForm from '@/Componens/Modal/Form/AddData/AddUserForm';
import UpdateUserForm from '@/Componens/Modal/Form/UpdateData/UpdateUserForm';
import ReusableTable from '@/Componens/Table';
import { useLoadingCircularProgress } from '@/Context/LoadingCircularProgressContextProvider';
import { useSortBy } from '@/Context/SortByContextProvider';
import { useSortType } from '@/Context/SortTypeContextProvider';
import { useDataTotalItem } from '@/Context/TotalItemContextProvider';
import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function UserManagementView({
  getDataUser,
  getTotalItem,
  sortByData,
  sortTypeData,
}) {
  const { setOpenLoadingCircular } = useLoadingCircularProgress();
  const { totalItem, setTotalItem } = useDataTotalItem();
  const { setSortBy } = useSortBy();
  const { setSortType } = useSortType();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    setOpenLoadingCircular(false);
  }, []);

  useEffect(() => {
    setSortBy(sortByData);
    setSortType(sortTypeData);
  }, [sortByData, sortTypeData]);

  useEffect(() => {
    setTotalItem(getTotalItem);
  }, [totalItem]);

  const columns = [
    {
      label: 'Name',
      field: 'nama',
      routefield: 'name',
      minWidth: 170,
      filter: 'inputText',
      sort: false,
    },
    {
      label: 'Email',
      field: 'email',
      routefield: 'email',
      minWidth: 170,
      filter: 'inputText',
      sort: false,
    },
    {
      label: 'Division',
      field: 'divisi',
      routefield: 'division',
      minWidth: 170,
      filter: 'inputSelect',
      sort: false,
      selectData: [
        { text: 'all', value: 'all' },
        { text: 'IT Dev', value: 'IT Dev' },
        { text: 'Pro Dev', value: 'Pro Dev' },
        { text: 'frontend engineer', value: 'frontend engineer' },
      ],
    },
    {
      label: 'Role',
      field: 'role',
      routefield: 'role',
      minWidth: 170,
      filter: 'inputText',
      sort: false,
    },
    {
      label: 'Registered Date',
      field: 'createdAt',
      routefield: 'registerDate',
      minWidth: 170,
      filter: 'inputDate',
      sort: true,
    },
    {
      label: '',
      field: 'action',
      minWidth: 0,
      filter: '',
      sort: false,
      action: true,
      actionLable: 'userManagement',
    },
  ];
  return (
    <>
      <Grid
        borderRadius={4}
        sx={{
          backgroundColor: 'white',
          height: 'calc(100vh - 40px - 80px)',
        }}
        width={'100%'}
        overflow={'hidden'}
        padding={3}
        display={'flex'}
        flexDirection={'column'}
        // gap={2}
      >
        <Grid display={'flex'}>
          <Grid flex={6}>
            <Typography paddingBottom={1} variant="h6" fontWeight={600}>
              Data User
            </Typography>
          </Grid>
          <Grid flex={6} textAlign={'end'}>
            <Button
              disableElevation
              size="small"
              variant="contained"
              onClick={handleOpen}
            >
              Add User
            </Button>
          </Grid>
        </Grid>
        <Grid>
          <ReusableTable dataTabel={getDataUser} columns={columns} />
        </Grid>
      </Grid>
      <AddUserForm
        title={'Please Fill The Form'}
        handleClose={handleClose}
        open={open}
      />
      <UpdateUserForm title={'User Update Form'} />
    </>
  );
}
