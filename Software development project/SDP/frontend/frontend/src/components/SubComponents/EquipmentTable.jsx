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
import { Button, TextField } from "@mui/material";

import { useSnackbar } from "notistack"; // Import useSnackbar hook
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function EquipmentTable() {
  const [ID, setID] = useState();
  const [name, setName] = useState();
  const [equipmentArray, setEquipmentArray] = useState([]);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const { enqueueSnackbar } = useSnackbar(); // Initialize useSnackbar hook

  //Database date coloumn to a specific date format
  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    try {
      axios.get("http://localhost:8085/equipment").then((res) => {
        setData(res.data);
        console.log(res.data);
      });
    } catch (error) {
      console.error("error occured in the try catch block", error);
    }
  }, []);

  const handleDelete = async (eq_id, eq_name) => {
    try {
      console.log("This is the delete function front end ", eq_id, eq_name);
      axios.delete(`http://localhost:8085/deleteEquipment/${eq_id}`);

      // Show success snackbar message with customer's first name
      enqueueSnackbar(`Customer :${eq_name} deleted successfully!`, {
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

  const handleOnChangeId = (event) => {
    const searchValueID = event.target.value;
    setID(searchValueID);
  };
  const handleSearchid = (equipmentID) => {
    try {
      axios
        .get(`http://localhost:8085/getEquipmentbyID/${equipmentID}`)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        });
    } catch (error) {
      console.error("error occured in the try catch block", error);
    }
  };
  const handleOnChangeName = (event) => {
    const searchValueName = event.target.value;
    setName(searchValueName);
  };
  const handleSearchName = (equipmentName) => {
    try {
      axios
        .get(`http://localhost:8085/getEquipmentbyName/${equipmentName}`)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        });
    } catch (error) {
      console.error("error occured in the try catch block", error);
    }
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
            <TableHead>
              <TableRow>
                <TableCell size="medium">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      sx={{}}
                      id="standard-search"
                      variant="standard"
                      label="Search by ID"
                      type="search"
                      size="small"
                      onChange={handleOnChangeId}
                    />
                    <Button
                      onClick={() => handleSearchid(ID)}
                      sx={{
                        pt: 2,
                        "&:hover": {
                          color: "green",
                        },
                      }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </Box>
                </TableCell>
                <TableCell size="medium">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      sx={{}}
                      id="standard-search"
                      variant="standard"
                      label="Search by Name"
                      type="search"
                      size="small"
                      onChange={handleOnChangeName}
                    />
                    <Button
                      onClick={() => handleSearchName(name)}
                      sx={{
                        pt: 2,
                        "&:hover": {
                          color: "green",
                        },
                      }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableHead className="table-head">
              <TableRow className="table-row">
                <TableCell className="table-cell-header" sx={{}}>
                  Machine
                  <br /> Id
                </TableCell>
                <TableCell className="table-cell-header">
                  Machine name
                </TableCell>
                <TableCell className="table-cell-header">
                  Rental
                  <br />
                  (LKR)
                </TableCell>
                <TableCell className="table-cell-header">
                  Date of <br />
                  purchase
                </TableCell>
                <TableCell className="table-cell-header">
                  Warranty
                  <br />
                  date
                </TableCell>
                <TableCell className="table-cell-header">
                  End of the
                  <br />
                  warranty period
                </TableCell>
                <TableCell className="table-cell-header">
                  Equipment
                  <br />
                  cost
                </TableCell>
                <TableCell className="table-cell-header">
                  Defected
                  <br />
                  status
                </TableCell>
                <TableCell className="table-cell-header">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow className="table-body" key={row.eq_id}>
                    <TableCell className="table-cell-data">
                      {row.eq_id}
                    </TableCell>
                    <TableCell className="table-cell-data">
                      {row.eq_name}
                    </TableCell>
                    <TableCell className="table-cell-data">
                      {row.rental}
                    </TableCell>
                    <TableCell className="table-cell-data">
                      {formatDate(row.date_of_purchase)}
                    </TableCell>
                    <TableCell className="table-cell-data">
                      {formatDate(row.warranty_date)}
                    </TableCell>
                    <TableCell className="table-cell-data">
                      {formatDate(row.end_of_warranty_period)}
                    </TableCell>
                    <TableCell className="table-cell-data">
                      {row.eq_cost}
                    </TableCell>
                    <TableCell className="table-cell-data">
                      {row.defected_status}
                    </TableCell>
                    <TableCell className="table-cell-data">
                      <Button>Edit</Button>
                      <Button
                        onClick={() => handleDelete(row.eq_id, row.eq_name)}
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
    </Box>
  );
}
