import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogContent
} from "@mui/material";
import Swal from "sweetalert2";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import ReceiptIcon from "@mui/icons-material/Receipt";
import axios from "axios";
import { InvoiceContext } from "../../../Contexts/Contexts";
import { InvoicePdfWarehouseHandler } from "../../RoleBasedAccess/Warehouse handler/Invoice/InvoiceWarehouseHandler";
import TemporaryBill from "../../SubComponents/TemporaryBill";

function InvoiceDetailsWindowDown(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openOtherDialog, setOpenOtherDialog] = useState(false);
  const [totalPayments, setTotalPayments] = useState(0);

  const { updateBtnStatus, setUpdateBtnStatus, handleCreateNew } = props;
  const {
    invoiceObject,
    machineTotalCost,
    setInvoiceObject,
    invoiceSearchBtnStatus,
    clearObject,
  } = useContext(InvoiceContext);

  const handlePdfButtonClick = () => setOpenDialog(true);
  const handleOtherDialogButtonClick = () => setOpenOtherDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpenOtherDialog(false);
  };

  useEffect(() => {
    setTotalPayments(calculateTotalPayments());
  }, [invoiceObject]);

  const calculateTotalPayments = () => {
    let total = 0;
    if (invoiceObject?.payments) {
      invoiceObject.payments.forEach((item) => {
        total += item.invpay_amount;
      });
    }
    return total;
  };

  const calculateTotalAdvanceAndPayments = () => {
    return (invoiceObject?.advance || 0) + totalPayments || " - ";
  };

  const handleInvoiceSubmit = async () => {
    if (isInvoiceValid(invoiceObject)) {
      try {
        await axios.post("http://localhost:8085/createInvoiceDetails", invoiceObject);
        showAlert("success", "Your work has been saved");
      } catch (error) {
        showAlert("error", "Try again!", "Error occurred in front end AXIOS invoice pass");
      }
    }
  };

  const handleInvoiceUpdate = async () => {
    if (isInvoiceValid(invoiceObject)) {
      try {
        await axios.post("http://localhost:8085/updateInvoiceDetails", invoiceObject);
        showAlert("success", "Your work has been saved");
        handleCreateNew();
        setUpdateBtnStatus(false);
      } catch (error) {
        showAlert("error", "Try again!", "Error occurred in front end AXIOS invoice pass");
      }
    }
  };

  const showAlert = (icon, title, footer) => {
    Swal.fire({
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 1500,
      footer: footer ? `<span style={{color:"red"}}>${footer}</span>` : null,
    });
  };

  const isInvoiceValid = (invoice) => {
    if (!invoice) return false;
    if (!invoice.InvoiceID) return showAlert("error", "Create a New Invoice!");
    if (!(invoice.customerDetails?.cus_id)) return showAlert("error", "Enter Customer Details!");
    if (!invoice.eqdetails.length) return showAlert("error", "Enter machine details!");
    return true;
  };

  const renderDialogContent = () => (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
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

  const renderInvoiceDetails = () => (
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
      <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box sx={{ width: "30%", display: "flex", flexDirection: "column", height: "100%" }}>
            <Typography variant="body2">Advance</Typography>
            <Typography variant="body2">Payments</Typography>
            <hr />
            <Typography variant="h7">Total payment</Typography>
            <Typography variant="h7">Total cost</Typography>
            <hr />
            <Typography variant="h7">Balance</Typography>
          </Box>
          <Box sx={{ flexGrow: 1, height: "50%" }} />
          <Box sx={{ width: "40%", display: "flex", flexDirection: "column", height: "100%", justifyContent: "start" }}>
            <Typography sx={{ textAlign: "end" }}>
              {invoiceObject.advance ? `${invoiceObject.advance} LKR` : " - "}
            </Typography>
            <Typography sx={{ textAlign: "end" }}>
              {invoiceObject.payments?.length ? `${totalPayments} LKR` : "-"}
            </Typography>
            <hr />
            <Typography align="right">{`${calculateTotalAdvanceAndPayments()} LKR`}</Typography>
            <Typography sx={{ textAlign: "end" }}>
              {machineTotalCost ? `( ${machineTotalCost} LKR )` : "-"}
            </Typography>
            <hr />
            <Typography align="right">{`${calculateTotalAdvanceAndPayments() - machineTotalCost} LKR`}</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );

  const renderActionButtons = () => (
    <Box display={"flex"} alignItems={"center"} gap={1} sx={{}}>
      {invoiceSearchBtnStatus ? (
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 1, borderRadius: 0, height: "60px", width: "15vw" }}
          onClick={handleInvoiceUpdate}
        >
          Update Invoice
        </Button>
      ) : (
        <Button
          color="success"
          variant="contained"
          sx={{ mt: 1, borderRadius: 0, height: "60px", width: "15vw" }}
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
  );

  return (
    <>
      {renderInvoiceDetails()}
      {renderActionButtons()}
      {renderDialogContent()}
    </>
  );
}

export default InvoiceDetailsWindowDown;
