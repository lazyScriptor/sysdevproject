import React, { useContext, useEffect } from "react";
import "../Stylings/rootstyles.css";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew";
import CustomerTable from "../SubComponents/CustomerTable";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/Contexts";
import NavBarComponent from "./NavBarComponent";

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

      <BackgroundStyleNew
        title={"Customer Details"}
        subTitle={"This is the customer page"}
      >
        <CustomerTable />
      </BackgroundStyleNew>
    </>
  );
}

export default Customers;
