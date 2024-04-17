import React from "react";
import "./dashboardButtons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Button, Typography } from "@mui/material";

function DashboardCategoryBtn({ name, icon, destination }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(`${name} clicked`);
    if (destination) {
      navigate(destination); // Navigate to the specified destination
    }
  };

  return (
    <Button
    
      className="category-button"
      onClick={handleClick}
      sx={{
        pl:2,
        display: "flex",
        justifyContent: "start",
        alignContent: "start",
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: (theme) => theme.palette.primary[500] + "!important",
          "& .MuiTypography-subtitle1": {
            color: "white",
          },
        },
      }}
    >
      <FontAwesomeIcon
        className="fa-icon"
        icon={icon}
        size="lg"
        style={{ color: "#939393" }}
      />
      <Typography variant="subtitle1" ml={3}>
        {name}
      </Typography>
    </Button>
  );
}

export default DashboardCategoryBtn;
