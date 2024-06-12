import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';

export function EquipmentItem5() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8085/reports/getIncompleteRentals');
        setData(response.data.response);
      } catch (error) {
        console.error('Error fetching incomplete rentals:', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (date) => {
    return dayjs(date).format('DD/MM/YYYY HH:mm'); // Customize the format as per your requirement
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Equipment ID</TableCell>
                <TableCell>Equipment Name</TableCell>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Invoice Created Date</TableCell>
                <TableCell>Duration in Days</TableCell>
                <TableCell>Not Completed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={`${row.eq_id}-${row.inv_id}`}>
                  <TableCell>{row.eq_id}</TableCell>
                  <TableCell>{row.eq_name}</TableCell>
                  <TableCell>{row.inv_id}</TableCell>
                  <TableCell>{formatDate(row.inv_createddate)}</TableCell>
                  <TableCell>{row.duration_in_days}</TableCell>
                  <TableCell>{row.not_completed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </LocalizationProvider>
  );
}
