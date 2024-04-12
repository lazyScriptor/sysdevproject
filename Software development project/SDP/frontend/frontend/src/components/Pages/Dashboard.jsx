import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import adminImage from "../../assets/profileImage.jpeg";
import "../Stylings/Dashboard.css";
import { faTableCellsLarge, faHouse, faInbox, faLayerGroup, faUser, faToolbox } from "@fortawesome/free-solid-svg-icons";
import DashboardCategoryBtn from '../Buttons/DashboardButtons.jsx'

function Dashboard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              <h6 style={{ border: "1px solid black" }}>Theekshana</h6>
            </div>
          </Offcanvas.Header>
          <button className="close-button" onClick={handleClose}>
            X
          </button>
        </div>
        <Offcanvas.Body>
          <div className="offcanvas-body">
            <DashboardCategoryBtn name="Dashboard" icon={faTableCellsLarge} destination="/Dashboard"/>
            <DashboardCategoryBtn name="Inbox" icon={faInbox} destination="/Inbox"/>
            <DashboardCategoryBtn name="Invoices" icon={faLayerGroup} destination="/Invoice"/>
            <DashboardCategoryBtn name="Customers" icon={faUser} destination="/Customers"/>
            <DashboardCategoryBtn name="Equipment" icon={faToolbox} destination="/Equipment"/>
            <DashboardCategoryBtn name="Reports" icon={faHouse} destination="/Reports"/>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Dashboard;
