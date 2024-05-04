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
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

function Sidebar() {
  //context data
  const { usernamee, rolee } = useContext(AppCustomContext);
  const [contextUserName, setContextUserName] = useState();
  const [contextRole, setContextRole] = useState();

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
      <Button
        onClick={handleShow}
        className="open-button"
        sx={{

          position: "fixed",
          top: "00px",
          left: "0px",
          height:"40px",
          zIndex: 999, 
          borderRadius:"0px",
          backgroundColor: (theme) => theme.palette.primary[50],
          "&:hover": {
            backgroundColor: (theme) => theme.palette.primary[200],
          },
        }}
      >
        <Typography sx={{mr:2,color: "#cecececd"}}>
          Open the side bar
        </Typography>
        {/* <FontAwesomeIcon icon={faBars} size="xl" style={{ color: "#505050" }} /> */}
      </Button>
      <Offcanvas
        bsPrefix="offcanvas"
        show={show}
        onHide={handleClose}
        scroll="true"
        placement="start"
        className="sidebar-container"
      >
        <div className="offcanvas-header-wrapper">
          <Offcanvas.Header closeButton={true}>
            <img
              className="profile-image"
              src={adminImage}
              alt="image not found"
            />
            <div className="header-text">
              <h4>{rolee}</h4>
              <h6>{usernamee}</h6>
            </div>
            <Button
            
              onClick={handleClose}
              sx={{
                visibility:"hidden",
                borderRadius: 3,

                position: "absolute",
                right: "20px",
                top:"15px",
                maxWidthwidth: "50px",
                maxHeight: "50px",
                

                "&:hover": {
                  backgroundColor: (theme) => theme.palette.primary[800], // Change to the desired hover color
                },
              }}
            >
              <FontAwesomeIcon icon={faXmark} size="xs" />
            </Button>
          </Offcanvas.Header>
        </div>
        <Offcanvas.Body>
          <hr />
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
            <hr />
            <DashboardCategoryBtn
              name="Settings"
              icon={faHouse}
              destination="/Settings"
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
