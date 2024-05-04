import React, { useState } from "react";
import {
  Box,
  FormLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faSearch } from "@fortawesome/free-solid-svg-icons";

function NewLogin() {
  const [userName, setUserName] = useState("Dummu username");
  const [password, setPassword] = useState("Dummy password");
  const [selectValue, setSelectValue] = useState("");
  const [usernameArray, setUsernameArray] = useState([]);
  const [toogle,settoogle]=useState(false);

  const handleSubmit =async (userName, password, selectValue) => {
//Then, on the server side, you need to adjust the route to accept 
//query parameters instead of route parameters:

// Using Axios params option: When you use the params option in the Axios
// request configuration, Axios automatically serializes the JavaScript object 
//into a query string and appends it to the URL. This means the data is sent as URL
// parameters in the form ?key1=value1&key2=value2&.... This method is typically used 
//for GET requests.Example:

// await axios.get("http://localhost:8085/loginValidate", {
//   params: requestUserObjects,
// });
// Sending data in the request body: In contrast, sending data in the request body involves
// sending the data in the body of the HTTP request. This method is commonly used for POST 
//requests. The data is typically sent in JSON format, but can also be sent as form data or
// other formats depending on the content type.Example:

// await axios.post("http://localhost:8085/loginValidate", requestUserObjects);
// In summary:

// Params option: Convenient for sending small amounts of data in a GET request, where the data is encoded into the URL.
// Request body: Suitable for sending larger amounts of data or when the data doesn't fit well into URL parameters. This method is commonly used for POST, PUT, and PATCH requests.
    const requestUserObjects = 
      {
        username:userName,
        password:password,
        role:selectValue,
      }
    console.log("object",requestUserObjects)
    try{
        await axios
        .get(`http://localhost:8085/loginValidate`,{params:requestUserObjects})
        .then((res)=>console.log("This is the response",res.data))
    }catch(error){
      console.error("Login frontend error",error)
    }
  };


  const handleUserNameOnChange = async (userName) => {
    setUserName(userName);
  };
  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };
  const handleIconSearch = async () => {
    settoogle(true)

    setTimeout(()=>{
      settoogle(false)
      settoogle
    },1000)
    clearTimeout();
    try {
      await axios
        .get(`http://localhost:8085/getUserRole/${userName}`)
        .then((res) => {
          console.log("This is the response ", res.data);
          setUsernameArray(res.data);
        });
    } catch (error) {
      console.log("handleSearch NIC error");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100vw",
          minHeight: "100vh",
        }}
      >
        {/* Inner box */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "85vw",
            minHeight: "85vh",
            maxHeight: "95vh",
            maxWidth: "95vw",
          }}
        >
          {/* Left box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
            }}
            minHeight={"inherit"}
          >
            <Paper
              elevation={3}
              sx={{
                borderRadius: 3,
                p: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                flexDirection: "column",
                gap: 2,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              <FormLabel>Enter Username</FormLabel>
              <Box
              
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <TextField
                  id="Username"
                  label="Outlined"
                  variant="outlined"
                  onChange={(e) => handleUserNameOnChange(e.target.value)}
                />{" "}
                { toogle ==true ?  <FontAwesomeIcon icon={faArrowsRotate} spin  onClick={handleIconSearch} />: <FontAwesomeIcon icon={faArrowsRotate} onClick={handleIconSearch} />}
               
              </Box>

              <FormLabel>Select the role</FormLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectValue || ""}
                onChange={(event) => handleSelectChange(event)}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {usernameArray.map((users, index) => (
                  <MenuItem value={users.role} key={index}>
                    {users.role}
                  </MenuItem>
                ))}
              </Select>

              <FormLabel>Enter Password</FormLabel>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => handleSubmit(userName, password, selectValue)}
              >
                Login
              </Button>
            </Paper>
          </Box>
          {/* Right box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "50%",
              minHeight: "inherit",
            }}
          >
            {/* Your content for the right box */}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default NewLogin;
