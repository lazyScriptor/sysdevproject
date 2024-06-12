import React from "react";
import { Box, Paper, Button, TextField, colors, useTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';


function ReportsNavBar() {
    const navigate=useNavigate();
  const theme = useTheme();
  const reportCategoryButton = {
    width: "100vw",
    backgroundColor: theme.palette.primary[300],
    borderRadius: "50px",
    border:"0",
    marginBottom:10,
    color:"white",
  };
  return (
    <>
      <button onClick={()=>navigate('/Reports')} style={reportCategoryButton}>Equipment</button>
      <button onClick={()=>navigate("/Reports-invoices")} style={reportCategoryButton}>Invoices</button>
      <button  onClick={()=>navigate("/Reports-customers")} style={reportCategoryButton}>Cusotmers</button>
    </>
  );
}

export default ReportsNavBar;
