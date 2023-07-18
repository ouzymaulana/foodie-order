import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { formatDate } from "@/Helper/formarDate";
import { formatCurrency } from "@/Helper/formatCurrency";
import { grey } from "@mui/material/colors";
import { Typography } from "@mui/material";
import TableFooter from "@/Componens/Table/TableFooter";

export default function DataOrderTable({ orderData }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{orderData.tb_user.nama}</TableCell>
        <TableCell>{orderData.waktu_pemesanan}</TableCell>
        <TableCell>{formatDate(orderData.createdAt)}</TableCell>
        <TableCell>{orderData.alamat_antar}</TableCell>
        <TableCell>{orderData.status}</TableCell>
        <TableCell>{formatCurrency(orderData.total_bayar)}</TableCell>
      </TableRow>
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
          colSpan={7}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
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
                  {orderData.tb_order_details.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>{item.tb_menu.nama}</TableCell>
                      <TableCell>{item.tb_menu.kategori}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.catatan}</TableCell>
                      <TableCell>{item.subTotal}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
