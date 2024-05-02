import React, { useState, useEffect, useContext } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

import { useSnackbar } from "notistack"; // Import useSnackbar hook
import NewCustomerForm from "../Pages/NewCustomerForm";
import BackdropCustomerForm from "./BackdropCustomerForm";
import OverlayDialogBox from "./OverlayDialogBox";
import CustomerPopupContext from "../../Contexts/CustomerPopupContext";

export default function CustomerTable() {
  const [openPopup, setOpenPopup] = useState(false);
  const { boolvalue, setBoolvalue , userData, setUserData } = useContext(CustomerPopupContext);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [order, setOrder] = useState("asc");
  const { enqueueSnackbar } = useSnackbar(); // Initialize useSnackbar hook

  useEffect(() => {
    try {
      axios
        .get("http://localhost:8085/customers")
        .then((res) => setData(res.data));
      console.log(boolvalue);
    } catch (error) {
      console.error("error occurred in the try catch block", error);
    }
  }, []);

  const handleDelete = async (customerId, customerFirstName) => {
    try {
      await axios.delete(`http://localhost:8085/deleteCustomers/${customerId}`);
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

  const handleEdit = () => {
    setOpenPopup(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = () => {
    setOrder(order === "asc" ? "desc" : "asc");
    setData(
      data.slice().sort((a, b) => {
        return order === "asc" ? a.cus_id - b.cus_id : b.cus_id - a.cus_id;
      })
    );
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
        backgroundColor: "white",
        borderRadius: 3,
      }}
    >
      <Paper
        elevation={4}
        sx={{ width: "100%", mb: 2, mt: 1, borderRadius: 3 }}
      >
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
            className="custom-table"
          >
            <TableHead className="table-head">
              <TableRow
                className="table-row"
                sx={{
                  backgroundColor: (theme) => theme.palette.primary[100],
                  height: "10vh",
                  borderRadius: 3,
                }}
              >
                <TableCell
                  className="table-cell-header"
                  sx={{
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.primary[200],
                      cursor: "pointer",
                    },
                  }}
                  onClick={handleSort}
                >
                  Id <FontAwesomeIcon icon={faSort} />
                </TableCell>
                <TableCell className="table-cell-header">First Name</TableCell>
                <TableCell className="table-cell-header">Last Name</TableCell>
                <TableCell className="table-cell-header">NIC</TableCell>
                <TableCell className="table-cell-header">
                  Phone number
                </TableCell>
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
                    <TableCell className="table-cell-data">
                      {row.cus_phone_number}
                    </TableCell>
                    <TableCell className="table-cell-data">
                      {row.cus_address1}
                    </TableCell>
                    <TableCell className="table-cell-data">
                      {row.cus_address2}
                    </TableCell>
                    <TableCell className="table-cell-data">
                      <Button
                        onClick={async () => {
                          setBoolvalue(!boolvalue);
                          console.log(boolvalue);
                         await setUserData(row);
                        }}
                      >
                        Edit
                      </Button>

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
      </Paper>

      <OverlayDialogBox />
    </Box>
  );
}
