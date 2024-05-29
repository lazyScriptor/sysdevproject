import React, { useContext, useEffect } from "react";
import "../Stylings/dashboard.css";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/Contexts";
import axios from "axios";

function DasboardMain() {
  const { setIsAuthenticated, userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {

  //   // Check if token exists when component mounts
  //   axios
  //     .get("http://localhost:8085/isUserAuth", {
  //       headers: {
  //         "x-access-token": localStorage.getItem("token"),
  //       },
  //     })
  //     .then((response) => {
  //       if (response.data.auth == false) {
  //         setIsAuthenticated(false);
  //       }
  //       console.log("token details ", response);
  //     });
  // }, [isAuthenticated]); // Include isAuthenticated as a dependency
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      setIsAuthenticated(false);
    }
  }, []);
  //This ensure that the user cant cme bakc after logout by press the back button

  return (
    <>
      <BackgroundStyleNew
        title={"Dashboard"}
        subTitle={"This is the dashboard page"}
      ></BackgroundStyleNew>
    </>
  );
}

export default DasboardMain;
