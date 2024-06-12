import React, { useContext, useEffect } from "react";
import "../Stylings/dashboard.css";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/Contexts";
import axios from "axios";
import LineChartComponent from "./Dashboard/Chart1";

function DasboardMain() {
  const { setIsAuthenticated, userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <BackgroundStyleNew
        title={"Dashboard"}
        subTitle={"This is the dashboard page"}
      >
        <LineChartComponent />
      </BackgroundStyleNew>
    </>
  );
}

export default DasboardMain;
