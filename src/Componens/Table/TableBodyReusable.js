import { TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';
import CollapseTable from './CollapseTable';
import {
  actionFieldTableConditional,
  formatDataConditional,
} from '@/Helper/filterSearchConditional';
import { isHasUpdateButtonOneField } from '@/Helper/updateOneFieldTable';

export default function TableBodyReusable({ columns, row }) {
  const [open, setOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <React.Fragment>
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {columns.map((column, colIndex) => (
          <TableCell sx={{ fontSize: '1rem', paddingY: '20px' }} key={colIndex}>
            {formatDataConditional(row, column, open, setOpen)}

            {actionFieldTableConditional(row, column)}
            {column.fieldWithUpdate &&
              isHovering &&
              isHasUpdateButtonOneField(row, column.field)}
          </TableCell>
        ))}
      </TableRow>
      {columns[0].collapse && <CollapseTable dataRows={row} open={open} />}
    </React.Fragment>
  );
}
