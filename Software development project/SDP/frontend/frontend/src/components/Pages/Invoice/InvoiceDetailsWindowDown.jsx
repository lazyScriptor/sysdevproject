import { Box, Paper, Stack, Typography } from "@mui/material";
import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { InvoiceContext } from "../../../Contexts/Contexts";
import axios from "axios";

function InvoiceDetailsWindowDown() {
  const {
    fullDetailsEquipmentArray,
    setFullDetailsEquipmentArray,
    checkState,
    responseManageToogle,
    setResponseManageToogle,
    setCheckState,
    eqObject,
    setEqObject,
    invoiceObject,
    setInvoiceObject,
    clearObject,
    updateValue,
    updateEqObject,
  } = useContext(InvoiceContext);


  useEffect(() => {
    
  }, [invoiceObject]);

  const handleInvoiceSubmit = async() => {
    localStorage.removeItem("CIObject");
    localStorage.setItem("CIObject",JSON.stringify(invoiceObject))
    const localInvoiceObject = localStorage.getItem("CIObject");
    console.log("Local storage retrievel",localInvoiceObject)

    if (localInvoiceObject) {
      const localInvoiceObjectJSON = JSON.parse(localInvoiceObject);
      console.log("Local storage retrieval", localInvoiceObjectJSON);
      try {
        // Send the object to the backend
        await axios.post("http://localhost:8085/updateInvoiceDetails", localInvoiceObjectJSON);
      } catch (error) {
        console.error("Error occurred in front end AXIOS invoice pass", error);
      }
    } else {
      console.log("No data found in local storage");
    }







  }
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "start",
          p: 3,
          borderRadius: "0px 0px 12px 12px",
          height: "100%",
        }}
      >
        {/* <Box width="60%" sx={{display:"flex",flexDirection:"column",gap:3}}>
            <Typography variant='h6'>Advance</Typography>
            <Typography variant='h7'>Payments</Typography>
        </Box>
        <Box width="40%" sx={{display:"flex",flexDirection:"column",gap:3}}>
            <Typography variant='h6' sx={{textAlign:"end"}}>2000 LKR</Typography>
            <Typography variant='h7' sx={{textAlign:"end"}}></Typography>
        </Box> */}
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", width: "100%" }}>
            <Box
              sx={{
                width: "30%",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                height: "100%",
              }}
            >
              <Typography variant="h6">Advance</Typography>
              <Typography variant="h7">Payments</Typography>
            </Box>
            <Box sx={{ flexGrow: 1, height: "50%" }} />
            <Box
              sx={{
                width: "30%",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Typography variant="h6" sx={{ textAlign: "end", mb: 2.5 }}>
                {invoiceObject.advance && invoiceObject.advance}
                LKR
              </Typography>

              {invoiceObject.payments && invoiceObject.payments.map((item, index) => (
                <Typography key={index} variant="h7" sx={{ textAlign: "end" }}>
                  {item.payment && item.payment} lkr
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={{ height: "100%", width: "100%" }}></Box>
        </Box>
      </Paper>
      <Button
        fullWidth
        color="success"
        variant="outlined"
        sx={{ mt: 2, borderRadius: 0, height: "60px" }}
        onClick={handleInvoiceSubmit}
      >
        Create Invoice
      </Button>
    </>
  );
}

export default InvoiceDetailsWindowDown;
