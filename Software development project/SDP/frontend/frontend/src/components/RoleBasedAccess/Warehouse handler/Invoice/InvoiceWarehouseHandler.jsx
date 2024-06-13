import React, { useContext, useState, useEffect } from "react";
import "../../../Stylings/rootstyles.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  AuthContext,
  InvoiceContext,
  PopupContext,
  SwalContext,
} from "../../../../Contexts/Contexts.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import AddIcCallOutlinedIcon from "@mui/icons-material/AddIcCallOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';

const handleDownload = (name, invoiceid) => {
  const capture = document.querySelector(`.invoice`);
  html2canvas(capture).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const doc = new jsPDF("p", "mm", "a4");
    const componentWidth = doc.internal.pageSize.getWidth();
    const componentHeight = (canvas.height * componentWidth) / canvas.width;
    doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
    doc.save(`${name}-${invoiceid}-invoice.pdf`);
  });
};

export default function InvoiceWarehouseHandler() {
  const { setInvoiceSearchBtnStatus, invoiceObject, clearObject, updateValue } =
    useContext(InvoiceContext);
  const navigate = useNavigate();
  const [phoneNumberorNic, setPhoneNumberorNic] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [invoiceIdSearch, setInvoiceIdSearch] = useState("");
  const [updateBtnStatus, setUpdateBtnStatus] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const [data, setData] = useState({
    cus_fname: "",
    cus_address1: " ",
    cus_address2: "",
    nic: "",
    cus_phone_number: "",
    cus_id: "",
  });

  const [clearData, setClearData] = useState({
    cus_fname: "",
    cus_address1: "",
    cus_address2: "",
    nic: "",
    cus_phone_number: "",
    Cus: "",
  });

  const { boolvalue, setBoolvalue, userData, setUserData } =
    useContext(PopupContext);

  const handleInvoiceSearch = async (invoiceIdSearch) => {
    setInvoiceSearchBtnStatus(true);
    clearObject();

    try {
      const response = await axios.get(
        `http://localhost:8085/invoiceDataRetrieve/${invoiceIdSearch}`
      );

      if (response.status === 200) {
        updateValue("advance", response.data.advance);
        updateValue("createdDate", response.data.createdDate);
        response.data.payments.forEach((payment) => {
          updateValue("payments", payment);
        });
        updateValue("customerDetails", response.data.customerDetails);
        response.data.eqdetails.forEach((eqdetail) => {
          updateValue("eqdetails", eqdetail);
        });
        updateValue("InvoiceID", response.data.InvoiceID);
        updateValue("iDstatus", response.data.idStatus);
        setUpdateBtnStatus(true);
      } else if (response.status == 404) {
        console.log("Invoice not found");
      } else {
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
    },
  };

  const handleClear = () => {
    clearObject();
    setInvoiceIdSearch("");
  };

  return (
    <>
      <Box
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          Width: "100%",
          minHeight: "100vh",
          pl: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.primary[50],
            display: "flex",
            width: "100%",
            minHeight: "8vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "23.6%",
            }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "52.4%",
              gap: 2,
              pl: 5,
              pr: 5,
            }}
          >
            <TextField
              value={invoiceIdSearch}
              onChange={(e) => setInvoiceIdSearch(e.target.value)}
              sx={[{ width: "350px" }, textFieldStyle]}
              id="outlined-basic"
              label="Search with invoice Id"
              variant="outlined"
            />
            <Button
              sx={{ color: "white" }}
              variant="contained"
              onClick={() => handleInvoiceSearch(invoiceIdSearch)}
            >
              <YoutubeSearchedForIcon />
            </Button>
            <Button color="error" onClick={handleClear}>
              <BackspaceOutlinedIcon />
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "23.6%",
              gap: 2,
            }}
          >
            <Box sx={{ width: "180px" }}>
              <h5>
                Invoice ID:{" "}
                {invoiceObject.InvoiceID ? invoiceObject.InvoiceID : ""}
              </h5>
              {updateBtnStatus ? (
                <h6>
                  {invoiceObject.createdDate
                    ? new Date(invoiceObject.createdDate).toLocaleString()
                    : null}
                </h6>
              ) : (
                <h6>{currentDateTime.toLocaleString()}</h6>
              )}
            </Box>
          </Box>
        </Box>
        <Box height={"auto"} display={"flex"} justifyContent={"center"}>
          <Box width={"50vw"}></Box>
          <Box
            width={"50vw"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <InvoicePdfWarehouseHandler />
        
          </Box>
        </Box>
      </Box>
    </>
  );
}
function InvoiceDocumentTable() {
  const [subTotal, setSubTotal] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);

  const { invoiceObject } = useContext(InvoiceContext);

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      if (invoiceObject && invoiceObject.eqdetails) {
        total = invoiceObject.eqdetails.reduce((sum, item) => {
          return (
            sum + item.eq_rental * item.duration_in_days * item.inveq_borrowqty
          );
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
    <TableContainer sx={{ mt: 4 }}>
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
                  {row.inveq_return_date == null ? (
                    <>
                      <Box
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.primary.error[200],
                          ml: 4,
                          color: "white",
                          width: "50px",
                          height: "20px",
                          display: "flex",
                          justifyContent: "center",
                          borderRadius: 10,
                        }}
                      >
                        out
                      </Box>
                    </>
                  ) : (
                    new Date(row.inveq_return_date).toLocaleString()
                  )}
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
                    padding: "4px",
                    borderRadius: "5px",
                  }}
                >
                  {row.eq_rental * row.duration_in_days * row.inveq_borrowqty}{" "}
                  LKR
                </TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell colSpan={7} />
            <TableCell align="center">
              <Box
                sx={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  padding: "10px",
                  backgroundColor: (theme) => theme.palette.primary[200],
                }}
              >
                SubTotal
              </Box>
            </TableCell>
            <TableCell align="center">{subTotal} LKR</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={7} />
            <TableCell align="center">
              <Box
                sx={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  padding: "10px",
                  backgroundColor: (theme) => theme.palette.primary[200],
                }}
              >
                Advance
              </Box>
            </TableCell>
            <TableCell align="center">{invoiceObject.advance} LKR</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={7} />
            <TableCell align="center">
              <Box
                sx={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  padding: "10px",
                  color: "",
                  backgroundColor: (theme) => theme.palette.primary[200],
                }}
              >
                Payments
              </Box>
            </TableCell>
            <TableCell align="center"> {totalPayments} LKR</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function InvoicePdfWarehouseHandler() {
  const { invoiceObject } = useContext(InvoiceContext);

  useEffect(() => {
    console.log(invoiceObject);
  }, [invoiceObject]);
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <div className="invoice">
        <Box
          display={"flex"}
          flexDirection={"column"}
          component={Paper}
          elevation={10}
          sx={{
            width: "800px",
            minHeight: "80vh",
            height: "auto",
            p: 3,
            mt: 5,
            borderRadius: 3,
          }}
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
                  Date :{" "}
                  {invoiceObject.createdDate == null
                    ? ""
                    : new Date(invoiceObject.createdDate).toLocaleDateString()}
                </Typography>
                <Typography>
                  Time :{" "}
                  {invoiceObject.createdDate == null
                    ? ""
                    : new Date(invoiceObject.createdDate).toLocaleTimeString()}
                </Typography>
              </Stack>
            </Box>
          </Box>
          {/* Middle */}
          <Box sx={{ width: "100%", height: "20%", display: "flex" }}>
            <Box width={"60%"}>
              <Typography variant="h4">
                {invoiceObject.customerDetails.cus_fname}{" "}
                {invoiceObject.customerDetails.cus_lname}
              </Typography>
              <Box display={"flex"} sx={{ height: "80%", mt: 2 }}>
                <Box height={"100%"}>
                  {invoiceObject.customerDetails.cus_fname && (
                    <>
                      <AddIcCallOutlinedIcon fontSize={"10px"} sx={{ mb: 2 }} />
                      <ContactMailOutlinedIcon fontSize={"10px"} />
                    </>
                  )}
                </Box>
                <Box width={"100%"}>
                  <Box sx={{ mb: 1.1 }}>
                    <Typography>
                      {invoiceObject.customerDetails.cus_phone_number}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>
                      {invoiceObject.customerDetails.cus_address1}
                    </Typography>
                    <Typography>
                      {invoiceObject.customerDetails.cus_address2}
                    </Typography>
                  </Box>
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
}
