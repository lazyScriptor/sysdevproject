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
import { Button, TextField, useStepContext } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";

import { useSnackbar } from "notistack"; // Import useSnackbar hook
import OverlayDialogBox from "./OverlayDialogBox";
import { CustomerPopupContext } from "../../Contexts/Contexts";

export default function CustomerTable() {
  const { boolvalue, setBoolvalue, userData, setUserData } =
    useContext(CustomerPopupContext);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [order, setOrder] = useState("asc");
  const { enqueueSnackbar } = useSnackbar(); // Initialize useSnackbar hook

  const [SId, setSId] = useState(2);
  const [SNIC, SetSNIC] = useState();
  const [SPhoneNumber, SetSPhoneNumber] = useState();
  const [SFirstName, SetSFirstName] = useState("");
  const [SLastName, SetSLastName] = useState("");
  const [SAddress1, SetSAddress1] = useState();
  const [SAddress2, SetSAddress2] = useState();

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

  const handleSearchid = async (SId) => {
    try {
      await axios
        .get(`http://localhost:8085/getCustomerbyID/${SId}`)
        .then((res) => {
          const customerData = res.data;
          setData(res.data);
        });
    } catch (error) {
      console.log("handleSearch Id error");
    }
  };
  const handleSearchnic = async (SNIC) => {
    try {
      await axios
        .get(`http://localhost:8085/getCustomerbyNIC/${SNIC}`)
        .then((res) => {
          const customerData = res.data;
          setData(res.data);
        });
    } catch (error) {
      console.log("handleSearch Id error");
    }
  };
  const handleSearchFname = async (SFirstName) => {
    try {
      await axios
        .get(`http://localhost:8085/getCustomerbyFirstName/${SFirstName}`)
        .then((res) => {
          const customerData = res.data;
          setData(res.data);
        });
    } catch (error) {
      console.log("handleSearch Id error");
    }
  };
  const handleSearchLname = async (SLastName) => {
    try {
      await axios
        .get(`http://localhost:8085/getCustomerbyLastName/${SLastName}`)
        .then((res) => {
          const customerData = res.data;
          setData(res.data);
        });
    } catch (error) {
      console.log("handleSearch Id error");
    }
  };
  const handleSearchPhoneNumber = async (SPhoneNumber) => {
    //API variable is phoneNumber thats why this convertion has done
    const phoneNumber = SPhoneNumber;
    try {
      await axios
        .get(`http://localhost:8085/getCustomerbyPhoneNumber/${phoneNumber}`)
        .then((res) => {
          const customerData = res.data;
          setData(res.data);
        });
    } catch (error) {
      console.log("handleSearch Id error");
    }
  };

  const handleSearchAddress1 = async (SAddress1) => {
    try {
      await axios

        .get(`http://localhost:8085/getCustomerbyAddress1/${SAddress1}`)
        .then((res) => {
          const customerData = res.data;
          setData(res.data);
        });
    } catch (error) {
      console.log("handleSearch Address1 error");
    }
  };
  const handleSearchAddress2 = async (SAddress2) => {
    try {
      await axios
        .get(`http://localhost:8085/getCustomerbyAddress2/${SAddress2}`)
        .then((res) => {
          const customerData = res.data;
          setData(res.data);
        });
    } catch (error) {
      console.log("handleSearch Address2 error");
    }
  };

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
                sx={{ backgroundColor: (theme) => theme.palette.primary[100] }}
              >
                <TableCell>
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
                      onChange={(e) => setSId(e.target.value)}
                    />
                    <Button
                      onClick={() => handleSearchid(SId)}
                      sx={{ pt: 2, "&:hover": { color: "green" } }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </Box>
                </TableCell>
                <TableCell>
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
                      label="Search by FirstName"
                      type="search"
                      size="small"
                      onChange={(e) => SetSFirstName(e.target.value)}
                    />
                    <Button
                      onClick={() => handleSearchFname(SFirstName)}
                      sx={{ pt: 2, "&:hover": { color: "green" } }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </Box>
                </TableCell>
                <TableCell>
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
                      label="Search by LastName"
                      type="search"
                      size="small"
                      onChange={(e) => SetSLastName(e.target.value)}
                    />
                    <Button
                      onClick={() => handleSearchLname(SLastName)}
                      sx={{ pt: 2, "&:hover": { color: "green" } }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </Box>
                </TableCell>
                <TableCell>
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
                      label="Search by NIC"
                      type="search"
                      size="small"
                      onChange={(e) => SetSNIC(e.target.value)}
                    />
                    <Button
                      onClick={() => handleSearchnic(SNIC)}
                      sx={{ pt: 2, "&:hover": { color: "green" } }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </Box>
                </TableCell>
                <TableCell>
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
                      label="Search by Phone Number"
                      type="search"
                      size="small"
                      onChange={(e) => SetSPhoneNumber(e.target.value)}
                    />
                    <Button
                      onClick={() => handleSearchPhoneNumber(SPhoneNumber)}
                      sx={{ pt: 2, "&:hover": { color: "green" } }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </Box>
                </TableCell>
                <TableCell>
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
                      label="Search by Address1"
                      type="search"
                      size="small"
                      onChange={(e) => SetSAddress1(e.target.value)}
                    />
                    <Button
                      onClick={() => handleSearchAddress1(SAddress1)}
                      sx={{ pt: 2, "&:hover": { color: "green" } }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // width:"400px"
                    }}
                  >
                    <TextField
                      sx={{}}
                      id="standard-search"
                      variant="standard"
                      label="Search by ID"
                      type="search"
                      size="small"
                      onChange={(e) => SetSAddress2(e.target.value)}
                    />
                    <Button
                      onClick={() => handleSearchAddress2(SAddress2)}
                      sx={{ pt: 2, "&:hover": { color: "green" } }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      sx={{ mt: 3, borderRadius: 3 }}
                      variant="contained"
                      onClick={() => {
                        setBoolvalue(!boolvalue);

                        setUserData({
                          cus_id: "",
                          cus_fname: "",
                          cus_lname: "",
                          nic: "",
                          cus_phone_number: "",
                          cus_address1: "",
                          cus_address2: "",
                        });
                      }}
                    >
                      <FontAwesomeIcon
                        style={{ marginRight: "10px" }}
                        icon={faPlus}
                      />
                      Add new
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>

              <TableRow
                className="table-row"
                sx={{
                  backgroundColor: (theme) => theme.palette.primary[100],
                  height: "6vh",
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
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
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
                          onClick={() =>
                            handleDelete(row.cus_id, row.cus_fname)
                          }
                          sx={{ color: "red" }}
                        >
                          Delete
                        </Button>
                      </Box>
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
