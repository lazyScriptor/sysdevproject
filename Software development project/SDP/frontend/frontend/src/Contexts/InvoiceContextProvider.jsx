import React, { useEffect, useState } from "react";
import { InvoiceContext } from "./Contexts";

export default function InvoiceContextProvider({ children }) {
  const [fullDetailsEquipmentArray, setFullDetailsEquipmentArray] = useState(
    []
  );
  const [checkState, setCheckState] = useState(false);
  const [eqObject, setEqObject] = useState([]);
  const [invoiceSearchBtnStatus, setInvoiceSearchBtnStatus] = useState(false);
  const [invoiceObject, setInvoiceObject] = useState({
    idStatus: false,
    eqdetails: [],
    advance: 0,
    customerDetails: {},
    payments: [],
    InvoiceID: 0,
  });
  const [responseManageToggle, setResponseManageToggle] = useState(false);
  const [paymentArray, setPaymentArray] = useState([]);
  const [paymentId, setPaymentId] = useState(0);
  const [updateFlag, setUpdateFlag] = useState(false);

  const clearObject = () => {
    setEqObject([]);
    setInvoiceObject({
      idStatus: false,
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

  const updateValue = (key, newValue) => {
    setInvoiceObject((prevObject) => {
      if (key === "eqdetails") {
        const updatedEqDetails = prevObject.eqdetails.filter(
          (item) => item.eq_id !== newValue.eq_id
        );
        return { ...prevObject, eqdetails: [...updatedEqDetails, newValue] };
      } else if (key === "payments") {
        const updatedPayments = prevObject.payments.filter(
          (item) => item.invpay_payment_id !== newValue.invpay_payment_id
        );
        return { ...prevObject, payments: [...updatedPayments, newValue] };
      } else {
        return { ...prevObject, [key]: newValue };
      }
    });
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
    setEqObject((prev) => [...prev, newValue]);
  };
  useEffect(() => {
    console.log("context useEffect invoice objetct", invoiceObject);
  }, [invoiceObject]);
  // useEffect(() => {
  //   if (updateFlag) {
  //     console.log(invoiceObject);
  //     const removeDuplicated = () => {
  //       const uniqueObjects = eqObject.reduce((acc, current) => {
  //         if (!acc[current.eq_id]) {
  //           acc[current.eq_id] = current;
  //         }
  //         return acc;
  //       }, {});
  //       return Object.values(uniqueObjects);
  //     };

  //     const uniqueArray = removeDuplicated();
  //     setEqObject(uniqueArray);
  //     console.log("unique", uniqueArray);
  //   }
  // }, [invoiceObject, eqObject, updateFlag]);

  // useEffect(() => {
  //   setUpdateFlag(true);
  // }, []);

  return (
    <InvoiceContext.Provider
      value={{
        responseManageToggle,
        setResponseManageToggle,
        clearPaymentArray,
        paymentArray,
        setPaymentArray,
        invoiceSearchBtnStatus,
        setInvoiceSearchBtnStatus,
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
