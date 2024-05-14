import {
  Box,
  Paper,
  Typography,
  FormLabel,
  Checkbox,
  TextField,
  Chip,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AlertComponentContext, InvoiceContext } from "../../Contexts/Contexts";
import MousePopOver from "./AlertComponents/MousePopOver";
import SearchIcon from "@mui/icons-material/Search";

function InvoiceRightSide() {
  const { snackHandleClickVariant } = useContext(AlertComponentContext);
  const {
    equipmentObject,
    setEquipmentObject,
    checkState,
    setCheckState,
    eqArray,
    setEqArray,
    invoiceObject,
    setInvoiceObject,
    updateValue,
  } = useContext(InvoiceContext);

  const [array, setArray] = useState({});
  const [eqObject, setEqObject] = useState([]); //local array of equipment
  const [eq, setEq] = useState(""); //eq name
  const [eqQty, setEqQty] = useState(""); //eq qyantity
  const [EqIdValue, setEqIdValue] = useState();
  const [numChips, setNumChips] = useState(0); // Initial number of chips
  const [isQtyGreaterThanOne, setIsQtyEqualsOne] = useState(false);
  const [borrowedQty, setBorrowedQty] = useState();

  const handleSearch = async (value) => {
    console.log("value frontend", value);
    try {
      const res = await axios.get(
        `http://localhost:8085/getEquipmentbyID/${value}`
      );
      if (res.data[0] == undefined) setEq(""); //if the retrieved value is undefined, set the eq name phrase to ""
      // setEqObject(res.data[0]); //assign data to the local variable
      console.log("After retrieval", res.data[0]);

      res.data[0].eq_quantity === 1
        ? setIsQtyEqualsOne(true)
        : setIsQtyEqualsOne(false);

      setEq(res.data[0].eq_name); //just to display in the field
      setEqQty(res.data[0].eq_quantity);
      // setEquipmentObject(res.data[0]); //pass retrieved data directly to the CONTEXT object

      snackHandleClickVariant(
        `Equipment found :${res.data[0].eq_name}`,
        "success"
      );
    } catch (error) {
      console.error("error occurred while searching by ID:", error);
    }
  };

  const handleIdAdd = () => {
    console.log("prev checkstate", checkState);
    setCheckState((checkState) => {
      // console.log(!checkState)
      checkState = !checkState;
      updateValue("idStatus", checkState);
      return checkState;
    });
    console.log("Afeter checkstat", !checkState);

    //handleAddEquipment description eka wagema methanath EquipmentObject kiyana context eke thyena object ekata
    //aluthin idData eka add wela,checkState eka change krna parak gane value eka change wela object ekata
    //append wenawa

    //Me krla thyenne uda widihata SHALLOW copy ekak gannathuwa directly append krala
    // setEquipmentObject({
    //   ...equipmentObject,
    //   idData: checkState,
    // });
  };

  const handleAddEquipment = (eqValue, borrowedQty) => {
    //Makt the eq id integer .Default value is a string
    let newValue = parseInt(eqValue);
    //create a new array and add each items (id and borrowed qty ) as a new value
    setEqObject((prev) => {
      const updatedEqObject = [
        ...prev,
        {
          id: newValue,
          borrowedQty: borrowedQty,
        },
      ];
      updateValue("eqArray",updatedEqObject)
      console.log("This is the equipment objectttttt", updatedEqObject);
  
      return updatedEqObject;
    });
    //incrementing the number of chips
    setNumChips((prevNumChips) => prevNumChips + 1)
    };
  

  return (
    <>
     
        <Box sx={{ width: "100%" ,p:1,height:"100%"}}>
          <Typography sx={{ textAlign: "center" }} variant="h5" gutterBottom>
            Add / Remove / Handover
          </Typography>

          <Box
            gap={2}
            sx={{ display: "flex", flexDirection: "column", height: "auto" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "40%",
                  alignItems: "center",
                }}
              >
                <FormLabel htmlFor="my-input">Equipment Id</FormLabel>
              </Box>
              <Box sx={{ width: "60%",display:"flex",alignItems:"center"}}>
                <TextField
                  onChange={(e) => {
                    setEqIdValue(e.target.value);
                  }}
                  sx={{ width: "70%" }}
                  id="outlined-basic"
                  label="Search machine id"
                  variant="outlined"
                />
                <IconButton
                  onClick={() => {
                    handleSearch(EqIdValue);
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "40%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FormLabel htmlFor="my-input">Equipment Name</FormLabel>
              </Box>
              <Box sx={{ width: "60%" }}>
                <TextField
                  disabled
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  variant="outlined"
                  value={eq}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "40%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FormLabel htmlFor="my-input">Equipment Qty</FormLabel>
              </Box>
              <Box sx={{ width: "60%" }}>
                <TextField
                  disabled={isQtyGreaterThanOne}
                  sx={{ width: "100%" }}
                  id="standard-basic"
                  // label="Enter quantity"
                  variant="outlined"
                  value={eqQty}
                  onChange={(e) => {
                    setBorrowedQty(eqQty);
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", p: 3 }}>
            <Button onClick={() => handleAddEquipment(EqIdValue, eqQty)}>
              Add
            </Button>
            <Button>Remove</Button>
            <Button>Handover</Button>
          </Box>
          <Stack direction="row" spacing={1}>
            {/* Render the number of chips based on the state */}
            {Array.from({ length: numChips }, (_, index) => (
              <Chip
                key={index}
                label={`${eqObject[eqObject.length - 1 - index].id}  `}
                color={"primary"}
                variant="outlined"
              />
            ))}
          </Stack>
        </Box>
  
    
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Typography sx={{ textAlign: "center" }} variant="h5" gutterBottom>
            Id card Status
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pl: 2.5,
            }}
          >
            <MousePopOver
              message={"HandOver status"}
              popOverContent={`Press Add button to select`}
            />
            <Button onClick={handleIdAdd}>Add</Button>
            <Checkbox
              checked={checkState}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
            />
          </Box>
        </Box>

    </>
  );
}

export default InvoiceRightSide;
