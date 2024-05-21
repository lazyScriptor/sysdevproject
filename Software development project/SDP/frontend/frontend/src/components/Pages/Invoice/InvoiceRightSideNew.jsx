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
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';

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
  const [addButtonDisable, setAddButtonDisable] = useState(false);

  const {
    responseManageToogle,
    setResponseManageToogle,
    eqObject,
    setEqObject,
    updateValue,
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
          setAddButtonDisable(false);
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
    } else if (parseInt(formData.quantity.trim(), 10) > eqQuantity) {
      validationErrors.quantity = "Quantity should not exceed the stock limit";
    } else if (formData.quantity <= 0) {
      validationErrors.quantity = "Quantity should be greater than zero";
      setIdErrors(validationErrors);
    }
    if (Object.keys(validationErrors).length === 0) {
      updateEqObject({ ...eqFullDetail, quantity: formData.quantity });
      eqFullDetail.quantity = parseInt(formData.quantity);
      setAddButtonDisable(true);
      updateValue("eqdetails", eqFullDetail);
    }
  };

  return (
    <Paper
      sx={{ height: "542px", width: "100%", p: 4, borderRadius: 4 }}
      elevation={3}
    >
      <form noValidate onSubmit={handleSubmitId}>
        <Typography>Equipment Form</Typography>
        <hr />

        <Box sx={{ display: "flex", height: "80px" }}>
          <FormLabel
            sx={{
              pt: 2,

              width: "30%",
              display: "flex",
            }}
            htmlFor="id"
          >
            ID
          </FormLabel>
          <TextField
            sx={{ }}
            id="id"
            label="ID"
            name="id"
            type="text"
            onChange={handleIdChange}
            helperText={idErrors.id && idErrors.id}
          />
          <Button
          sx={{width:"20px",height:"57px"}}
            type="submit"
            onClick={() => {
              setEqName("");
              setEqQuantity("");
            }}
          >
            <YoutubeSearchedForIcon/>
          </Button>
        </Box>
      </form>

      <form noValidate onSubmit={handleSubmit}>
        <Stack spacing={2} marginTop={2}>
          <Box sx={{ display: "flex", height: "80px" }}>
            <FormLabel
              sx={{
                pt: 2,

                width: "40%",
                display: "flex",
              }}
              htmlFor="name"
            >
              Name
            </FormLabel>
            <TextField
              disabled={true}
              fullWidth
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
                pt: 2,

                width: "40%",
                display: "flex",
              }}
              htmlFor="quantity"
            >
              Quantity
            </FormLabel>
            <TextField
              fullWidth
              id="quantity"
              label="Enter quantity"
              name="quantity"
              type="number"
              onChange={handleChange}
              helperText={idErrors.quantity && idErrors.quantity}
            />
          </Box>
          <Typography textAlign={"left"}>
            Remaining Stock: {eqQuantity}
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "space-evenly", pt: 2.5 }}
          >
            <Button
              disabled={addButtonDisable}
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
        </Stack>
      </form>
    </Paper>
  );
}

export default InvoiceRightSideNew;
