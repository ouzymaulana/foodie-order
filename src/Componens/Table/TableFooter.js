import { TablePagination, TableRow } from "@mui/material";
import React from "react";

export default function TableFooter() {
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={3}
          count={5}
          rowsPerPage={5}
          page={1}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          // onPageChange={handleChangePage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
          // ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  );
}
