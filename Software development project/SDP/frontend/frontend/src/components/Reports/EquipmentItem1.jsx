import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";

function EquipmentItem1() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensure startDate and endDate are defined
        const start = startDate ? startDate.toISOString() : new Date(0).toISOString();
        const end = endDate ? endDate.toISOString() : new Date().toISOString();
  
        const response = await axios.get(
          "http://localhost:8085/reports/getEquipmentUtilizationDetails",
          {
            params: {
              startDate: start,
              endDate: end,
            },
          }
        );
  
        setData(response.data.response);
      } catch (error) {
        console.error("Error fetching equipment utilization data:", error);
      }
    };
  
    fetchData();
  }, [startDate, endDate]);
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <DateTimePicker
          label="Start Date"
          value={startDate}
          onChange={(date) => setStartDate(date)}
          renderInput={(props) => (
            <TextField
              {...props}
              style={{ marginBottom: "1rem", marginRight: "1rem" }}
            />
          )}
        />
        <DateTimePicker
          label="End Date"
          value={endDate}
          onChange={(date) => setEndDate(date)}
          renderInput={(props) => (
            <TextField
              {...props}
              style={{ marginBottom: "1rem", marginRight: "1rem" }}
            />
          )}
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Equipment ID</TableCell>
                <TableCell>Equipment Name</TableCell>
                <TableCell>Total Rentals</TableCell>
                {/* <TableCell>Total Rental Days</TableCell> */}
                <TableCell>Average Rental Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.eq_id}>
                  <TableCell>{row.eq_id}</TableCell>
                  <TableCell>{row.eq_name}</TableCell>
                  <TableCell>{row.total_rentals}</TableCell>
                  {/* <TableCell>{row.total_rental_days}</TableCell> */}
                  <TableCell>{row.average_rental_duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </LocalizationProvider>
  );
}

export default EquipmentItem1;
