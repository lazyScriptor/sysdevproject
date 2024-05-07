import React, { useContext, useState } from "react";
import "../Stylings/rootstyles.css";
import NewCustomerForm from "./NewCustomerForm.jsx";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew.jsx";
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
import Checkbox from "@mui/material/Checkbox";
import CustomerTable from "../SubComponents/CustomerTable.jsx";
import { InvoiceContext, PopupContext } from "../../Contexts/Contexts.jsx";
import OverlayDialogBox from "../SubComponents/OverlayDialogBox.jsx";
import axios from "axios";
import InvoiceRightSide from "../SubComponents/InvoiceRightSide.jsx";
import InvoiceTable from "../SubComponents/InvoiceTable.jsx";

function Invoice() {
  const { equipmentObject, setEquipmentObject, checkState, eqArray } =
    useContext(InvoiceContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [invoiceId, setInvoiceId] = useState();
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [invoiceIdSearch, setInvoiceIdSearch] = useState();
  const [clearData, setClearData] = useState({
    cus_fname: "",
    cus_address1: "",
    cus_address2: "",
    nic: "",
    cus_phone_number: "",
    Cus: "",
  });
  const [data, setData] = useState({
    cus_fname: "",
    cus_address1: "",
    cus_address2: "",
    nic: "",
    cus_phone_number: "",
    cus_id: "",
  });
  // const [newObject, setNewObject] = useState({
  //   bata: {
  //     ...data,
  //     eqdata: equipmentObject.eq_name || "",
  //   },
  // });

  const handleProceedPayment = () => {
    // setEquipmentObject((equipmentObject) => {
    //   ({
    //     ...equipmentObject,
    //     eq_id: eqArray,
    //     cus_id: data.cus_id,
    //   });
    //   // console.log(...equipmentObject, ...data);
    //   console.log({

    //     ...equipmentObject,
    //     // eq_id: eqArray,
    //     // cus_id: data.cus_id,
    //   },"This is the equipment object");
    // });

    setEquipmentObject({
      ...equipmentObject,
      eq_id: eqArray,
      cus_id: data.cus_id,
    });
  };

  const { boolvalue, setBoolvalue, userData, setUserData } =
    useContext(PopupContext);

  const handleSearchPhoneNumber = async (phoneNumber) => {
    try {
      await axios
        .get(`http://localhost:8085/getCustomerbyPhoneNumber/${phoneNumber}`)
        .then((res) => {
          console.log(res.data[0]);
          setData(res.data[0]);
        });
    } catch (error) {
      console.log("handleSearch Id error", error);
    }
  };
  const handleCreateNew = async () => {
    try {
      await axios.get("http://localhost:8085/invoiceIdRetrieve").then((res) => {
        setInvoiceId(res.data + 1);
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
          setData({
            cus_fname: res.data.cus_fname,
            cus_address1: res.data.cus_address1,
            cus_address2: res.data.cus_address2,
            nic: res.data.nic,
            cus_phone_number: res.data.cus_phone_number,
            Cus: res.data.cus_id,
          });
        });
    } catch (error) {
      console.log("handleSearch Createinvoice error", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          Width: "100%",
          minHeight: "100vh",
        }}
      >
        {/* Row1 */}
        <Box
          minHeight={100}
          sx={{
            display: "flex",
            width: "100%",
            height: "30%",
          }}
        >
          {/*Row1 Leftmost box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "15%",
            }}
          ></Box>
          {/*Row1 middle box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "60%",
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
              width: "25%",
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
            minheight: "40%",
          }}
        >
          {/*Row2 Leftmost box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "15%",
            }}
          >
            Row 2 coloumn 1
          </Box>
          {/*Row2 middle box */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              width: "60%",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                width: "95%",
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
                      setBoolvalue(!boolvalue);
                    }}
                  >
                    Advance
                    <br />
                    search
                  </Button>

                  <Button
                    onClick={() => {
                      setData(clearData);
                    }}
                    sx={{ color: (theme) => theme.palette.primary.error }}
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
                  <Checkbox defaultChecked />
                  <FormLabel sx={{ pt: 2 }}>Physical</FormLabel>
                  <Checkbox />
                  <FormLabel sx={{ pt: 2 }}>Digital</FormLabel>
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
                  <Button variant="contained" onClick={handleProceedPayment}>
                    Proceed to <br />
                    payment
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
              width: "25%",
            }}
          >
            <InvoiceRightSide />
          </Box>
        </Box>

        {/* Row3 */}
        <Box
          minHeight={300}
          sx={{
            display: "flex",
            width: "100%",
            minheight: "30%",
          }}
        >
          {/*Row3 Leftmost box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "15%",
            }}
          >
            Row 3 coloumn 1
          </Box>
          {/*Row3 middle box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "60%",
              p: 3,
            }}
          >
            <InvoiceTable />
          </Box>
          {/*Row3 rightmost box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "25%",
            }}
          ></Box>
        </Box>
      </Box>
      <OverlayDialogBox>
        <NewCustomerForm />
      </OverlayDialogBox>
    </>
  );
}

export default Invoice;
