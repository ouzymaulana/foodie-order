import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useDrawerToggleContext } from '@/Context/Toggle/DrawerToggleContextProvider';
import { Toolbar } from '@mui/material';
import Image from 'next/image';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import FastfoodRoundedIcon from '@mui/icons-material/FastfoodRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SideBarItem from './SideBarItem';

export default function ResponsiveSideBar() {
  const { drawer, setDrawer } = useDrawerToggleContext();

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
        <SideBarItem
          route={'/admin'}
          menuTitle={'Dashboard'}
          itemIcon={<DashboardCustomizeOutlinedIcon />}
          primaryTypographyProps={{ style: { fontSize: '0.8rem' } }}
        />
        <SideBarItem
          route={'/admin/menu-management'}
          menuTitle={'Menu Management'}
          itemIcon={<FastfoodRoundedIcon />}
          primaryTypographyProps={{ style: { fontSize: '0.8rem' } }}
        />
        <SideBarItem
          route={'/admin/user-management'}
          menuTitle={'User Management'}
          itemIcon={<GroupRoundedIcon />}
          primaryTypographyProps={{ style: { fontSize: '0.8rem' } }}
        />
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
