import { Box, Paper, Typography } from "@mui/material";
import React, {
  useContext,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { InvoiceContext } from "../../../Contexts/Contexts";

function InvoiceDetailsWindowUp() {
  const [toogle, setToogle] = useState(false);

  const {
    responseManageToogle,
    setResponseManageToogle,
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

  useEffect(() => {
    console.log("eqObject changed:", eqObject);
    setResponseManageToogle(!responseManageToogle)
  }, [eqObject,responseManageToogle]);

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          display:"inline-block",
          overflow:"hidden",
          flexDirection: "column",
          p: 1,
          borderRadius: "12px 12px 0px 0px",
          height: "53.6vh",
          maxHeight:"53.6vh"
        }}
      >
        {eqObject.map((item, index) => (
          <Paper
            elevation={2}
            key={index}
            sx={{
              display: "flex",
              height: "70px",
              p: 1,
              m: 1,
              borderRadius: 10,
              border: "solid 1px rgb(222, 222, 222)",
            }}
          >
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                gap: 3,
                ml:2
              }}
            >
              {/* <Typography variant="h6">Advance</Typography> */}
              <Typography variant="h7">{item.eq_id}</Typography><Typography variant="h7">{item.eq_name}</Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
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
