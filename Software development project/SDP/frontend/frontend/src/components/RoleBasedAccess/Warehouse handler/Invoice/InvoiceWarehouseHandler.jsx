import React, { useContext, useState, useEffect } from "react";
import "../../../Stylings/rootstyles.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Box,
  Button,
  Fab,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUpload } from "@fortawesome/free-solid-svg-icons";
import {
  AuthContext,
  InvoiceContext,
  PopupContext,
  SwalContext,
} from "../../../../Contexts/Contexts.jsx";
import OverlayDialogBox from "../../../SubComponents/OverlayDialogBox.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InvoicePdf from "../../../Pages/Invoice/InvoicePdf.jsx";
import InvoicePdfWarehouseHandler from "./InvoicePdfWarehouseHandler.jsx";


function InvoiceWarehouseHandler() {
  const {
    setInvoiceSearchBtnStatus,
    invoiceObject,
    clearObject,
    updateValue,
  } = useContext(InvoiceContext);

  const navigate = useNavigate();
  const [phoneNumberorNic, setPhoneNumberorNic] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());


  const [invoiceIdSearch, setInvoiceIdSearch] = useState("");
  const [updateBtnStatus, setUpdateBtnStatus] = useState(false);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
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
      console.log(invoiceIdSearch);
      const response = await axios.get(
        `http://localhost:8085/invoiceDataRetrieve/${invoiceIdSearch}`
      );

      if (response.status === 200) {
        console.log("Invoice details:", response.data);
        updateValue("advance", response.data.advance);
        updateValue("createdDate", response.data.createdDate);
        response.data.payments.forEach((payment) => {
          // Pass each payment object to the updateValue function
          updateValue("payments", payment);
        });
        console.log(response.data.customerDetails.length);
        updateValue("customerDetails", response.data.customerDetails);
        response.data.eqdetails.forEach((eqdetail) => {
          // Pass each payment object to the updateValue function
          updateValue("eqdetails", eqdetail);
        });
        updateValue("InvoiceID", response.data.InvoiceID);
        updateValue("iDstatus", response.data.idStatus);
        console.log("object", response.data.eqdetails);
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
  const handleDownload = () => {
    const capture = document.querySelector(`.complete-invoice`);

    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = (canvas.height * componentWidth) / canvas.width;
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      doc.save("recipt.pdf");
    });
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
              onChange={(e) => setInvoiceIdSearch(e.target.value)}
              sx={[{ width: "350px" }, textFieldStyle]}
              id="outlined-basic"
              label="Search with invoice Id"
              variant="outlined"
            />
            <Button onClick={() => handleInvoiceSearch(invoiceIdSearch)}>
              Search
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
       
            <Box sx={{width:"180px"}}>
              <h5>Invoice ID: {invoiceObject.InvoiceID ? invoiceObject.InvoiceID : ""}</h5>
              {updateBtnStatus ? (
                <h6>{invoiceObject.createdDate
                    ? new Date(invoiceObject.createdDate).toLocaleString()
                    : null}</h6>
              ) : (
                <h6>{currentDateTime.toLocaleString()}</h6>
              )}
            </Box>
          </Box>
        </Box>
        <Box maxHeight={"90vh"} display={"flex"} justifyContent={"center"}>
        <InvoicePdfWarehouseHandler/>

        </Box>
      </Box>
   
    </>
  );
}

export default InvoiceWarehouseHandler;
