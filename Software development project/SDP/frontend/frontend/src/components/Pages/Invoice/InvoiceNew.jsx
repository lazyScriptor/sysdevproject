import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import InvoiceCustomerDetails from "./InvoiceCustomerDetails";
import InvoiceRightSide from "./InvoiceRightSide";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function InvoiceNew() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} columns={{ xs: 4, sm: 4, md: 12 }} sx={{height:"8vh"}}>
        <Grid xs={3.0} sx={{}}>
          <Item sx={{}}>xs=8</Item>
        </Grid>
        <Grid xs={6.5} sx={{}}>
          <Item></Item>
        </Grid>
        <Grid xs={2.5} sx={{}}>
          <Item></Item>
        </Grid>
      </Grid>


      <Grid container spacing={1} columns={{ xs: 4, sm: 4, md: 12 }} sx={{height:"57vh"}}>
        <Grid xs={3.0} sx={{}}>
          <Item sx={{}}><InvoiceRightSide/></Item>
        </Grid>
        <Grid xs={6.5}>
          <Item></Item>
        </Grid>
        <Grid xs={2.5}>
          <Item></Item>
        </Grid>
      </Grid>


      <Grid container spacing={1} columns={{ xs: 4, sm: 4, md: 12 }} sx={{height:"35vh"}}>
        <Grid xs={3.0} sx={{}}>
          <Item sx={{}}></Item>
        </Grid>
        <Grid xs={6.5}>
          <Item></Item>
        </Grid>
        <Grid xs={2.5}>
          <Item></Item>
        </Grid>
      </Grid>
    </Box>
  );
}
