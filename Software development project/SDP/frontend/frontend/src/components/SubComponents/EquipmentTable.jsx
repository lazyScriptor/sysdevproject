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
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSort,
  faSquareCheck,
  faSquareXmark
} from "@fortawesome/free-solid-svg-icons";

export default function EquipmentTable() {
  const [ID, setID] = useState();
  const [name, setName] = useState();
  const [equipmentArray, setEquipmentArray] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortBy, setSortBy] = useState("eq_id");
  const { enqueueSnackbar } = useSnackbar();

  //Database date coloumn to a specific date format
  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8085/equipment");
      setData(res.data);
    } catch (error) {
      console.error("error occurred while fetching data:", error);
    }
  };

  const handleDelete = async (eq_id, eq_name) => {
    try {
      console.log("This is the delete function front end ", eq_id, eq_name);
      await axios.delete(`http://localhost:8085/deleteEquipment/${eq_id}`);
      enqueueSnackbar(`Equipment: ${eq_name} deleted successfully!`, {
        variant: "success",
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting equipment:", error);
    }
  };

  const handleSort = (column) => {
    setSortBy(column);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
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

  const handleSearchid = async (equipmentID) => {
    try {
      const res = await axios.get(
        `http://localhost:8085/getEquipmentbyID/${equipmentID}`
      );
      setData(res.data);
    } catch (error) {
      console.error("error occurred while searching by ID:", error);
    }
  };

  const handleOnChangeName = (event) => {
    const searchValueName = event.target.value;
    setName(searchValueName);
  };

  const handleSearchName = async (equipmentName) => {
    try {
      const res = await axios.get(
        `http://localhost:8085/getEquipmentbyName/${equipmentName}`
      );
      setData(res.data);
    } catch (error) {
      console.error("error occurred while searching by name:", error);
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let firstValue, secondValue;

    // Handle sorting for different columns
    switch (sortBy) {
      case "eq_id":
        firstValue = parseFloat(a.eq_id); // Convert IDs to numbers if needed
        secondValue = parseFloat(b.eq_id);
        break;
      case "eq_name":
        firstValue = a.eq_name.toLowerCase(); // Convert names to lowercase for case-insensitive sorting
        secondValue = b.eq_name.toLowerCase();
        break;
      // Add cases for other columns as needed
      default:
        firstValue = a[sortBy];
        secondValue = b[sortBy];
    }

    if (sortDirection === "asc") {
      return firstValue - secondValue; // Ascending order
    } else {
      return secondValue - firstValue; // Descending order
    }
  });

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
              <TableRow
                sx={{ backgroundColor: (theme) => theme.palette.primary[100] }}
              >
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
                      sx={{ pt: 2, "&:hover": { color: "green" } }}
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
                      sx={{ pt: 2, "&:hover": { color: "green" } }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </Box>
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
              </TableRow>
              <TableRow
                sx={{
                  backgroundColor: (theme) => theme.palette.primary[100],
                }}
              >
                <TableCell
                  className="table-cell-header"
                  onClick={() => handleSort("eq_id")}
                  sx={{
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.primary[200],
                      cursor: "pointer",
                    },
                  }}
                >
                  Machine Id <FontAwesomeIcon icon={faSort} />
                </TableCell>
                <TableCell
                  className="table-cell-header"
                  onClick={() => handleSort("eq_name")}
                >
                  Machine name
                </TableCell>
                <TableCell
                  className="table-cell-header"
                  onClick={() => handleSort("rental")}
                  sx={{
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.primary[200],
                      cursor: "pointer",
                    },
                  }}
                >
                  Rental (LKR) <FontAwesomeIcon icon={faSort} />
                </TableCell>
                <TableCell
                  className="table-cell-header"
                  onClick={() => handleSort("date_of_purchase")}
                >
                  Date of <br />
                  purchase
                </TableCell>
                <TableCell
                  className="table-cell-header"
                  onClick={() => handleSort("warranty_date")}
                >
                  Warranty
                  <br />
                  date
                </TableCell>
                <TableCell
                  className="table-cell-header"
                  onClick={() => handleSort("end_of_warranty_period")}
                >
                  End of the
                  <br />
                  warranty period
                </TableCell>
                <TableCell
                  className="table-cell-header"
                  onClick={() => handleSort("eq_cost")}
                  sx={{
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.primary[200],
                      cursor: "pointer",
                    },
                  }}
                >
                  Equipment cost <FontAwesomeIcon icon={faSort} />
                </TableCell>
                <TableCell
                  className="table-cell-header"
                  onClick={() => handleSort("defected_status")}
                  sx={{
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.primary[200],
                      cursor: "pointer",
                    },
                  }}
                >
                  Defected status <FontAwesomeIcon icon={faSort} />
                </TableCell>
                <TableCell className="table-cell-header">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
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
                      {row.defected_status == 0 ? (
                        <FontAwesomeIcon
                          icon={faSquareCheck}
                          style={{ color: "#26c6d9" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faSquareXmark}
                          style={{ color: "#ff0000" }}
                        />
                      )}
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
          rowsPerPageOptions={[10, 50, 100]}
          component="div"
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
