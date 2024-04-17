import React from "react";
import { TextField } from "@mui/material";
import '../Stylings/rootstyles.css'

function FormComponents({ type, width,message }) {
 
  const textFieldWidth = width ? width : "80%"; // Check if width is provided

  return (
    <>
      <TextField
        disabled={type}
        id="standard-basic"
        variant="standard"
        size="small"
        sx={{ width: textFieldWidth, color: "red" }}
        value={message}
      >
        
      </TextField>
    </>
  );
}

export default FormComponents;
