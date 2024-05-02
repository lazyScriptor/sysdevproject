import React, { useState } from "react";
import CustomerPopupContext from "./CustomerPopupContext";

const CustomerContextProvider = ({ children }) => {
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
    <CustomerPopupContext.Provider value={{boolvalue,setBoolvalue, userData, setUserData }}>
     {children}
    </CustomerPopupContext.Provider>
  );
};
export default CustomerContextProvider;
