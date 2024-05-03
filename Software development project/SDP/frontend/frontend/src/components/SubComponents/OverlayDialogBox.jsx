import * as React from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import {PopupContext} from "../../Contexts/Contexts";
import NewCustomerForm from "../Pages/NewCustomerForm";

export default function OverlayDialogBox({children}) {
  const { boolvalue, setBoolvalue, userData, setUserData } =
    useContext(PopupContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));

  const handleClose = () => {
    setBoolvalue(!boolvalue);
  };

  return (
    <>
      <Dialog
     maxWidth="xl"
     
      sx={{}}
        fullScreen={fullScreen}
        open={boolvalue}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        
      >
        {children}
      </Dialog>
    </>
  );
}