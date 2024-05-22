import React, { useEffect } from "react";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew";
import EquipmentTable from "../SubComponents/EquipmentTable";
import { Box } from "@mui/material";
import EquipmentPageContentNew from "../SubComponents/EquipmentPageContentNew";

function Equipment() {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      setIsAuthenticated(false);
    }
  }, []);
  return (
    <>
      {/*   
      <BackgroundStyleNew
        title={"Equipment"}
        subTitle={"This is the equipment page"}
      >
        <>
          <EquipmentTable />
        </>
      </BackgroundStyleNew> */}

      <Box id="main-body">
        <Box id="body">
          <EquipmentPageContentNew/>
        </Box>
      </Box>
    </>
  );
}

export default Equipment;
