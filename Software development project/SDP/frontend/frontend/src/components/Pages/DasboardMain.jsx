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
import Chart4 from "./Dashboard/Chart4";

function DasboardMain() {
  const { setIsAuthenticated, userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const paperStyling = {
    p: 3,
    borderRadius: 1,
    ml: 5,
  };
  return (
    <>
      <Box id="main-body">
        <Box id="body" sx={{ display: "flex" }}>
          <Box
            sx={{}}
            gap={3}
            display={"flex"}
            alignItems={"start"}
            justifyContent={"start"}
            height={"100vh"}
            width={"100vw"}
          >
            <Box display={"flex"} gap={3} sx={{ mt: 5 }}>
              <Paper elevation={5} sx={paperStyling}>
                <Chart2 />
              </Paper>
              <Paper elevation={5} sx={paperStyling}>
                <Chart1 />
              </Paper>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={7}
              sx={{ mt: 5 }}
            >
              <Paper elevation={5} sx={paperStyling}>
                <Chart3 />
              </Paper>
              <Paper elevation={5} sx={paperStyling}>
                <Chart4 />
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DasboardMain;
