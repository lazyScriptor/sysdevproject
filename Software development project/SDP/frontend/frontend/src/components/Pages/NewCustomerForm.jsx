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
import { useEffect, useState, useContext } from "react";
import { PopupContext } from "../../Contexts/Contexts";

import "../Stylings/newCustomerForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Snack from "./Snack";

import { createContext } from "react";
import { useSnackbar } from "notistack";
export const AppCustomeContext3 = createContext();

function NewCustomerForm() {
  const { boolvalue, setBoolvalue, userData, setUserData } =
    useContext(PopupContext);

    const [editButtonState,setEditButtonState]=useState(true);
    const [deleteButtonState,setDeleteButtonState]=useState(true);
    const [saveButtonState,setSaveButtonState]=useState(true);
    const [createButtonState,setCreateButtonState]=useState(true)

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

  //variable to toogle inputs
  const [toogle, setToogle] = useState(false);

  //Snackbar content
  const [messageContent, SetMessageContent] = useState();
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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
        console.log("Context data :", userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //in the context provider i have created an object called userData and assigned null values
  //then in the customer table ,when the edit button pressed
  //1.it retrieve the specific customer object with the id and set that object ( object name is row in the customer table)
  //to the userData context variable.
  //2.In the new customer form i used a useEffect hook and set the userData in the dependency array to
  //trigger the use Effect when the user data change.which means when the edit button pressed

  useEffect(() => {
    setId(userData.cus_id);
    setFname(userData.cus_fname);
    setLname(userData.cus_lname);
    setNic(userData.nic);
    setPhoneNumber(userData.cus_phone_number);
    setAddress1(userData.cus_address1);
    setAddress2(userData.cus_address2);
  }, [userData]);

  // Search bar functions
  //Set these 3 values to a new variable insted of using the same variable using to retrieve the input data
  //because when we enter data to search ID in the search ID field it will be automaticcaly
  //autofill the CustomerID field with the onChange function .To avoid that, we have used seperate variables

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
  2;
  //Searchbar functions over

  const handleToogleStatus = () => {
    setToogle(!toogle);
  };
  const handleSaveDetails = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8085/updateCustomerDetails",
        {
          id,
          nic,
          phoneNumber,
          fname,
          lname,
          address1,
          address2,
        }
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
      console.error("Frontend error occured", error);
    }
  };
  const handleDataFill = (firstCustomer) => {
    setId(firstCustomer.cus_id); // Set the cus_id directly
    setNic(firstCustomer.nic);
    setPhoneNumber(firstCustomer.cus_phone_number);
    setFname(firstCustomer.cus_fname);
    setLname(firstCustomer.cus_lname);
    setAddress1(firstCustomer.cus_address1);
    setAddress2(firstCustomer.cus_address2);
    console.log("Customer found");
    setMessage("success");
    SetMessageContent("Customer found");
    setOpen(true);
  };
  const handleSearchnic = async (nic) => {
    try {
      await axios
        .get(`http://localhost:8085/getCustomerbyNIC/${nic}`)
        .then((res) => {
          const customerData = res.data;
          if (customerData && customerData.length > 0) {
            const firstCustomer = customerData[0]; // Get the first customer from the array
            handleDataFill(firstCustomer);
            console.log(
              "This is the first then",
              firstCustomer,
              "This is the length",
              customerData.length
            );
          } else {
            console.log("No customer data found");
          }
        });
      // .then(() => {
      //   console.log(`handle Search is working with --> ${data}`);
      // });
    } catch (error) {
      console.log("handleSearch NIC error");
    }
  };

  const handleSearchid = async (id) => {
    try {
      await axios
        .get(`http://localhost:8085/getCustomerbyID/${id}`)
        .then((res) => {
          const customerData = res.data;
          if (customerData && customerData.length > 0) {
            const firstCustomer = customerData[0]; // Get the first customer from the array
            handleDataFill(firstCustomer);
            console.log(
              "This is the first then",
              firstCustomer,
              "This is the length",
              customerData.length
            );
          } else {
            console.log("No customer data found");
          }
        })
        .then(() => {
          console.log(`handle Search is working with --> ${customerData}`);
        });
    } catch (error) {
      console.log("handleSearch Id error");
    }
  };

  const handleSearchPno = async (phoneNumber) => {
    try {
      await axios
        .get(`http://localhost:8085/getCustomerbyPhoneNumber/${phoneNumber}`)
        .then((res) => {
          const customerData = res.data;
          if (customerData && customerData.length > 0) {
            const firstCustomer = customerData[0]; // Get the first customer from the array
            handleDataFill(firstCustomer);
            console.log("This is the first then", firstCustomer);
          } else {
            console.log("No customer data found");
          }
        });
      // .then(() => {
      //   console.log(`handle Search is working with --> ${data}`);
      // });
    } catch (error) {
      console.log("handleSearch Id error");
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:8085/createCustomer", {
        fname,
        lname,
        nic,
        phoneNumber,
        address1,
        address2,
      });
      console.log("Details created successfully:");

      setToogle(true);
    } catch (error) {
      console.error("Error creating details:", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          border:"solid 1px ",
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
            width: "100%",
            p:2,
            mt: 1,
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
              backgroundColor: (theme) => theme.palette.primary[800],
              color: "white",
              borderRadius: 3,
              mb: 3,
            }}
          >
            <h1>Add/Edit Customers</h1>
          </Box>
          {/* Upper Search bar Start*/}
          <Box
            sx={{
              height: "70px",
              borderRadius: 3,
              backgroundColor: (theme) => theme.palette.primary[100],
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
                onClick={() => handleSearchid(newId)}
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
                onClick={() => handleSearchnic(newNic)}
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
                onClick={() => handleSearchPno(newPno)}
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
          {/* Upper Search bar End */}
          <Box sx={{ p: 2}}>
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
                  <FormLabel htmlFor="my-input">
                    Customer Phone number
                  </FormLabel>
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
                  pl: 10,
                  gap: "20px",
                  width: "100%",
                }}
              >
                <Box className="dey">
                  <TextField
                    disabled={true}
                    id="standard-basic"
                    variant="outlined"
                    size="small"
                    sx={{ width: "80px" }}
                    value={id}
                  />
                </Box>

                <Box className="dey">
                  <TextField
                    disabled={toogle}
                    id="standard-basic"
                    variant="outlined"
                    size="small"
                    sx={{ color: "red" }}
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </Box>
                <Box className="dey">
                  <TextField
                    disabled={toogle}
                    id="standard-basic"
                    variant="outlined"
                    size="small"
                    sx={{ color: "red" }}
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </Box>
                <Box className="dey">
                  <TextField
                    disabled={toogle}
                    id="standard-basic"
                    variant="outlined"
                    size="small"
                    sx={{ color: "red" }}
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                  />
                </Box>
                <Box className="dey">
                  <TextField
                    disabled={toogle}
                    id="standard-basic"
                    variant="outlined"
                    size="small"
                    sx={{ color: "red" }}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Box>
                <Box className="dey">
                  <TextField
                    disabled={toogle}
                    id="standard-basic"
                    variant="outlined"
                    size="small"
                    sx={{ color: "red" }}
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </Box>
                <Box className="dey">
                  <TextField
                    disabled={toogle}
                    id="standard-basic"
                    variant="outlined"
                    size="small"
                    sx={{ color: "red" }}
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </Box>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ p: 3 }}>
            <Box>
              <Button sx={{ mt: 2 }} onClick={handleToogleStatus}>
                Edit
              </Button>
              <Button sx={{ mt: 2, ml: 1 }} onClick={handleSaveDetails}>
                Save
              </Button>
              <Button
                color="error"
                sx={{ mt: 2, ml: 2 }}
                onClick={() => handleDeleteCustomer(id, "success", fname)}
              >
                Delete
              </Button>
            </Box>

            <Button variant="contained" sx={{ mt: 2 }} onClick={handleCreate}>
              Create
            </Button>
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
