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
  Select,
  MenuItem,
} from "@mui/material";
import "../Stylings/rootstyles.css";
import { useEffect, useState, useContext } from "react";
import { PopupContext } from "../../Contexts/Contexts";

import "../Stylings/newCustomerForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSnackbar } from "notistack";
import Snack from "../Pages/Snack";
import CustomizedSwitches from "./CustomizedSwitch";

function EquipmentForm() {
  const { boolvalue, setBoolvalue, userData, setUserData } =
    useContext(PopupContext);

  const [data, setData] = useState([]);
  const [newMachineId, setnewMachineId] = useState("");


  const [machineId, setmachineId] = useState("");
  const [machineName,setMachineName]=useState("")
  const [rental, setRental] = useState("");
  const [DOP, setDOP] = useState("");
  const [warrantyDate, setWarrantyDate] = useState("");
  const [endOfWarranty, setEndOfWarranty] = useState("");
  const [machineCost, setMachineCost] = useState("");
  const [defectiveStatus, setDefectiveStatus] = useState("");

  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  function formatDefectedStatus(defected_status){
    let newDefectedStatus ;
    if(defected_status==1){
      newDefectedStatus=<FontAwesomeIcon icon={faRightFromBracket}/>
    }
    else if(defected_status==0){
      newDefectedStatus="Ok"
    }
    else newDefectedStatus=""

    return newDefectedStatus
  }

  // variable to toogle inputs
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
    
  }, []);

  //in the context provider i have created an object called userData and assigned null values
  //then in the customer table ,when the edit button pressed
  //1.it retrieve the specific customer object with the id and set that object ( object name is row in the customer table)
  //to the userData context variable.
  //2.In the new customer form i used a useEffect hook and set the userData in the dependency array to
  //trigger the use Effect when the user data change.which means when the edit button pressed

  // useEffect(() => {
  //   setId(userData.cus_id);
  //   setFname(userData.cus_fname);
  //   setLname(userData.cus_lname);
  //   setNic(userData.nic);
  //   setPhoneNumber(userData.cus_phone_number);
  //   setAddress1(userData.cus_address1);
  //   setAddress2(userData.cus_address2);
  // }, [userData]);

  // Search bar functions
  //Set these 3 values to a new variable insted of using the same variable using to retrieve the input data
  //because when we enter data to search ID in the search ID field it will be automaticcaly
  //autofill the CustomerID field with the onChange function .To avoid that, we have used seperate variables

  // const handleOnChangeIdOnlyForSearching = (e) => {
  //   const enteredText = e.target.value;
  //   setNewId(enteredText);
  // };
  // const handleOnChangeNicOnlyForSearching = (e) => {
  //   const enteredText = e.target.value;
  //   setNewNic(enteredText);
  // };
  // const handleOnChangePnoOnlyforSearching = (e) => {
  //   const enteredText = e.target.value;
  //   setNewPno(enteredText);
  // };
  // 2;
  // //Searchbar functions over

  // const handleToogleStatus = () => {
  //   setToogle(!toogle);
  // };
  // const handleSaveDetails = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8085/updateCustomerDetails",
  //       {
  //         id,
  //         nic,
  //         phoneNumber,
  //         fname,
  //         lname,
  //         address1,
  //         address2,
  //       }
  //     );
  //     console.log("Details saved successfully:", response.data);

  //     setToogle(true);
  //   } catch (error) {
  //     console.error("Error saving details:", error);
  //   }
  // };
  // const handleDeleteCustomer = async (id, variant, fname) => {
  //   try {
  //     await axios
  //       .delete(`http://localhost:8085/deleteCustomers/${id}`)
  //       .then(() => {
  //         console.log("Frontend executed successfully");
  //         enqueueSnackbar(`Customer : ${fname} deleted successfully`, {
  //           variant,
  //         });
  //       });
  //   } catch (error) {
  //     console.error("Frontend error occured", error);
  //   }
  // };
  const handleDataFill = (firstEquipment) => {
    setmachineId(firstEquipment.eq_id); // Set the cus_id directly
    setMachineName(firstEquipment.eq_name);
    setRental(firstEquipment.rental);
    setDOP(formatDate(firstEquipment.date_of_purchase));
    setWarrantyDate(formatDate(firstEquipment.warranty_date));
    setEndOfWarranty(formatDate(firstEquipment.end_of_warranty_period));
    setMachineCost(firstEquipment.eq_cost)
    setDefectiveStatus(firstEquipment.defected_status);

    console.log("Machine found");
    setMessage("success");
    SetMessageContent("Machine found");
    setOpen(true);
  };
  // const handleSearchnic = async (nic) => {
  //   try {
  //     await axios
  //       .get(`http://localhost:8085/getCustomerbyNIC/${nic}`)
  //       .then((res) => {
  //         const customerData = res.data;
  //         if (customerData && customerData.length > 0) {
  //           const firstCustomer = customerData[0]; // Get the first customer from the array
  //           handleDataFill(firstCustomer);
  //           console.log(
  //             "This is the first then",
  //             firstCustomer,
  //             "This is the length",
  //             customerData.length
  //           );
  //         } else {
  //           console.log("No customer data found");
  //         }
  //       });
  //     // .then(() => {
  //     //   console.log(`handle Search is working with --> ${data}`);
  //     // });
  //   } catch (error) {
  //     console.log("handleSearch NIC error");
  //   }
  // };

   const handleSearchid = async (id) => {
    try {
      await axios
        .get(`http://localhost:8085/getEquipmentbyID/${id}`)
        .then((res) => {
          const equipmentData = res.data;
          if (equipmentData && equipmentData.length > 0) {
            const firstEquipment = equipmentData[0]; // Get the first customer from the array
            handleDataFill(firstEquipment)
            console.log(
              "This is the first then",
              firstEquipment,
              "This is the length",
              equipmentData.length
            );
          } else {
            console.log("No customer data found");
          }
        })
       
    } catch (error) {
      console.log("handleSearch Id error");
    }
  };

  // const handleSearchPno = async (phoneNumber) => {
  //   try {
  //     await axios
  //       .get(`http://localhost:8085/getCustomerbyPhoneNumber/${phoneNumber}`)
  //       .then((res) => {
  //         const customerData = res.data;
  //         if (customerData && customerData.length > 0) {
  //           const firstCustomer = customerData[0]; // Get the first customer from the array
  //           handleDataFill(firstCustomer);
  //           console.log("This is the first then", firstCustomer);
  //         } else {
  //           console.log("No customer data found");
  //         }
  //       });
  //     // .then(() => {
  //     //   console.log(`handle Search is working with --> ${data}`);
  //     // });
  //   } catch (error) {
  //     console.log("handleSearch Id error");
  //   }
  // };

  // const handleCreate = async () => {
  //   try {
  //     await axios.post("http://localhost:8085/createCustomer", {
  //       nic,
  //       phoneNumber,
  //       fname,
  //       lname,
  //       address1,
  //       address2,
  //     });
  //     console.log("Details created successfully:");

  //     setToogle(true);
  //   } catch (error) {
  //     console.error("Error creating details:", error);
  //   }
  // };

  return (
    <>
      <Paper
        elevation={4}
        sx={{
          width: "800px",
          p: 1,
          mt: 1,
          borderRadius: 3,
          gap: "20px",
          minWidth: "500px",
          backgroundColor: (theme) => theme.palette.primary,
        }}
      >
        {/* This is the Upper Edit equipment bar */}
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
          <h1>Add/Edit Equipment</h1>
        </Box>
        {/* This is the Upper search bar */}
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
              width: "80%",
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
              onChange={(e)=>{
                  setnewMachineId(e.target.value)
              }}
            />
            <Button
              onClick={() => handleSearchid(newMachineId)}
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
          {/*
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
          </Box> */}
        </Box>
        {/* This box contains the left and the right box */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Left side Box */}
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormControl
              sx={{
                gap: "20px",

                width: "100%",

                ml: { xs: 0, md: 2 },
              }}
            >
              <Box className="dey">
                <FormLabel htmlFor="my-input">Machine ID</FormLabel>
              </Box>
              <Box className="dey">
                <FormLabel htmlFor="my-input">Machine name</FormLabel>
              </Box>
              <Box className="dey">
                <FormLabel htmlFor="my-input">Rental</FormLabel>
              </Box>
              <Box className="dey">
                <FormLabel htmlFor="my-input">Date of Purchase</FormLabel>
              </Box>
              <Box className="dey">
                <FormLabel htmlFor="my-input">Warranty Date</FormLabel>
              </Box>
              <Box className="dey">
                <FormLabel htmlFor="my-input">End of the Warranty</FormLabel>
              </Box>
              <Box className="dey">
                <FormLabel htmlFor="my-input">Machine cost</FormLabel>
              </Box>
              <Box className="dey">
                <FormLabel htmlFor="my-input">Defected status</FormLabel>
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
              width: { xs: "100%", md: "60%" },
              borderRadius: 3,
              display: "flex",
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
                  disabled={true}
                  id="standard-basic"
                  variant="outlined"
                  size="small"
                  sx={{ width: "80px" }}
                  value={machineId}
                />
              </Box>

              <Box className="dey">
                <TextField
                  disabled={toogle}
                  id="standard-basic"
                  variant="outlined"
                  size="small"
                  sx={{ color: "red" }}
                  value={machineName}
                  // onChange={(e) => setMachineName(e.target.value)}
                />
              </Box>
              <Box className="dey">
                <TextField
                  disabled={toogle}
                  id="standard-basic"
                  variant="outlined"
                  size="small"
                  sx={{ color: "red" }}
                  value={rental}
                  // onChange={(e) => setLname(e.target.value)}
                />
              </Box>
              <Box className="dey">
                <TextField
                  disabled={toogle}
                  id="standard-basic"
                  variant="outlined"
                  size="small"
                  sx={{ color: "red" }}
                  value={DOP}
                  // onChange={(e) => setNic(e.target.value)}
                />
              </Box>
              <Box className="dey">
                <TextField
                  disabled={toogle}
                  id="standard-basic"
                  variant="outlined"
                  size="small"
                  sx={{ color: "red" }}
                  value={warrantyDate}
                  // onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Box>
              <Box className="dey">
                <TextField
                  disabled={toogle}
                  id="standard-basic"
                  variant="outlined"
                  size="small"
                  sx={{ color: "red" }}
                  value={endOfWarranty}
                  // onChange={(e) => setAddress1(e.target.value)}
                />
              </Box>
              <Box className="dey">
                <TextField
                  disabled={toogle}
                  id="standard-basic"
                  variant="outlined"
                  size="small"
                  sx={{ color: "red" }}
                  value={machineCost}
                  // onChange={(e) => setAddress2(e.target.value)}
                />
              </Box>
              <Box sx={{ minWidth: 250 ,pl:1.2}}>
      <FormControl fullWidth sx={{maxWidth:150}}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          label="Age"
          // onChange={handleChange}
        >
          <MenuItem value={0}><FontAwesomeIcon icon={faSearch}/>Working</MenuItem>
          <MenuItem value={1}>Defected</MenuItem>
          <MenuItem value={2}>Need to repire but working</MenuItem>
        </Select>
      </FormControl>
    </Box>
              {/* <Box className="dey">
                <TextField
                  disabled={toogle}
                  id="standard-basic"
                  variant="standard"
                  size="small"
                  sx={{ color: "red" }}
                  value={formatDefectedStatus(defectiveStatus)
                  
                  }
                  // onChange={(e) => setAddress2(e.target.value)}
                >
                  
                  </TextField>
              </Box> */}
            </FormControl>
          </Box>
        </Box>

        {/* Button section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",

            pt: 3,
            pl: 3,
            pr: 3,
            pb: 1,
            gap: 3,
          }}
        >
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            // onClick={handleToogleStatus}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2, ml: 1 }}
            // onClick={handleSaveDetails}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 2, ml: 2 }}
            // onClick={() => handleDeleteCustomer(id, "success", fname)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 2, ml: 2 }}
            // onClick={handleCreate}
          >
            Create
          </Button>
        </Box>
      </Paper>
      <Snack
        type={message}
        message={messageContent}
        open={open}
        // handleClose={handleClose}
      />
    </>
  );
}

export default EquipmentForm;
