import React, { useState } from "react";
import { AlertComponentContext } from "./Contexts";
import { enqueueSnackbar } from "notistack";

function AlertComponentsContextProvider({ children }) {
   
  const snackHandleClickVariant = (snackMessage,snackVariant)  => {
    console.log("triggered",snackMessage,snackVariant)
    enqueueSnackbar(snackMessage, { variant: snackVariant });
  };
  return (
    <AlertComponentContext.Provider
      value={{snackHandleClickVariant}}
    >
      {children}
    </AlertComponentContext.Provider>
  );
}

export default AlertComponentsContextProvider;
