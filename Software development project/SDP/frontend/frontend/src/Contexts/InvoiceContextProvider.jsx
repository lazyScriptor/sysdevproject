import { useEffect, useState } from 'react';
import { InvoiceContext } from './Contexts';

export default function InvoiceContextProvider({ children }) {
  const [fullDetailsEquipmentArray, setFullDetailsEquipmentArray] = useState([]); //FULL DETAIL OBJECT.ARRAY OF OBJECTS
  const [checkState, setCheckState] = useState(false);
  const [eqObject, setEqObject] = useState([]);
  const [invoiceObject, setInvoiceObject] = useState({
    iDstatus:false,
    payments:0,
    eqdetails:[],
    advance:0,
    customerDetails:{},
    payments:[],
    InvoiceID:0
  });
  const [responseManageToogle, setResponseManageToogle] = useState(false);
  const [paymentArray, setPaymentArray] = useState([]);
  const [paymentId, setPaymentId] = useState(0);
  const clearObject = () => {
    setEqObject([])
    setInvoiceObject({});
  };

  const updateValue = (value, newVaalue) => {
    setInvoiceObject((preObject) => ({ ...preObject, [value]: newVaalue }));
  };
  const clearValues = () => {
    setInvoiceObject((prevObject) => {
      const clearedObject = {};
      Object.keys(prevObject).forEach((key) => {
        clearedObject[key] = ''; // or null, or undefined
      });
      return clearedObject;
    });
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
        paymentArray,
        setPaymentArray,
        clearValues,
        paymentId,
        setPaymentId,
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
