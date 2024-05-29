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
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
import MousePopOver from "../../SubComponents/AlertComponents/MousePopOver";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function InvoiceRightSideNew() {
  const [idFormData, setIdFormData] = useState({
    id: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
  });
  const [idErrors, setIdErrors] = useState({});
  const [eqErrors, setEqErrors] = useState({});
  const [eqQuantity, setEqQuantity] = useState(0);
  const [eqName, setEqName] = useState("");
  const [eqFullDetail, setEqFullDetail] = useState("");
  const [addButtonDisable, setAddButtonDisable] = useState(false);
  const [stockTextColor, setStockTextColor] = useState("black");

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
    setIdErrors({});
    setEqErrors({});
    setStockTextColor("black");
    setEqName("");
    setEqQuantity("");
    setEqObject([]);
    setFormData({ name: "", quantity: "" });
  };

  const handleSubmitId = async (e) => {
    setEqErrors({});
    e.preventDefault();
    const validationErrors = {};

    if (!idFormData.id.trim()) {
      validationErrors.id = "ID is required";
    } else if (!/^\d+$/.test(idFormData.id.trim())) {
      validationErrors.id = "ID should be a number";
    }
    setIdErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Fetching equipment details by ID
        const res = await axios.get(
          `http://localhost:8085/getEquipmentbyID/${idFormData.id}`
        );

        const equipment = res.data[0];
        if (res.data.length > 0) {
          // Setting state variables with fetched data
          setEqQuantity(
            equipment.eq_completestock - equipment.eq_defected_status
          );
          setEqName(equipment.eq_name);
          setEqFullDetail(equipment);
          setAddButtonDisable(false);
        } else {
          setEqName("");
          setEqQuantity(0);
        }
      } catch (error) {
        // Error handling
        console.error("Error occurred while searching by ID:", error);
      }
    }
  };

  useEffect(() => {
    if (formData.quantity > eqQuantity) {
      setStockTextColor("red");
    } else {
      setStockTextColor("black");
    }
  }, [formData.quantity, eqQuantity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!idFormData.id.trim()) {
      validationErrors.id = "ID is required";
    }
    if (!eqName.trim()) {
      validationErrors.quantity = "Please search an equipment";
    } else if (!formData.quantity.trim()) {
      validationErrors.quantity = "Quantity is required";
    } else if (!/^\d+$/.test(formData.quantity.trim())) {
      validationErrors.quantity = "Quantity should be a number";
    } else if (parseInt(formData.quantity.trim(), 10) > eqQuantity) {
      validationErrors.quantity = "Quantity should not exceed the stock limit";
    } else if (formData.quantity <= 0) {
      validationErrors.quantity = "Quantity should be greater than zero";
    }
    setEqErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      updateEqObject({ ...eqFullDetail, inveq_borrowqty: formData.quantity });
      eqFullDetail.inveq_borrowqty = parseInt(formData.quantity);
      setAddButtonDisable(true);
      updateValue("eqdetails", eqFullDetail);
    }
  };

  return (
    <Paper
      sx={{ height: "581px", width: "100%", p: 4, borderRadius: 4 }}
      elevation={3}
    >
      <form noValidate onSubmit={handleSubmitId}>
        <Typography>Equipment Form</Typography>
        <hr />

        <Box sx={{ display: "flex", height: "80px" }}>
          <FormLabel
            sx={{
              pt: 2,
              pr: 2,
              width: "15%",
              display: "flex",
              justifyContent: "end",
            }}
            htmlFor="id"
          >
            ID
          </FormLabel>
          <TextField
            id="id"
            label="ID"
            name="id"
            type="text"
            onChange={handleIdChange}
            error={!!idErrors.id}
            helperText={idErrors.id && idErrors.id}
          />
          <Button
            sx={{ width: "20px", height: "57px" }}
            type="submit"
            onClick={() => {
              setEqName("");
              setEqQuantity("");
            }}
          >
            <YoutubeSearchedForIcon />
          </Button>
        </Box>
      </form>

      <form noValidate onSubmit={handleSubmit}>
        <Stack spacing={2} marginTop={2}>
          <Box sx={{ display: "flex", height: "80px" }}>
            <FormLabel
              sx={{
                pt: 2,
                pr: 2,
                width: "17%",
                display: "flex",
                justifyContent: "end",
              }}
              htmlFor="name"
            >
              Name
            </FormLabel>
            <TextField
              disabled={true}
              fullWidth
              id="name"
              label={eqName || "Name"}
              name="name"
              type="text"
              value={eqName}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ display: "flex", height: "80px" }}>
            <FormLabel
              sx={{
                pt: 2,
                pr: 2,
                width: "15%",
                display: "flex",
                justifyContent: "end",
              }}
              htmlFor="quantity"
            >
              Quantity
            </FormLabel>
            <TextField
              fullWidth
              disabled={addButtonDisable}
              id="quantity"
              label={["remaining : ", eqQuantity || "No equipment found"]}
              name="quantity"
              type="number"
              onChange={handleChange}
              error={!!eqErrors.quantity}
              helperText={eqErrors.quantity && eqErrors.quantity}
            />
          </Box>
          <Typography
            sx={{
              backgroundColor: (theme) => theme.palette.primary[50],
              p: 1.3,
              width: "180px",
              borderRadius: 3,
            }}
            variant="body2"
            color={stockTextColor}
            textAlign={"left"}
          >
            Remaining Stock: {eqQuantity}
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "space-evenly", pt: 2.5 }}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Button
                disabled={addButtonDisable}
                variant="contained"
                customvariant="custom"
                type="submit"
              >
                Add
              </Button>
              {addButtonDisable && (
                <MousePopOver
                  message={<InfoOutlinedIcon fontSize="2" sx={{borderRadius:2,border:"solid 1px" ,color:(theme)=>theme.palette.primary[200],transition:"1900 ease-in-out"}}/>}
                  popOverContent={`Search an equipment first`}
                />
              )}
            </Box>
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
