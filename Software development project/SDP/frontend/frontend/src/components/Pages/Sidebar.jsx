import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Offcanvas from "react-bootstrap/Offcanvas";
import adminImage from "../../assets/profileImage.jpeg";
import "../Stylings/sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCellsLarge,
  faHouse,
  faInbox,
  faLayerGroup,
  faUser,
  faToolbox,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import DashboardCategoryBtn from "../Buttons/DashboardButtons.jsx";

function Sidebar(props) {
  //login ekenui anith main pges walinui pass karna arguments wenas
  //login eken ewanne object ekak,main opages wlain ewanne bool value ekak
  //bool value eka simple wodohta props walta assign wenawa
  //object eka capture kraganne location hook eken
  const { showValue } = props;
  console.log(props)

  const [show, setShow] = useState(false);

  const location = useLocation();
  const username = location.state ? location.state.username : "Dummy user";
  const role = location.state ? location.state.role : "Dummy role";

  useEffect(() => {
    setShow(true);
  }, [showValue]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <button onClick={handleShow} className="open-button">
        <FontAwesomeIcon icon={faBars} size="xl" style={{ color: "#505050" }} />
      </button>
      <Offcanvas
        bsPrefix="offcanvas"
        show={show}
        onHide={handleClose}
        backdrop="static"
        scroll="true"
        placement="start"
        className="sidebar-container"
      >
        <div className="offcanvas-header-wrapper">
          <Offcanvas.Header
            closeButton={false}
            style={{
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
                textAlign: "center",
              }}
            >
              <h5 style={{ textAlign: "center" ,color:"white"}}>{role}</h5>
              <h6 style={{color:"white"}}>{username}</h6>
            </div>
          </Offcanvas.Header>
          <button className="close-button" onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} size="sm" />
          </button>
        </div>
        <Offcanvas.Body>
          <div className="offcanvas-body">
            <DashboardCategoryBtn
              name="Dashboard"
              icon={faTableCellsLarge}
              destination="/DashboardMain"
            />
            <DashboardCategoryBtn
              name="Inbox"
              icon={faInbox}
              destination="/Inbox"
            />
            <DashboardCategoryBtn
              name="Invoices"
              icon={faLayerGroup}
              destination="/Invoice"
            />
            <DashboardCategoryBtn
              name="Customers"
              icon={faUser}
              destination="/Customers"
            />
            <DashboardCategoryBtn
              name="Equipment"
              icon={faToolbox}
              destination="/Equipment"
            />
            <DashboardCategoryBtn
              name="Reports"
              icon={faHouse}
              destination="/Reports"
            />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Sidebar;
