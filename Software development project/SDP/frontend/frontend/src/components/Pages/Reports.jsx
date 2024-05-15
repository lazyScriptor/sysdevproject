import React, { useContext, useEffect } from "react";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew.jsx";
import { AuthContext } from "../../Contexts/Contexts.jsx";
import NavBarComponent from "./NavBarComponent.jsx";
import LoginFormMUI from "./LoginFormMUI.jsx";

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
