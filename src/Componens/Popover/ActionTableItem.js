import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from '@mui/material';
import React from 'react';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { usePopoverActionMenuTable } from '@/Context/PopoverActionMenuTableContextProvider';
import ReadMoreRoundedIcon from '@mui/icons-material/ReadMoreRounded';

export default function ActionTableItem() {
  // const [anchorEl, setAnchorEl] = useState(null);
  const { popoverActionMenuTable, setPopoverActionMenuTable } =
    usePopoverActionMenuTable();

  // const handleEditButton = () => {
  //   actionEditModal(dataMenu, handleClose, open);
  // };

  const handleClosePopover = () => {
    setPopoverActionMenuTable(null);
  };

  const deleteMenu = () => {
    return null;
    // try {
    // } catch (error) {}
  };
  const openPopover = Boolean(popoverActionMenuTable);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <Popover
        id={id}
        open={openPopover}
        anchorEl={popoverActionMenuTable}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 360 }}>
          <nav aria-label="main mailbox folders">
            <List sx={{ paddingBottom: '0', paddingTop: '0' }}>
              {/* <ListItem
                disablePadding
                onClick={() => actionEditModal(dataMenu, handleClose, open)}
              > */}
              <ListItem
                disablePadding
                // onClick={() => handleOpenDetailMenu(dataMenu)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <ReadMoreRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Detail" />
                </ListItemButton>
              </ListItem>
              {/* <ListItem disablePadding onClick={() => handleOpen(dataMenu)}> */}
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <BorderColorRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={deleteMenu}>
                <ListItemButton>
                  <ListItemIcon>
                    <DeleteRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Delete" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Popover>
      {/* <Popover
        id={id}
        open={openPopover}
        anchorEl={popoverActionMenuTable}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 360 }}>
          <nav aria-label="main mailbox folders">
            <List sx={{ paddingBottom: "0", paddingTop: "0" }}>
              <ListItem disablePadding onClick={() => handleOpen()}>
                <ListItemButton>
                  <ListItemIcon>
                    <BorderColorRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => deleteMenu()}>
                <ListItemButton>
                  <ListItemIcon>
                    <DeleteRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Delete" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Popover> */}
      {/* <UpdateMenuForm
        dataMenu={dataMenu}
        title="please fill the input"
        open={open}
        handleClose={handleClose}
      /> */}
    </>
  );
}
