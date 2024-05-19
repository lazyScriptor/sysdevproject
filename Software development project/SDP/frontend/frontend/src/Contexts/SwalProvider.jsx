import React, { useContext, useCallback } from "react";
import Swal from "sweetalert2";
import { SwalContext } from "./Contexts";

export default function SwalProvider ({ children }) {
  const showAlert = useCallback(({ icon, title, text, footer, confirmButtonText }) => {
    Swal.fire({
      icon: icon || "error",
      title: title || "Oops...",
      text: text || "Something went wrong!",
      footer: footer || '<a href="customers">Why do I have this issue?</a>',
      showConfirmButton: !!confirmButtonText,
      confirmButtonText: confirmButtonText || "No",
    });
  }, []);

  return (
    <SwalContext.Provider value={showAlert}>
      {children}
    </SwalContext.Provider>
  );
};

