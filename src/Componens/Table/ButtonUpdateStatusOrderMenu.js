import { IconButton } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useActionTableModal } from '@/Context/ModalActionTable/ActionTableContextProvider';

export default function ButtonUpdateStatusOrderMenu({ orderItem }) {
  const { openActionTable, setOpenActionTable } = useActionTableModal();

  const handleUpdateOrderMenu = () => {
    setOpenActionTable({
      ...openActionTable,
      isUpdateOrderStatus: true,
      data: orderItem,
    });
  };
  return (
    <IconButton
      disabled={orderItem.status === 'done'}
      // disabled={orderItem.status === "done" ? true : false}
      onClick={() => handleUpdateOrderMenu()}
      sx={{ ml: '10px' }}
      size="small"
    >
      <EditIcon fontSize="inherit" />
    </IconButton>
  );
}
