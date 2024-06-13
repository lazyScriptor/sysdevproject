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
        "http://localhost:8085/reports/getCombinedInvoiceReports"
      );
      if (response.data.status) {
        const filteredData = response.data.response.filter(
          (row) =>
            row.customer_name &&
            (!startDate || dayjs(row.inv_createddate).isSameOrAfter(startDate)) &&
            (!endDate || dayjs(row.inv_createddate).isSameOrBefore(endDate))
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
              <TableRow key={index}>
                <TableCell align="center">{row.invoice_id}</TableCell>
                <TableCell align="center">{row.customer_name}</TableCell>
                <TableCell align="center">
                  {dayjs(row.inv_createddate).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
                <TableCell align="center">{row.total_revenue}</TableCell>
                <TableCell align="center">{row.total_income}</TableCell>
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
