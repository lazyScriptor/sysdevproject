import React, { useContext, useEffect } from "react";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew.jsx";
import { AuthContext } from "../../Contexts/Contexts.jsx";

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
      <BackgroundStyleNew
        title="Reports"
        subTitle="This is the reports page"
      ></BackgroundStyleNew>
    </>
  );
}

export default Reports;
