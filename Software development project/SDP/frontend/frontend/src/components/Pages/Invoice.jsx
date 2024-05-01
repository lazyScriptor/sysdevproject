import React from "react";
import "../Stylings/rootstyles.css";
import NewCustomerForm from "./NewCustomerForm.jsx";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew.jsx";

function Invoice() {
  return (
    <>
      <BackgroundStyleNew>
        <NewCustomerForm />
      </BackgroundStyleNew>
    </>
  );
}

export default Invoice;
