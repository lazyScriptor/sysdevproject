import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

import { useSnackbar } from "notistack"; // Import useSnackbar hook

import "../Stylings/customers.css";

export default function Customers() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const { enqueueSnackbar } = useSnackbar(); // Initialize useSnackbar hook

  useEffect(() => {
    try {
      axios
        .get("http://localhost:8085/customers")
        .then((res) => setData(res.data))
    } catch (error) {
      console.error("error occured in the try catch block",error);
    }
  },[]);

  const handleDelete = async (customerId, customerFirstName) => {
    try {
      axios.delete(`http://localhost:8085/deleteCustomers/${customerId}`);
      // Show success snackbar message with customer's first name
      enqueueSnackbar(`Customer :${customerFirstName} deleted successfully!`, {
        variant: "success",
      });
      // Assuming the API returns a success response
      // You may want to update the data state or trigger a refetch after successful deletion
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
    className="body"
      sx={{
        display: "flex",
        width: "100%",
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"white"

      }}
    >
      <Paper elevation={4} sx={{ width: "100%", mb: 2,mt:1, borderRadius: 3 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
            className="custom-table"
          >
            <TableHead className="table-head">
              <TableRow className="table-row">
                <TableCell className="table-cell-header">Id</TableCell>
                <TableCell className="table-cell-header">First Name</TableCell>
                <TableCell className="table-cell-header">Last Name</TableCell>
                <TableCell className="table-cell-header">NIC</TableCell>
                <TableCell className="table-cell-header">Phone number</TableCell>
                <TableCell className="table-cell-header">Address 1</TableCell>
                <TableCell className="table-cell-header">Address 2</TableCell>
                <TableCell className="table-cell-header">Edits</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow className="table-body" key={row.cus_id}>
                    <TableCell className="table-cell-data">
                      {row.cus_id}
                    </TableCell>
                    <TableCell className="table-cell-data">
                      {row.cus_fname}
                    </TableCell>
                    <TableCell className="table-cell-data">
                      {row.cus_lname}
                    </TableCell>
                    <TableCell className="table-cell-data">{row.nic}</TableCell>
                    <TableCell className="table-cell-data">{row.cus_phone_number}</TableCell>
                    <TableCell className="table-cell-data">
                      {row.cus_address1}
                    </TableCell>
                    <TableCell className="table-cell-data">
                      {row.cus_address2}
                    </TableCell>
                    <TableCell className="table-cell-data">
                      <Button>Edit</Button>
                      <Button
                        onClick={() => handleDelete(row.cus_id, row.cus_fname)}
                        sx={{ color: "red" }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 50, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Button>
          heys
        </Button>
      </Paper>
    </Box>
  );
}