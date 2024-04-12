import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function Customers() {
  return (
    <div>
      <h1>customers</h1>
      <FontAwesomeIcon icon={faHouse} bounce style={{color: "#FFD43B",}} />
    </div>
  );
}

export default Customers;
