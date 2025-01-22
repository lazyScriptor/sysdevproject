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
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const TemporaryBill = () => {
  const cashierName = localStorage.getItem("username");
  const { invoiceObject, machineTotalCost, totalPayments, setTotalPayments } =
    useContext(InvoiceContext);
  const billRef = useRef(null);

  const calculateTotalAdvanceAndPayments = () => {
    return (invoiceObject?.advance || 0) + totalPayments || " - ";
  };

  const handleDownload = (name, invoiceid) => {
    const capture = billRef.current;

    const options = {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
      windowHeight: document.documentElement.scrollHeight,
    };

    html2canvas(capture, options).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdfWidth = canvas.width * 0.264583;
      const pdfHeight = canvas.height * 0.264583;

      const doc = new jsPDF({
        unit: "mm",
        format: [pdfWidth, pdfHeight],
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
            p: 5,
            width: "400px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              paddingBottom: 20,
            }}
          >
            <img style={{ width: "50px" }} src={logo} alt="" />
            <Typography variant="h5" align="center" sx={{ fontSize: "0.75rem" }}>
              Enterprises
            </Typography>
          </div>
          <Typography align="center" variant="caption" sx={{ fontSize: "0.75rem" }}>
            භාණ්ඩ රැගෙන යාම/ බාර දීම/ මුදල් ගෙවීම සඳහා නිකුත් කරන
          </Typography>
          <Typography align="center" sx={{ fontSize: "0.75rem" }}>
            - තාවකාලික බිල්පත -
          </Typography>
          <br />
          <Box>
            <Typography align="left" sx={{ fontSize: "0.75rem" }}>
              බිල්පත් අංකය : {invoiceObject.InvoiceID}
            </Typography>
            <Typography align="left" sx={{ fontSize: "0.75rem" }}>
              ගෙනගිය දිනය | වේලාව :{" "}
              {invoiceObject.createdDate
                ? new Date(invoiceObject.createdDate).toLocaleString()
                : ""}
            </Typography>

            <Typography align="left" sx={{ fontSize: "0.75rem" }}>
              පාරිභෝගික නාමය : {invoiceObject.customerDetails.cus_fname}{" "}
              {invoiceObject.customerDetails.cus_lname}
            </Typography>
            <br />
            <Typography sx={{ fontSize: "0.75rem" }}>
              බිල්පත ලබාදුන්නේ: {cashierName}
            </Typography>
            <Typography sx={{ fontSize: "0.75rem" }}>
              විමසීම් : 0777 593 701
            </Typography>

            <br />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontSize: "0.75rem" }}>
                    බාරදුන් දිනය | වේලාව
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "0.75rem" }}>
                    භාණ්ඩය
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "0.75rem" }}>
                    ප්‍රමාණය
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "0.75rem" }}>
                    දින
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "0.75rem" }}>
                    දිනකට(රු.)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceObject.eqdetails &&
                  invoiceObject.eqdetails.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center" sx={{ fontSize: "0.75rem" }}>
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

                      <TableCell  align="center" sx={{ fontSize: "0.75rem"}}>
                        {row.eq_name}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "0.75rem" }}>
                        {row.inveq_borrowqty}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "0.75rem" }}>
                        {row.duration_in_days}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "0.75rem" }}>
                        {row.eq_rental}
                      </TableCell>
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell colSpan={4} align="right" sx={{ fontSize: "0.75rem" }}>
                    බාරදුන් භාණ්ඩ සඳහා මුලු මුදල :
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "0.75rem" }}>
                    {`${machineTotalCost} `}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <br />
            <Table stickyHeader sx={{ minWidth: 10 }} aria-label="simple table">
              <TableHead sx={{ height: "80px" }}>
                <TableRow>
                  <TableCell align="center" sx={{ fontSize: "0.75rem" }}>
                    අංකය
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "0.75rem" }}>
                    ගෙවූ මුදල(රු.)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceObject.advance ? (
                  <TableRow>
                    <TableCell align="center" sx={{ fontSize: "0.75rem" }}>
                      මූලික ගෙවීම
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "0.75rem" }}>
                      {invoiceObject.advance}
                    </TableCell>
                  </TableRow>
                ) : null}

                {invoiceObject.payments.map((payment, index) => (
                  <TableRow key={index}>
                   
                    <TableCell align="center" sx={{ fontSize: "0.75rem" }}>
                      {dayjs(payment.invpay_payment_date).tz("Asia/Colombo").format(`DD/MM | HH:mm`)} 
                    </TableCell>

                    <TableCell align="center" sx={{ fontSize: "0.75rem" }}>
                      {payment.invpay_amount}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={1} align="right" sx={{ fontSize: "0.75rem" }}>
                    ගෙවූ මුලු මුදල :
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "0.75rem" }}>
                    {`${calculateTotalAdvanceAndPayments()} `}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div>
              <Typography align="center" sx={{ padding: 2, fontSize: "0.75rem" }}>
                {invoiceObject.customerDetails.cus_fname}{" "}
                {invoiceObject.customerDetails.cus_lname} වන මා ඉහත සඳහන් දිනදී
                මෙම භාණ්ඩ ගෙනගිය බවටත්, මෙම ගෙවීම් අනුමත කර බවටත්,
                මම සනාථ කරමි.
              </Typography>
              <Typography align="center" sx={{paddingTop:5}}>
                ................................................
              </Typography>
            </div>
          </Box>
        </Box>
      </div>
      <Button
        sx={{ mt: 2, fontSize: "0.75rem" }}
        variant="contained"
        onClick={() => handleDownload(invoiceObject.customerDetails.cus_fname, invoiceObject.InvoiceID)}
      >
        <BrowserUpdatedIcon sx={{ mr: 1 }} />
        PDF එකක් බාගත කරන්න
      </Button>
    </Box>
  );
};

export default TemporaryBill;
