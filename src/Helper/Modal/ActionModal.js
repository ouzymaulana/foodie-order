import UpdateMenuForm from "@/Componens/Modal/Form/UpdateData/UpdateMenuForm";

export function actionEditModal(dataMenu, handleClose, open) {
  return (
    <UpdateMenuForm
      dataMenu={dataMenu}
      title="please fill the input"
      open={open}
      handleClose={handleClose}
    />
  );
}
