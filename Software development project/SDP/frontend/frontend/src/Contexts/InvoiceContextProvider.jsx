import { useEffect, useState } from "react";
import { InvoiceContext } from "./Contexts";

export default function InvoiceContextProvider({ children }) {
  const [fullDetailsEquipmentArray, setFullDetailsEquipmentArray] = useState(
    []
  ); //FULL DETAIL OBJECT.ARRAY OF OBJECTS
  const [checkState, setCheckState] = useState(false);
  const [eqObject, setEqObject] = useState([]);
  const [invoiceObject, setInvoiceObject] = useState({});
  const [responseManageToogle, setResponseManageToogle] = useState(false);
  const [paymentArray, setPaymentArray] = useState([]);
  const [paymentId,setPaymentId]=useState(0);
  const clearObject = () => {
    setInvoiceObject({});
  };

  const updateValue = (value, newVaalue) => {
    setInvoiceObject((preObject) => ({ ...preObject, [value]: newVaalue }));
  };

  const updateEqObject = (newValue) => {
    // setEqObject((prev) => [...prev, { newValue }]);in this way you can add array under the newValue KEY name
    setEqObject((prev) => [...prev, newValue]);
  };

  useEffect(() => {
    console.log(invoiceObject);
  }, [invoiceObject]);

  return (
    <InvoiceContext.Provider
      value={{
        responseManageToogle,
        setResponseManageToogle,
        paymentArray, setPaymentArray,
        paymentId,setPaymentId,
        fullDetailsEquipmentArray,
        setFullDetailsEquipmentArray,
        checkState,
        setCheckState,
        eqObject,
        setEqObject,
        invoiceObject,
        setInvoiceObject,
        updateValue,
        updateEqObject,
        clearObject,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
