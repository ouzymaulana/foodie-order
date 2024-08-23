import {
  Avatar,
  Box,
  Grid,
  Popover,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ChangePassword from '../Modal/ChangePassword';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import CashWithDrawwal from '../Modal/Form/UpdateData/CashWithDrawwal';
import { useActionTableModal } from '@/Context/ModalActionTable/ActionTableContextProvider';

function stringAvatar(name) {
  const nameArray = name.split(' ');
  if (nameArray.length >= 2) {
    return {
      children: `${nameArray[0][0]}${nameArray[1][0]}`,
    };
  } else if (nameArray.length === 1) {
    return {
      children: `${nameArray[0][0]}`,
    };
  } else {
    return {
      children: '',
    };
  }
}

export default function Profile({ nama, role }) {
  const { openActionTable, setOpenActionTable } = useActionTableModal();
  const isResponsive = useMediaQuery('(max-width:600px)');
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const route = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'simple-popover' : undefined;

  const handleLogOut = () => {
    Cookies.remove('token');
    route.push('/login');
  };

  const handleCashWithDrawwal = () => {
    setOpenActionTable({
      ...openActionTable,
      isOpenCashWithDrawwal: true,
    });
  };

  return (
    <>
      <Grid display={'flex'} flex={3} gap={1} justifyContent={'end'}>
        {role === 'admin' && !isResponsive && (
          <Box
            onClick={() => handleCashWithDrawwal()}
            sx={{ backgroundColor: 'white', cursor: 'pointer' }}
            borderRadius={5}
            width={{ md: 60, sm: 50 }}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <LocalMallOutlinedIcon sx={{ color: grey[500] }} />
          </Box>
        )}
        <Grid
          width={180}
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
        >
          <Typography
            onClick={handleClick}
            width={130}
            variant="subtitle1"
            display={'flex'}
            alignItems={'center'}
            paddingX={1}
            justifyContent={'end'}
            sx={{ cursor: 'pointer' }}
            fontSize={{ xs: '12px' }}
          >
            {nama}
          </Typography>
          <Popover
            id={id}
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <List>
              {isResponsive && (
                <ListItem onClick={handleCashWithDrawwal} disablePadding>
                  <ListItemButton>
                    <ListItemText
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      primary="Cash Advance"
                    />
                  </ListItemButton>
                </ListItem>
              )}
              <ListItem onClick={handleOpen} disablePadding>
                <ListItemButton>
                  <ListItemText primary="Change Password" />
                </ListItemButton>
              </ListItem>
              <ListItem onClick={handleLogOut} disablePadding>
                <ListItemButton>
                  <ListItemText
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    primary="LogOut"
                  />
                </ListItemButton>
              </ListItem>
            </List>
            {/* </nav> */}
          </Popover>
          <Box width={60} borderRadius={5}>
            <Avatar
              {...stringAvatar(nama)}
              sx={{
                width: { md: 56, xs: 40 },
                height: { md: 56, xs: 40 },
                borderRadius: 5,
                backgroundColor: 'white',
                color: grey[500],
                fontWeight: '500',
              }}
              variant="rounded"
            />
          </Box>
        </Grid>
      </Grid>
      <ChangePassword
        open={open}
        handleClose={handleClose}
        title="Please Fill The Form"
      />
      <CashWithDrawwal title={'Cash Advance'} />
    </>
  );
}
