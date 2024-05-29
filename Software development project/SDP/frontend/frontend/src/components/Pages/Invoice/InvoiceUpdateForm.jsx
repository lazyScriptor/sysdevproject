import React, { useContext, useState, useEffect } from "react";
import "../../Stylings/rootstyles.css";
import {
  Box,
  Button,
  Dialog,
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
} from "../../../Contexts/Contexts.jsx";
import OverlayDialogBox from "../../SubComponents/OverlayDialogBox.jsx";
import axios from "axios";
import InvoiceRightSide from "./../Invoice/InvoiceRightSide.jsx";
import InvoiceTable from "../../SubComponents/InvoiceTable.jsx";
import IdCardStatus from "./../Invoice/IdCardStatus.jsx";
import InvoiceDetailsWindowUp from "./../Invoice/InvoiceDetailsWindowUp.jsx";
import InvoiceDetailsWindowDown from "./../Invoice/InvoiceDetailsWindowDown.jsx";
import Payments from "./../Invoice/Payments.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import InvoicePaymentsTable from "./../Invoice/InvoicePaymentsTable.jsx";
import InvoiceRightSideNew from "./../Invoice/InvoiceRightSideNew.jsx";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InvoiceUpdateForm({
  setIsInvoiceUpdateFormShow,
  isInvoiceUpdateFormShow,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsInvoiceUpdateFormShow(false);
  };
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "95%", maxWidth: "none" ,borderRadius:5} }} // Set your desired width here
      open={isInvoiceUpdateFormShow}
      TransitionComponent={Transition}
      onClose={handleClose}
    >
      <Box>
        <FormComponents />
      </Box>
    </Dialog>
  );
}
function FormComponents() {
  const {
    fullDetailsEquipmentArray,
    setFullDetailsEquipmentArray,
    checkState,
    setCheckState,
    setPaymentArray,
    eqObject,
    setEqObject,
    invoiceObject,
    setInvoiceObject,
    clearObject,
    updateValue,
    clearValues,
    updateEqObject,
  } = useContext(InvoiceContext);
  const { showAlert } = useContext(SwalContext);

  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [phoneNumberorNic, setPhoneNumberorNic] = useState("");
  const [invoiceId, setInvoiceId] = useState("0000");
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [invoiceIdSearch, setInvoiceIdSearch] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [invoiceSearchBtnStatus, setInvoiceSearchBtnStatus] = useState(false);

  useEffect(() => {}, [invoiceObject]);
  useEffect(() => {
    handleCreateNew();
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

  const handleProceedPayment = () => {
    setInvoiceSearchBtnStatus(false);
    setBoolvalue(true);
  };

  const { boolvalue, setBoolvalue, userData, setUserData } =
    useContext(PopupContext);

  const isValidNIC = (nic) => {
    const nineDigitsAndV = /^[0-9]{9}v$/i;
    const twelveDigits = /^[0-9]{12}$/;
    return nineDigitsAndV.test(nic) || twelveDigits.test(nic);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    phoneNumber = phoneNumber.replace(/[-\s]/g, "").trim();
    const validFormatCheck1 = /^[1-9]\d{8}$/;
    const validFormatCheck2 = /^[0]\d{9}$/;
    return (
      validFormatCheck1.test(phoneNumber) || validFormatCheck2.test(phoneNumber)
    );
  };

  const handleSearchPhoneNumberorNic = async () => {
    if (!phoneNumberorNic) {
      setValidationMessage("Phone number or NIC is required");
      return;
    }

    const trimmedValue = phoneNumberorNic.trim();
    if (!isValidNIC(trimmedValue) && !isValidPhoneNumber(trimmedValue)) {
      setValidationMessage("Invalid phone number or NIC format");
      return;
    }

    setValidationMessage("");

    try {
      const res = await axios.get(
        `http://localhost:8085/getCustomerbyPhoneNumberOrNic/${phoneNumberorNic}`
      );
      const data = res.data;

      if (Array.isArray(data) && data.length > 0) {
        setData(data[0]);
        updateValue("customerDetails", data[0]);
      } else if (data.message) {
        setData({
          cus_fname: "",
          cus_address1: "",
          cus_address2: "",
          nic: "",
          cus_phone_number: "",
          cus_id: "",
        });
        updateValue("customerDetails", null);
        console.log(data.message);
      } else {
        console.error("Unexpected response format:", data);
        setData({
          cus_fname: "",
          cus_address1: "",
          cus_address2: "",
          nic: "",
          cus_phone_number: "",
          cus_id: "",
        });
        updateValue("customerDetails", null);
      }
    } catch (error) {
      setData({
        cus_fname: "",
        cus_address1: "",
        cus_address2: "",
        nic: "",
        cus_phone_number: "",
        cus_id: "",
      });
      updateValue("customerDetails", null);
      console.error("Error in handleSearchPhoneNumberorNic:", error);
    }
  };

  const handleCreateNew = async () => {
    localStorage.removeItem("CIObject");
    setData(clearData);
    setEqObject("");
    clearObject();
    setPaymentArray([]);
    try {
      await axios.get("http://localhost:8085/invoiceIdRetrieve").then((res) => {
        console.log(res.data);
        setInvoiceId(res.data);
        updateValue("InvoiceID", res.data);
      });
    } catch (error) {
      console.log("handleSearch Createinvoice error", error);
    }
  };

  const handleInvoiceSearch = async (invoiceIdSearch) => {
    setBoolvalue(true);
    setInvoiceSearchBtnStatus(true);
    clearObject();
    try {
      console.log(invoiceIdSearch);
      const response = await axios.get(
        `http://localhost:8085/invoiceDataRetrieve/${invoiceIdSearch}`
      );

      updateValue("advance", response.data.advance);
      response.data.payments.forEach((payment) => {
        // Pass each payment object to the updateValue function
        updateValue("payments", payment);
      });
      updateValue("customerDetails", response.data.customerDetails);
      response.data.eqdetails.forEach((eqdetail) => {
        // Pass each payment object to the updateValue function
        updateValue("eqdetails", eqdetail);
      });
      console.log("object", response.data.eqdetails);
      if (response.status === 200) {
        console.log("Invoice details:", response.data);
      } else if (response.status == 404) {
        console.log("Invoice not found");
      } else {
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <Box
        sx={{
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
              sx={{ width: "350px" }}
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
            <Button onClick={handleCreateNew} variant="contained">
              Create new
            </Button>
            <Box>
              <h5>Invoice ID: {invoiceId}</h5>
              <h6>{currentDate}</h6>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            minHeight: "50vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "23.6%",
            }}
          >
            <InvoiceRightSideNew />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              width: "52.4%",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                width: "95%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                pt: 3,
                pb: 3,
                borderRadius: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "20%",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "end",
                  mr: 2,
                  pt: 5,
                  gap: 8.3,
                }}
              >
                <FormLabel sx={{ fontSize: "12px" }}> </FormLabel>
                <FormLabel sx={{ fontSize: "15px" }}>Customer Name</FormLabel>
                <FormLabel sx={{ fontSize: "15px" }}>
                  Customer Address
                </FormLabel>
                <FormLabel sx={{ fontSize: "15px" }}>Customer NIC </FormLabel>
                <FormLabel sx={{ fontSize: "15px" }}>
                  Customer Phone number
                </FormLabel>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 2,
                  width: "70%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    gap: 2,
                  }}
                >
                  <TextField
                    onChange={(e) => setPhoneNumberorNic(e.target.value)}
                    value={phoneNumberorNic}
                    sx={{ width: "350px" }}
                    id="outlined-basic"
                    label="Search with phone number or NIC"
                    variant="outlined"
                    error={!!validationMessage}
                    helperText={validationMessage}
                  />
                  <Button onClick={handleSearchPhoneNumberorNic}>
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      showAlert();
                    }}
                  >
                    <Typography variant="caption">
                      Advance
                      <br />
                      search
                    </Typography>
                  </Button>

                  <Button
                    onClick={() => {
                      setData(clearData);
                      setPhoneNumberorNic("");
                      setValidationMessage("");
                      updateValue("customerDetails", clearData);
                    }}
                    sx={{
                      color: (theme) => theme.palette.primary.error[400],
                      backgroundColor: (theme) =>
                        theme.palette.primary.error[10],
                    }}
                  >
                    Clear
                  </Button>
                </Box>

                <Box>
                  <TextField
                    fullWidth
                    disabled
                    value={
                      invoiceObject.customerDetails.cus_fname == undefined
                        ? ""
                        : invoiceObject.customerDetails.cus_fname
                    }
                    label=""
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    disabled
                    value={
                      invoiceObject.customerDetails.cus_address1 == undefined ||
                      invoiceObject.customerDetails.cus_address2 == undefined
                        ? ""
                        : `${invoiceObject.customerDetails.cus_address1}  ${invoiceObject.customerDetails.cus_address2}`
                    }
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 4 }}>
                  <TextField
                    disabled
                    value={
                      invoiceObject.customerDetails.nic == undefined
                        ? ""
                        : invoiceObject.customerDetails.nic
                    }
                    variant="outlined"
                  />
                  <IdCardStatus />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    disabled
                    sx={{}}
                    value={
                      invoiceObject.customerDetails.cus_phone_number ==
                      undefined
                        ? ""
                        : invoiceObject.customerDetails.cus_phone_number
                    }
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    customvariant="custom"
                    variant="contained"
                    onClick={handleProceedPayment}
                  >
                    Payments
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "23.6%",
            }}
          >
            <InvoiceDetailsWindowUp />
          </Box>
        </Box>

        <Box
          minHeight={300}
          sx={{
            display: "flex",
            width: "100%",
            height: "34vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              width: "23.6%",
            }}
          >
            <InvoicePaymentsTable />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "52.4%",
              p: 3,
            }}
          >
            <InvoiceTable />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "start",
              width: "23.6%",
            }}
          >
            <InvoiceDetailsWindowDown />
          </Box>
        </Box>
      </Box>
      <OverlayDialogBox>
        {invoiceSearchBtnStatus == true ? <InvoiceUpdateForm /> : <Payments />}
      </OverlayDialogBox>
    </>
  );
}
