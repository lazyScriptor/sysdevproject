import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogContent,
  TextField,
} from "@mui/material";
import Swal from "sweetalert2";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import ReceiptIcon from "@mui/icons-material/Receipt";
import axios from "axios";
import { InvoiceContext } from "../../../Contexts/Contexts";
import { InvoicePdfWarehouseHandler } from "../../RoleBasedAccess/Warehouse handler/Invoice/InvoiceWarehouseHandler";
import TemporaryBill from "../../SubComponents/TemporaryBill";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import debounce from "lodash.debounce";

const formatNumber = (numString) => {
  return new Intl.NumberFormat("en-US").format(Number(numString));
};

const handleDiscountChange = debounce((e) => {
  handleDiscount(e.target.value);
}, 1);

function InvoiceDetailsWindowDown(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openOtherDialog, setOpenOtherDialog] = useState(false);
  
  const { updateBtnStatus, setUpdateBtnStatus, handleCreateNew } = props;
  const {
    invoiceObject,
    machineTotalCost,
    setInvoiceObject,
    totalPayments,
    setTotalPayments,
    invoiceSearchBtnStatus,
    clearObject,
  } = useContext(InvoiceContext);

  const handlePdfButtonClick = () => setOpenDialog(true);
  const handleOtherDialogButtonClick = () => setOpenOtherDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpenOtherDialog(false);
  };
  const handleDiscount = (discount) => {
    invoiceObject.discount = discount;
  };
  const calculateTotalAdvanceAndPayments = () => {
    return (invoiceObject?.advance || 0) + totalPayments || " - ";
  };
  const handleInvoiceSubmit = async () => {
    if (isInvoiceValid(invoiceObject)) {
      try {
        await axios.post(
          "http://localhost:8085/createInvoiceDetails",
          invoiceObject
        );
        showAlert("success", "Your work has been saved");
      } catch (error) {
        showAlert(
          "error",
          "Try again!",
          "Error occurred in front end AXIOS invoice pass"
        );
      }
    }
  };

  const handleInvoiceUpdate = async () => {
    if (isInvoiceValid(invoiceObject)) {
      try {
        await axios.post(
          "http://localhost:8085/updateInvoiceDetails",
          invoiceObject
        );
        showAlert("success", "Your work has been saved");
        handleCreateNew();
        setUpdateBtnStatus(false);
      } catch (error) {
        showAlert(
          "error",
          "Try again!",
          "Error occurred in front end AXIOS invoice pass"
        );
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
    if (!invoice.customerDetails?.cus_id)
      return showAlert("error", "Enter Customer Details!");
    if (!invoice.eqdetails.length)
      return showAlert("error", "Enter machine details!");
    return true;
  };

  const renderDialogContent = () => (
    <>
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
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {updateBtnStatus && (
          <Box
            sx={{
              position: "absolute",
              bottom: -20,
              width: "100%",
              display: "flex",
              justifyContent: "space-between", // Adjusts space between text and button
              alignItems: "center",
              backgroundColor: "#e0e0e0",
              padding: 1,
              borderRadius: 3,
            }}
          >
            <span style={{}}>
              ගණුදෙනුව අවසන්ද :
              {invoiceObject.completedDateTime ? (
                new Date(invoiceObject.completedDateTime).toLocaleString()
              ) : (
                <>
                  {"  "}
                  <FontAwesomeIcon
                    icon={faCircle}
                    beatFade
                    style={{ color: "#00bcd4" }}
                  />
                </>
              )}
            </span>
            {!invoiceObject.completedDateTime && (
              <Button
                disabled={invoiceObject.completedDateTime ? true : false}
                color="success"
                onClick={handleCompleteBtn}
                variant="contained"
                sx={{}} // Adjusted width for better visibility
              >
                {"->"}
              </Button>
            )}
          </Box>
        )}
        <Box sx={{}}>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Typography variant="body2">අත්තිකාරම් මුදල</Typography>
              <Typography variant="body2">ගෙවූ අනෙකුත් මුදල්</Typography>
              <hr />
              <Typography variant="body2">ගෙවූ මුලු මුදල </Typography>
              <Typography variant="body2">භාණ්ඩ සඳහා මුලු මුදල</Typography>
              <hr />
              <Typography variant="body2">Discount</Typography>
              <Typography variant="body2">ශේෂය</Typography>
            </Box>
            <Box sx={{ flexGrow: 1, height: "100%" }} />
            <Box
              sx={{
                width: "40%",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Typography variant="body2" sx={{ textAlign: "end" }}>
                {invoiceObject.advance
                  ? `${formatNumber(invoiceObject.advance)} LKR`
                  : " - "}
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "end" }}>
                {invoiceObject.payments?.length
                  ? `${formatNumber(totalPayments)} LKR`
                  : "-"}
              </Typography>
              <hr />
              <Typography variant="body2" align="right">{`${formatNumber(
                calculateTotalAdvanceAndPayments()
              )} LKR`}</Typography>
              <Typography variant="body2" sx={{ textAlign: "end" }}>
                {machineTotalCost
                  ? `( ${formatNumber(machineTotalCost)} LKR )`
                  : "-"}
              </Typography>
              <hr />
              <Typography variant="body2" sx={{ textAlign: "end" }}>
                <input
                  value={invoiceObject?.discount}
                  type="number"
                  disabled={invoiceObject?.completedDateTime}
                  style={{ textAlign: "right", width: "70%" }}
                  onChange={handleDiscountChange}
                />
              </Typography>
              <Typography
                variant="body2"
                align="right"
                sx={{
                  color:
                    calculateBalance(
                      calculateTotalAdvanceAndPayments(),
                      machineTotalCost
                    ) < 0
                      ? "red"
                      : "black", // Conditionally set color
                }}
              >
                {typeof calculateBalance(
                  calculateTotalAdvanceAndPayments(),
                  machineTotalCost
                ) === "number"
                  ? `${calculateBalance(
                      calculateTotalAdvanceAndPayments(),
                      machineTotalCost
                    )} LKR`
                  : " - "}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );

  const calculateBalance = () => {
    try {
      const income = calculateTotalAdvanceAndPayments();
      const totalCost = machineTotalCost;
      const discount = parseInt(invoiceObject?.discount);
      if (
        typeof income === "number" &&
        typeof totalCost === "number" &&
        !discount
      ) {
        return income - totalCost;
      } else if (
        typeof income === "number" &&
        typeof totalCost === "number" &&
        typeof discount === "number"
      ) {
        return income - totalCost + discount;
      } else {
        throw new Error("-");
      }
    } catch (error) {
      return error.message;
    }
  };

  const handleCompleteBtn = () => {
    const machineHandoverStatus = invoiceObject?.eqdetails
    console.log(machineHandoverStatus)
    const totalAdvanceAndPayments =
      typeof calculateTotalAdvanceAndPayments() == "number"
        ? calculateTotalAdvanceAndPayments()
        : 0;
    const totalMachineCost =
      typeof machineTotalCost == "number" ? machineTotalCost : 0;

    if (totalAdvanceAndPayments < totalMachineCost) {
      Swal.fire({
        title: "පාරිභෝගිකයා තව මුදල් ශේෂයක් ගෙවීමට ඇත.",
        text: " එය නොසලකා ඉදිරියට යනවාද?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ඔව්, ඉදිරියට යන්න",
        cancelButtonText: "නැවත පෙර මෙනුවට යන්න",
      }).then((result) => {
        if (result.isConfirmed) {
          // Set the completed date and update the invoice only if the user confirms
          invoiceObject.completedDateTime = new Date();
          handleInvoiceUpdate();
        } else {
          console.log("Update cancelled");
        }
      });
    } else {
      // If balance is not negative, proceed directly with updating the invoice
      // invoiceObject.completedDateTime = new Date();
      // handleInvoiceUpdate();
    }
  };

  const renderActionButtons = () => (
    <Box display={"flex"} alignItems={"center"} gap={1} sx={{}}>
      {invoiceSearchBtnStatus ? (
        <>
          {!invoiceObject.completedDateTime && (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 1, borderRadius: 0, height: "60px", width: "10vw" }}
              onClick={handleInvoiceUpdate}
            >
              Update Invoice
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
        </>
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
