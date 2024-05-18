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
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  AlertComponentContext,
  InvoiceContext,
} from "../../../Contexts/Contexts.jsx";
import SearchIcon from "@mui/icons-material/Search";

const schema = yup.object().shape({
  eqid: yup
    .number()
    .typeError("Equipment ID must be a number")
    .min(1, "The equipment ID must be at least 1")
    .max(200, "The equipment ID must be at most 200")
    .required("Equipment ID is required"),
});

export default function InvoiceRightSide() {
  const validationSchema = yup.object().shape({
    quantity: yup
      .number()
      .required("Quantity is required")
      .min(0, "Quantity must be greater than or equal to 0")
      .max(`Quantity cannot exceed `), // Dynamic validation
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = () => {};
  const {
    responseManageToogle,
    setResponseManageToogle,
    eqObject,
    setEqObject,
    updateEqObject,
  } = useContext(InvoiceContext);

  const [eqDetails, setEqDetails] = useState({});
  const [eqQty, setEqQty] = useState(0);
  const [total, setTotal] = useState(0);
  const [addBtnDisabled, setAddBtnDisabled] = useState(false);

  const handleAddEquipment = () => {
    setTotal((prev) => prev + eqDetails.eq_rental * eqQty);
    updateEqObject({ ...eqDetails, Qty: eqQty });
    setAddBtnDisabled(true);
  };

  const handleRemoveEquipment = () => {
    setResponseManageToogle(!responseManageToogle);
    const updatedEqObject = eqObject.filter(
      (item) => item.eq_id !== eqDetails.eq_id
    );
    setEqObject(updatedEqObject);
  };

  useEffect(() => {
    console.log("Total is", total);
  }, [total]);

  useEffect(() => {
    console.log("Changed equipment object", eqObject);
  }, [eqObject]);

  const Buttonstyles = {
    width: "100px",
    height: "80px",
    color: "primary",
    border: "solid 1px",
    borderRadius: 4,
    opacity: 0.8,
  };
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
          <FormLabel sx={{ width: "30%" }}>Equipment Name</FormLabel>
          <TextField sx={{ flexGrow: 1, height: "100px" }} helperText="" />
          <Button>
            <SearchIcon />
          </Button>
        </Box>
        <Box display="flex" alignItems="start">
          <FormLabel sx={{ width: "30%" }}>Equipment Name</FormLabel>
          <TextField sx={{ flexGrow: 1, height: "100px" }} helperText="" />
        </Box>
        <Box display="flex" alignItems="start">
          <FormLabel sx={{ width: "30%" }}>Equipment Name</FormLabel>
          <TextField sx={{ flexGrow: 1, height: "100px" }} helperText="" />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          pt={3}
        >
          <Button variant="contained" sx={Buttonstyles}>
            Add
          </Button>
          <Button variant="contained" color="warning" sx={Buttonstyles}>
            Handover
          </Button>
          <Button variant="contained" color="error" sx={Buttonstyles}>
            Remove
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}

// function EquipmentIdSearch({ setEqDetails, setEqQty }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:8085/getEquipmentbyID/${data.eqid}`
//       );
//       const equipment = res.data[0];
//       setEqDetails(equipment);
//       setEqQty(equipment.eq_quantity);
//     } catch (error) {
//       console.error("Error occurred while searching by ID:", error);
//     }
//   };

//   return (
//     <form noValidate onSubmit={handleSubmit(onSubmit)}>
//       <TextField
//         sx={{ width: "60%", height: "100px" }}
//         inputProps={{ ...register("eqid") }}
//         label="Search"
//         type="number"
//         variant="outlined"
//         error={!!errors.eqid}
//         helperText={errors.eqid?.message}
//       />
//       <Button sx={{ pt: 2 }} type="submit">
//         <SearchIcon />
//       </Button>
//     </form>
//   );
// }

// export default InvoiceRightSide;
