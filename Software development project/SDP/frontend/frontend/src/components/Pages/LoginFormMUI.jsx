import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Paper,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HealthAndSafetyTwoToneIcon from "@mui/icons-material/HealthAndSafetyTwoTone";

function LoginFormMUI() {
  const [isLoading, setIsLoading] = useState(false);
  const [LoadUsername, setLoadUsername] = useState("");
  const [usernameArray, setUsernameArray] = useState([]);
  const [selectValue, setSelectValue] = useState();
  const navigate = useNavigate();

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

  // const getErrorMessage = (fieldName) => {
  //   switch (fieldName) {
  //     // case "username":
  //     //   return {
  //     //     required: "Username is required",
  //     //     minLength: {
  //     //       value: 6,
  //     //       message: "Username must be at least 6 characters long",
  //     //     },
  //     //   };
  //     case "password":
  //       return {
  //         required: "Password is required to proceed",
  //         minLength: {
  //           value: 3,
  //           message: "Password must be at least 8 characters long",
  //         },
  //       };
  //     default:
  //       return {};
  //   }
  // };

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
            navigate("/dashboardmain");
          }
        });
    } catch (error) {
      console.error("Login frontend Error occured", error);
    }
  };

  return (
    <>
      <Paper
        elevation={10}
        sx={{ display: "inline-block", p:5,pt:0, borderRadius: 4 }}
      >
        <Typography variant="h2" sx={{textAlign:"center"}}>
          <HealthAndSafetyTwoToneIcon sx={{ fontSize: 48 ,color:(theme)=>theme.palette.primary[800]}}/>
        </Typography>

        <h1 style={{ textAlign: "center", marginBottom: 50 }}>Login</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} width={400}>
            <TextField
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
              variant="outlined"
            >
              <span>Fetch user role</span>
            </LoadingButton>
            <Select
              {...register("role")}
              error={!!errors.select}
              //helperText={errors.select?.message}
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectValue || ""}
              onChange={(event) => handleSelectChange(event)}
            >
              {usernameArray.map((users, index) => (
                <MenuItem value={users.role} key={index}>
                  {users.role}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Password"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </>
  );
}

export default LoginFormMUI;