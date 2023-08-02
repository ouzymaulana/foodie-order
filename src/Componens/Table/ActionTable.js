import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ReadMoreRoundedIcon from "@mui/icons-material/ReadMoreRounded";
import UpdateMenuForm from "../Modal/Form/UpdateData/UpdateMenuForm";
import { actionEditModal } from "@/Helper/Modal/ActionModal";
import { useDetailMenuModal } from "@/Context/MenuManagement/DetailMenuContextProvider";
import axios from "axios";
import Cookies from "js-cookie";
import { deleteMenuAlert } from "../Alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { useIsHasUpdated } from "@/Context/IsHasUpdatedContextProvider";
import {
  deleteDataByIdMenu,
  selectDataMenu,
} from "@/Redux/Slices/DataMenuSlice";
import { useRouter } from "next/router";
import { useUpdateMenuModal } from "@/Context/MenuManagement/UpdateMenuModalContextProvider";

export default function ActionTable({ dataItemMenu }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setOpenDetailMenu } = useDetailMenuModal();
  const { setIshasUpdated } = useIsHasUpdated();
  const { setUpdateMenuModal } = useUpdateMenuModal();
  const dataMenu = useSelector(selectDataMenu);
  const dispatch = useDispatch();
  const { reload, replace } = useRouter();

  const handleOpenDetailMenu = (dataItemMenu) => {
    setOpenDetailMenu({ isOpen: true, data: dataItemMenu });
    setAnchorEl(null);
  };

  const handleOpenUpdateMenu = (dataItemMenu) => {
    setUpdateMenuModal({ isOpen: true, data: dataItemMenu });
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    setIshasUpdated(true);
    setAnchorEl(null);
    deleteMenuAlert(
      dispatch,
      deleteDataByIdMenu,
      setIshasUpdated,
      dataItemMenu.id,
      dataMenu,
      reload
    );
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton
        aria-label="delete"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
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
              {/* <ListItem
                disablePadding
                onClick={() => actionEditModal(dataItemMenu, handleClose, open)}
              > */}
              <ListItem
                disablePadding
                onClick={() => handleOpenDetailMenu(dataItemMenu)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <ReadMoreRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Detail" />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                onClick={() => handleOpenUpdateMenu(dataItemMenu)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <BorderColorRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => handleDelete()}>
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
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
      </Popover>
    </>
  );
}
