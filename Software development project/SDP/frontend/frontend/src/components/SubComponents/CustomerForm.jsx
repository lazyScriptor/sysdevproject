import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";

function CustomerForm() {
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        sx={{ height: "400px", p: 2, m: 2, borderRadius: 2, width: "80vw" }}
        component={Paper}
      >
        <Box
          width={"30%"}
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <FormControl>
            <FormLabel>Customer name</FormLabel>
            <TextField size="small" fullWidth variant="outlined" />
          </FormControl>
          <FormControl>
            <FormLabel>Customer name</FormLabel>
            <TextField size="small" fullWidth variant="outlined" />
          </FormControl>
          <FormControl>
            <FormLabel>Customer name</FormLabel>
            <TextField size="small" fullWidth variant="outlined" />
          </FormControl>
          <FormControl>
            <FormLabel>Customer name</FormLabel>
            <TextField size="small" fullWidth variant="outlined" />
          </FormControl>
        </Box>
        <Box
          width={"30%"}
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          flexDirection={"column"}
        >
         <FormControl>
            <FormLabel>Customer name</FormLabel>
            <TextField size="small" fullWidth variant="outlined" />
          </FormControl>
          <FormControl>
            <FormLabel>Customer name</FormLabel>
            <TextField size="small" fullWidth variant="outlined" />
          </FormControl>
          <FormControl>
            <FormLabel>Customer name</FormLabel>
            <TextField size="small" fullWidth variant="outlined" />
          </FormControl>
          <FormControl>
            <FormLabel>Customer name</FormLabel>
            <TextField size="small" fullWidth variant="outlined" />
          </FormControl>
        </Box>
        <Box
          width={"10%"}
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Button variant="contained" customvariant="custom">
            add
          </Button>
          <Button variant="contained" color="error" customvariant="custom">
            delete
          </Button>
          <Button variant="contained" color="warning" customvariant="custom">
            Clear
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default CustomerForm;
