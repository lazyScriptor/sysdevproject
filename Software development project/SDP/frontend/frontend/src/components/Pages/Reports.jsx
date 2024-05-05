import React from "react";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew.jsx";
import InvoiceDataGrid from "../SubComponents/Datagrid/InvoiceDataGrid.jsx";
import data from '../SubComponents/Datagrid/dataSource.json'



function Reports() {
  return (
    <>
      <BackgroundStyleNew title="Reports" subTitle="This is the reports page">
        <InvoiceDataGrid dataSource={data}/>
      </BackgroundStyleNew>
    </>
  );
}

export default Reports;
