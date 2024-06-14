import React, { useState, useEffect, useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../../Stylings/sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WidgetsIcon from "@mui/icons-material/Widgets";
import {
  faTableCellsLarge,
  faLayerGroup,
  faUser,
  faToolbox,
  faXmark,
  faRightFromBracket,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import DashboardCategoryBtn from "../../Buttons/DashboardButtons.jsx";
import { AppCustomContext } from "../../../App.jsx";
import Button from "@mui/material/Button";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../imagedbfirebase.js";
import defaultImage from "../../../assets/username.png"; // Make sure this path is correct
import { Typography } from "@mui/material";

export default function SidebarCashier() {
  const [imageMap, setImageMap] = useState({});
  const imageListRef = ref(storage, "UserImages/");

  // context data
  const { usernamee, rolee, show, setShow } = useContext(AppCustomContext);
  const [contextUserName, setContextUserName] = useState();
  const [contextRole, setContextRole] = useState();
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    const fetchImages = async () => {
      const response = await listAll(imageListRef);
      const imageMap = {};
      for (const item of response.items) {
        const url = await getDownloadURL(item);
        const name = item.name.split(".")[0];
        imageMap[name] = url;
      }
      setImageMap(imageMap);

      // Check if the username exists in the imageMap
      if (username && !imageMap[username]) {
        setImageMap((prevImageMap) => ({
          ...prevImageMap,
          [username]: defaultImage,
        }));
      }
    };
    fetchImages();
  }, [username]);

  // context data over
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button
        sx={{ position: "absolute", backgroundColor: "" }}
        onClick={() => setShow(!show)}
      >
        <WidgetsIcon fontSize="large" sx={{ }} />
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
            {username && (
              <div>
                <img
                  src={imageMap[username] || defaultImage}
                  alt={username}
                  style={{
                    maxWidth: "50px",
                    maxHeight: "50px",
                    borderRadius: "50%",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </div>
            )}
            <div className="header-text">
              <Typography variant="body2">
                {localStorage.getItem("userRole").toUpperCase()}
              </Typography>
              <Typography variant="body2">
                {username.toLocaleUpperCase()}
              </Typography>
            </div>
            <Button
              onClick={handleClose}
              sx={{
                visibility: "hidden",
                borderRadius: 3,
                position: "absolute",
                right: "20px",
                top: "15px",
                maxWidth: "50px",
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
