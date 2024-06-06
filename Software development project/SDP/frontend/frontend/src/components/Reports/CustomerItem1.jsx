import React, { useEffect, useState } from "react";
import { Box, Paper, Button, TextField } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Rating from "@mui/material/Rating";

import axios from "axios";

export function Item1() {
  const [customerRatings, setCustomerRatings] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchCustomerRatings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8085/reports/getCustomerRatings"
        );
        if (response.data.status === false) {
          console.log("Failed to retrieve rating information");
        } else {
          console.log("Retrieved rating information", response.data.response);
          setCustomerRatings(response.data.response);
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

  const filteredCustomerRatings = customerRatings.filter(
    (customer) =>
      customer.cus_phone_number.includes(searchValue) ||
      customer.cus_fname.toLowerCase().includes(searchValue.toLowerCase()) ||
      customer.cus_lname.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <Box>
        <Box>
          <TextField
            label="Search customer by phone number or name"
            onChange={(e) => filterCustomers(e.target.value)}
          />
        </Box>
        <Box>
          <TableContainer sx={{ height: "50vh" }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Customer Name</TableCell>
                  <TableCell align="center">Customer Phone Number</TableCell>
                  <TableCell align="center">Average Rating</TableCell>
                  <TableCell align="center">Number of Invoices</TableCell>
                  <TableCell align="center">Total Sales</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomerRatings.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor:
                        row.cus_delete_status === 1
                          ? (theme) => theme.palette.primary.error[100]
                          : "inherit",
                    }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {row.cus_fname} {row.cus_lname}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {row.cus_phone_number}
                    </TableCell>
                    <TableCell align="center">
                      {row.average_rating ? (
                        <Rating
                          name={`rating-${index}`}
                          value={row.average_rating}
                          precision={0.5}
                          readOnly
                        />
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {row.number_of_invoices}
                    </TableCell>
                    <TableCell align="center">{row.total_sales}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
