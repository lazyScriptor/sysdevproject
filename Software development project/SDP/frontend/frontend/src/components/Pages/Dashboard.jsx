import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import adminImage from "../../assets/profileImage.jpeg";
import "../Stylings/Dashboard.css";


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
            <div style={{marginTop:"30px",border:"solid 1px black"}}>
              <h5 style={{ border: "1px solid black" }}>Admin</h5>
              <h7 style={{ border: "1px solid black" }}>Theekshana</h7>
            </div>
          </Offcanvas.Header>
          <button className="close-button" onClick={handleClose}>
            X
          </button>
        </div>
        <Offcanvas.Body>
          <div className="offcanvas-body">
            <button className="category-button 1">Dashboard</button>
            <button className="category-button 2">Dashboard</button>
            <button className="category-button 3">Dashboard</button>
            <button className="category-button 4">Dashboard</button>
            <button className="category-button 5">Dashboard</button>
            <button className="category-button 6">Dashboard</button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Dashboard;
