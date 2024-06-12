import { Box, Paper } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { InvoiceContext } from "../../../Contexts/Contexts";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useTheme } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

function CompleteInvoiceTable() {
  const theme = useTheme();

  const {
    fullDetailsEquipmentArray,
    setFullDetailsEquipmentArray,
    checkState,
    setCheckState,
    setPaymentArray,
    eqObject,
    setEqObject,
    invoiceSearchBtnStatus,
    setInvoiceSearchBtnStatus,
    invoiceObject,
    setInvoiceObject,
    clearObject,
    updateValue,
    clearValues,
    updateEqObject,
  } = useContext(InvoiceContext);
  const colorFunction = (durationNumber) => {
    if (durationNumber == null) return (theme) => theme.palette.primary[50];
  };
  return (
    <>
      <TableContainer
        component={Paper}
        elevation={4}
        sx={{ borderRadius: 3, height: "100%" }}
      >
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Row number</TableCell>
              <TableCell align="center">equipment id</TableCell>
              <TableCell align="center">Machine name</TableCell>
              <TableCell align="center">Rental per day(LKR)</TableCell>
              <TableCell align="center">Handover Time period</TableCell>
              <TableCell align="center">Borrow Qty</TableCell>
              <TableCell align="center">Duration</TableCell>
              <TableCell align="center">Return Qty</TableCell>
              <TableCell align="center">Rental for the equipment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceObject.eqdetails &&
              invoiceObject.eqdetails.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor: colorFunction(row.duration_in_days),
                  }}
                >
                  <TableCell align="center">{index + 1}#</TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.eq_id}
                  </TableCell>
                  <TableCell align="center">{row.eq_name}</TableCell>
                  <TableCell align="center">{row.eq_rental}</TableCell>
                  <TableCell align="center">
                    {" "}
                    {row.inveq_return_date == null ? (
                      <FontAwesomeIcon
                        icon={faCircle}
                        beatFade
                        style={{ color: "#FFD43B" }}
                      />
                    ) : (
                      new Date(row.inveq_return_date).toLocaleString()
                    )}
                  </TableCell>
                  <TableCell align="center">{row.inveq_borrowqty}</TableCell>

                  <TableCell align="center">{row.duration_in_days}</TableCell>
                  <TableCell align="center">
                    {row.inveq_return_quantity == 0
                      ? ""
                      : row.inveq_return_quantity}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: (theme) => theme.palette.primary[50],
                      border: "solid 1px solid",
                    }}
                  >
                    {!row.duration_in_days
                      ? ""
                      : row.eq_rental * row.duration_in_days * row.inveq_borrowqty}{" "}
                    {row.duration_in_days && 'LKR'}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CompleteInvoiceTable;
