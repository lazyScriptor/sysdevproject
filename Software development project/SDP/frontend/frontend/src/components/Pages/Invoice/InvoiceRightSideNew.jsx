import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import axios from "axios";
import { InvoiceContext } from "../../../Contexts/Contexts";

function InvoiceRightSideNew() {
  const [idFormData, setIdFormData] = useState({
    id: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
  });
  const [idErrors, setIdErrors] = useState({});
  const [eqQuantity, setEqQuantity] = useState(0);
  const [eqName, setEqName] = useState("");
  const [eqFullDetail, setEqFullDetail] = useState("");

  const {
    responseManageToogle,
    setResponseManageToogle,
    eqObject,
    setEqObject,
    updateEqObject,
  } = useContext(InvoiceContext);

  const handleIdChange = (e) => {
    const { name, value } = e.target;
    setIdFormData({
      ...idFormData,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReset = () => {
    setEqName("");
    setEqQuantity("");
    setEqObject([]);
  };

  const handleSubmitId = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!idFormData.id.trim()) {
      validationErrors.id = "ID is required";
    } else if (!/^\d+$/.test(idFormData.id.trim())) {
      validationErrors.id = "ID should be a number";
    }
    setIdErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log(idFormData);
      try {
        // Fetching equipment details by ID
        const res = await axios.get(
          `http://localhost:8085/getEquipmentbyID/${idFormData.id}`
        );

        const equipment = res.data[0];
        console.log(res.data[0]);

        if (res.data.length > 0) {
          // Setting state variables with fetched data
          setEqQuantity(equipment.eq_available_quantity);
          setEqName(equipment.eq_name);
          setEqFullDetail(equipment);
        }
      } catch (error) {
        // Error handling
        console.error("Error occurred while searching by ID:", error);
      }
    }
  };

  useEffect(() => {
    console.log("Eqobj", eqObject);
  }, [eqObject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!idFormData.id.trim()) {
      validationErrors.id = "Id is required";
    }
    if (!formData.quantity.trim()) {
      validationErrors.quantity = "Quantity is required";
    } else if (!/^\d+$/.test(formData.quantity.trim())) {
      validationErrors.quantity = "Quantity should be a number";
    }
    setIdErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Submit Form submitted successfully");

      updateEqObject({ ...eqFullDetail, quantity: formData.quantity });
    }
  };

  return (
    <Paper sx={{ height: "542px", width: "100%", p: 2, borderRadius: 4 }} elevation={3}>
      <form noValidate onSubmit={handleSubmitId}>
        <Typography>Equipment Form</Typography>
        <hr />

        <Box sx={{ display: "flex", height: "80px" }}>
          <FormLabel
            sx={{
              textAlign: "center",
              width: "20%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            htmlFor="id"
          >
            ID
          </FormLabel>
          <TextField
            sx={{ width: "50%" }}
            id="id"
            label="ID"
            name="id" 
            type="text"
            onChange={handleIdChange}
            helperText={idErrors.id && idErrors.id}
          />
          <Button type="submit">ID Form</Button>
        </Box>
      </form>

      <form noValidate onSubmit={handleSubmit}>
        <Stack spacing={2} marginTop={2}>
          <Box sx={{ display: "flex" }}>
            <FormLabel
              sx={{
                textAlign: "center",
                width: "20%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              htmlFor="name"
            >
              Name
            </FormLabel>
            <TextField
              id="name"
              label={eqName}
              name="name"
              type="text"
              onChange={handleChange}
            />
            {!idErrors.id && <span>{idErrors.name}</span>}
          </Box>
          <Box sx={{ display: "flex", height: "80px" }}>
            <FormLabel
              sx={{
                textAlign: "center",
                width: "20%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              htmlFor="quantity"
            >
              Quantity
            </FormLabel>
            <TextField
              id="quantity"
              label={eqQuantity}
              name="quantity"
              type="number"
              onChange={handleChange}
              helperText={idErrors.quantity && idErrors.quantity}
            />
          </Box>
          <Typography textAlign={"left"}>
            Remaining Stock: {eqQuantity}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-evenly", pt: 7 }}>
            <Button variant="contained" customvariant="custom" type="submit">
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
        </Stack>
      </form>
    </Paper>
  );
}

export default InvoiceRightSideNew;
