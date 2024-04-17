import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

function PaperBackground() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={4}
          sx={{ width: "75%", mb: 2, mt: 2, borderRadius: 3 }}
        />
        Í
      </Box>
    </>
  );
}

export default PaperBackground;
