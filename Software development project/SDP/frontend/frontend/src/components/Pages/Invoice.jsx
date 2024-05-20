import React, { useContext, useState, useEffect } from "react";
import "../Stylings/rootstyles.css";
import NewCustomerForm from "./NewCustomerForm.jsx";

import {
  Box,
  Button,
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
} from "../../Contexts/Contexts.jsx";
import OverlayDialogBox from "../SubComponents/OverlayDialogBox.jsx";
import axios from "axios";
import InvoiceRightSide from "./Invoice/InvoiceRightSide.jsx";
import InvoiceTable from "../SubComponents/InvoiceTable.jsx";
import IdCardStatus from "./Invoice/IdCardStatus.jsx";
import InvoiceDetailsWindowUp from "./Invoice/InvoiceDetailsWindowUp.jsx";
import InvoiceDetailsWindowDown from "./Invoice/InvoiceDetailsWindowDown.jsx";
import Payments from "./Invoice/Payments.jsx";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import InvoicePaymentsTable from "./Invoice/InvoicePaymentsTable.jsx";
import InvoiceRightSideNew from "./Invoice/InvoiceRightSideNew.jsx";


function Invoice() {
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
  const {showAlert}=useContext(SwalContext)


  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [invoiceId, setInvoiceId] = useState("0000");
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [invoiceIdSearch, setInvoiceIdSearch] = useState();
  useEffect(() => {
      try{
        axios
         .get("http://localhost:8085/isUserAuth", {
           headers: {
             "x-access-token": localStorage.getItem("token"),
           },
         })
         .then((response) => {
           if(!response.data.auth)navigate('/');
         });
      }catch(error){
        console.log("Error",error)
      }
  }, [invoiceObject]);



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
    updateValue("eqdetails", eqObject);
    setBoolvalue(true);
  };

  const { boolvalue, setBoolvalue, userData, setUserData } =
    useContext(PopupContext);

  const handleSearchPhoneNumber = async (phoneNumber) => {
    try {
      await axios
        .get(`http://localhost:8085/getCustomerbyPhoneNumber/${phoneNumber}`)
        .then((res) => {
          setData(res.data[0]);
          updateValue("customerDetails",res.data[0])
          // invoiceObject.c=3;
          // console.log(invoiceObject.eqArray)
          // console.log("This is the ",invoiceObject.cusId)
        });

      console.log(invoiceObject);
    } catch (error) {
      //When error occured in the above phase,despite of that ,text field is retrieving retrieveddata objects cus_fname,
      //when there is a error in retriving that data,it passes that cus_fname as anobject and text field can't retireve the value
      //which will leads to an application error.So when an error occured ,in the catch block im set that data object
      //with the previous null data
      setData(clearData);
      console.error("handle Search Phone number block", error);
    }
  };
  const handleCreateNew = async () => {
    localStorage.removeItem("CIObject");
    // setData(clearData)
    setData(clearData)
    setEqObject('')
    clearObject();
    setPaymentArray([])
    try {
      await axios.get("http://localhost:8085/invoiceIdRetrieve").then((res) => {
        console.log(res.data)
        setInvoiceId(res.data );
        updateValue("InvoiceID",res.data)
      });
    } catch (error) {
      console.log("handleSearch Createinvoice error", error);
    }
  };
  const handleInvoiceSearch = async (invoiceIdSearch) => {
    try {
      console.log(invoiceIdSearch);
      await axios
        .get(`http://localhost:8085/invoiceDataRetrieve/${invoiceIdSearch}`)
        .then((res) => {
          console.log(res.data);
          

        });
    } catch (error) {
      console.log("handleSearch Createinvoice error", error);
    }
  };

  const handlecheck = (e) => {
    console.log("value ", e.target.value, checkState);
  };
  return (
    <>
      {/* First Column: 61.8
Second Column: 38.2
Third Column: 23.6 */}

      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          Width: "100%",
          minHeight: "100vh",
        }}
      >
        {/* Row1 */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            minHeight: "8vh",
          }}
        >
          {/*Row1 Leftmost box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "23.6%",
            }}
          ></Box>
          {/*Row1 middle box */}
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
          {/*Row1 rightmost box */}
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
            {/* Invoice text box */}
            <Box>
              <h5>Invoice ID: {invoiceId}</h5>
              <h6>{currentDate}</h6>
            </Box>
          </Box>
        </Box>

        {/* Row2 */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            minHeight: "50vh",
          }}
        >
          {/*Row2 Leftmost box */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "23.6%",
            }}
          >
            {/* <InvoiceRightSide /> */}
            <InvoiceRightSideNew/>
          </Box>
          {/*Row2 middle box */}

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
                p: 3,
                borderRadius: 3,
              }}
            >
              {/* 2nd row middle box left */}
              <Box
                sx={{
                  display: "flex",
                  width: "35%",
                  justifyContent: "start",
                  flexDirection: "column",
                  gap: 7.4,
                  pt: 12.8,
                }}
              >
                <FormLabel>Customer Name</FormLabel>
                <FormLabel>Customer Address</FormLabel>
                <FormLabel>Upload NIC</FormLabel>
                <FormLabel>Customer Phone number</FormLabel>
              </Box>
              {/* 2nd row middle box right */}

              <Box
                //  2nd row middle box right-(Searchid,search box) AND (clear button)
                sx={{
                  display: "flex",
                  width: "65%",
                  justifyContent: "start",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    gap: 2,
                  }}
                >
                  {/* 2nd row middle box right - searchbar and search button only */}

                  <TextField
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    sx={{ width: "350px" }}
                    id="outlined-basic"
                    label="Search with phone number or NIC"
                    variant="outlined"
                  />
                  <Button onClick={() => handleSearchPhoneNumber(phoneNumber)}>
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
                      setData(clearData)
                      setPhoneNumber('')
                      updateValue("customerDetails",clearData)
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
                    sx={{}}
                    value={data.cus_fname}
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    disabled
                    sx={{}}
                    value={`${data.cus_address1}  ${data.cus_address2}`}
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 4 }}>
                  <TextField
                    sx={{}}
                    disabled
                    id="outlined-basic"
                    value={data.nic}
                    label={<FontAwesomeIcon icon={faUpload} />}
                    variant="outlined"
                  />
                  {/* <Checkbox
                    // checked={checkState === "true"} // Convert the string value to a boolean
                    onChange={(e)=>handlecheck(e)}

                    // sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  />
                  <FormLabel sx={{ pt: 2 }}>Physical</FormLabel>
                  <Checkbox />
                  <FormLabel sx={{ pt: 2 }}>Digital</FormLabel> */}
                  <IdCardStatus />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    disabled
                    sx={{}}
                    value={data.cus_phone_number}
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button customvariant="custom" variant="contained" onClick={handleProceedPayment}>
                    Payments
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/*Row2 rightmost box */}
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

        {/* Row3 */}
        <Box
          minHeight={300}
          sx={{
            display: "flex",
            width: "100%",
            height: "34vh",
          }}
        >
          {/*Row3 Leftmost box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              width: "23.6%",
            }}
          >
            <InvoicePaymentsTable/>
          </Box>
          {/*Row3 middle box */}
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
          {/*Row3 rightmost box */}
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
        <Payments />
      </OverlayDialogBox>
    </>
  );
}

export default Invoice;




