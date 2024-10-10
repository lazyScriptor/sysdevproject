import { Box, Checkbox, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import MousePopOver from "../../SubComponents/AlertComponents/MousePopOver";
import { Button } from "@mui/material";
import { InvoiceContext } from "../../../Contexts/Contexts";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function IdCardStatus() {
  const {
    fullDetailsEquipmentArray,
    setFullDetailsEquipmentArray,
    checkState,
    setCheckState,
    eqObject,
    setEqObject,
    invoiceObject,
    invoiceSearchBtnStatus,
    setInvoiceObject,
    updateValue,
  } = useContext(InvoiceContext);

  const handleIdAdd = () => {
    console.log("prev checkstate", checkState);
    setCheckState((prevCheckState) => {
      const newCheckState = !prevCheckState;
      updateValue("iDstatus", newCheckState);
      return newCheckState;
    });
    //handleAddEquipment description eka wagema methanath EquipmentObject kiyana context eke thyena object ekata
    //aluthin idData eka add wela,checkState eka change krna parak gane value eka change wela object ekata
    //append wenawa

    //Me krla thyenne uda widihata SHALLOW copy ekak gannathuwa directly append krala
    // setEquipmentObject({
    //   ...equipmentObject,
    //   idData: checkState,
    // });
  };
  return (
    <>
      {/* <Paper
        elevation={3}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          p: 0,
          borderRadius: 3,
          height: "30%",
        }}
      > */}
      <Box
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          backgroundColor: (theme) => theme.palette.primary[50],
          borderRadius: 3,
        }}
      >
        {/* <Typography sx={{ textAlign: "center" }} variant="h6">
            Id card Status
          </Typography> */}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            pl: 2.5,
          }}
        >
          <Box display="inline-flex" sx={{ alignItems: "center" }}>
            <MousePopOver
              message={<InfoOutlinedIcon fontSize="2" sx={{ mr: 1 }} />}
              popOverContent={`Press Add button to select`}
            />
            <Typography variant="body">Keep ID card</Typography>
          </Box>
          <Button disabled={invoiceSearchBtnStatus} onClick={handleIdAdd}>
            {invoiceObject.iDstatus == true ? "ඉවත් කරන්න" : "ඇතුලත් කරන්න"}
          </Button>
          <Checkbox
            checked={invoiceObject.iDstatus}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
          />
        </Box>
      </Box>
      {/* </Paper> */}
    </>
  );
}

export default IdCardStatus;
