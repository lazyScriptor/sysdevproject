import {
  Box,
  Paper,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { InvoiceContext } from "../../../Contexts/Contexts";
import axios from "axios";
import Swal from "sweetalert2";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import { InvoicePdfWarehouseHandler } from "../../RoleBasedAccess/Warehouse handler/Invoice/InvoiceWarehouseHandler";
import TemporaryBill from "../../SubComponents/TemporaryBill";
import ReceiptIcon from "@mui/icons-material/Receipt";
function InvoiceDetailsWindowDown(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openOtherDialog, setOpenOtherDialog] = useState(false);
  const handlePdfButtonClick = () => {
    setOpenDialog(true);
  };

  const handleOtherDialogButtonClick = () => {
    setOpenOtherDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpenOtherDialog(false);
  };

  const { updateBtnStatus, setUpdateBtnStatus, handleCreateNew } = props;
  const {
    fullDetailsEquipmentArray,
    setFullDetailsEquipmentArray,
    checkState,
    responseManageToogle,
    clearValues,
    setResponseManageToogle,
    invoiceSearchBtnStatus,
    setInvoiceSearchBtnStatus,
    setCheckState,
    eqObject,
    setEqObject,
    invoiceObject,
    setInvoiceObject,
    clearObject,
    updateValue,
    updateEqObject,
  } = useContext(InvoiceContext);

  useEffect(() => {}, [invoiceObject]);

  const handleInvoiceSubmit = async () => {
    // localStorage.setItem("CIObject", JSON.stringify(invoiceObject));
    // const localInvoiceObject = localStorage.getItem("CIObject");
    console.log("Local storage retrieval", invoiceObject.InvoiceID);

    if (invoiceObject) {
      if (invoiceObject.InvoiceID > 0) {
        if (
          invoiceObject.hasOwnProperty("customerDetails") &&
          invoiceObject.customerDetails.cus_id > 0
        ) {
          if (invoiceObject.eqdetails.length > 0) {
            if (invoiceObject.advance > 0) {
              console.log("Local storage retrieval", invoiceObject);
              try {
                // Send the object to the backend
                await axios.post(
                  "http://localhost:8085/createInvoiceDetails",
                  invoiceObject
                );
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your work has been saved",
                  showConfirmButton: false,
                  timer: 1500,
                });

                console.log("Invoice details updated successfully");
              } catch (error) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Try again!",
                  footer:
                    '<span style={{color:"red}}>Error occurred in front end AXIOS invoice pass?</span>',
                });
                console.error(
                  "Error occurred in front end AXIOS invoice pass",
                  error
                );
              }
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Didn't he pay you!",
                footer: '<a href="#">Why do I have this issue?</a>',
              });
              console.log("Advance payment is not greater than 0");
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Enter machine details!",
              footer: '<a href="#">Why do I have this issue?</a>',
            });
            console.log("No equipment details found");
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Enter Customer Details!",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
          console.log(
            "Customer ID is not greater than 0 MEANS Customer is not found"
          );
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Create a New Invoice!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
        console.log("Invoice Id should be present");
      }
    } else {
      console.log("Invoice object is undefined");
    }
  };
  const handleInvoiceUpdate = async () => {
    if (invoiceObject) {
      if (invoiceObject.InvoiceID > 0) {
        if (
          invoiceObject.hasOwnProperty("customerDetails") &&
          invoiceObject.customerDetails.cus_id > 0
        ) {
          if (invoiceObject.eqdetails.length > 0) {
            if (invoiceObject.advance > 0) {
              console.log("Local storage retrieval", invoiceObject);
              try {
                // Send the object to the backend
                await axios.post(
                  "http://localhost:8085/updateInvoiceDetails",
                  invoiceObject
                );
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your work has been saved",
                  showConfirmButton: false,
                  timer: 1500,
                });
                handleCreateNew();
                setUpdateBtnStatus(false);
                console.log("Invoice details updated successfully");
              } catch (error) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Try again!",
                  footer:
                    '<span style={{color:"red}}>Error occurred in front end AXIOS invoice pass?</span>',
                });
                console.error(
                  "Error occurred in front end AXIOS invoice pass",
                  error
                );
              }
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Didn't he pay you!",
                footer: '<a href="#">Why do I have this issue?</a>',
              });
              console.log("Advance payment is not greater than 0");
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Enter machine details!",
              footer: '<a href="#">Why do I have this issue?</a>',
            });
            console.log("No equipment details found");
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Enter Customer Details!",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
          console.log(
            "Customer ID is not greater than 0 MEANS Customer is not found"
          );
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Create a New Invoice!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
        console.log("Invoice Id should be present");
      }
    } else {
      console.log("Invoice object is undefined");
    }
  };
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
          height: "80%",
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
                {!!invoiceObject.advance ? invoiceObject.advance : ""}
                {!!invoiceObject.advance ? " LKR" : ""}
              </Typography>

              {invoiceObject.payments &&
                invoiceObject.payments.map((item, index) => (
                  <Typography
                    key={index}
                    variant="h7"
                    sx={{ textAlign: "end" }}
                  >
                    {`${index + 1}) `}
                    {item.invpay_amount && item.invpay_amount}
                    {item.invpay_amount && " LKR"}
                  </Typography>
                ))}
            </Box>
          </Box>
          <Box sx={{ height: "100%", width: "100%" }}></Box>
        </Box>
      </Paper>
      <Box display={"flex"} alignItems={"center"} gap={1}>
        {invoiceSearchBtnStatus == true ? (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 1, borderRadius: 0, height: "60px", width: "17vw" }}
            onClick={handleInvoiceUpdate}
          >
            Update Invoice
          </Button>
        ) : (
          <Button
            color="success"
            variant="contained"
            sx={{ mt: 1, borderRadius: 0, height: "60px", width: "17vw" }}
            onClick={handleInvoiceSubmit}
          >
            Create Invoice
          </Button>
        )}
        <Button
          onClick={handlePdfButtonClick}
          variant="contained"
          sx={{ height: "60px", width: "20px", mt: 1 }}
        >
          <PictureAsPdfRoundedIcon sx={{ color: "white" }} />
        </Button>
        <Button
          onClick={handleOtherDialogButtonClick}
          variant="outlined"
          sx={{ height: "60px", width: "20px", mt: 1 }}
        >
          <ReceiptIcon />
        </Button>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
          <InvoicePdfWarehouseHandler />
        </DialogContent>
      </Dialog>
      <Dialog open={openOtherDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <TemporaryBill />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default InvoiceDetailsWindowDown;
