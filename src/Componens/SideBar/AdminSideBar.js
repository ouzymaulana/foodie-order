import { Divider, Drawer, List, Toolbar } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import FastfoodRoundedIcon from '@mui/icons-material/FastfoodRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SideBarItem from './SideBarItem';

export default function AdminSideBar() {
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
        <SideBarItem
          route={'/admin'}
          menuTitle={'Dassboard'}
          itemIcon={<DashboardCustomizeOutlinedIcon />}
        />
        <SideBarItem
          route={'/admin/menu-management'}
          menuTitle={'Menu Management'}
          itemIcon={<FastfoodRoundedIcon />}
        />
        <SideBarItem
          route={'/admin/user-management'}
          menuTitle={'User Management'}
          itemIcon={<GroupRoundedIcon />}
        />
      </List>
    </Drawer>
  );
}
