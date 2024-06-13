import React, { useContext, useRef } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { InvoiceContext } from "../../Contexts/Contexts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';


const TemporaryBill = () => {
  const { invoiceObject } = useContext(InvoiceContext);
  const billRef = useRef(null);

  const handleDownload = (name, invoiceid) => {
    const capture = billRef.current;

    const options = {
      scale: 2, // Set the scale factor here
      useCORS: true, // This option is important if your content is served from a different origin
      scrollY: -window.scrollY, // Scroll to the top of the capture element
      windowHeight: document.documentElement.scrollHeight, // Explicitly set window height for full page capture
    };

    html2canvas(capture, options).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Calculate dimensions for the PDF
      const pdfWidth = canvas.width * 0.264583; // Convert px to mm (1px = 0.264583mm)
      const pdfHeight = canvas.height * 0.264583; // Convert px to mm (1px = 0.264583mm)

      // Create PDF document with custom size
      const doc = new jsPDF({
        unit: "mm",
        format: [pdfWidth, pdfHeight], // Custom dimensions
      });

      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      doc.save(`${name}-${invoiceid}-tempBill.pdf`);
    });
  };

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <div ref={billRef} className="bill">
        <Box
          component={Paper}
          elevation={5}
          sx={{
            display: "flex",
            p: 2,
            width: "400px",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" align="center">
            T.A Enterprises{" "}
          </Typography>
          <Typography align="center">Invoice Temporary Bill </Typography>
          <br />
          <Box>
            <Typography align="left">
              Invoice Id:{invoiceObject.InvoiceID}
            </Typography>
            <Typography align="left">
              Date | Time:
              {invoiceObject.createdDate
                ? new Date(invoiceObject.createdDate).toLocaleString()
                : ""}
            </Typography>
            <br />
            <Typography align="right">
              Customer name:{invoiceObject.customerDetails.cus_fname}{" "}
              {invoiceObject.customerDetails.cus_lname}
            </Typography>
            <br />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">EQ Name</TableCell>
                  <TableCell align="center">Qty</TableCell>
                  <TableCell align="center">Rental</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceObject.eqdetails &&
                  invoiceObject.eqdetails.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{row.eq_name}</TableCell>
                      <TableCell align="center">
                        {row.inveq_borrowqty}
                      </TableCell>
                      <TableCell align="center">{row.eq_rental}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <br />
            <Table stickyHeader sx={{ minWidth: 10 }} aria-label="simple table">
              <TableHead sx={{ height: "80px" }}>
                <TableRow>
                  <TableCell align="center">Payment Id</TableCell>
                  <TableCell align="center">Payment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceObject.advance ? (
                  <TableRow>
                    <TableCell align="center">Advance payment</TableCell>
                    <TableCell align="center">
                      {invoiceObject.advance}
                    </TableCell>
                  </TableRow>
                ) : null}

                {invoiceObject.payments.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {payment.invpay_payment_id}
                    </TableCell>
                    <TableCell align="center">
                      {payment.invpay_amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </div>
      <Button
      sx={{width:"20px",mt:2,color:"white"}}
      variant="contained"
        onClick={() =>
          handleDownload(
            invoiceObject.customerDetails.cus_fname,
            invoiceObject.InvoiceID
          )
        }
      >
        <BrowserUpdatedIcon/>
      </Button>
    </Box>
  );
};

export default TemporaryBill;
