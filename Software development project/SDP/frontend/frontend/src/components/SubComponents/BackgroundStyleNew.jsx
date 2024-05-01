import React from "react";
import { Box, Paper } from "@mui/material";
import "../Stylings/rootstyles.css";

function BackgroundStyleNew({ children, title, subTitle }) {
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
          p: 0,
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
            <h1>{title}</h1>
            <p>{subTitle}</p>
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
              height: "100vh",
            }}
          >
            {children}
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default BackgroundStyleNew;
