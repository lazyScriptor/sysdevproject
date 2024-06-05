import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/Contexts";
import InvoiceNew from "./Invoice/InvoiceNew";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew";
import InvoiceHandOverForm from "./Invoice/InvoiceHandOverForm";
import { Box, Paper } from "@mui/material";
import InvoiceTable from "../SubComponents/InvoiceTable";
import CompleteInvoiceTable from "./Invoice/CompleteInvoiceTable";
import InvoicePdf from "./Invoice/InvoicePdf";

function Inbox() {
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
      {/* <InvoiceNew/> */}

       
     
    </>
  );
}

export default Inbox;
