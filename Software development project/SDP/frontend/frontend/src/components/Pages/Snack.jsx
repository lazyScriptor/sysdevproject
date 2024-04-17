import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Snack(props) {
  const { type, message, open, handleClose } = props;

  React.useEffect(() => {
    let timer;
    if (open) {
      // Set a timer to close the Snackbar after 3 seconds
      timer = setTimeout(() => {
        handleClose();
      }, 3000);
    }

    // Clear the timer when the component unmounts or when open changes to false
    return () => {
      clearTimeout(timer);
    };
  }, [open, handleClose]);

  return (
    <Snackbar open={open} autoHideDuration={null} onClose={handleClose} >
      <Alert onClose={handleClose} severity={type} variant='filled' sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Snack;
