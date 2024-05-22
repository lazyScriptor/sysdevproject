import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import axios from "axios";
import NewCustomerForm from "../Pages/NewCustomerForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function Row(props) {
  const { row, searchValue } = props;
  const [open, setOpen] = useState(false);

  const cellStyles = {
    padding: "6px 8px",
    height: "30px",
    width: "auto",
    textAlign: "center", // Ensure text alignment is centered
  };

  const highlightText = (text, highlight) => {
    if (typeof text !== "string") return text; // Ensure text is a string
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const dateFormat = (value) => {
    return dayjs(value).format("YYYY-MM-DD");
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={cellStyles}>
          <IconButton
            aria-label="expand row"
            size=" "
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={cellStyles} component="th" scope="row">
          {highlightText(row.eq_id, searchValue)}
        </TableCell>
        <TableCell sx={cellStyles}>
          {highlightText(`${row.eq_name}`, searchValue)}
        </TableCell>
        <TableCell sx={cellStyles}>
          {highlightText(`${row.eqcat_name}`, searchValue)}
        </TableCell>
        <TableCell sx={cellStyles}>
          {highlightText(`${row.eq_rental}`, searchValue)}
        </TableCell>
        <TableCell sx={cellStyles}>
          {highlightText(dateFormat(row.eq_dofpurchase), searchValue)}
        </TableCell>
        <TableCell sx={cellStyles}>
          {highlightText(dateFormat(row.eq_warranty_expire), searchValue)}
        </TableCell>
        <TableCell sx={cellStyles}>
          {highlightText(row.eq_cost, searchValue)}
        </TableCell>
        <TableCell sx={cellStyles}>
          <Button>upload</Button>
        </TableCell>
        <TableCell sx={cellStyles}>
          {highlightText(row.eq_description, searchValue)}
        </TableCell>
        <TableCell sx={cellStyles}>
          {highlightText(row.eq_defected_status, searchValue)}
        </TableCell>
        <TableCell sx={cellStyles}>
          {highlightText(row.eq_completestock, searchValue)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <NewCustomerForm cus_id={row.cus_id} /> */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function EquipmentTableNew() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [dop, setDop] = useState();
  const [warrantyDate, setWarrantyDate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8085/equipment");
        setData(res.data);
      } catch (error) {
        console.error("error occurred while fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <CustomerPageUpper setData={setData} setSearchValue={setSearchValue} />
      <TableContainer component={Paper} sx={{ mt: 16 }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center" />
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Machine Name</TableCell>
              <TableCell align="center">Category Name</TableCell>
              <TableCell align="center">Rental</TableCell>
              <TableCell align="center">DOP</TableCell>
              <TableCell align="center">Warranty Due</TableCell>
              <TableCell align="center">Machine Cost</TableCell>
              <TableCell align="center">Machine image</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Defective status</TableCell>
              <TableCell align="center">Stock remaining</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <Row key={row.eq_id} row={row} searchValue={searchValue} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export function CustomerPageUpper(props) {
  const { setData, setSearchValue } = props;

  const trimvariablesForAdvanceSearch = (variable) => {
    const cleanedVariable = variable.replace(/[\s-+]/g, ""); // Replace all whitespace characters, hyphens, and plus signs with an empty string
    const trimmedvariable = cleanedVariable.trim();
    searchByVariable(trimmedvariable);
  };

  const searchByVariable = (variable) => {
    try {
      axios
        .get(`http://localhost:8085/searchCustomerByValue/${variable}`)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        });
      setSearchValue(variable);
    } catch (error) {
      console.error("error occurred in the try catch block", error);
    }
  };

  return (
    <>
      <Box sx={{ height: "350px", width: "100%" }}>
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="stretch"
          spacing={8}
        >
          <Box></Box>
          <Box display="flex" justifyContent="center">
            <TextField
              label={[<ManageSearchIcon />, " Search by anything"]}
              onChange={(e) => {
                trimvariablesForAdvanceSearch(e.target.value);
              }}
              sx={{ width: "420px" }}
            />
          </Box>
          <Box display="flex" justifyContent="flex-start">
            <Box>
              <CustomerPageMiddle />
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export function CustomerPageMiddle() {
  const [toogle, setToogle] = useState(false);
  const [dbCustomerFound, setDbCustomerFound] = useState("");
  const [selectValue, setSelectValue] = useState();
  const [open, setOpen] = React.useState(false);

  const [customer, setCustomer] = useState({
    fname: "",
    lname: "",
    nic: "",
    phoneNumber: "",
    address1: "",
    address2: "",
  });
  const [equipment, setEquipment] = useState({
    eqid: "",
    eqName: "",
    eqRental: "",
    eqDescription: "",
    eqDop: "",
    eqWarrantyExp: "",
    eqCost: "",
    eqDefStatus: "",
    eqStock: "",
  });

  const schema = yup.object().shape({
    eqName: yup.string().required().min(3).max(15),
    eqRental: yup.string().required().min(3).max(15),
    eqDescription: yup.string().required(),
    eqDop: yup.date(),
    eqWarrantyExp: yup.date().when("eqDop", (eqDop, schema) => {
      return (
        eqDop &&
        schema.min(
          eqDop,
          "Warranty expiration date must be after the date of purchase"
        )
      );
    }),
    eqCost: yup.string().min(3).max(25),
    eqDefStatus: yup.string().required(),
    eqStock: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const phonNumberDatabaseCheck = async (phonenumber) => {
    const cleanedPhoneNumber = phonenumber.replace(/\D/g, "");
    const trimmedPhoneNumber = cleanedPhoneNumber.trim();

    try {
      const res = await axios.get(
        `http://localhost:8085/getCustomerbyPhoneNumber/${trimmedPhoneNumber}`
      );
      const customerData = res.data;
      if (customerData && customerData.length > 0) {
        console.log("found");
        setDbCustomerFound("This phone number already exist");
      } else {
        setDbCustomerFound("");
        console.log("No customer data found");
      }
    } catch (error) {
      setDbCustomerFound("");
      console.log("handleSearch Phone Number error");
    }
  };
  const nicDatabaseCheck = async (nic) => {
    const cleanednic = nic.replace(/\D/g, "");
    const trimmednic = cleanednic.trim();

    try {
      const res = await axios.get(
        `http://localhost:8085/getCustomerbyNIC/${nic}`
      );
      const customerData = res.data;
      if (customerData && customerData.length > 0) {
        setDbCustomerFound("This NIC already exist in the database");
      } else {
        console.log("No customer data found");
        setDbCustomerFound("");
      }
    } catch (error) {
      console.log("handleSearch NIC error");
      setDbCustomerFound("");
    }
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, ""); // Remove all non-digit characters
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value;
  };

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:8085/createCustomer",
        data
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      }).then(async () => {
        // Ensure that the wait starts after Swal.fire completes
        await wait(2000);
        window.location.reload();
      });
      console.log("Details saved successfully:", response.data);
      // setToogle(true);
    } catch (error) {
      console.error("Error saving details:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEquipment((prevState) => ({
      ...prevState,
      [name]: name === "phoneNumber" ? formatPhoneNumber(value) : value,
    }));
    if (name === "phoneNumber") {
      phonNumberDatabaseCheck(value);
    }
    if (name === "nic") {
      nicDatabaseCheck(value);
    }
  };
  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        {/* <TextField
              disabled={true}
              id="customer-id"
              name="id"
              label="customer id"
              variant="standard"
              size=" "
              sx={{ width: "10%", mb: 2, ml: 2 }}
              value={customer.id}
            /> */}
        <Grid
          container
          spacing={2}
          p={2}
          ml={1}
          width={"100%"}
          height={"100%"}
          borderRadius={2}
        >
          {/* Left side Box names,mic,pno*/}
          <FormControl
            sx={{
              gap: "20px",
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Grid item xs={4}>
              <Grid container spacing={6}>
                <Grid item xs={6}>
                  <Box className="dey">
                    <TextField
                      disabled={toogle}
                      id="machine-fname"
                      name="machine name"
                      variant="standard"
                      inputProps={{ ...register("eqName") }}
                      error={!!errors.eqName}
                      helperText={errors.eqName?.message}
                      size=" "
                      label="machine name"
                      sx={{ width: "100%" }}
                      value={equipment.eqName}
                      onChange={handleInputChange}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box className="dey">
                    <TextField
                      disabled={toogle}
                      id="customer-lname"
                      name="eqRental"
                      type="number"
                      label="Rental"
                      inputProps={{ ...register("eqRental") }}
                      error={!!errors.eqRental}
                      helperText={errors.eqRental?.message}
                      variant="standard"
                      size=" "
                      sx={{ width: "100%" }}
                      value={equipment.eqRental}
                      onChange={handleInputChange}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box className="dey">
                    {/* <TextField
                      disabled={toogle}
                      id="customer-nic"
                      name="DOP"
                      type="date"
                      inputProps={{ ...register("eqDop") }}
                      error={!!errors.eqDop}
                      helperText={errors.eqDop?.message}
                      variant="standard"
                      size=" "
                      sx={{ width: "100%" }}
                      value={equipment.eqDop}
                      onChange={handleInputChange}
                    /> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disabled={toogle}
                        label="Date of Purchase"
                        inputProps={{ ...register("eqDop") }}
                        error={!!errors.eqDop}
                        helperText={errors.eqDop?.message}
                        defaultValue={dayjs("2022-04-17")}
                        format="LL"
                        onChange={(date) =>
                          console.log(date.format("YYYY-MM-DD"))
                        }
                      />
                    </LocalizationProvider>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box className="dey">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disabled={toogle}
                        label="Warranty end"
                        inputProps={{ ...register("eqWarrantyExp") }}
                        error={!!errors.eqWarrantyExp}
                        helperText={errors.eqWarrantyExp?.message}
                        defaultValue={dayjs("2022-04-17")}
                        format="LL"
                        onChange={(date) =>
                          console.log(date.format("YYYY-MM-DD"))
                        }
                      />
                    </LocalizationProvider>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            {/* address column */}
            <Grid item xs={2}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Box className="dey">
                    <TextField
                      disabled={toogle}
                      id="customer-address1"
                      name="eqCost"
                      type="number"
                      inputProps={{ ...register("eqCost") }}
                      error={!!errors.eqCost}
                      helperText={errors.eqCost?.message}
                      label="Machine cost"
                      variant="standard"
                      size=" "
                      sx={{ width: "100%" }}
                      value={equipment.eqCost}
                      onChange={handleInputChange}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box className="dey">
                    <TextField
                      disabled={toogle}
                      id="customer-address2"
                      name="address2"
                      inputProps={{ ...register("eqStock") }}
                      error={!!errors.eqStock}
                      helperText={errors.eqStock?.message}
                      label="Stock"
                      variant="standard"
                      size=" "
                      sx={{ width: "100%" }}
                      value={equipment.eqStock}
                      onChange={handleInputChange}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            {/* last olumn */}
            <Grid item xs={2}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Box className="dey">
                    <FormControl>
                      <InputLabel id="demo-controlled-open-select-label">
                        Age
                      </InputLabel>
                      <Select
                      sx={{width:"200px",p:0}}
                        labelId="demo-controlled-open-select-label"
                        size="small"
                        id="demo-controlled-open-select"
                        open={open}
                        variant="standard"
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={selectValue}
                        label="Age"
                        onChange={(e) => setSelectValue(e.target.value)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Power Tool</MenuItem>
                        <MenuItem value={20}>Construction Item</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box className="dey">
                    <TextField
                      disabled={toogle}
                      id="customer-address2"
                      name="address2"
                      inputProps={{ ...register("address2") }}
                      error={!!errors.address2}
                      helperText={errors.address2?.message}
                      label="address line2"
                      variant="standard"
                      size=" "
                      sx={{ width: "100%" }}
                      value={customer.address2}
                      onChange={handleInputChange}
                    />
                  </Box>
                </Grid>
              </Grid>
              
            </Grid>
            {/* validation part column */}
            <Grid item xs={3}>
              <Stack component={Paper} elevation={1} sx={{ p: 1 }}>
                <Box display={"flex"} alignItems={"center"}>
                  <Checkbox
                    checked={!!errors.fname?.message}
                    icon={<FontAwesomeIcon icon={faCheckDouble} />}
                    checkedIcon={<FontAwesomeIcon icon={faInfo} shake />}
                  />
                  <Typography>First Name</Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Checkbox
                    checked={!!errors.nic?.message}
                    icon={<FontAwesomeIcon icon={faCheckDouble} />}
                    checkedIcon={<FontAwesomeIcon icon={faInfo} shake />}
                  />
                  <Typography>National ID card</Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Checkbox
                    checked={!!errors.phoneNumber?.message}
                    icon={<FontAwesomeIcon icon={faCheckDouble} />}
                    checkedIcon={<FontAwesomeIcon icon={faInfo} shake />}
                  />
                  <Typography>Phone number</Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Checkbox
                    checked={!!errors.address1?.message}
                    icon={<FontAwesomeIcon icon={faCheckDouble} />}
                    checkedIcon={<FontAwesomeIcon icon={faInfo} shake />}
                  />
                  <Typography>Address Line 1</Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Typography color={"error"}>
                    {dbCustomerFound && (
                      <FontAwesomeIcon icon={faTriangleExclamation} />
                    )}
                    {dbCustomerFound}
                  </Typography>
                </Box>
              </Stack>

              {/* button column */}
            </Grid>

            {/* Buttons */}
            <Grid item xs={1}>
              <Box
                sx={{
                  gap: 3,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <Button
                  // onClick={handleSaveDetails}
                  variant="contained"
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setCustomer({
                      fname: "",
                      lname: "",
                      nic: "",
                      phoneNumber: "",
                      address1: "",
                      address2: "",
                    });
                  }}
                >
                  Clear
                </Button>
              </Box>
            </Grid>
          </FormControl>
        </Grid>
      </form>
    </>
  );
}
