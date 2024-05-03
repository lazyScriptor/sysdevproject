import React from "react";
import "../Stylings/rootstyles.css";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew";
import CustomerTable from "../SubComponents/CustomerTable";


function Customers() {
  return (
    <>
      <BackgroundStyleNew
        title={"Customer Details"}
        subTitle={"This is the customer page"}
      >
        <CustomerTable/>
      </BackgroundStyleNew>
    </>
  );
}

export default Customers;