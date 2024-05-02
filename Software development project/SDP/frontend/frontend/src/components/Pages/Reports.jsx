import React from "react";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew.jsx";
import { Button } from "@mui/material";
import BackdropCustomerForm from "../SubComponents/BackdropCustomerForm.jsx";
import OverlayDialogBox from "../SubComponents/OverlayDialogBox.jsx";
import NewCustomerForm from "./NewCustomerForm.jsx";


function Reports() {
  
  return (
    <>
      {/* <BackgroundStyleNew title="Reports" subTitle="This is the reports page">
        <OverlayDialogBox/>
        
      </BackgroundStyleNew> */}


      <OverlayDialogBox>
        <NewCustomerForm/>
      </OverlayDialogBox>
    </>
  );
}

export default Reports;
