import { Box, Paper, Typography } from "@mui/material";
import React, { useContext, useDeferredValue, useEffect } from "react";
import { InvoiceContext } from "../../../Contexts/Contexts";

function InvoiceDetailsWindowUp() {
  const {
    fullDetailsEquipmentArray,
    setFullDetailsEquipmentArray,
    checkState,
    setCheckState,
    eqObject,
    setEqObject,
    updateEqObject,
    invoiceObject,
    setInvoiceObject,
    updateValue,
  } = useContext(InvoiceContext);
  useEffect(()=>{
    console.log("This is the eq Array",eqObject)
  },[eqObject])
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          p: 1,
          borderRadius: "12px 12px 0px 0px",
          height: "100%",
        }}
      >
        {eqObject.map((item, index) => (
          <Paper elevation={4} key={index} sx={{ display: "flex", height:"70px" ,p:1,m:1}}>
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              {/* <Typography variant="h6">Advance</Typography> */}
              <Typography variant="h7">{item.eq_name}</Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{ width: "40%", display: "flex", flexDirection: "column" }}
            >
              {/* <Typography variant="h6" sx={{ textAlign: "end",mb:3 }}>
          2000 LKR
        </Typography> */}
              <Typography variant="body" sx={{ textAlign: "end" }}>
                Rentalx {item.eq_rental}
              </Typography>
              <Typography variant="caption" sx={{ textAlign: "end" }}>
                Quantityx {item.Qty}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Paper>
    </>
  );
}

export default InvoiceDetailsWindowUp;
