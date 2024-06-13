import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Paper, Switch, Typography } from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AppRegistrationTwoToneIcon from "@mui/icons-material/AppRegistrationTwoTone";
import { InvoiceContext } from "../../../Contexts/Contexts";

function InvoiceDetailsWindowUp() {
  const {
    invoiceObject,
    setInvoiceObject,
    invoiceSearchBtnStatus,
    Total,
  } = useContext(InvoiceContext);

  const [toggleSwitch, setToggleSwitch] = useState(!invoiceSearchBtnStatus);

  const deleteButtonStyles = {
    width: "100%",
    height: "100%",
    border: 0,
    borderRadius: 6,
    backgroundColor: "red",
  };

  const handleDelete = (id) => {
    const updatedEqObject = invoiceObject.eqdetails.filter(
      (item) => item.eq_id !== id
    );
    setInvoiceObject((prevInvoiceObject) => ({
      ...prevInvoiceObject,
      eqdetails: updatedEqObject,
    }));
  };

  useEffect(() => {
    // When invoiceSearchBtnStatus changes to true, turn off and disable the switch
    if (invoiceSearchBtnStatus) {
      setToggleSwitch(false);
    }
  }, [invoiceSearchBtnStatus]);

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          display: "inline-block",
          overflow: "hidden",
          flexDirection: "column",
          p: 1,
          borderRadius: "12px 12px 0px 0px",
          height: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: toggleSwitch
              ? (theme) => theme.palette.primary[100]
              : (theme) => theme.palette.primary[50],
            borderRadius: 3,
            width: "90px",
          }}
        >
          <Switch
            disabled={invoiceSearchBtnStatus}
            checked={toggleSwitch}
            onChange={(e) => setToggleSwitch(e.target.checked)}
          />
          <Typography
            variant="caption"
            color={
              toggleSwitch
                ? (theme) => theme.palette.primary[25]
                : (theme) => theme.palette.primary[400]
            }
          >
            <AppRegistrationTwoToneIcon />
          </Typography>
        </Box>
        <Box
          sx={{
            position: "relative",
            height: "50px",
            top: "92%",
            m: 2,
            display: "flex",
          }}
        >
          <Typography variant="body">Sub Total</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body">{Total} LKR</Typography>
        </Box>
        {invoiceObject.eqdetails &&
          invoiceObject.eqdetails.map((item, index) => (
            <Paper
              elevation={1}
              key={index}
              sx={{
                backgroundColor: item.inveq_return_date
                  ? (theme) => theme.palette.primary[50]
                  : "white",
                display: "flex",
                height: "70px",
                p: 1,
                m: 1,
                borderRadius: 6,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.primary[100], // Change to your desired hover color
                },
              }}
            >
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "start",
                  gap: 2,
                  ml: 2,
                }}
              >
                <Typography variant="caption">{item.eq_id}</Typography>
                <Typography variant="body">{item.eq_name}</Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "end",
                  pr: 2,
                }}
              >
                <Typography variant="body" sx={{ textAlign: "end" }}>
                  Rentalx {item.eq_rental}
                </Typography>
                <Typography variant="caption" sx={{ textAlign: "end" }}>
                  Quantityx {item.inveq_borrowqty}
                </Typography>
              </Box>
              {toggleSwitch && (
                <Box sx={{ width: "40px" }}>
                  <Button
                    style={deleteButtonStyles}
                    onClick={() => handleDelete(item.eq_id)}
                  >
                    <DeleteTwoToneIcon sx={{ color: "white" }} />
                  </Button>
                </Box>
              )}
            </Paper>
          ))}
      </Paper>
    </>
  );
}

export default InvoiceDetailsWindowUp;
