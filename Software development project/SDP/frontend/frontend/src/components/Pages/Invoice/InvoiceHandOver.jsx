import { Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { InvoiceContext } from "../../../Contexts/Contexts";

function InvoiceHandOver() {
  const { invoiceObject, setInvoiceObject } = useContext(InvoiceContext);

  const [notReturnedArray, setNotReturnedArray] = useState([]);

  // Handle click event to show SweetAlert
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
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const currentDate = new Date().toISOString();

        // Update the equipment details
        const updatedEquipment = { ...equipmentObject };
        updatedEquipment.inveq_return_quantity = parseInt(result.value);
        updatedEquipment.inveq_return_date = currentDate;

        // Create a new array with updated equipment
        const updatedInvoiceObject = { ...invoiceObject };
        updatedInvoiceObject.eqdetails = [
          ...invoiceObject.eqdetails.slice(0, index),
          updatedEquipment,
          ...invoiceObject.eqdetails.slice(index + 1),
        ];

        // Set updated invoice object in context
        setInvoiceObject(updatedInvoiceObject);
      }
    });
  };

  useEffect(() => {
    if (invoiceObject && invoiceObject.eqdetails) {
      // Filter items with null inveq_return_date
      const filteredItems = invoiceObject.eqdetails.filter(
        (item) => item.inveq_return_date === null
      );

      // Set the filtered items in the notReturnedArray state
      setNotReturnedArray(filteredItems);
      console.log("Filtered items with null return date:", filteredItems);
    }
  }, [invoiceObject]);

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 2,
        height: "100%",
        borderRadius: 4,
      }}
      elevation={3}
    >
      {notReturnedArray &&
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
              border:1,
              borderColor:"#dfdfdfde",
              borderRadius: 6,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary[100], // Change to your desired hover color
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
        ))}
    </Paper>
  );
}

export default InvoiceHandOver;
