import React from "react";
import { Box, Paper } from "@mui/material";
import "../Stylings/rootstyles.css";
import NewCustomerForm from "./NewCustomerForm";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew";
import CustomerTable from "../SubComponents/CustomerTable";
import CustomerContextProvider from "../../Contexts/CustomerPopupContextProvider";

function Customers() {
  return (
    <>
     <CustomerContextProvider>
      <BackgroundStyleNew
        title={"Customer Details"}
        subTitle={"This is the customer page"}
      >
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
            <NewCustomerForm />
          </Box>
          <Box
            sx={{
              width: "60%",

              minHeight: "100vh",
              borderRadius: 3,
            }}
          >
           
              <CustomerTable />
            
          </Box>
        </Box>
      </BackgroundStyleNew>
      </CustomerContextProvider>
    </>
  );
}

export default Customers;
