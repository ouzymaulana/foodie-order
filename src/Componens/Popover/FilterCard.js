import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Popover,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterCartModal from '../Modal/FIlterCardDasboard';

export default function FilterCard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterBy, setFilterBy] = useState('');
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleFilter = (value) => {
    setFilterBy(value);

    setOpen(true);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          width: '10rem',
          padding: 0.8,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
          cursor: 'pointer',
          gap: '5px',
        }}
        onClick={handleClick}
      >
        <FilterListIcon />
        <Typography variant="h6">filter</Typography>
      </Paper>
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
        <List sx={{ width: '10rem' }}>
          <ListItem onClick={() => handleFilter('Daily')} disablePadding>
            <ListItemButton>
              <ListItemText
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                primary="Daily"
              />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => handleFilter('Mounthly')} disablePadding>
            <ListItemButton>
              <ListItemText
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                primary="Mounthly"
              />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => handleFilter('Year')} disablePadding>
            <ListItemButton>
              <ListItemText
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                primary="Year"
              />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => handleFilter('Customise')} disablePadding>
            <ListItemButton>
              <ListItemText
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                primary="Customise"
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
      <FilterCartModal
        open={open}
        handleClose={handleClose}
        filterBy={filterBy}
      />
    </>
  );
}
