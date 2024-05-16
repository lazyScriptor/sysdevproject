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

function Payments() {
  const schema = yup.object().shape({
    advance: yup
      .number()
      .typeError("Please enter a valid number")
      .required("This field is required")
      .min(0),
    payment: yup
      .number()
      .typeError("Please enter a valid number")
      .required("This field is required")
      .min(0),
  });

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm({
    resolver: yupResolver(schema),
  });

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

  const [advance, setAdvance] = useState();
  const [payment, setPayment] = useState("");
  const [paymentArray, setPaymentArray] = useState([]);
  const [paymentToogle, setPaymentToogle] = useState(false);

  const onSubmitPayments = () => {};

  const onSubmit1 = (advance) => {
    updateValue("advance", advance);
  };

  const onSubmit2 = (payment) => {
    setPaymentArray((prev) => {
      // Generate a unique ID for the new payment object
      const id = prev.length + 1;
      // Create the new payment object with the ID
      const newPayment = { id, payment };
      // Spread the previous array and add the new payment object to it
      const newArray = [...prev, newPayment];
      updateValue("payments", newArray);
      return newArray;
    });
    setResponseManageToogle(!responseManageToogle)
  };

  return (
    <Box
      sx={{
        width: "50vw",
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Button
          sx={{
            height: "130px",
            width: "130px",
            display: "flex",
            flexDirection: "column",
            m: 2,
          }}
          variant="outlined"
          onClick={() => {
            setPaymentToogle(false);
          }}
        >
          <Lottie options={{ animationData: Advance }} width={100} />
          Advance
        </Button>
        <Button
          sx={{
            height: "130px",
            width: "130px",
            display: "flex",
            flexDirection: "column",
            m: 2,
          }}
          variant="outlined"
          onClick={() => {
            setPaymentToogle(true);
          }}
        >
          <Lottie options={{ animationData: Cash }} width={100} />
          Payment
        </Button>
      </Box>

      {!paymentToogle && (
        <Box>
          <form noValidate onSubmit={handleSubmit1(onSubmit1)}>
            <Stack spacing={4} width={300}>
              <TextField
                label="Advance payment"
                onChange={(e) => setAdvance(e.target.value)}
                inputProps={{ ...register1("advance") }}
                error={!!errors1.advance}
                helperText={errors1.advance?.message}
              />
              <Box>
                <FormLabel>Advance paid </FormLabel>
                <Switch
                  defaultChecked
                  onChange={(e) => console.log(e.target.checked)}
                />
              </Box>
              <Button
                variant="contained"
                type="submit"
                onClick={() => onSubmit1(advance)}
              >
                Pay
              </Button>
              <Typography variant="h6">Amount : {advance}</Typography>
            </Stack>
          </form>
        </Box>
      )}

      {paymentToogle && (
        <Box>
          <form noValidate onSubmit={handleSubmit2(onSubmit2)}>
            <Stack spacing={4} width={300}>
              <TextField
                label="Payment Amount"
                inputProps={{ ...register2("payment") }}
                error={!!errors2.payment}
                helperText={errors2.payment?.message}
                onChange={(e) => setPayment(e.target.value)}
              />
              <Box></Box>
              <Button
                variant="contained"
                type="submit"
                onClick={() => onSubmit2(payment)}
              >
                Pay
              </Button>
              <Typography variant="h6">Amount : </Typography>
            </Stack>
          </form>
        </Box>
      )}
    </Box>
  );
}

export default Payments;
