import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../Contexts/Contexts.jsx";

function Reports() {
  const { setIsAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      setIsAuthenticated(false);
    }
  }, []);
  return <></>;
}

export default Reports;
