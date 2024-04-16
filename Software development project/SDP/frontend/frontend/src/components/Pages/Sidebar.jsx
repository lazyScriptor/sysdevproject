import React, { useState, useEffect } from "react";

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
  faRightFromBracket,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import DashboardCategoryBtn from "../Buttons/DashboardButtons.jsx";

// context imports
import { useContext } from "react";
import { AppCustomContext } from "../../App.jsx";

function Sidebar() {
  //context data
  const { usernamee, rolee } = useContext(AppCustomContext);
  const [contextUserName,setContextUserName]=useState();
  const [contextRole,setContextRole]=useState();
  

  console.log(
    "This is fresh passed username",
    usernamee,
    "This is fresh passed role",
    rolee
  );

  //context data over
  const [show, setShow] = useState(false);
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
          <Offcanvas.Header closeButton={false}>
            <img
              className="profile-image"
              src={adminImage}
              alt="image not found"
            />
            <div className="header-text">
              <h4>{rolee}</h4>
              <h6>{usernamee}</h6>
            </div>
          </Offcanvas.Header>
          <button className="close-button" onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} size="xs" />
          </button>
        </div>
        <Offcanvas.Body>
          <hr/>
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
              icon={faNewspaper}
              destination="/Reports"
            />
            <hr/>
            <DashboardCategoryBtn
              name="Empty"
              icon={faHouse}
              destination="/Reports"
            />
            <DashboardCategoryBtn
              name="Logout"
              icon={faRightFromBracket}
              destination="/"
            />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Sidebar;
