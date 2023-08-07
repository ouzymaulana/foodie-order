import ButtonUpdateStatusOrderMenu from "@/Componens/Table/ButtonUpdateStatusOrderMenu";
import { TableSortLabel } from "@mui/material";

export function isHasUpdateButtonOneField(row, column) {
  if (column === "status") {
    return <ButtonUpdateStatusOrderMenu orderItem={row} />;
  } else {
    return <></>;
  }
}
