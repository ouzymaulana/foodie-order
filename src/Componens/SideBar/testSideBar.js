import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useDrawerToggleContext } from '@/Context/Toggle/DrawerToggleContextProvider';
import { Toolbar } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useLoadingCircularProgress } from '@/Context/LoadingCircularProgressContextProvider';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import FastfoodRoundedIcon from '@mui/icons-material/FastfoodRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';

export default function TestSidebar() {
  const { drawer, setDrawer } = useDrawerToggleContext();
  const { setOpenLoadingCircular } = useLoadingCircularProgress();
  const route = useRouter();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawer({ ...drawer, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Toolbar
        sx={{
          height: '80px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Image src="/img/logo.svg" height={80} width={80} alt="logo" />
      </Toolbar>
      <Divider variant="middle" />
      <List>
        <ListItem sx={{ width: '100%' }}>
          <ListItemButton
            onClick={() => {
              route.push('/admin');
              setOpenLoadingCircular(true);
            }}
            sx={{
              borderRadius: 3.5,
              ...(route.pathname === '/admin' && {
                backgroundColor: '#FFBA53',
                '&:hover': {
                  backgroundColor: '#FFBA53',
                },
              }),
            }}
          >
            <ListItemIcon>
              <DashboardCustomizeOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary={'Dashboard'}
              primaryTypographyProps={{ style: { fontSize: '0.8rem' } }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => {
              route.push('/admin/menu-management');
              setOpenLoadingCircular(true);
            }}
            sx={{
              borderRadius: 3.5,
              ...(route.pathname === '/admin/menu-management' && {
                backgroundColor: '#FFBA53',
                '&:hover': {
                  backgroundColor: '#FFBA53',
                },
              }),
            }}
          >
            <ListItemIcon>
              <FastfoodRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary={'Menu Management'}
              primaryTypographyProps={{ style: { fontSize: '0.8rem' } }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => {
              route.push('/admin/user-management');
              setOpenLoadingCircular(true);
            }}
            sx={{
              borderRadius: 3.5,
              ...(route.pathname === '/admin/user-management' && {
                backgroundColor: '#FFBA53',
                '&:hover': {
                  backgroundColor: '#FFBA53',
                },
              }),
            }}
          >
            <ListItemIcon>
              <GroupRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary={'User Management'}
              primaryTypographyProps={{ style: { fontSize: '0.8rem' } }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {/* {["left"].map((anchor) => ( */}
      <React.Fragment>
        <Button onClick={toggleDrawer('left', true)}>left</Button>
        <SwipeableDrawer
          anchor={'left'}
          open={drawer.left}
          onClose={toggleDrawer('left', false)}
          onOpen={toggleDrawer('left', true)}
        >
          {list('left')}
        </SwipeableDrawer>
      </React.Fragment>
      {/* ))} */}
    </div>
  );
}
