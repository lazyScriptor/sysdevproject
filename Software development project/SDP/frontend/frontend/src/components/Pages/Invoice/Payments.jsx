import {
  Box,
  Button,
  FormLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Lottie from "react-lottie";
import Cash from "../../../assets/Cash.json";
import Advance from "../../../assets/Advance.json";
import { InvoiceContext } from "../../../Contexts/Contexts";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";

const Buttonstyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "130px",
  height: "110px",
  border: "solid 1px",
  borderRadius: 4,
  opacity: 0.8,
  m: 2,
};
const ButtonstylesSubmit = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100px",
  height: "80px",
  color: "primary",
  border: "solid 1px",
  borderRadius: 4,
  opacity: 0.8,
  m: 2,
};

export default function Payments() {
  const [payment, setPayment] = useState("");
  const [buttonToogle, setButtonToogle] = useState(true);

  return (
    <Box
      sx={{
        width: "25vw",
        height: "350px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <ButtonSection
          buttonToogle={buttonToogle}
          setButtonToogle={setButtonToogle}
        />
      </Box>

      <Box sx={{ height: "273px", width: "300px" }}>
        {buttonToogle == true ? <AdvancePayment /> : <PaymentForm />}
      </Box>
    </Box>
  );
}

export function PaymentForm() {
  const { setPaymentArray, updateValue, invoiceObject } =
    useContext(InvoiceContext);

  const generatePaymentId = (invoiceId, amount) => {
    const date = new Date();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Month (zero-padded)
    const day = ("0" + date.getDate()).slice(-2); // Date (zero-padded)
    const milliseconds = ("00" + date.getMilliseconds()).slice(-3); // Milliseconds (zero-padded)
    const amountFormatted = amount.toFixed(2).replace(".", "").padStart(5, "0"); // Amount formatted as 5-digit number

    const uniquePart = uuidv4().slice(0, 3); // Using part of a UUID for additional uniqueness

    return `${invoiceId}${month}${day}${milliseconds}${amountFormatted}${uniquePart}`;
  };
  function dateformatter() {
    const createdDate = new Date();
    
    const year = createdDate.getFullYear();
    const month = String(createdDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(createdDate.getDate()).padStart(2, '0');
  
    const hours = String(createdDate.getHours()).padStart(2, '0');
    const minutes = String(createdDate.getMinutes()).padStart(2, '0');
    const seconds = String(createdDate.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  
  const schema = yup.object().shape({
    payment: yup
      .number()
      .typeError("Please enter a valid number")
      .required("This field is required")
      .min(0),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Generate the payment ID based on the InvoiceID and payment data
    const paymentId = generatePaymentId(invoiceObject.InvoiceID, data.payment);
  
    // Create the new payment object
    const newPayment = {
      invpay_payment_id: paymentId,
      invpay_payment_date: dateformatter(), // Current date and time
      invpay_amount: data.payment,
    };
  
    // Update the payments array in the invoiceObject context
    updateValue("payments", newPayment);
  
    // // Update the local payment array state
    // setPaymentArray((prev) => {
    //   const updatedArray = [...prev, newPayment];
    //   return updatedArray;
    // });
  };
  
  return (
    <>
      <form
        style={{ height: "60%", display: "flex", flexDirection: "column" }}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          fullWidth
          label="Payment Amount"
          {...register("payment")}
          error={!!errors.payment}
          helperText={errors.payment?.message}
        />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" sx={ButtonstylesSubmit} type="submit">
            Pay
          </Button>
        </Box>
      </form>
    </>
  );
}

export function AdvancePayment() {
  const {
    fullDetailsEquipmentArray,
    setFullDetailsEquipmentArray,
    checkState,
    responseManageToogle,
    setResponseManageToogle,
    setCheckState,
    eqObject,
    setEqObject,
    invoiceObject,
    setInvoiceObject,
    clearObject,
    updateValue,
    updateEqObject,
  } = useContext(InvoiceContext);

  const schema = yup.object().shape({
    advance: yup
      .number()
      .typeError("Please enter a valid number")
      .required("This field is required")
      .min(0),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    updateValue("advance", data.advance);
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4} width="100%">
          <TextField
            label="Advance payment"
            {...register("advance")}
            error={!!errors.advance}
            helperText={errors.advance?.message}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" sx={ButtonstylesSubmit} type="submit">
              Pay
            </Button>
          </Box>
        </Stack>
      </form>
    </>
  );
}

export function ButtonSection(props) {
  const { buttonToogle, setButtonToogle } = props;

  return (
    <>
      <Button
        sx={Buttonstyles}
        variant="outlined"
        onClick={() => {
          setButtonToogle(true);
        }}
      >
        <Lottie options={{ animationData: Advance }} width={100} />
        Advance
      </Button>
      <Button
        sx={Buttonstyles}
        variant="outlined"
        onClick={() => {
          setButtonToogle(false);
        }}
      >
        <Lottie options={{ animationData: Cash }} width={100} />
        Payment
      </Button>
    </>
  );
}
