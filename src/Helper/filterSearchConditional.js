import InputSearch from "@/Componens/SearchDataOnTable/InputSearch";
import InputNumber from "@/Componens/SearchDataOnTable/InputNumber";
import InputDate from "@/Componens/SearchDataOnTable/InputDate";
import SelectData from "@/Componens/SearchDataOnTable/SelectData";
import TableSortLabel from "@mui/material/TableSortLabel";
import { formatCurrency } from "./formatCurrency";
import { homanFormatDate } from "./formarDate";
import ActionTable from "@/Componens/Table/ActionTable";
import { Typography } from "@mui/material";
import ActionTableUser from "@/Componens/Table/ActionTableUser";
import CollapseButton from "@/Componens/Button/CollapseButton";

export function filterSearchConditional(column) {
  if (column.filter === "inputText") {
    return <InputSearch title={column.routefield} />;
  } else if (column.filter === "inputNumber") {
    return <InputNumber title={column.routefield} />;
  } else if (column.filter === "inputDate") {
    return <InputDate title={column.routefield} />;
  } else if (column.filter === "inputSelect") {
    return (
      <SelectData selectData={column.selectData} title={column.routefield} />
    );
  }
}

export function sortDataConditional(column, sortBy, sortType, handleSort) {
  if (column.sort) {
    return (
      <TableSortLabel
        active={sortBy === column.field}
        direction={sortBy === column.field ? sortType : "desc"}
        onClick={() => handleSort(column.field)}
      />
    );
  } else {
    return <></>;
  }
}

export function formatDataConditional(row, column, open, setOpen) {
  if (column.field === "harga" || column.field === "total_bayar") {
    return formatCurrency(row[column.field]);
  } else if (column.field === "createdAt") {
    return homanFormatDate(row[column.field]);
  } else if (column.collapse) {
    return <CollapseButton open={open} setOpen={setOpen} />;
  } else {
    return row[column.field];
  }
}

export function actionFieldTableConditional(row, column) {
  if (column.field === "action") {
    if (column.actionLable === "menuManagement") {
      return <ActionTable dataItemMenu={row} />;
    } else if (column.actionLable === "userManagement") {
      return <ActionTableUser dataItemUser={row} />;
    } else if (column.actionLable === "orderMenu") {
      return <Typography>soon</Typography>;
    }
  }
}
