import React from "react";
import { Box, Paper } from "@mui/material";
import "../Stylings/rootstyles.css";


function NewCustomerForm() {
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
              backgroundColor: (theme) => theme.palette.primary[800],
              color: "white",
              borderRadius: 3,
              mb: 3,
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
            ></Box>
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
            ></Box>
            <Box
              sx={{
                height: "50px",
                width: "40%",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default NewCustomerForm;
