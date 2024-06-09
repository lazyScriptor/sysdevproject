import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../Contexts/Contexts.jsx";
import CustomerForm from "../SubComponents/CustomerForm.jsx";
import ReportsBackground from "../Reports/ReportsBackground.jsx";
import { Box } from "@mui/material";
import "../Stylings/rootstyles.css";
function Reports() {
  return (
    <>
      <Box id="main-body">
        <Box id="body" sx={{ display: "flex", flexDirection: "column" }}>
          <ReportsBackground />
        </Box>
      </Box>
    </>
  );
}

export default Reports;
