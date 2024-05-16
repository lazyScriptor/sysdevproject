import { Button } from "@mui/material";
import React from "react";
import Swal from "sweetalert2";

function Swala({ icon, title, text, footer ,buttonContent, swalButtonContent}) {
  const showAlert = () => {
    Swal.fire({
      icon: icon || "error",
      title: title || "Oops...",
      text: text || "Something went wrong!",
      footer: footer || '<a href="customers">Why do I have this issue?</a>',
      showConfirmButton: !!swalButtonContent,
      confirmButtonText: swalButtonContent || "No",
    });
  };

  return (
    <Button variant="outlined" onClick={showAlert} style={{ background: "none", border: "none", cursor: "pointer" }}>
      {buttonContent}
    </Button>
  );
}

export default Swala;
