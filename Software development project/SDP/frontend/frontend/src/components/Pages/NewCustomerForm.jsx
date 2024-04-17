import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormLabel,
  FormHelperText,
  TextField,
  Box,
  Paper,
  Button,
  colors,
} from "@mui/material";
import "../Stylings/rootstyles.css";
import { useEffect, useState } from "react";

import "../Stylings/newCustomerForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Snack from "./Snack";

function NewCustomerForm() {
  const [data, setData] = useState([]);
  const [newId, setNewId] = useState("");
  const [newNic, setNewNic] = useState("");
  const [newPno, setNewPno] = useState("");

  const [id, setId] = useState("");
  const [nic, setNic] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  //Snackbar content
  const [messageContent, SetMessageContent] = useState();
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //snackbar content is over

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8085/customers");
        setData(response.data);
        console.log("data loaded", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Search bar functions
  //Set these 3 values to a new variable insted of using the same variable using to retrieve the input data
  //because when we enter data to search ID in the search ID field it will be automaticcaly
  //autofill the CustomerID field with the onChange function .To avoid that we have used seperate variables

  const handleOnChangeIdOnlyForSearching = (e) => {
    const enteredText = e.target.value;
    setNewId(enteredText);
  };
  const handleOnChangeNicOnlyForSearching = (e) => {
    const enteredText = e.target.value;
    setNewNic(enteredText);
  };
  const handleOnChangePnoOnlyforSearching = (e) => {
    const enteredText = e.target.value;
    setNewPno(enteredText);
  };
  //Searchbar functions over

  const handleSearchnic = () => {
    try {
      const selectedUserData = data.find((user) => user.nic == newNic);
      if (selectedUserData) {
        
        setId(selectedUserData.cus_id);
        setNic(selectedUserData.nic);
        setPhoneNumber(selectedUserData.cus_phone_number);
        setFname(selectedUserData.cus_fname);
        setLname(selectedUserData.cus_lname);
        setAddress1(selectedUserData.cus_address1);
        setAddress2(selectedUserData.cus_address2);

        console.log("Customer found");
        setMessage("success");
        SetMessageContent("Customer found");
        setOpen(true);
      } else {
        console.error("Customer not found");
        setMessage("error");
        SetMessageContent("Customer with this NIC not found");
        setOpen(true);
      }
    } catch (error) {
      // Handle any other errors that may occur
      console.error("Error searching for user by NIC:", error);
    }
  };

  const handleSearchid = () => {
    try {
      const selectedUserData = data.find((user) => user.cus_id == newId);
      if (selectedUserData) {
        
        setId(selectedUserData.cus_id);
        setNic(selectedUserData.nic);
        setPhoneNumber(selectedUserData.cus_phone_number);
        setFname(selectedUserData.cus_fname);
        setLname(selectedUserData.cus_lname);
        setAddress1(selectedUserData.cus_address1);
        setAddress2(selectedUserData.cus_address2);

        console.log("Customer found");
        setMessage("success");
        SetMessageContent("Customer found");
        setOpen(true);
      } else {
        console.error("Customer not found");
        setMessage("error");
        SetMessageContent("Customer with this ID not found");
        setOpen(true);
      }
    } catch (error) {
      // Handle any other errors that may occur
      console.error("Error searching for user by ID:", error);
    }
  };

  const handleSearchPno = () => {
    try {
      const selectedUserData = data.find(
        (user) => user.cus_phone_number == newPno
      );
      if (selectedUserData) {
        
        setId(selectedUserData.cus_id);
        setNic(selectedUserData.nic);
        setPhoneNumber(selectedUserData.cus_phone_number);
        setFname(selectedUserData.cus_fname);
        setLname(selectedUserData.cus_lname);
        setAddress1(selectedUserData.cus_address1);
        setAddress2(selectedUserData.cus_address2);

        console.log("Customer found");
        setMessage("success");
        SetMessageContent("Customer found");
        setOpen(true);
      } else {
        console.error("Customer not found");
        setMessage("error");
        SetMessageContent("Customer with this Phone Number not found");
        setOpen(true);
      }
    } catch (error) {
      // Handle any other errors that may occur
      console.error("Error searching for user by Phone Number:", error);
    }
  };

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
        <Paper
          elevation={4}
          sx={{
            width: "50%",
            p: 1,
            mb: 2,
            mt: 2,
            borderRadius: 3,
            gap: "20px",
            minWidth: "500px",
            backgroundColor: (theme) => theme.palette.primary,
          }}
        >
          <Box
            sx={{
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              backgroundColor: (theme) => theme.palette.primary[50],
              color: "white",
              borderRadius: 3,
              mb:3,
            }}
          >
            <h1>Client Details</h1>
            <p>We'll never share your email.</p>
          </Box>

          <Box
            sx={{
              height: "70px",
              borderRadius: 3,
              backgroundColor: (theme) => theme.palette.primary[50],
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                height: "50px",
                width: "30%",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pl: 2,
              }}
            >
              <TextField
                id="standard-search"
                variant="standard"
                label="Search by ID"
                type="search"
                size="small"
                onChange={handleOnChangeIdOnlyForSearching}
              />
              <Button
                onClick={handleSearchid}
                sx={{
                  pt: 2,
                  "&:hover": {
                    color: "green",
                  },
                }}
              >
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Box>
            <Box
              sx={{
                height: "50px",
                width: "30%",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pl: 2,
              }}
            >
              <TextField
                id="standard-search"
                variant="standard"
                label="Search by NIC"
                type="search"
                size="small"
                onChange={handleOnChangeNicOnlyForSearching}
              />
              <Button
                onClick={handleSearchnic}
                sx={{
                  pt: 2,
                  "&:hover": {
                    color: "green",
                  },
                }}
              >
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Box>
            <Box
              sx={{
                height: "50px",
                width: "40%",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                id="standard-search"
                variant="standard"
                label="Search by Phone number"
                type="search"
                size="small"
                onChange={handleOnChangePnoOnlyforSearching}
              />
              <Button
                onClick={handleSearchPno}
                sx={{
                  pt: 2,
                  "&:hover": {
                    color: "green",
                  },
                }}
              >
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Box>
          </Box>

          {/* Left side Box */}
          <Box
            sx={{
              height: "auto",
              width: "40%",

              borderRadius: 3,
              display: "flex",
              alignItems: "start",
              float: "left",
            }}
          >
            <FormControl
              sx={{
                gap: "20px",

                width: "100%",

                display: "flex",
                ml: 2,
              }}
            >
              <Box className="dey">
                <FormLabel htmlFor="my-input">Customer ID</FormLabel>
              </Box>
              <Box className="dey">
                <FormLabel htmlFor="my-input">Customer First name</FormLabel>
              </Box>
              <Box className="dey">
                <FormLabel htmlFor="my-input">Customer Last name</FormLabel>
              </Box>
              <Box className="dey">
                <FormLabel htmlFor="my-input">Customer NIC</FormLabel>
              </Box>
              <Box className="dey">
                <FormLabel htmlFor="my-input">Customer Phone number</FormLabel>
              </Box>
              <Box className="dey">
                <FormLabel htmlFor="my-input">
                  Customer Address line 1
                </FormLabel>
              </Box>
              <Box className="dey">
                <FormLabel htmlFor="my-input">
                  Customer Address line 2
                </FormLabel>
              </Box>
              {/* <FormLabel htmlFor="my-input">Email address</FormLabel>
              <FormLabel htmlFor="my-input">Email address</FormLabel>
              <TextField
                label="NIC"
                id="standard-basic"
                defaultValue=""
                variant="standard"
                size="small"
              />
              <TextField
                label="NIC"
                id="standard-basic"
                defaultValue=""
                variant="standard"
                size="small"
              />
              <TextField
                label="NIC"
                id="standard-basic"
                defaultValue=""
                variant="standard"
                size="small"
              />
              <TextField
                label="NIC"
                id="standard-basic"
                defaultValue=""
                variant="standard"
                size="small"
              /> 

              <FormHelperText id="my-helper-text">
                We'll never share your email.
              </FormHelperText>
              */}
            </FormControl>
          </Box>
          {/* Right side Box */}
          <Box
            sx={{
              width: "60%",

              borderRadius: 3,
              display: "flex",
              float: "right",
              flexDirection: "column",
            }}
          >
            <FormControl
              sx={{
                gap: "20px",
                width: "100%",
              }}
            >
              <Box className="dey">
                <TextField
                  id="standard-basic"
                  variant="standard"
                  size="small"
                  sx={{ width: "80px" }}
                  value={id}
                />
              </Box>

              <Box className="dey">
                <TextField
                  id="standard-basic"
                  variant="standard"
                  size="small"
                  sx={{ color: "red" }}
                  value={fname}
                />
              </Box>
              <Box className="dey">
                <TextField
                  id="standard-basic"
                  variant="standard"
                  size="small"
                  sx={{ color: "red" }}
                  value={lname}
                />
              </Box>
              <Box className="dey">
                <TextField
                  id="standard-basic"
                  variant="standard"
                  size="small"
                  sx={{ color: "red" }}
                  value={nic}
                />
              </Box>
              <Box className="dey">
                <TextField
                  id="standard-basic"
                  variant="standard"
                  size="small"
                  sx={{ color: "red" }}
                  value={phoneNumber}
                />
              </Box>
              <Box className="dey">
                <TextField
                  id="standard-basic"
                  variant="standard"
                  size="small"
                  sx={{ color: "red" }}
                  value={address1}
                />
              </Box>
              <Box className="dey">
                <TextField
                  id="standard-basic"
                  variant="standard"
                  size="small"
                  sx={{ color: "red" }}
                  value={address2}
                />
              </Box>

              {/*
              <FormLabel htmlFor="my-input">Email address</FormLabel>
              <FormLabel htmlFor="my-input">Email address</FormLabel>
              <TextField
                label="NIC"
                id="standard-basic"
                defaultValue=""
                variant="standard"
                size="small"
              />
              <TextField
                label="NIC"
                id="standard-basic"
                defaultValue=""
                variant="standard"
                size="small"
              />
              <TextField
                label="NIC"
                id="standard-basic"
                defaultValue=""
                variant="standard"
                size="small"
              />
              <TextField
                label="NIC"
                id="standard-basic"
                defaultValue=""
                variant="standard"
                size="small"
              />
              <TextField
                label="NIC"
                id="standard-basic"
                defaultValue=""
                variant="standard"
                size="small"
              />

              <FormHelperText id="my-helper-text">
                We'll never share your email.
              </FormHelperText>
              */}
            </FormControl>
          </Box>
        </Paper>
        <Snack
          type={message}
          message={messageContent}
          open={open}
          handleClose={handleClose}
        />
      </Box>
    </>
  );
}

export default NewCustomerForm;
