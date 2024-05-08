import { useState } from "react";
import { InvoiceContext } from "./Contexts";

export default function InvoiceContextProvider({ children }) {
  const [equipmentObject, setEquipmentObject] = useState({});
  const [checkState, setCheckState] = useState(false);
  const [eqArray, setEqArray] = useState([]);
  const [invoiceObject, setInvoiceObject] = useState({

  });
  const updateValue = (value,newVaalue) => {
    setInvoiceObject((preObject)=>({ ...preObject, [value]: newVaalue }));
  };

  return (
    <InvoiceContext.Provider
      value={{
        equipmentObject,
        setEquipmentObject,
        checkState,
        setCheckState,
        eqArray,
        setEqArray,
        invoiceObject,
        setInvoiceObject,
        updateValue
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
