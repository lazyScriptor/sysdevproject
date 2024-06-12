import React, { useContext, useEffect } from "react";
import "../Stylings/dashboard.css";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/Contexts";
import axios from "axios";
import Chart1 from "./Dashboard/Chart1";
import Chart2 from "./Dashboard/Chart2";
import Chart3 from "./Dashboard/Chart3";

function DasboardMain() {
  const { setIsAuthenticated, userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <BackgroundStyleNew
        title={"Dashboard"}
        subTitle={"This is the dashboard page"}
      >
        <Chart1 />
        <Chart2/>
        <Chart3/>
      </BackgroundStyleNew>
    </>
  );
}

export default DasboardMain;
