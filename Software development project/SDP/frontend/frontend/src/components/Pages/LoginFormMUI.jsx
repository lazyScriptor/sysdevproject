import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Stack,
  Paper,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HealthAndSafetyTwoToneIcon from "@mui/icons-material/HealthAndSafetyTwoTone";

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function LoginFormMUI() {
  const [isLoading, setIsLoading] = useState(false);
  const [LoadUsername, setLoadUsername] = useState("");
  const [usernameArray, setUsernameArray] = useState([]);
  const [selectValue, setSelectValue] = useState();
  const [passwordWrong, setPasswordWrong] = useState("");
  const navigate = useNavigate();

  const usernameRef = useRef(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  const schema = yup.object().shape({
    username: yup.string().required().min(3),
    password: yup.string().min(3).max(10).required(),
    // select: yup.required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLoadingButton = async (userName) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    // clearTimeout();
    try {
      await axios
        .get(`http://localhost:8085/getUserRole/${userName}`)
        .then((res) => {
          console.log("This is the response ", res.data);

          setUsernameArray(res.data);
        });
    } catch (error) {
      setIsLoading(false);
      console.log("handleSearch NIC error");
    }
  };

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };

  const onSubmit = async (data) => {
    try {
      await axios
        .get(`http://localhost:8085/loginValidate`, {
          params: data,
        })
        .then((res) => {
          console.log("This is the response", res.data);
          if (!res.data.auth) {
            setPasswordWrong("Password is wrong");
            // setLogInStatus(false);
            // setIsAuthenticated(false);
          } else {
            console.log("elsepart", res.data.auth);
            localStorage.setItem("token", res.data.token);
            // setLogInStatus(true);
            // setIsAuthenticated(true);
            // After successful login
            localStorage.setItem("userRole", res.data.result);
            localStorage.setItem("username", res.data.username);

            // setUserRole(res.data.result);
            const userRole = parseJwt(res.data.token).userRole;
            console.log(userRole);
            if (userRole == "warehouse handler") {
              navigate("/WH-customers");
            } else if (userRole == "cashier") {
              navigate("/C-dashboard");
            } else if (userRole == "admin") {
              navigate("/dashboardmain");
            }
          }
        });
    } catch (error) {
      console.error("Login frontend Error occured", error);
    }
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      "& fieldset": {
        borderWidth: "2px", // Increase the border width here
      },
      "&:hover fieldset": {
        borderWidth: "2px", // Increase the border width on hover
      },
      "&.Mui-focused fieldset": {
        borderWidth: "2px", // Increase the border width when focused
      },
    },
  };

  return (
    <>
      <Paper
        elevation={10}
        sx={{ display: "inline-block", p: 5, pt: 0, borderRadius: 4 }}
      >
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          <HealthAndSafetyTwoToneIcon
            sx={{ fontSize: 48, color: (theme) => theme.palette.primary[800] }}
          />
        </Typography>

        <h1 style={{ textAlign: "center", marginBottom: 50 }}>Login</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack
            spacing={4}
            width={400}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box width={"100%"}>
              <TextField
                fullWidth
                sx={[textFieldStyle, { width: "80%" }]}
                inputRef={usernameRef}
                onChange={(e) => {
                  setLoadUsername(e.target.value);
                  console.log(e.target.value);
                  // Ensure that you keep your custom functionality here
                }}
                label="Username"
                type="text"
                inputProps={{ ...register("username") }} // Register explicitly here
                error={!!errors.username}
                helperText={errors.username?.message}
              />

              <LoadingButton
                loading={isLoading}
                onClick={() => handleLoadingButton(LoadUsername)}
                sx={{ minHeight: "55px", ml: 2, borderRadius: 3 }}
                variant="outlined"
              ></LoadingButton>
            </Box>

            <Select
              {...register("role")}
              error={!!errors.select}
              //helperText={errors.select?.message}
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectValue || ""}
              sx={{
                borderRadius: "12px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
                "& fieldset": {
                  borderRadius: "12px",
                },
              }}
              onChange={(event) => handleSelectChange(event)}
            >
              {usernameArray.map((users, index) => (
                <MenuItem value={users.ur_role} key={index}>
                  {users.ur_role}
                </MenuItem>
              ))}
            </Select>
            <TextField
              fullWidth
              sx={textFieldStyle}
              label="Password"
              type="password"
              {...register("password")}
              onChange={() => {
                setPasswordWrong("");
              }}
              error={!!errors.password}
              helperText={
                errors.password?.message || (
                  <Typography variant="caption" color={"error"}>
                    {passwordWrong}
                  </Typography>
                )
              }
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ borderRadius: 3, height: "55px", width: "200px" }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </>
  );
}

export default LoginFormMUI;
