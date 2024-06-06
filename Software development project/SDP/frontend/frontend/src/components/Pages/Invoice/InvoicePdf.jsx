import React, { useContext, useEffect, useState } from "react";
import { InvoiceContext } from "../../../Contexts/Contexts";
import { Box, Paper, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function InvoicePdf() {
  const { invoiceObject } = useContext(InvoiceContext);

  useEffect(() => {
    console.log(invoiceObject);
  }, [invoiceObject]);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      component={Paper}
      elevation={5}
      sx={{ width: "794px", height: "1123px", p: 3 }}
    >
      {/* Top */}
      <Box sx={{ width: "100%", height: "20%", display: "flex" }}>
        <Box display={"flex"} alignItems={"end"}>
          <Typography variant="h5">Invoice to :</Typography>{" "}
        </Box>
        <Box flexGrow={1} />
        <Box width={"40%"}>
          <Typography variant="h4" align="center" sx={{ p: 4 }}>
            <strong>INVOICE</strong>
          </Typography>
          <Stack gap={1}>
            <Typography>Invoice id : {invoiceObject.InvoiceID}</Typography>
            <Typography>
              Date : {new Date(invoiceObject.createdDate).toLocaleDateString()}
            </Typography>
            <Typography>
              Time : {new Date(invoiceObject.createdDate).toLocaleTimeString()}
            </Typography>
          </Stack>
        </Box>
      </Box>
      {/* Middle */}
      <Box sx={{ width: "100%", height: "20%", display: "flex" }}>
        <Box width={"30%"}>
          <Typography variant="h4">
            {invoiceObject.customerDetails.cus_fname}{" "}
            {invoiceObject.customerDetails.cus_lname}
          </Typography>
          <Box display={"flex"} sx={{ height: "80%" }}>
            <Box height={"100%"}>column</Box>
            <Box width={"100%"}>
              <Stack gap={2}>
                <Box>
                  <Typography>{invoiceObject.customerDetails.cus_phone_number}</Typography>
                </Box>
                <Box>
                  <Typography>{invoiceObject.customerDetails.cus_address1}</Typography>
                  <Typography>{invoiceObject.customerDetails.cus_address2}</Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
        <Box flexGrow={1} />
        <Box width="40%"></Box>
      </Box>
      {/* body */}
      <Box sx={{ width: "100%", height: "60%" }}>
        {" "}
        <InvoiceDocumentTable />
      </Box>
    </Box>
  );
}

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [createData("Gingerbread", 356, 16.0, 49, 3.9)];

function InvoiceDocumentTable() {
  const [subTotal, setSubTotal] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);

  const { invoiceObject } = useContext(InvoiceContext);

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      if (invoiceObject && invoiceObject.eqdetails) {
        total = invoiceObject.eqdetails.reduce((sum, item) => {
          return sum + item.eq_rental * item.duration_in_days;
        }, 0);
      }
      setSubTotal(total);
    };

    const calculatePayments = () => {
      let total = 0;
      if (invoiceObject && invoiceObject.payments) {
        total = invoiceObject.payments.reduce((sum, payment) => {
          console.log("amount", payment.invpay_amount);
          return sum + payment.invpay_amount;
        }, 0);
      }
      console.log("ttla", total);
      setTotalPayments(total);
    };

    calculateTotal();
    calculatePayments();
  }, [invoiceObject]);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ padding: "4px" }}></TableCell>
            <TableCell sx={{ padding: "4px" }} align="center">
              Equipment ID
            </TableCell>
            <TableCell sx={{ padding: "4px" }} align="center">
              Equipment Name
            </TableCell>
            <TableCell sx={{ padding: "4px" }} align="center">
              Rental
            </TableCell>
            <TableCell sx={{ padding: "4px" }} align="center">
              Return Date
            </TableCell>
            <TableCell sx={{ padding: "4px" }} align="center">
              Borrow Qty
            </TableCell>
            <TableCell sx={{ padding: "4px" }} align="center">
              Duration (days)
            </TableCell>
            <TableCell sx={{ padding: "4px" }} align="center">
              Return Qty
            </TableCell>
            <TableCell sx={{ padding: "4px" }} align="center">
              Total (LKR)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoiceObject.eqdetails &&
            invoiceObject.eqdetails.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  height: "50px",
                }}
              >
                <TableCell align="center" sx={{ padding: "4px" }}>
                  {index + 1}
                </TableCell>
                <TableCell align="center" sx={{ padding: "4px" }}>
                  {row.eq_id}
                </TableCell>
                <TableCell align="center" sx={{ padding: "4px" }}>
                  {row.eq_name}
                </TableCell>
                <TableCell align="center" sx={{ padding: "4px" }}>
                  {row.eq_rental}
                </TableCell>
                <TableCell align="center" sx={{ padding: "4px" }}>
                {new Date(row.inveq_return_date).toLocaleString()}
                </TableCell>
                <TableCell align="center" sx={{ padding: "4px" }}>
                  {row.inveq_borrowqty}
                </TableCell>
                <TableCell align="center" sx={{ padding: "4px" }}>
                  {row.duration_in_days}
                </TableCell>
                <TableCell align="center" sx={{ padding: "4px" }}>
                  {row.inveq_return_quantity}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary[50],
                    border: "1px solid",
                    padding: "4px",
                    borderRadius: "10px",
                  }}
                >
                  {row.eq_rental * row.duration_in_days} LKR
                </TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell colSpan={7} />
            <TableCell align="right">
              <div
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  padding: "4px",
                  backgroundColor: "lightblue",
                }}
              >
                SubTotal
              </div>
            </TableCell>
            <TableCell align="center">{subTotal} LKR</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={7} />
            <TableCell align="right">
              <div
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  padding: "4px",
                  backgroundColor: "lightblue",
                }}
              >
                Advance
              </div>
            </TableCell>
            <TableCell align="center">{invoiceObject.advance} LKR</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={7} />
            <TableCell align="right">
              <div
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  padding: "4px",
                  backgroundColor: "lightblue",
                }}
              >
                Payments
              </div>
            </TableCell>
            <TableCell align="center"> {totalPayments} LKR</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
