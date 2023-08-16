import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

export default function CollapseTable({ dataRows, open }) {
  return (
    <TableRow
      sx={{
        backgroundColor: grey[100],
      }}
    >
      <TableCell
        style={{
          paddingBottom: 0,
          paddingTop: 0,
          border: 0,
        }}
        colSpan={8}
      >
        <Collapse
          in={open}
          // in={openActionTable.isOpenCollapse}
          timeout="auto"
          unmountOnExit
        >
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Detail Order Menu
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Menu Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Quantity</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Catatan</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataRows.tb_order_details.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{item.tb_menu.nama || '-'}</TableCell>
                    <TableCell>{item.tb_menu.kategori || '-'}</TableCell>
                    <TableCell>{item.quantity || '-'}</TableCell>
                    <TableCell>{item.catatan || '-'}</TableCell>
                    <TableCell>{item.subTotal || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}
