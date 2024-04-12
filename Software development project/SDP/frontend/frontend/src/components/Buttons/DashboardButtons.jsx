import React from "react";
import "./dashboardButtons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function DashboardCategoryBtn({ name, icon, classname }) {
  return (
    <>
      <button className="category-button">
        
        <FontAwesomeIcon
          icon={icon}
          size="xl"
          style={{ color: "#FFD43B", paddingRight: "10px" }}
        />
        {name}
      </button>
      <p className={classname}>hfhfy</p>
    </>
  );
}

export default DashboardCategoryBtn;
