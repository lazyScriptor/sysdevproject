import { useEffect, useState } from "react";
import { InvoiceContext } from "./Contexts";

export default function InvoiceContextProvider({ children }) {
  const [fullDetailsEquipmentArray, setFullDetailsEquipmentArray] = useState(
    []
  ); //FULL DETAIL OBJECT.ARRAY OF OBJECTS
  const [checkState, setCheckState] = useState(false);
  const [eqObject, setEqObject] = useState([]);
  const [invoiceObject, setInvoiceObject] = useState({
    iDstatus: false,
    eqdetails: [],
    advance: 0,
    customerDetails: {},
    payments: [],
    InvoiceID: 0,
  });
  const [responseManageToogle, setResponseManageToogle] = useState(false);
  const [paymentArray, setPaymentArray] = useState([]);
  const [paymentId, setPaymentId] = useState(0);
  const clearObject = () => {
    setEqObject([]);
    setInvoiceObject({
      iDstatus: false,
      eqdetails: [],
      advance: 0,
      customerDetails: {},
      payments: [],
      InvoiceID: 0,
    });
  };
  const clearPaymentArray = () => {
    setPaymentArray([]);
  };

  const updateValue = (value, newVaalue) => {
    setInvoiceObject((preObject) => ({ ...preObject, [value]: newVaalue }));
  };
  const clearValues = () => {
    setInvoiceObject((prevObject) => {
      const clearedObject = {};
      Object.keys(prevObject).forEach((key) => {
        clearedObject[key] = ""; // or null, or undefined
      });
      return clearedObject;
    });
  };

  const updateEqObject = (newValue) => {
    // setEqObject((prev) => [...prev, { newValue }]);in this way you can add array under the newValue KEY name
    setEqObject((prev) => [...prev, newValue]);
  };

  const [updateFlag, setUpdateFlag] = useState(false);

  useEffect(() => {
    if (updateFlag) {
      console.log(invoiceObject);
      const removeDuplicated = () => {
        const uniqueObjects = eqObject.reduce((acc, current) => {
          if (!acc[current.eq_id]) {
            acc[current.eq_id] = current;
          }
          return acc;
        }, {});
        // Convert uniqueObjects back to an array of values
        return Object.values(uniqueObjects);
      };
    
      // Get the unique array
      const uniqueArray = removeDuplicated();
    
      // Update eqObject state with the unique array
      setEqObject(uniqueArray);
    
      // Log the unique array
      console.log("uniq", uniqueArray);
    }
  }, [invoiceObject]);
  
  // Set updateFlag to true after the component mounts to allow the initial update
  useEffect(() => {
    setUpdateFlag(true);
  }, []);


  return (
    <InvoiceContext.Provider
      value={{
        responseManageToogle,
        setResponseManageToogle,
        clearPaymentArray,
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
