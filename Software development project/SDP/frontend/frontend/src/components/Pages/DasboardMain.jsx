import React, { useContext, useEffect } from "react";
import "../Stylings/dashboard.css";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/Contexts";
import axios from "axios";
import Chart1 from "./Dashboard/Chart1";
import Chart2 from "./Dashboard/Chart2";
import Chart3 from "./Dashboard/Chart3";
import { Box, Paper } from "@mui/material";
import "../Stylings/rootstyles.css";

function DasboardMain() {
  const { setIsAuthenticated, userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const paperStyling = {
    p: 3,
    borderRadius: 1,
  };
  return (
    <>
      <Box id="main-body">
        <Box id="body" sx={{ display: "flex" }}>
          <Box
            gap={3}
            display={"flex"}
            alignItems={"flex-end"}
            justifyContent={"end"}
            height={"100vh"}
            width={"100vw"}
          >
            <Paper elevation={5} sx={paperStyling}>
              <Chart1 />
            </Paper>
            <Box display={"flex"} flexDirection={"column"} gap={3}>
              <Paper elevation={5} sx={paperStyling}>
                <Chart2 />
              </Paper>
              <Paper elevation={5} sx={paperStyling}>
                <Chart3 />
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DasboardMain;
