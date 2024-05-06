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
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AlertComponentContext, InvoiceContext } from "../../Contexts/Contexts";
import MousePopOver from "./AlertComponents/MousePopOver";

function InvoiceRightSide() {
  const { snackHandleClickVariant } = useContext(AlertComponentContext);
  const {
    equipmentObject,
    setEquipmentObject,
    checkState,
    setCheckState,
    eqArray,
    setEqArray,
  } = useContext(InvoiceContext);

  const [array, setArray] = useState({});
  const [eqObject, setEqObject] = useState({}); //local array of equipment
  const [eq, setEq] = useState(""); //eq name
  const [EqIdValue, setEqIdValue] = useState();
  const [numChips, setNumChips] = useState(0); // Initial number of chips

  const handleSearch = async (value) => {
    console.log("value frontend", value);
    try {
      const res = await axios.get(
        `http://localhost:8085/getEquipmentbyID/${value}`
      );
      if (res.data[0] == undefined) setEq(""); //if the retrieved value is undefined, set the eq name phrase to ""
      setEqObject(res.data[0]); //assign data to the local variable
      console.log("After retrieval", res.data[0]);
      setEq(res.data[0].eq_name); //just to display in the field
      setEquipmentObject(res.data[0]); //pass retrieved data directly to the CONTEXT object

      snackHandleClickVariant(
        `Equipment found :${res.data[0].eq_name}`,
        "success"
      );
    } catch (error) {
      console.error("error occurred while searching by ID:", error);
    }
  };

  const handleIdAdd = () => {
    setCheckState(!checkState);
    // setEquipmentObject({
    //   ...equipmentObject,
    //   idData: checkState,
    // });
    console.log(checkState);
  };

  const handleAddEquipment = (value) => {
    setEqArray((prevState) => [...prevState, value]);
    setNumChips((prevNumChips) => prevNumChips + 1);
    const lastElement = eqArray[eqArray.length - 1];
    console.log("val", eqArray, "This is a ", lastElement);
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "95%",
          display: "flex",
          justifyContent: "center",
          p: 1,
          borderRadius: 3,
          height: "70%",
        }}
      >
        <Box sx={{ width: "90%" }}>
          <Typography sx={{ textAlign: "center" }} variant="h5" gutterBottom>
            Add / Remove / Handover
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="h5" gutterBottom>
            Equipment
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
              <Box sx={{ width: "60%" }}>
                <TextField
                  onChange={(e) => {
                    handleSearch(e.target.value);
                    setEqIdValue(e.target.value);
                  }}
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  label="Search machine id"
                  variant="outlined"
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
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", p: 3 }}>
            <Button onClick={() => handleAddEquipment(EqIdValue)}>Add</Button>
            <Button>Remove</Button>
            <Button>Handover</Button>
          </Box>
          <Stack direction="row" spacing={1} >
            {/* Render the number of chips based on the state */}
            {Array.from({ length: numChips }, (_, index) => (
              <Chip
                key={index}
                label={`${eqArray[eqArray.length - 1 - index]}  `}
                color={"primary"}variant="outlined" 
              />
            ))}
          </Stack>
        </Box>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          width: "95%",
          display: "flex",
          justifyContent: "center",
          p: 3,
          borderRadius: 3,
          height: "30%",
        }}
      >
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
              justifyContent: "space-evenly",
              alignItems: "center",
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
      </Paper>
    </>
  );
}

export default InvoiceRightSide;
