import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { Box, Button, Switch, Typography } from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { InvoiceContext } from "../../../Contexts/Contexts";
import { useState } from "react";

export default function InvoicePaymentsTable() {
  const {
    invoiceObject,
    setInvoiceObject,
    clearPaymentArray,
    setPaymentArray,
    paymentArray,
    updateValue,
  } = useContext(InvoiceContext);

  const deleteButtonStyles = {
    width: "auto",
    height: "auto",
    border: 0,
    borderRadius: 6,
    backgroundColor: "red",
  };

  const [editToggle, setEditToggle] = useState(false);

  const handleDelete = (payId) => {
    // Filter out the payment with the corresponding payId
    const updatedPayments = invoiceObject.payments.filter(
      (payment) => payment.invpay_payment_id !== payId
    );
    setInvoiceObject((prevInvoiceObject) => ({
      ...prevInvoiceObject,
      payments: updatedPayments,
    }));
    // Update the invoiceObject state with the filtered array

  };

  const handleDeleteAdvance = () => {
    updateValue("advance", 0);
  };

  // Ensure there are always at least 4 rows
  const emptyRows = 5 - paymentArray.length;

  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 3.2, borderRadius: 4 ,height:"430px"}}
      elevation={4}
    >
      <Table stickyHeader sx={{ minWidth: 10 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Payment Id</TableCell>
            <TableCell align="center">Payment</TableCell>
            <TableCell align="center">
              <Box
                sx={{
                  backgroundColor: (theme) => theme.palette.primary[50],
                  borderRadius: 3,
                  width: "140px",
                }}
              >
                <Switch onChange={(e) => setEditToggle(e.target.checked)} />
                <Typography variant="caption">Edit mode</Typography>
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">{!!invoiceObject.advance && 'Advance payment'}</TableCell>
            <TableCell align="center">
              {!!invoiceObject.advance && invoiceObject.advance}
            </TableCell>
            <TableCell align="center">
              {editToggle && !!invoiceObject.advance  && (
                <button
                  style={deleteButtonStyles}
                  onClick={handleDeleteAdvance}
                >
                  <DeleteTwoToneIcon sx={{ color: "white" }} />
                </button>
              )}
            </TableCell>
          </TableRow>

          {invoiceObject.payments.map((payment, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{payment.invpay_payment_id}</TableCell>
              <TableCell align="center">{payment.invpay_amount}</TableCell>
              <TableCell align="center">
                {editToggle && (
                  <button
                    style={deleteButtonStyles}
                    onClick={() => handleDelete(payment.invpay_payment_id)}
                  >
                    <DeleteTwoToneIcon sx={{ color: "white" }} />
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}

          {/* Add empty rows if paymentArray has less than 4 items */}
          {Array.from({ length: emptyRows }).map((_, index) => (
            <TableRow
              key={`empty-${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" colSpan={3}>
                &nbsp;
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
