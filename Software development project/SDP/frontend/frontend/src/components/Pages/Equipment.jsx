import React, { useEffect } from "react";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew";
import EquipmentTable from "../SubComponents/EquipmentTable";


function Equipment() {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      setIsAuthenticated(false);
    }
  }, []);
  return (
    <>
      <BackgroundStyleNew
        title={"Equipment"}
        subTitle={"This is the equipment page"}
      >
        <>
          <EquipmentTable />
        </>
      </BackgroundStyleNew>
    </>
  );
}

export default Equipment;
