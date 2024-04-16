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
import FormComponents from "./FormComponents";
import { useEffect, useState } from "react";

import "../Stylings/newCustomerForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

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

  const handleSearchid = () => {
    const selectedUserData = data.find((user) => user.cus_id == newId);
    setNewNic("")
    setNewPno("")
    setId(selectedUserData.cus_id);
    setNic(selectedUserData.nic);
    setPhoneNumber(selectedUserData.cus_phone_number);
    setFname(selectedUserData.cus_fname);
    setLname(selectedUserData.cus_lname);
    setAddress1(selectedUserData.cus_address1);
    setAddress2(selectedUserData.cus_address2);
  };

  const handleOnChangeIdOnlyForSearching = (e) => {
    const enteredText = e.target.value;
    setNewId(enteredText);
  };
  const handleOnChangeNicOnlyForSearching = (e) => {
    const enteredText = e.target.value;
    setNewNic(enteredText);
  };

  const handleSearchnic = () => {
    const selectedUserData = data.find((user) => user.nic == newNic);
    setNewId("")
    setNewPno("")
    setId(selectedUserData.cus_id);
    setNic(selectedUserData.nic);
    setPhoneNumber(selectedUserData.cus_phone_number);
    setFname(selectedUserData.cus_fname);
    setLname(selectedUserData.cus_lname);
    setAddress1(selectedUserData.cus_address1);
    setAddress2(selectedUserData.cus_address2);
  };
  const handleOnChangePnoOnlyforSearching = (e) => {
    const enteredText = e.target.value;
    setNewPno(enteredText);
  };
  const handleSearchPno = () => {
    const selectedUserData = data.find(
      (user) => user.cus_phone_number == newPno
    );
    setNewId("")
    setNewNic("")
    setId(selectedUserData.cus_id);
    setNic(selectedUserData.nic);
    setPhoneNumber(selectedUserData.cus_phone_number);
    setFname(selectedUserData.cus_fname);
    setLname(selectedUserData.cus_lname);
    setAddress1(selectedUserData.cus_address1);
    setAddress2(selectedUserData.cus_address2);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "start",
          paddingBottom: "400px",
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
            height: "100vh",
          }}
        >
          <Box
            sx={{
              height: "100px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              backgroundColor: "#505050",
              color: "white",
              borderRadius: 3,
              mb: 5,
            }}
          >
            <h1>Client Details</h1>

            <p>We'll never share your email.</p>
          </Box>

          <Box sx={{ p: 1, height: "70px", mb: 2 }}>
            <Box
              sx={{
                height: "50px",
                width: "30%",

                borderRadius: 3,
                display: "flex",
                alignItems: "start",
                float: "left",
                pl: 2,
              }}
            >
              <TextField
                id="standard-search"
                variant="standard"
                label="Search by ID"
                type="search"
                size="small"
                sx={{}}
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
                float: "left",
                pl: 2,
              }}
            >
              <TextField
                id="standard-search"
                variant="standard"
                label="Search by NIC"
                type="search"
                size="small"
                sx={{}}
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
                alignItems: "start",
                float: "left",
              }}
            >
              <TextField
                id="standard-search"
                variant="standard"
                label="Search by Phone number"
                type="search"
                size="small"
              sx={{width:"100%"}}
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
              height: "100%",
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
                height: "100%",
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
              height: "auto",
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
                  sx={{ width: "80px", color: "red" }}
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
      </Box>
    </>
  );
}

export default NewCustomerForm;
