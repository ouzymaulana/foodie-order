import { Drawer, List, ListItem, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import { useDataSelectMenu } from '@/Context/SelectMenuSidebarContexProvider';
import { usePageMenu } from '@/Context/PageContextProvider';
import { grey } from '@mui/material/colors';

export default function SideBarMenu() {
  const route = useRouter();
  const { setPage } = usePageMenu();
  const { selectMenu } = useDataSelectMenu();

  return (
    <Drawer
      sx={{
        position: 'relative',
        border: '0',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '10rem',
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar sx={{ height: { lg: '80px', sm: '60px', xs: '10px' } }}>
        <Image src="/img/logo.svg" height={100} width={100} alt="logo" />
      </Toolbar>
      <List sx={{ paddingX: '30px' }}>
        <ListItem
          onClick={() => {
            setPage(1);
            route.push('/');
          }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '20px',
            cursor: 'pointer',
            marginY: '15px',
            '&:hover': {
              backgroundColor: '#FFE9C8',
            },
            ...(selectMenu === '' && {
              backgroundColor: '#FFBA53',
              '&:hover': {
                backgroundColor: '#FFBA53',
              },
            }),
          }}
        >
          <Image
            src="/img/iconSideBar/home_.svg"
            width={40}
            height={40}
            alt="icon"
          />
          <Typography
            variant="subtitle2"
            textAlign={'center'}
            color={grey[600]}
            fontWeight={600}
          >
            Menu
          </Typography>
        </ListItem>
        <ListItem
          onClick={() => {
            setPage(1);
            route.push('/favorite');
          }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '20px',
            cursor: 'pointer',
            marginY: '10px',
            '&:hover': {
              backgroundColor: '#FFE9C8',
            },
            ...(selectMenu === 'favorite' && {
              backgroundColor: '#FFBA53',
              '&:hover': {
                backgroundColor: '#FFBA53',
              },
            }),
          }}
        >
          {/* <RiHandHeartLine fontSize={35} color="grey" /> */}
          <Image
            src="/img/iconSideBar/Love.svg"
            width={50}
            height={50}
            alt="icon"
          />
          <Typography
            variant="subtitle2"
            textAlign={'center'}
            color={grey[600]}
            fontWeight={600}
          >
            Favorite
          </Typography>
        </ListItem>
        <ListItem
          onClick={() => {
            setPage(1);
            route.push('/order-history');
          }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '20px',
            cursor: 'pointer',
            marginY: '10px',
            '&:hover': {
              backgroundColor: '#FFE9C8',
            },
            ...(selectMenu === 'orderHistory' && {
              backgroundColor: '#FFBA53',
              '&:hover': {
                backgroundColor: '#FFBA53',
              },
            }),
          }}
        >
          {/* <HistoryOutlinedIcon sx={{ fontSize: 45 }} color="action" /> */}
          <Image
            src="/img/iconSideBar/Group.svg"
            width={45}
            height={45}
            alt="icon"
          />
          <Typography
            variant="subtitle2"
            textAlign={'center'}
            color={grey[600]}
            fontWeight={600}
          >
            Order History
          </Typography>
        </ListItem>
        {/* ))} */}
      </List>
    </Drawer>
  );
}
