import React, { useEffect, useState, useContext, createContext } from "react";
import {
  FormControl,
  FormLabel,
  TextField,
  Box,
  Button,
  Grid,
} from "@mui/material";
import { PopupContext } from "../../Contexts/Contexts";
import axios from "axios";
import { useSnackbar } from "notistack";
import Snack from "./Snack";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import "../Stylings/rootstyles.css";
import "../Stylings/newCustomerForm.css";

export const AppCustomeContext3 = createContext();



const schema = yup.object().shape({
  fname: yup.string().required().min(3).max(15),
  lname: yup.string().min(3).required().max(15),
  nic: yup
    .string()
    .required()
    .transform((value) => value.trim())
    .test(
      "is-valid-nic",
      "Please enter a valid NIC number",
      (value) => {
        if (!value) return false;
        const nineDigitsAndV = /^[0-9]{9}v$/i;
        const twelveDigits = /^[0-9]{12}$/;
        return nineDigitsAndV.test(value) || twelveDigits.test(value);
      }
    ),
  phoneNumber: yup
    .string()
    .required()
    .transform((value) => value.replace(/[-\s]/g, '').trim())
    .test(
      'is-valid-phonenumber',
      "Please enter a valid phone number",
      (value) => {
        if (!value) return false;
        const tendigitcheck = /^[0-9]{9,}$/;
        const validFormatCheck = /^(\d{3})?(\d{3})(\d{3,4})$/;
        return tendigitcheck.test(value) && validFormatCheck.test(value);
      }
    ),
  address1: yup.string().required().min(5),
  address2: yup.string().min(3),
});



