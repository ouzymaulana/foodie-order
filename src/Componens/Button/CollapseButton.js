import { IconButton } from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useActionTableModal } from "@/Context/ModalActionTable/ActionTableContextProvider";

export default function CollapseButton({ open, setOpen }) {
  const { openActionTable, setOpenActionTable } = useActionTableModal();

  const handleClikCollapseButtom = () => {
    // setOpenActionTable({
    //   ...openActionTable,
    //   isOpenCollapse: !openActionTable.isOpenCollapse,
    // });
  };

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
