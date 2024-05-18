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
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  width: "130px",
  height: "110px",
  border: "solid 1px",
  borderRadius: 4,
  opacity: 0.8,
  m:2
};
const ButtonstylesSubmit = {
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  width: "100px",
  height: "80px",
  color: "primary",
  border: "solid 1px",
  borderRadius: 4,
  opacity: 0.8,
  m:2
};


export default function Payments() {
  const [payment, setPayment] = useState("");
  const [buttonToogle, setButtonToogle] = useState(true);

  return (
    <Box
      sx={{
        width: "25vw",
        height: "520px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
       pb:7,

      }}
    >
      <Box sx={{ display: "flex" }}>
        <ButtonSection
          buttonToogle={buttonToogle}
          setButtonToogle={setButtonToogle}
        />
      </Box>

      <Box sx={{height:"273px",width:"300px"}}>{buttonToogle == true ? <AdvancePayment /> : <PaymentForm />}</Box>
    </Box>
  );
}

export function PaymentForm() {
  const { setPaymentArray, updateValue, invoiceObject } =
    useContext(InvoiceContext);

  const generatePaymentId = (invoiceId, amount) => {
    const date = new Date();
    // const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Month (zero-padded)
    const day = ("0" + date.getDate()).slice(-2); // Date (zero-padded)
    const amountFormatted = amount.toFixed(2).replace(".", ""); // Amount formatted without decimal point

    const uniqueComponent = uuidv4(); // Generate a UUID

    return `${invoiceId}${month}${day}${amountFormatted}${uniqueComponent}`;
  };


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
    console.log("Payment data:", data.payment);
    setPaymentArray((prev) => {
      const paymentId = generatePaymentId(invoiceObject.InvoiceID, data.payment);
      console.log(paymentId); // Output: 12324051815075-uuid
      const updatedArray = [...prev, {
        payId:paymentId,
        payment:data.payment
      }];
      updateValue("payments", updatedArray);
      return updatedArray; // Return the updated array to update the state
    });
  };
  return (
    <>
      <form style={{height:"60%",display:"flex",flexDirection:"column"}}noValidate onSubmit={handleSubmit(onSubmit)}>
       
          <TextField
          fullWidth
            label="Payment Amount"
            {...register("payment")}
            error={!!errors.payment}
            helperText={errors.payment?.message}
        />
          <Box sx={{flexGrow:1}}/>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" sx={ButtonstylesSubmit} type="submit" >
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
          <Box>
            <FormLabel>Advance paid </FormLabel>
            <Switch defaultChecked />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" sx={ButtonstylesSubmit} type="submit" >
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
