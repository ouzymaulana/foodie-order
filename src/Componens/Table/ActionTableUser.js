import { Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import React, { useEffect } from "react";
import { useActionTableModal } from "@/Context/ModalActionTable/ActionTableContextProvider";
import { useRouter } from "next/router";
import { deleteUserAlert } from "../Alert/User";

export default function ActionTableUser({ dataItemUser }) {
  const { openActionTable, setOpenActionTable } = useActionTableModal();
  const { replace, asPath } = useRouter();

  const handleOpenUpdateUser = () => {
    setOpenActionTable({
      ...openActionTable,
      isOpenUpdateUser: true,
      data: dataItemUser,
    });
  };

  const handleOpenDeleteUser = () => {
    deleteUserAlert(dataItemUser.id, replace, asPath);
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
      <IconButton
        aria-label="delete"
        size="small"
        onClick={handleOpenDeleteUser}
      >
        <DeleteIcon fontSize="small" color="primary" />
      </IconButton>
    </Grid>
  );
}
