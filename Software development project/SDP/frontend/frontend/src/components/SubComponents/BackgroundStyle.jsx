import React from "react";
import { Box, Paper } from "@mui/material";
import "../Stylings/rootstyles.css";
import Customers from "../Pages/Customers";
import Invoice from "../Pages/Invoice";

function BackgroundStyle() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "auto",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "flex-start", // Align content vertically at the top
          p:0,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            p: 5,
            borderRadius: 3,
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

          {/* Divide the last box into two */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "40%",

                borderRadius: 3,
                minHeight: "100vh",
                mr: 2, // Add margin to create space between the two boxes
              }}
            >
              <Invoice />
            </Box>
            <Box
              sx={{
                width: "60%",

                minHeight: "100vh",
                borderRadius: 3,
              }}
            >
              <Customers />
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default BackgroundStyle;
