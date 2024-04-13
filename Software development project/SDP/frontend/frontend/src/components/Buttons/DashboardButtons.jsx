import React from "react";
import "./dashboardButtons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";


function DashboardCategoryBtn({ name, icon, destination }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(`${name} clicked`);
    if (destination) {
      navigate(destination); // Navigate to the specified destination
    }
  };

  return (
    <>
      <button className="category-button" onClick={handleClick}>
        <FontAwesomeIcon
          icon={icon}
          size="xl"
          style={{ color: "#FFD43B", paddingRight: "10px"}}
        />
        {name}
        <FontAwesomeIcon className="attachment" icon={faArrowRight} style={{color: "#ff6a00"}} />
      </button>
    </>
  );
}

export default DashboardCategoryBtn;
