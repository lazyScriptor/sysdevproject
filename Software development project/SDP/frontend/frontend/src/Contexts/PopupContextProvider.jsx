import React, { useState } from "react";
import {PopupContext}  from "./Contexts";

const ContextProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        cus_id: "",
        cus_fname: "",
        cus_lname: "",
        nic: "",
        cus_phone_number: "",
        cus_address1: "",
        cus_address2: "",
      });
      
  const [boolvalue,setBoolvalue]=useState(false);
  
  return (
    <PopupContext.Provider value={{boolvalue,setBoolvalue, userData, setUserData }}>
     {children}
    </PopupContext.Provider>
  );
};
export default ContextProvider;