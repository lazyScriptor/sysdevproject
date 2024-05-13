import React, { useContext, useEffect } from "react";
import NewLogin from "./NewLogin";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/Contexts";

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
      <BackgroundStyleNew
        title={"Inbox"}
        subTitle={"This is the inbox page"}
      >
       
      </BackgroundStyleNew>
    </>
  );
}

export default Inbox;
