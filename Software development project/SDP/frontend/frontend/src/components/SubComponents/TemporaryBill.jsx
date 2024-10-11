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
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import logo from "../../assets/logo.png";
const TemporaryBill = () => {
  const cashierName = localStorage.getItem("username");
  const { invoiceObject, machineTotalCost } = useContext(InvoiceContext);
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
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 ,paddingBottom:20}}>
            <img style={{ width: "50px" }} src={logo} alt="" />
            <Typography variant="h5" align="center">
            Enterprises{" "}
            </Typography>
          </div>
          <Typography align="center">
            භාණ්ඩ රැගෙන යාම/ බාර දීම/ මුදල් ගෙවීම සඳහා නිකුත් කරන
          </Typography>
          <Typography align="center">- තාවකාලික බිල්පත -</Typography>
          <br />
          <Box>
            <Typography align="left">
              බිල්පත් අංකය : {invoiceObject.InvoiceID}
            </Typography>
            <Typography align="left">
              ගෙනගිය දිනය | වේලාව :{" "}
              {invoiceObject.createdDate
                ? new Date(invoiceObject.createdDate).toLocaleString()
                : ""}
            </Typography>

            <Typography align="left">
            පාරිභෝගික නාමය : {invoiceObject.customerDetails.cus_fname}{" "}
              {invoiceObject.customerDetails.cus_lname}
            </Typography>
            <br />
            <Typography>බිල්පත ලබාදුන්නේ: {cashierName}</Typography>
            <Typography>  විමසීම් : 0777 593 701 </Typography>
          
            <br />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">බාරදුන් දිනය | වේලාව</TableCell>
                  <TableCell align="center">භාණ්ඩය</TableCell>
                  <TableCell align="center">ප්‍රමාණය</TableCell>
                  <TableCell align="center">දිනකට(රු.)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceObject.eqdetails &&
                  invoiceObject.eqdetails.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        {row.inveq_return_date
                          ? `${new Date(
                              row.inveq_return_date
                            ).toLocaleDateString([], {
                              month: "2-digit",
                              day: "2-digit",
                            })} ${new Date(
                              row.inveq_return_date
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}`
                          : "බාර දී නැත"}
                      </TableCell>

                      <TableCell align="center">{row.eq_name}</TableCell>
                      <TableCell align="center">
                        {row.inveq_borrowqty}
                      </TableCell>
                      <TableCell align="center">{`${row.eq_rental}`}</TableCell>
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell colSpan={3} align="right"> බාරදුන් භාණ්ඩ සඳහා මුලු මුදල : </TableCell>
                  <TableCell sx={{}} align="center">
                    {`${machineTotalCost} `}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <br />
            <Table stickyHeader sx={{ minWidth: 10 }} aria-label="simple table">
              <TableHead sx={{ height: "80px" }}>
                <TableRow>
                  <TableCell align="center">අංකය</TableCell>
                  <TableCell align="center">ගෙවූ මුදල(රු.)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceObject.advance ? (
                  <TableRow>
                    <TableCell align="center">මූලික ගෙවීම</TableCell>
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

            <div>
              <Typography align="center" sx={{ padding: 2 }}>
                {invoiceObject.customerDetails.cus_fname}{" "}
                {invoiceObject.customerDetails.cus_lname} වන මා ඉහත සඳහන් දිනදී
                මෙම භාණ්ඩ ගෙනගිය බවටත්, මෙම ගෙවීම් සිදුකල බවටත් සහතික කරමි.
              </Typography>
              <Typography align="center" sx={{ paddingTop: 4 }}>
                ..................................................
              </Typography>
            </div>
            <div>
              <Typography sx={{fontSize:12}} align="center">
                POS system designed & developed by theeka - +94 7777 222 95
              </Typography>
            </div>
          </Box>
        </Box>
      </div>
      <Button
        sx={{ width: "20px", mt: 2, color: "white" }}
        variant="contained"
        onClick={() =>
          handleDownload(
            invoiceObject.customerDetails.cus_fname,
            invoiceObject.InvoiceID
          )
        }
      >
        <BrowserUpdatedIcon />
      </Button>
    </Box>
  );
};

export default TemporaryBill;
