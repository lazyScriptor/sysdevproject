import React, { useEffect, useState } from "react";
import axios from "axios";
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
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function DeletedInvoices() {
  const [deletedInvoices, setDeletedInvoices] = useState([]);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

  const fetchDeletedInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:8085/reports/getDeletedInvoices", {
        params: {
          start_date: startDateTime ? startDateTime.format() : null,
          end_date: endDateTime ? endDateTime.format() : null,
        },
      });
      setDeletedInvoices(response.data.response);
    } catch (error) {
      console.log("Error fetching deleted invoices report:", error);
    }
  };

  useEffect(() => {
    fetchDeletedInvoices();
  }, [startDateTime, endDateTime]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <DateTimePicker
            label="Start Date"
            value={startDateTime}
            onChange={(newValue) => setStartDateTime(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DateTimePicker
            label="End Date"
            value={endDateTime}
            onChange={(newValue) => setEndDateTime(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Invoice ID</TableCell>
                  <TableCell align="center">Created Date</TableCell>
                  <TableCell align="center">Updated Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(deletedInvoices) && deletedInvoices.length > 0 ? (
                  deletedInvoices.map((row) => (
                    <TableRow key={row.invoice_id}>
                      <TableCell align="center">{row.first_name}</TableCell>
                      <TableCell align="center">{row.last_name}</TableCell>
                      <TableCell align="center">{row.invoice_id}</TableCell>
                      <TableCell align="center">
                        {dayjs(row.created_date).format("YYYY-MM-DD HH:mm:ss")}
                      </TableCell>
                      <TableCell align="center">{row.updated_status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={5}>
                      No deleted invoices found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

export default DeletedInvoices;
