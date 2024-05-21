import React, { useContext, useEffect } from "react";
import "../Stylings/rootstyles.css";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew";
import CustomerTable from "../SubComponents/CustomerTable";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/Contexts";
import { Box } from "@mui/material";
import CollapsibleTable from "../SubComponents/CustomerTableNew";

function Customers() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      setIsAuthenticated(false);
    }
  }, []);
  return (
    <>
      <Box id="main-body">
        <Box id="body">
          <BackgroundStyleNew>
          <CollapsibleTable/>

          </BackgroundStyleNew>
        </Box>
      </Box>
    </>
  );
}

export default Customers;
