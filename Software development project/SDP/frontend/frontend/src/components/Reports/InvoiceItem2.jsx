import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs"; // Import dayjs library
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"; // Import the isSameOrAfter plugin
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"; // Import the isSameOrBefore plugin
import TablePagination from "@mui/material/TablePagination";

dayjs.extend(isSameOrAfter); // Extend dayjs with the isSameOrAfter plugin
dayjs.extend(isSameOrBefore); // Extend dayjs with the isSameOrBefore plugin

const rowsPerPageOptions = [5, 10, 25];

function InvoiceItem2() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowColor, setRowColor] = useState("white");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8085/reports/getRevenueForInvoiceReport"
      );
      if (response.data) {
        console.log("dawd", response.data);
        const filteredData = response.data.filter(
          (row) =>
            row.customerDetails.cus_fname &&
            (!startDate || dayjs(row.createdDate).isSameOrAfter(startDate)) &&
            (!endDate || dayjs(row.createdDate).isSameOrBefore(endDate))
        );
        setData(filteredData);
      } else {
        console.log("Failed to retrieve data");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const handleSearch = () => {
    fetchData();
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const rentalCalculation = (row) => {
    return row.reduce((acc, row) => {
      const dateSet = row.eqcat_dataset;
      const normalRental = row.eq_rental;
      const specialRental = row.spe_singleday_rent;
      const duration = row.duration_in_days;
      const quantity = row.inveq_borrowqty;
      const categoryId = row.eqcat_id;

      let finalRental = 0;

      // Scaffolding special logic - scaffolding id = 2
      if (specialRental && categoryId == 2) {
        console.log("specialRental && categoryId == 2");
        // Check if scaffolding dateSet constraint is less than or equal to duration
        if (duration <= dateSet) {
          console.log("duration <= dateSet");
          // If duration != 1, scaffolding gets two days' worth of special rental until 5 days
          finalRental =
            duration !== 1
              ? specialRental * 2 * quantity
              : specialRental * quantity;
        } else {
          console.log("else");
          // If duration exceeds dateSet, use normal rental rate
          finalRental = normalRental * duration * quantity;
        }
      }
      // For non-scaffolding items with special rental
      else if (specialRental && categoryId != 2) {
        console.log("elseif");
        finalRental =
          duration < dateSet
            ? specialRental * duration * quantity
            : normalRental * duration * quantity;
      }
      // Default case: no special rental
      else {
        console.log("elseifelse");
        finalRental = normalRental * duration * quantity;
      }

      // Add the calculated rental for this row to the total
      console.log("--------------", acc + finalRental);
      return acc + finalRental;
    }, 0);
  };
  const calculatePayments = (row) => {
    let total = row.advance || 0;
    if (row.payments && Array.isArray(row.payments)) {
      const totalPayments = row.payments.reduce((accumilate, item) => {
        return accumilate + item.invpay_amount;
      }, 0); // Providing initial value of 0
      total += totalPayments;
    }
    return total;
  };
  
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="start"
        alignItems="center"
        mb={2}
        gap={2}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DateTimePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <Button variant="contained" color="error" onClick={handleClear}>
          Clear
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Invoice ID</TableCell>
              <TableCell align="center">Customer Name</TableCell>
              <TableCell align="center">Created Date</TableCell>
              <TableCell align="center">Total payments done (LKR)</TableCell>
              <TableCell align="center">Invoice Total Amount (LKR)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: `${
                    row.inv_completed_datetime ? "" : "#ff03"
                  }`,
                }}
              >
                <TableCell align="center">{row.InvoiceID}</TableCell>
                <TableCell align="center">{row.customer_name}</TableCell>
                <TableCell align="center">
                  {dayjs(row.inv_createddate).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
                <TableCell align="center">{calculatePayments(row)}</TableCell>
                <TableCell align="center">
                  {rentalCalculation(row.eqdetails)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default InvoiceItem2;
