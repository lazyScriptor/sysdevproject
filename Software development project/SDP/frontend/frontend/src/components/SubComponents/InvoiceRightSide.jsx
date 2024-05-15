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
import React, { useContext, useEffect, useState } from "react";
import { AlertComponentContext, InvoiceContext } from "../../Contexts/Contexts";
import MousePopOver from "./AlertComponents/MousePopOver";
import SearchIcon from "@mui/icons-material/Search";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IdCardStatus from "../Pages/Invoice/IdCardStatus";

function InvoiceRightSide() {
  const schema = yup.object().shape({
    eqid: yup
      .number("Enter a number")
      .positive("The equipment ID must be a positive number")
      // .min(1, "The equipment ID must be at least 1")
      .max(200, "The equipment ID must be at most 200")
      .required("ffasd"),
    // select: yup.required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { snackHandleClickVariant } = useContext(AlertComponentContext);
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

  const [array, setArray] = useState([]);
  // const [eqObject, setEqObject] = useState([]); //local array of equipment
  const [eq, setEq] = useState(""); //eq name
  const [eqQty, setEqQty] = useState(""); //eq auantity
  const [EqIdValue, setEqIdValue] = useState();
  const [eqLocalObject, setEqLocalObject] = useState(); //Locally retireve the equipment details and use to pass the object to the equipment object array
  const [numChips, setNumChips] = useState(0); // Initial number of chips
  const [isQtyGreaterThanOne, setIsQtyEqualsOne] = useState(false);
  const [borrowedQty, setBorrowedQty] = useState();

  const handleSearch = async (value) => {
    try {
      const res = await axios.get(
        `http://localhost:8085/getEquipmentbyID/${value}`
      );
      if (res.data[0] == undefined) setEq(""); //if the retrieved value is undefined, set the eq name phrase to ""
      // setEqObject(res.data[0]); //assign data to the local variable

      res.data[0].eq_quantity === 1
        ? setIsQtyEqualsOne(true)
        : setIsQtyEqualsOne(false);

      console.log("After retrieval", res.data[0]);
      setEqLocalObject(res.data[0]); //pass the current search full details about the equipment to the context "eqArray"
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

  // const handleAddEquipment = (EqIdValue, eqQty,eqArray) => {
  //   //Makt the eq id integer .Default value is a string
  //   let newValue = parseInt(EqIdValue);
  //   //set equipment full details and eq quantity for invoice rightside auto fill paper
  //   // setEqArray((prev)=>{
  //   //   const updatedArray=[
  //   //     ...prev,
  //   //     {
  //   //       array,
  //   //       eqQty:eqQty
  //   //     }
  //   //   ];
  //   //   console.log("new eq object",updatedArray)
  //   //   return updatedArray;
  //   // })
  //   //create a new array and add each items (id and borrowed qty ) as a new value
  //   // setEqArray((prev) => {
  //   //   const updatedEqObject = [
  //   //     ...prev,
  //   //     {
  //   //       borrowedQty:eqQ
  //   //     }

  //   //   ];
  //   //   updateValue("eqArray", updatedEqObject);//Push values to the invoice object
  //   //   console.log("This is the equipment objectttttt", updatedEqObject);
  //   //   return updatedEqObject;
  //   // });

  //   // Create a new object with equipment details
  //   const newEquipment = {
  //     id: newValue,
  //     borrowedQty: eqQty
  //   };
  //   // Update the eqArray with the new equipment object
  //   setEqArray((prevEqArray) => [...prevEqArray, newEquipment]);

  //   //incrementing the number of chips
  //   // setNumChips((prevNumChips) => prevNumChips + 1);
  // };

  const handleAddEquipment = (EqIdValue, eqQty, eqObject) => {
    eqObject.Qty = eqQty;
    updateEqObject(eqObject);
  };

  const handleRemoveEquipment = (eqObject, EqIdValue) => {
    setResponseManageToogle(!responseManageToogle)
    let obj = eqObject;
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].eq_id == EqIdValue) {
        obj.splice([i], [1]);
        console.log("inside the remove", obj);
      }
    }
    console.log("outside the remove", obj);
    setEqObject(obj);
    // const updatedEqObject = eqObject.filter((item) => item.id !== EqIdValue);
    // // Update the state with the filtered array
    // setEqObject(updatedEqObject);
    // // Also, update the invoice object if necessary
    // updateValue("eqArray", updatedEqObject);
  };
  useEffect(() => {
    console.log("changed", eqObject);
  }, [eqObject]);
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          p: 3,
          borderRadius: 3,
          height: "100%",
        }}
      >
        <form
          style={{ width: "100%" }}
          noValidate
          onSubmit={handleSubmit(() => handleSearch(EqIdValue))}
        >
          <Box sx={{ width: "100%", height: "100%" }}>
            <Typography sx={{ textAlign: "center" }} variant="h6">
              Add | Remove | Handover Form
            </Typography>
            <hr />
            <Box
              gap={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "60%",
                width: "100%",
                gap: 4,
              }}
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
                <Box
                  sx={{ width: "60%", display: "flex", alignItems: "center" }}
                >
                  <TextField
                    onChange={(e) => {
                      const value = e.target.value;
                      setEqIdValue(value);
                    }}
                    sx={{ width: "70%" }}
                    inputProps={{ ...register("eqid") }}
                    id="outlined-basic"
                    label="Search"
                    type="number"
                    variant="outlined"
                    error={!!errors.eqid}
                    helperText={errors.eqid?.message}
                  />
                  <IconButton type="submit">
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
                    fullWidth
                    disabled={isQtyGreaterThanOne}
                    id="standard-basic"
                    // label="Enter quantity"
                    variant="outlined"
                    value={eqQty}
                    onChange={(e) => setBorrowedQty(e.target.value)}
                  />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", p: 3 }}
            >
              <Button
                onClick={() =>
                  handleAddEquipment(EqIdValue, eqQty, eqLocalObject)
                }
              >
                Add
              </Button>
              <Button
                onClick={() => {
                  handleRemoveEquipment(eqObject, EqIdValue);
                }}
              >
                Remove
              </Button>
              <Button>Handover</Button>
            </Box>

            {/* <Stack direction="row" spacing={1}>
              {/* Render the number of chips based on the state *
              {Array.from({ length: numChips }, (_, index) => (
                <Chip
                  key={index}
                  label={`${eqObject[eqObject.length - 1 - index].id}  `}
                  color={"primary"}
                  variant="outlined"
                />
              ))}
            </Stack> */}
          </Box>
        </form>
      </Paper>
      {/* ID card component */}
      {/* <IdCardStatus/> */}
    </>
  );
}

export default InvoiceRightSide;
