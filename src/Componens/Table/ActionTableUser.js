import { Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import React, { useEffect } from "react";
import theme from "@/Helper/theme";
import { useUpdateUserModal } from "@/Context/UserManagement/UpdateUserModalContextProvider";

export default function ActionTableUser({ dataItemUser }) {
  const { setUpdateUserModal } = useUpdateUserModal();

  const handleOpenUpdateUser = () => {
    setUpdateUserModal({ isOpen: true, data: dataItemUser });
  };

  return (
    <Grid>
      <IconButton
        aria-label="delete"
        size="small"
        onClick={handleOpenUpdateUser}
      >
        <BorderColorRoundedIcon color="primary" fontSize="small" />
      </IconButton>
      <IconButton aria-label="delete" size="small">
        <DeleteIcon fontSize="small" color="primary" />
      </IconButton>
    </Grid>
  );
}
