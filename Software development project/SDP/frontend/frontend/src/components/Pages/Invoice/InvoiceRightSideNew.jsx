import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";

function InvoiceRightSideNew() {
  const [idFormData, setIdFormData] = useState({
    id: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
  });
  const [idErrors, setIdErrors] = useState({});

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

  const handleSubmitId = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!idFormData.id.trim()) {
      validationErrors.id = "ID is required";
    } else if (!/^\d+$/.test(idFormData.id.trim())) {
      validationErrors.id = "ID should be a number";
    }
    setIdErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      // Proceed with submission or any other action
      console.log(idFormData);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!idFormData.id.trim()) {
      validationErrors.id = "Id is required";
    }
    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!formData.quantity.trim()) {
      validationErrors.quantity = "Quantity is required";
    } else if (!/^\d+$/.test(formData.quantity.trim())) {
      validationErrors.quantity = "Quantity should be a number";
    }
    setIdErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Submit Form submitted successfully");
      console.log(formData);
      
      // You can perform any other action here, such as API calls
    }
  };

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <form noValidate onSubmit={handleSubmitId}>
        <TextField label="ID" name="id" type="text" onChange={handleIdChange} />
        {idErrors.id && <span>{idErrors.id}</span>}
        <Button type="submit">ID Form</Button>
      </form>

      <form noValidate onSubmit={handleSubmit}>
        <Stack>
          <TextField
            label="Name"
            name="name"
            type="text"
            onChange={handleChange}
          />
          {!idErrors.id && idErrors.name && <span>{idErrors.name}</span>}
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            onChange={handleChange}
          />
          {!idErrors.id && idErrors.quantity && (
            <span>{idErrors.quantity}</span>
          )}
          <Button type="submit">Submit Form</Button>
        </Stack>
      </form>
    </Box>
  );
}

export default InvoiceRightSideNew;
