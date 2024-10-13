import { Button, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { InvoiceContext } from "../../../Contexts/Contexts";

function InvoiceHandOver() {
  const { invoiceObject, setInvoiceObject } = useContext(InvoiceContext);
  const [notReturnedArray, setNotReturnedArray] = useState([]);

  const handleClick = (equipmentObject, index) => {
    Swal.fire({
      title: "Enter Return Quantity",
      input: "number",
      inputLabel: "Quantity",
      inputPlaceholder: "Enter quantity",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to enter a quantity!";
        } else if (value > equipmentObject.inveq_borrowqty) {
          return "භාරදුන් අගය ගෙනගිය උපකරණ ප්‍රමාණයට වඩා විශාල විය නොහැක.";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const currentDate = new Date().toISOString();
        const updatedEquipment = { ...equipmentObject };
        updatedEquipment.inveq_return_quantity = parseInt(result.value);
        updatedEquipment.inveq_return_date = currentDate;

        const updatedInvoiceObject = { ...invoiceObject };
        updatedInvoiceObject.eqdetails = [
          ...invoiceObject.eqdetails.slice(0, index),
          updatedEquipment,
          ...invoiceObject.eqdetails.slice(index + 1),
        ];

        setInvoiceObject(updatedInvoiceObject);
      }
    });
  };
  const handleClickComplete = () => {
    if (invoiceObject && notReturnedArray.length > 0) {
      const currentDate = new Date().toISOString();
      const updatedEqDetails = invoiceObject.eqdetails.map((item) => {
        // Check if the item has not been returned yet
        if (item.inveq_return_date === null) {
          return {
            ...item,
            inveq_return_quantity: item.inveq_borrowqty,
            inveq_return_date: currentDate,
          };
        }
        return item;
      });
  
      // Update the invoice object with the modified eqdetails
      const updatedInvoiceObject = {
        ...invoiceObject,
        eqdetails: updatedEqDetails,
      };
  
      // Set the new invoice object
      setInvoiceObject(updatedInvoiceObject);
    } else {
      Swal.fire("සියලුම භාණ්ඩ බාරදී අවසන් !");
    }
  };
  
  useEffect(() => {
    if (invoiceObject && invoiceObject.eqdetails) {
      const filteredItems = invoiceObject.eqdetails.filter(
        (item) => item.inveq_return_date === null
      );

      setNotReturnedArray(filteredItems);
      console.log("Filtered items with null return date:", filteredItems);
    }
  }, [invoiceObject]);

  return (
    <Paper
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 2,
        height: "100%",
        borderRadius: 4,
      
      }}
      elevation={3}
    >
      <div>
        <Typography
          align="center"
          variant="body1"
          sx={{ paddingTop: 2, paddingBottom: 1 }}
        >
          {" "}
          ගෙනගිය / තවම බාර නොදුන් උපකරණ
        </Typography>
      </div>
      {notReturnedArray.length > 0 ? (
        notReturnedArray.map((item, index) => (
          <Paper
            sx={{
              backgroundColor: item.inveq_return_date
                ? (theme) => theme.palette.primary[50]
                : "white",
              display: "flex",
              height: "70px",
              px: 2,
              py: 1,
              border: 2,
              borderColor: "#dfdfdfde",
              borderRadius: 6,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary[100],
                cursor: "pointer",
              },
            }}
            key={index}
            onClick={() => handleClick(item, index)}
          >
            <div>
              {item.eq_name}
              <br />
              ගෙනගිය ප්‍රමාණය : {item.inveq_borrowqty}
            </div>
          </Paper>
        ))
      ) : (
        <div style={{ display: "flex", color: "green" }}>
          සියලුම භාණ්ඩ ලබාදී ඇත.
        </div>
      )}

      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Button
          onClick={handleClickComplete}
          variant="contained"
          customvariant="custom"
        >
          <Typography variant="body" sx={{ fontSize: 16 }}>
            අවසන් කරන්න
          </Typography>
        </Button>
      </div>
    </Paper>
  );
}

export default InvoiceHandOver;
