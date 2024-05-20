import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { Button } from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { InvoiceContext } from "../../../Contexts/Contexts";

export default function InvoicePaymentsTable() {
  const { invoiceObject, setInvoiceObject, clearPaymentArray, setPaymentArray,paymentArray,updateValue } =
    useContext(InvoiceContext);

  const deleteButtonStyles = {
    width: "100%",
    height: "100%",
    border: 0,
    borderRadius: 6,
    backgroundColor: "red",
  };

  const handleDelete = (payId) => {
    // Filter out the payment with the corresponding payId
    const updatedPayments = invoiceObject.payments.filter(
      (payment) => payment.payId !== payId
    );
    
    // Update the invoiceObject state with the filtered array
    setPaymentArray(updatedPayments);
    updateValue("payments",updatedPayments)
  };
  const handleDeleteAdvance = () => {
    updateValue("advance",0)
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 10 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Payment Id</TableCell>
            <TableCell align="center">Payment</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">Advance payment</TableCell>
            <TableCell align="center">{invoiceObject.advance}</TableCell>
            <TableCell align="center">
              <button
                style={deleteButtonStyles}
                onClick={() => handleDeleteAdvance(invoiceObject.advance)}
              >
                <DeleteTwoToneIcon sx={{ color: "white" }} />
              </button>
            </TableCell>
          </TableRow>

          {paymentArray.map((payment, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{payment.payId}</TableCell>
              <TableCell align="center">{payment.payment}</TableCell>
              <TableCell align="center">
                <button
                  style={deleteButtonStyles}
                  onClick={() => handleDelete(payment.payId)}
                >
                  <DeleteTwoToneIcon sx={{ color: "white" }} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
