import { useLoadingCircularProgress } from '@/Context/LoadingCircularProgressContextProvider';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

export default function SideBarItem({
  route,
  menuTitle,
  itemIcon,
  primaryTypographyProps,
}) {
  const { setOpenLoadingCircular } = useLoadingCircularProgress();
  const { push, pathname } = useRouter();
  return (
    <ListItem>
      <ListItemButton
        onClick={() => {
          push(route);
          setOpenLoadingCircular(true);
        }}
        sx={{
          borderRadius: 3.5,
          ...(pathname === route && {
            backgroundColor: '#FFBA53',
            '&:hover': {
              backgroundColor: '#FFBA53',
            },
          }),
        }}
      >
        <ListItemIcon>{itemIcon}</ListItemIcon>
        <ListItemText
          primary={menuTitle}
          primaryTypographyProps={primaryTypographyProps || null}
        />
      </ListItemButton>
    </ListItem>
  );
}
