import React, { useEffect, useState } from "react";
import { Box, Paper, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs"; // Import dayjs for date manipulation

function Item2() {
  const [customerDetails, setCustomerDetails] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchCustomerRatings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8085/reports/getCustomerInvoiceDetails"
        );
        if (response.data.status === false) {
          console.log("Failed to retrieve rating information");
        } else {
          console.log(
            "Retrieved customer invoice information",
            response.data.response
          );
          setCustomerDetails(response.data.response);
        }
      } catch (error) {
        console.log("Reports customer ratings error", error);
      }
    };

    fetchCustomerRatings();
  }, []);

  const filterCustomers = (searchValue) => {
    setSearchValue(searchValue);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const filteredCustomerRatings = customerDetails.filter((customer) => {
    const matchesSearch =
      customer.cus_phone_number.includes(searchValue) ||
      customer.cus_fname.toLowerCase().includes(searchValue.toLowerCase()) ||
      customer.cus_lname.toLowerCase().includes(searchValue.toLowerCase());

    const customerDate = new Date(customer.inv_createddate);

    const matchesDate =
      (!startDate || customerDate >= new Date(startDate)) &&
      (!endDate || customerDate <= new Date(endDate));

    return matchesSearch && matchesDate;
  });

  const formatDate = (dateString) => {
    return dayjs(dateString).format("YYYY-MM-DD HH:mm:ss");
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField
              label="Search customer by phone number or name"
              onChange={(e) => filterCustomers(e.target.value)}
            />
            <DateTimePicker
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box>
            <TableContainer sx={{ height: "50vh" }} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Customer Name</TableCell>
                    <TableCell align="center">Customer Phone Number</TableCell>
                    <TableCell align="center">Invoice Id</TableCell>
                    <TableCell align="center">Invoice Rating</TableCell>
                    <TableCell align="center">Special Message</TableCell>
                    <TableCell align="center">Invoice Created Date</TableCell>
                    <TableCell align="center">Total amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCustomerRatings.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        backgroundColor: row.not_completed ? (theme)=>theme.palette.primary.warning[50] : "",
                      }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {row.cus_fname} {row.cus_lname}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {row.cus_phone_number}
                      </TableCell>
                      <TableCell align="center">{row.inv_id}</TableCell>
                      <TableCell align="center">
                        {row.inv_rating ? (
                          <Rating
                            name={`rating-${index}`}
                            value={row.inv_rating}
                            precision={0.5}
                            readOnly
                          />
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          maxWidth: 200,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <Box sx={{ maxWidth: 200, overflow: "auto" }}>
                          {row.inv_special_message}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        {formatDate(row.inv_createddate)}
                      </TableCell>
                      <TableCell align="center">{row.total_sales}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </LocalizationProvider>
    </>
  );
}

export default Item2;
