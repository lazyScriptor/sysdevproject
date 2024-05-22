import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../Contexts/Contexts.jsx";
import CustomerForm from "../SubComponents/CustomerForm.jsx";

function Reports() {
  const { setIsAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      setIsAuthenticated(false);
    }
  }, []);
  return (
    <>
      <CustomerForm />
    </>
  );
}

export default Reports;
