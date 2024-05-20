import {
  Box,
  Paper,
  Typography,
  FormLabel,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  AlertComponentContext,
  InvoiceContext,
} from "../../../Contexts/Contexts.jsx";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const schema = yup.object().shape({
  eqid: yup
    .number()
    .typeError("Equipment ID required")
    .min(1, "The equipment ID must be at least 1")
    .max(200, "The equipment ID must be at most 200")
    .required("Equipment ID is required"),
});

export default function InvoiceRightSide() {
  const [eqDetails, setEqDetails] = useState({});
  const [eqName, setEqName] = useState();
  const [eqQty, setEqQty] = useState();
  const [total, setTotal] = useState();
  const [addBtnDisabled, setAddBtnDisabled] = useState(false);
  const [qtyBtnDisabled, setQtyBtnDisabled] = useState(true);
  const [eqBorrowQty, setEqBorrowQty] = useState(1);
  const eqBorrowQuantity = useRef();

  useEffect(() => {
    console.log("eqQty", eqQty, "eqBorrow", eqBorrowQty);
  }, [eqQty, eqBorrowQty]);
  const validationSchema = yup.object().shape({
    quantity: yup
      .number()
      .typeError("Equipment quantity must be a number")
      .min(1),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {
    responseManageToogle,
    setResponseManageToogle,
    eqObject,
    setEqObject,
    updateEqObject,
  } = useContext(InvoiceContext);

  const handleAddEquipment = () => {
    setTotal((prev) => prev + eqDetails.eq_rental * eqQty);
    updateEqObject({ ...eqDetails, Qty: eqQty });
    setAddBtnDisabled(true);
  };

  const onSubmit = () => {
    updateEqObject({ ...eqDetails, Qty: eqBorrowQuantity.current.value });
    setAddBtnDisabled(true);
  };
  const handleReset = () => {
    setEqName("");
    setEqQty("");
    setEqObject([]);
  };
  useEffect(() => {
    console.log("Changed equipment object", eqObject);
  }, [eqObject]);

  return (
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
      <Stack width={"100%"} gap={0}>
        <Typography>Equipment Form</Typography>
        <hr />
        <Box display="flex" alignItems="start">
          <EquipmentIdSearch
            setQtyBtnDisabled={setQtyBtnDisabled}
            eqDetails={eqDetails}
            setEqDetails={setEqDetails}
            setEqQty={setEqQty}
            setAddBtnDisabled={setAddBtnDisabled}
            setEqName={setEqName}
            setEqBorrowQty={setEqBorrowQty}
            eqBorrowQuantity={eqBorrowQuantity}
          />
        </Box>
        <Box display="flex" alignItems="start">
          <FormLabel sx={{ width: "30%", pt: 2 }}>Name</FormLabel>
          <TextField
            disabled={true}
            sx={{ flexGrow: 1, height: "100px" }}
            value={eqName || ""}
            helperText=""
          />
        </Box>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Box display={"flex"} justifyContent={"center"}>
            <Typography variant="caption">
              <InfoOutlinedIcon fontSize="2" sx={{ mr: 1 }} />
              Stock remaining : {eqQty}
            </Typography>
          </Box>
          <Box display="flex" alignItems="start">
            <FormLabel sx={{ width: "30%", pt: 2 }}>Qty</FormLabel>
            <TextField
              disabled={eqQty === 0 || addBtnDisabled || eqQty === 1}
              sx={{ flexGrow: 1, height: "100px" }}
              type="number"
              onChange={(e) => {
                console.log("eqval",eqQty)
                if (eqQty == 1) {
                  eqBorrowQuantity.current = 1;
                } else {
                  eqBorrowQuantity.current.value = e.target.value;
                }
              }}
              inputRef={(eqBorrowQuantity)}
              inputProps={{ ...register("quantity") }}
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
            />
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            pt={3}
          >
            <Button
              disabled={addBtnDisabled}
              variant="contained"
              customvariant="custom"
              type="submit"
            >
              Add
            </Button>

            <Button variant="contained" color="warning" customvariant="custom">
              Handover
            </Button>
            <Button
              variant="contained"
              color="error"
              customvariant="custom"
              onClick={handleReset}
            >
              Clear
            </Button>
          </Box>
        </form>
      </Stack>
    </Paper>
  );
}

export function EquipmentIdSearch(props) {
  const {
    eqDetails,
    setEqDetails,
    setEqQty,
    setAddBtnDisabled,
    setEqName,
    setQtyBtnDisabled,
    setEqBorrowQty,
    eqBorrowQuantity
  } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // Resetting state variables
    setEqBorrowQty(0);
    setQtyBtnDisabled(false);
    setEqName("");
    setEqQty("");
    setAddBtnDisabled(false);
  
    try {
      // Fetching equipment details by ID
      const res = await axios.get(
        `http://localhost:8085/getEquipmentbyID/${data.eqid}`
      );
  
      const equipment = res.data[0];
      console.log(res.data[0]);
  
      if (res.data.length > 0) {
        // Setting state variables with fetched data
        setEqQty(equipment.eq_available_quantity);
        setEqName(equipment.eq_name);
        eqBorrowQuantity.current.value = equipment.eq_available_quantity; // Setting ref value
        setEqDetails(equipment);
  
        // Additional logic for quantity
        if (equipment.eq_available_quantity == 1) setEqBorrowQty(1);
      }
    } catch (error) {
      // Error handling
      console.error("Error occurred while searching by ID:", error);
    }
  };
  

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FormLabel sx={{ width: "32.5%" }}>Equipment Id</FormLabel>
      <TextField
        sx={{ width: "40%", height: "100px" }}
        inputProps={{ ...register("eqid") }}
        label="Search"
        type="number"
        variant="outlined"
        error={!!errors.eqid}
        helperText={errors.eqid?.message}
      />
      <Button sx={{ pt: 2 }} type="submit">
        <SearchIcon />
      </Button>
    </form>
  );
}
