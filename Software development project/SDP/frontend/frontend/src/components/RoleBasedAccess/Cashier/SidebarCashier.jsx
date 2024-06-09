import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../../Stylings/sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WidgetsIcon from "@mui/icons-material/Widgets";

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
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import DashboardCategoryBtn from "../../Buttons/DashboardButtons.jsx";

// context imports
import { useContext } from "react";
import { AppCustomContext } from "../../../App.jsx";
import Button from "@mui/material/Button";

export default function SidebarCashier() {
  //context data
  const { usernamee, rolee,show, setShow  } = useContext(AppCustomContext);
  const [contextUserName, setContextUserName] = useState();
  const [contextRole, setContextRole] = useState();

  

  //context data over
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button
        sx={{ position: "absolute", backgroundColor: "" }}
        onClick={() => setShow(!show)}
      >
        <WidgetsIcon fontSize="large" sx={{ colorL: "red" }} />
      </Button>
      <Offcanvas
        backdrop={false}
        scroll={true}
        show={show}
        onHide={handleClose}
        placement="start"
        className="sidebar-container"
      >
        <div className="offcanvas-header-wrapper">
          <Offcanvas.Header closeButton={true}>
            <div className="header-text">
              <h4>{localStorage.getItem("userRole")}</h4>
              <h6>{localStorage.getItem("username")}</h6>
            </div>
            <Button
              onClick={handleClose}
              sx={{
                visibility: "hidden",
                borderRadius: 3,

                position: "absolute",
                right: "20px",
                top: "15px",
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
              handlefunction={handleShow}
              name="Dashboard"
              icon={faTableCellsLarge}
              destination="/C-dashboard"
            />
            <DashboardCategoryBtn
              handlefunction={handleClose}
              name="Invoices"
              icon={faLayerGroup}
              destination="/C-invoice"
            />
            <DashboardCategoryBtn
              handlefunction={handleShow}
              name="Customers"
              icon={faUser}
              destination="/C-customer"
            />
            <DashboardCategoryBtn
              handlefunction={handleShow}
              name="Equipment"
              icon={faToolbox}
              destination="/C-equipment"
            />
            <DashboardCategoryBtn
              handlefunction={handleShow}
              name="Reports"
              icon={faNewspaper}
              destination="/Reports"
            />
       
            <hr />
            
            <DashboardCategoryBtn
              handlefunction={handleShow}
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


