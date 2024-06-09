import React, { useContext, useEffect } from "react";
import "../../Stylings/rootstyles.css";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { AuthContext } from "../../../Contexts/Contexts";
import CustomerTableNew from "../../SubComponents/CustomerTableNew";
import CustomerTable from "./CustomersTable";

function CustomersWarehouseHandler() {
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
          <CustomerTable/>
        </Box>
      </Box>
    </>
  );
}

export default CustomersWarehouseHandler;
