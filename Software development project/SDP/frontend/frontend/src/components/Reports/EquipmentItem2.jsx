import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from 'axios';

function EquipmentItem2() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
  
        // Format startDate and endDate
        const start = startDate ? startDate.format() : null;
        const end = endDate ? endDate.format() : null;
  
        // Fetch data from the backend
        response = await axios.get('http://localhost:8085/reports/getEquipmentRevenueDetails', {
          params: {
            startDate: start,
            endDate: end
          }
        });
  
        // Set the fetched data to state
        setData(response.data.response);
      } catch (error) {
        console.error('Error fetching equipment revenue data:', error);
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
          renderInput={(props) => <TextField {...props} style={{ marginBottom: '1rem', marginRight: '1rem' }} />}
        />
        <DateTimePicker
          label="End Date"
          value={endDate}
          onChange={(date) => setEndDate(date)}
          renderInput={(props) => <TextField {...props} style={{ marginBottom: '1rem', marginRight: '1rem' }} />}
        />

        <TableContainer component={Paper} sx={{height:"55vh"}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Equipment ID</TableCell>
                <TableCell>Equipment Name</TableCell>
                <TableCell>Total Revenue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.eq_id}>
                  <TableCell>{row.eq_id}</TableCell>
                  <TableCell>{row.eq_name}</TableCell>
                  <TableCell>{row.total_revenue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </LocalizationProvider>
  );
}

export default EquipmentItem2;
