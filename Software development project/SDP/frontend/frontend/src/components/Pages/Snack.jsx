import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Snack(props) {
  const { type, message, open, handleClose } = props;


  
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} >
      <Alert onClose={handleClose} severity={type} variant='filled' sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Snack;
//define prop types here later