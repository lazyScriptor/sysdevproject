import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import NewCustomerForm from "../Pages/NewCustomerForm";
import { Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function BackdropCustomerForm() {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
//   const handleOpen = () => {
//     setOpen(true);
//   };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",

          }}
        >
          <Button
           variant="error"
            sx={{ width: "10px" ,pl:6}}
            onClick={handleClose}
          >
            <FontAwesomeIcon icon={faXmark} size="lg" style={{}} />
          </Button>
          <Box>
            <NewCustomerForm />
          </Box>
        </Box>
      </Backdrop>
    </div>
  );
}
