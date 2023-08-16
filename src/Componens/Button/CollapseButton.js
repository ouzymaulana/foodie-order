import { IconButton } from '@mui/material';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function CollapseButton({ open, setOpen }) {
  return (
    <IconButton
      aria-label="expand row"
      size="small"
      onClick={() => setOpen(!open)}
    >
      {/* {openActionTable.isOpenCollapse ? ( */}
      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </IconButton>
  );
}
