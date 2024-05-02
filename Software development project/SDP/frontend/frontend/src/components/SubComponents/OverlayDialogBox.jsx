import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import CustomerPopupContext from '../../Contexts/CustomerPopupContext';
import NewCustomerForm from '../Pages/NewCustomerForm';

export default function OverlayDialogBox() {
  const {boolvalue,setBoolvalue}=useContext(CustomerPopupContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setBoolvalue(!boolvalue);
  };

  return (

    <>
      <Dialog
        fullScreen={fullScreen}
        open={boolvalue}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <NewCustomerForm/>
      </Dialog>
    </>
  );
}