function NewCustomerForm(props) {
  const { cus_id } = props;
  const { userData, setUserData } = useContext(PopupContext);
  const [newId, setNewId] = useState("");
  const [newNic, setNewNic] = useState("");
  const [newPno, setNewPno] = useState("");

 

  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, "");

    // Format the phone number
    const match = cleaned.match(/(\d{1,3})(\d{1,4})?(\d{1,4})?/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join("-");
    }
    return value;
  };

  const { register, handleSubmit, formState: { errors }, setValue, trigger } = useForm({
    resolver: yupResolver(schema)
  });
  const [customer, setCustomer] = useState({
    fname: 'John',
    lname: 'Doe',
    nic: '123456789v',
    phoneNumber: '0123456789',
    address1: '123 Main St',
    address2: 'Apt 4'
  });
  useEffect(() => {
    // Set initial values and trigger validation
    for (const field in customer) {
      setValue(field, customer[field]);
    }
    trigger();
  }, [customer, setValue, trigger]);

  const onSubmit = async(data) => {
    console.log("This is data", data);
    try {
      const response = await axios.post(
        "http://localhost:8085/updateCustomerDetails",
        data
      );
      console.log("Details saved successfully:", response.data);
      setToogle(true);
    } catch (error) {
      console.error("Error saving details:", error);
    }
  };

  const [toogle, setToogle] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  //check this use effect weather essential or not

  useEffect(() => {
    if (userData) {
      setCustomer({
        id: userData.cus_id,
        nic: userData.nic,
        phoneNumber: userData.cus_phone_number,
        fname: userData.cus_fname,
        lname: userData.cus_lname,
        address1: userData.cus_address1,
        address2: userData.cus_address2,
      });
    }
  }, [userData]);

  const handleToogleStatus = () => {
    setToogle(!toogle);
  };

  const handleSaveDetails = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8085/updateCustomerDetails",
        customer
      );
      console.log("Details saved successfully:", response.data);
      setToogle(true);
    } catch (error) {
      console.error("Error saving details:", error);
    }
  };

  const handleDeleteCustomer = async (id, variant, fname) => {
    try {
      await axios
        .delete(`http://localhost:8085/deleteCustomers/${id}`)
        .then(() => {
          console.log("Frontend executed successfully");
          enqueueSnackbar(`Customer : ${fname} deleted successfully`, {
            variant,
          });
        });
    } catch (error) {
      console.error("Frontend error occurred", error);
    }
  };

  const handleDataFill = (firstCustomer) => {
    setCustomer({
      id: firstCustomer.cus_id,
      nic: firstCustomer.nic,
      phoneNumber: firstCustomer.cus_phone_number,
      fname: firstCustomer.cus_fname,
      lname: firstCustomer.cus_lname,
      address1: firstCustomer.cus_address1,
      address2: firstCustomer.cus_address2,
    });
    console.log("Customer found");
    enqueueSnackbar("Customer found", { variant: "success" });
  };

  const handleSearchnic = async (nic) => {
    try {
      const res = await axios.get(
        `http://localhost:8085/getCustomerbyNIC/${nic}`
      );
      const customerData = res.data;
      if (customerData && customerData.length > 0) {
        handleDataFill(customerData[0]);
      } else {
        console.log("No customer data found");
      }
    } catch (error) {
      console.log("handleSearch NIC error");
    }
  };

  const handleSearchid = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8085/getCustomerbyID/${id}`
      );
      const customerData = res.data;
      if (customerData && customerData.length > 0) {
        handleDataFill(customerData[0]);
      } else {
        console.log("No customer data found");
      }
    } catch (error) {
      console.log("handleSearch ID error");
    }
  };

  const handleSearchPno = async (phoneNumber) => {
    try {
      const res = await axios.get(
        `http://localhost:8085/getCustomerbyPhoneNumber/${phoneNumber}`
      );
      const customerData = res.data;
      if (customerData && customerData.length > 0) {
        handleDataFill(customerData[0]);
      } else {
        console.log("No customer data found");
      }
    } catch (error) {
      console.log("handleSearch Phone Number error");
    }
  };

  // const handleCreate = async () => {
  //   try {
  //     await axios.post('http://localhost:8085/createCustomer', customer);
  //     console.log('Details created successfully:');
  //     setToogle(true);
  //   } catch (error) {
  //     console.error('Error creating details:', error);
  //   }
  // };

    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    handleSearchid(cus_id);

  }, [cus_id]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "auto",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <Box
          sx={{
            p: 2,
            mb: 2,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
              disabled={true}
              id="customer-id"
              name="id"
              label="customer id"
              variant="outlined"
              size="small"
              sx={{ width: "10%", mb: 2, ml: 2 }}
              value={customer.id}
            />
            <Grid container spacing={2}>
              {/* Left side Box */}
              <Grid item xs={6}>
                <FormControl sx={{ gap: "20px", width: "100%" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box className="dey">
                        <TextField
                          disabled={toogle}
                          id="customer-fname"
                          name="fname"
                          variant="outlined"
                          inputProps={{ ...register("fname") }}
                          error={!!errors.fname}
                          helperText={errors.fname?.message}
                          size="small"
                          label="first name"
                          sx={{ width: "100%" }}
                          value={customer.fname}
                          onChange={handleInputChange}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box className="dey">
                        <TextField
                          disabled={toogle}
                          id="customer-lname"
                          name="lname"
                          label="last name"
                          inputProps={{ ...register("lname") }}
                          error={!!errors.lname}
                          helperText={errors.lname?.message}
                          variant="outlined"
                          size="small"
                          sx={{ width: "100%" }}
                          value={customer.lname}
                          onChange={handleInputChange}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box className="dey">
                        <TextField
                          disabled={toogle}
                          id="customer-nic"
                          name="nic"
                          label="national ID card number"
                          inputProps={{ ...register("nic") }}
                          error={!!errors.nic}
                          helperText={errors.nic?.message}
                          variant="outlined"
                          size="small"
                          sx={{ width: "100%" }}
                          value={customer.nic}
                          onChange={handleInputChange}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box className="dey">
                        <TextField
                          disabled={toogle}
                          id="customer-phoneNumber"
                          label="phone number"
                          name="phoneNumber"
                          inputProps={{ ...register("phoneNumber") }}
                          error={!!errors.phoneNumber}
                          helperText={errors.phoneNumber?.message}
                          variant="outlined"
                          size="small"
                          sx={{ width: "100%" }}
                          value={customer.phoneNumber}
                          onChange={handleInputChange}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>

              {/* Right side Box */}
              <Grid item xs={6}>
                <FormControl sx={{ gap: "20px", width: "100%" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box className="dey">
                        <TextField
                          disabled={toogle}
                          id="customer-address1"
                          name="address1"
                          inputProps={{ ...register("address1") }}
                          error={!!errors.address1}
                          helperText={errors.address1?.message}
                          label="address line1"
                          variant="outlined"
                          size="small"
                          sx={{ width: "100%" }}
                          value={customer.address1}
                          onChange={handleInputChange}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box className="dey">
                        <TextField
                          disabled={toogle}
                          id="customer-address2"
                          name="address2"
                          inputProps={{ ...register("address2") }}
                          error={!!errors.address2}
                          helperText={errors.address2?.message}
                          label="address line2"
                          variant="outlined"
                          size="small"
                          sx={{ width: "100%" }}
                          value={customer.address2}
                          onChange={handleInputChange}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>
            {/* Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Box sx={{ display: "flex", gap: "20px" }}>
                <Button
                  onClick={() =>
                    handleDeleteCustomer(customer.id, "success", customer.fname)
                  }
                  customvariant="custom"
                  color="error"
                  variant="contained"
                >
                  Delete
                </Button>
                <Button
                  // onClick={handleSaveDetails}
                  variant="contained"
                  type="submit"
                  customvariant="custom"
                  color="success"
                >
                  Save
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
      <Snack />
    </>
  );
}

export default NewCustomerForm;
