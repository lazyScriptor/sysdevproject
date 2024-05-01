import React from "react";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew";
import EquipmentTable from "../SubComponents/EquipmentTable";


function Equipment() {
  return (
    <>
      <BackgroundStyleNew
        title={"Equipment"}
        subTitle={"This is the equipment page"}
      >
        <>
          <EquipmentTable/>
        </>
      </BackgroundStyleNew>
    </>
  );
}

export default Equipment;
