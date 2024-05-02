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
        <CustomerTable/>
      </BackgroundStyleNew>
      </CustomerContextProvider>
    </>
  );
}

export default Customers;
