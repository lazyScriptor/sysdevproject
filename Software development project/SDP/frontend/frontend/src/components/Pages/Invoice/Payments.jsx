import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import Lottie from "react-lottie";
import Cash from "../../../assets/Cash.json";
import Advance from "../../../assets/Advance.json";
import { InvoiceContext } from "../../../Contexts/Contexts";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

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
  color: "white",
  borderRadius: 4,
  opacity: 0.8,
  m: 2,
};
const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
  },
};

export default function Payments() {
  const { invoiceSearchBtnStatus } = useContext(InvoiceContext);
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
          invoiceSearchBtnStatus={invoiceSearchBtnStatus}
        />
      </Box>

      <Box sx={{ height: "273px", width: "300px" }}>
        {invoiceSearchBtnStatus ? (
          <PaymentForm />
        ) : buttonToogle ? (
          <AdvancePayment />
        ) : (
          <PaymentForm />
        )}
      </Box>
    </Box>
  );
}

export function PaymentForm() {
  const { updateValue, invoiceObject } = useContext(InvoiceContext);

  const generatePaymentId = (invoiceId, amount) => {
    const date = new Date();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const milliseconds = ("00" + date.getMilliseconds()).slice(-3);
    const amountFormatted = amount.toFixed(2).replace(".", "").padStart(5, "0");
    const uniquePart = uuidv4().slice(0, 3);
    return `${invoiceId}${month}${day}${milliseconds}${amountFormatted}${uniquePart}`;
  };

  function dateformatter() {
    const formattedDate = new Date();
    
    return  (formattedDate);
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
    const paymentId = generatePaymentId(invoiceObject.InvoiceID, data.payment);

    const newPayment = {
      invpay_payment_id: paymentId,
      invpay_payment_date: dateformatter(),
      invpay_amount: data.payment,
    };

    updateValue("payments", newPayment);
  };

  return (
    <form
      style={{ height: "100%" }}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        sx={textFieldStyle}
        fullWidth
        label="Payment Amount"
        {...register("payment")}
        error={!!errors.payment}
        helperText={errors.payment?.message}
      />
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Button variant="contained" sx={ButtonstylesSubmit} type="submit">
          Pay
        </Button>
      </Box>
    </form>
  );
}

export function AdvancePayment() {
  const { updateValue } = useContext(InvoiceContext);

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
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} width="100%">
        <TextField
          sx={textFieldStyle}
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
  );
}

export function ButtonSection(props) {
  const { buttonToogle, setButtonToogle, invoiceSearchBtnStatus } = props;

  return (
    <>
      {!invoiceSearchBtnStatus && (
        <Button
          sx={{
            ...Buttonstyles,
            backgroundColor: buttonToogle
              ? (theme) => theme.palette.primary[100]
              : "inherit",
          }}
          variant="outlined"
          onClick={() => {
            setButtonToogle(true);
          }}
        >
          <Lottie options={{ animationData: Advance }} width={100} />
          Advance
        </Button>
      )}
      <Button
        sx={{
          ...Buttonstyles,
          backgroundColor: !buttonToogle
            ? (theme) => theme.palette.primary[100]
            : "inherit",
        }}
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
