import React, { useContext, useEffect, useState } from "react";
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
import {
  faArrowsRotate,
  faL,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/Contexts";
import LoginFormMUI from "./LoginFormMUI";
import image from '../../assets/constructor.png'

function NewLogin() {
  const [userName, setUserName] = useState("Dummu username");
  const [password, setPassword] = useState("Dummy password");
  const [selectValue, setSelectValue] = useState("");
  const [usernameArray, setUsernameArray] = useState([]);
  const [toogle, settoogle] = useState(false);

  const [logInStatus, setLogInStatus] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {

    localStorage.clear();
    //meka oni wenne session eka madde token eka clear karot.kelinma login ekata enawa.ethanadi authenticated
    //variable eka 0 krnawa
    // if (!localStorage.getItem("token") || !isAuthenticated) {
    //   navigate("/");
    // }
  }, [localStorage.getItem("token")]);

  const handleSubmit = async (userName, password, selectValue) => {
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
    // Request body: Suitable for sending larger amounts of data or when the data
    //doesn't fit well into URL parameters. This method is commonly used for
    // 'POST, PUT, and PATCH requests.
    const requestUserObjects = {
      username: userName,
      password: password,
      role: selectValue,
    };
    console.log("object", requestUserObjects);

    await axios
      .get("http://localhost:8085/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("token details ", response);
      });

    try {
      await axios
        .get(`http://localhost:8085/loginValidate`, {
          params: requestUserObjects,
        })
        .then((res) => {
          console.log("This is the response", res.data);
          if (!res.data.auth) {
            setLogInStatus(false);

        
          } else {
            console.log("elsepart", res.data.auth);
            localStorage.setItem("token", res.data.token);
            setLogInStatus(true);
            // After successful login
            localStorage.setItem("userRole", res.data.result);
            localStorage.setItem("username", res.data.username);


            setUserRole(res.data.result);
            navigate("/dashboardmain");
          }

          //I have taken the login URL from backend for security enhancing
          //   navigate(`${res.data[0]}`, { state: { role: selectValue } });
        });
    } catch (error) {
      console.error("Login frontend error", error);
    }
  };

  const handleAuth = () => {
    axios
      .get("http://localhost:8085/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
      });
  };

  const handleUserNameOnChange = async (userName) => {
    setUserName(userName);
  };
  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };

  const handleIconSearch = async () => {
    settoogle(true);

    setTimeout(() => {
      settoogle(false);
      settoogle;
    }, 1000);
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
          backgroundColor: "white",
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
            <LoginFormMUI/>
          </Box>
          {/* Right box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
              minHeight: "inherit",
            }}
          >
            {/* Your content for the right box */}
            <img
              src={image}
              alt="Description of your image"
              style={{
                maxWidth: "70%",
                maxHeight: "70%",
                width: "auto",
                height: "auto",
              }}
            />
          </Box>
        </Box>
      </Box>
      {logInStatus == true ? (
        <>
          <button onClick={handleAuth}>hey</button>{" "}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setLogInStatus(false);
            }}
          >
            logout
          </button>
        </>
      ) : null}
    </>
  );
}

export default NewLogin;
