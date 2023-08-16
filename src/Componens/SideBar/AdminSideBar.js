import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import FastfoodRoundedIcon from '@mui/icons-material/FastfoodRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import { useRouter } from 'next/router';
import { useLoadingCircularProgress } from '@/Context/LoadingCircularProgressContextProvider';

export default function AdminSideBar() {
  const route = useRouter();
  const { setOpenLoadingCircular } = useLoadingCircularProgress();
  return (
    <Drawer
      sx={{
        position: 'relative',
        border: '0',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '18rem',
          boxSizing: 'border-box',
        },
        zIndex: 990,
        // display: { sm: "none", xs: "none" },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar
        sx={{
          height: '80px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Image src="/img/logo.svg" height={100} width={100} alt="logo" />
      </Toolbar>
      <Divider variant="middle" />
      <List>
        <ListItem sx={{ paddingX: 3 }}>
          <ListItemButton
            onClick={() => {
              route.push('/admin');
              setOpenLoadingCircular(true);
            }}
            sx={{
              borderRadius: 3.5,
              // ...(selectMenu === "" && {
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
            <ListItemText primary={'Dashboard'} />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ paddingX: 3 }}>
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
            <ListItemText primary={'Menu Management'} />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ paddingX: 3 }}>
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
            <ListItemText primary={'User Management'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
