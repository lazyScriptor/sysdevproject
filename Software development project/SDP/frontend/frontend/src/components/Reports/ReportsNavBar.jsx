import React from "react";
import { Box, Paper, Button, TextField, colors, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ConstructionIcon from "@mui/icons-material/Construction";
function ReportsNavBar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const reportCategoryButton = {
    width: "20vw",
    height: "100px",
    backgroundColor: theme.palette.primary[300],
    borderRadius: "20px",
    border: "0",
    marginBottom: 10,
    color: "white",
  };
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        gap={4}
      >
        <Button
          onClick={() => navigate("/Reports")}
          variant="contained"
          style={reportCategoryButton}
        >
          <ConstructionIcon sx={{ fontSize: 80 }} />
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/Reports-invoices")}
          style={reportCategoryButton}
        >
          <DescriptionOutlinedIcon sx={{ fontSize: 80 }} />
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/Reports-customers")}
          style={reportCategoryButton}
        >
          <PersonSearchIcon sx={{ fontSize: 80 }} />
        </Button>
      </Box>
    </>
  );
}

export default ReportsNavBar;
