import {
  Box,
  Button,
  Checkbox,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import React, {
  useContext,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { InvoiceContext } from "../../../Contexts/Contexts";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

function InvoiceDetailsWindowUp() {
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

  const [toogle, setToogle] = useState(false);

  const Total = localStorage.getItem("Total");
  useEffect(() => {
    // setResponseManageToogle(!responseManageToogle);
  }, [eqObject]);

  const deleteButtonStyles = {
    width: "100%",
    height: "100%",
    border: 0,
    borderRadius: 6,
    backgroundColor: "red",
  };
  const handleDelete = (id) => {
    // Filter out the item with the corresponding eq_id
    const updatedEqObject = invoiceObject.eqdetails.filter((item) => item.eq_id !== id);
    
    // Update the invoiceObject with the filtered eqdetails array
    setInvoiceObject((prevInvoiceObject) => ({
      ...prevInvoiceObject,
      eqdetails: updatedEqObject,
    }));
  };
  
  
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
            backgroundColor: (theme) => theme.palette.primary[50],
            borderRadius: 3,
            width: "140px",
          }}
        >
          <Switch onChange={(e) => setToogle(e.target.checked)} />
          <Typography variant="caption">Edit mode</Typography>
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
              elevation={2}
              key={index}
              sx={{
                display: "flex",
                height: "70px",
                p: 1,
                m: 1,
                borderRadius: 2,
                border: "solid 1px rgb(222, 222, 222)",
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
                {/* <Typography variant="h6">Advance</Typography> */}
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
                {/* <Typography variant="h6" sx={{ textAlign: "end",mb:3 }}>
          2000 LKR
        </Typography> */}

                <Typography variant="body" sx={{ textAlign: "end" }}>
                  Rentalx {item.eq_rental}
                </Typography>
                <Typography variant="caption" sx={{ textAlign: "end" }}>
                  Quantityx {item.inveq_borrowqty}
                </Typography>
              </Box>
              {toogle && (
                <>
                  {" "}
                  <Box sx={{ width: "40px" }}>
                    <button
                      style={deleteButtonStyles}
                      onClick={() => handleDelete(item.eq_id)}
                    >
                      <DeleteTwoToneIcon sx={{ color: "white" }} />
                    </button>
                  </Box>
                </>
              )}
            </Paper>
          ))}
      </Paper>
    </>
  );
}

export default InvoiceDetailsWindowUp;
