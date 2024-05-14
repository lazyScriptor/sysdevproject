import React, { useContext, useEffect } from "react";
import NewLogin from "./NewLogin";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/Contexts";
import NavBarComponent from "./NavBarComponent";
import InvoiceNew from "./Invoice/InvoiceNew";

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
      <InvoiceNew/>
    </>
  );
}

export default Inbox;
