import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import adminImage from "../../assets/profileImage.jpeg";
import "../Stylings/Dashboard.css";

import DashboardButtons from '../Buttons/DashboardButtons.jsx'

//icons using for the project
import {
  faTableCellsLarge,
  faHouse,
  faInbox,
  faLayerGroup,
  faUser,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="dashboard-container">
      <button onClick={handleShow} className="open-button"></button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        backdrop="static"
        scroll="true"
        placement="start"
      >
        <div className="offcanvas-header-wrapper">
          <Offcanvas.Header
            closeButton={false}
            style={{
              border: "1px solid black",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <img
              className="profile-image"
              src={adminImage}
              alt="image not found"
            />
            <div
              style={{
                marginTop: "30px",
                border: "solid 1px black",
                textAlign: "center",
              }}
            >
              <h5 style={{ border: "1px solid black", textAlign: "center" }}>
                Admin
              </h5>
              <h7 style={{ border: "1px solid black" }}>Theekshana</h7>
            </div>
          </Offcanvas.Header>
          <button className="close-button" onClick={handleClose}>
            X
          </button>
        </div>
        <Offcanvas.Body>
          <div className="offcanvas-body">
            <DashboardButtons name="Dashboard" icon={faTableCellsLarge} className="cat"/>
            <DashboardButtons name="Inbox" icon={faInbox}/>
            <DashboardButtons name="Invoices" icon={faLayerGroup}/>
            <DashboardButtons name="Customers" icon={faUser}/>
            <DashboardButtons name="Equipment" icon={faToolbox}/>
            <DashboardButtons name="Reports" icon={faHouse}/>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      
    </div>
  );
}

export default Dashboard;
