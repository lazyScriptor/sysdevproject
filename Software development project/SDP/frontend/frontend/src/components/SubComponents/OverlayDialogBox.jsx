import * as React from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { PopupContext } from "../../Contexts/Contexts";
import NewCustomerForm from "../Pages/NewCustomerForm";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function OverlayDialogBox({ children }) {
  const { boolvalue, setBoolvalue, userData, setUserData } =
    useContext(PopupContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));

  const handleClose = () => {
    setBoolvalue(false);
  };

  return (
    <>
      <Dialog
      
        sx={{ borderRadius: 5 }}
        maxWidth="xl"
        TransitionComponent={Transition}
        fullScreen={fullScreen}
        open={boolvalue}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        BackdropProps={{
          style: {
            backdropFilter: "blur(5px)", // Adjust the blur intensity as needed
          },
        }}
      >
        {children}
      </Dialog>
    </>
  );
}
