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
          <Button>View</Button>
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}></Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function EquipmentWarehouseHandler() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

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

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);

    const sortedData = [...data].sort((a, b) => {
      if (isAsc) {
        return a[column] < b[column] ? -1 : 1;
      } else {
        return a[column] > b[column] ? -1 : 1;
      }
    });

    setData(sortedData);
  };

  const headerStyles = {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f1f1f1",
    },
    transition: "background-color 0.3s ease",
  };

  return (
    <>
      <Box id="main-body">
        <Box id="body">
          <CustomerPageUpper
            setData={setData}
            setSearchValue={setSearchValue}
          />
          <TableContainer component={Paper} sx={{  }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    onClick={() => handleSort("eq_id")}
                    sx={headerStyles}
                  >
                    Id {orderBy === "eq_id" && (order === "asc" ? "↑" : "↓")}
                  </TableCell>
                  <TableCell align="center">Machine Name</TableCell>
                  <TableCell align="center">Category Name</TableCell>
                  <TableCell
                    align="center"
                    onClick={() => handleSort("eq_rental")}
                    sx={headerStyles}
                  >
                    Rental{" "}
                    {orderBy === "eq_rental" && (order === "asc" ? "↑" : "↓")}
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={() => handleSort("eq_dofpurchase")}
                    sx={headerStyles}
                  >
                    DOP{" "}
                    {orderBy === "eq_dofpurchase" &&
                      (order === "asc" ? "↑" : "↓")}
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={() => handleSort("eq_warranty_expire")}
                    sx={headerStyles}
                  >
                    Warranty Due{" "}
                    {orderBy === "eq_warranty_expire" &&
                      (order === "asc" ? "↑" : "↓")}
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={() => handleSort("eq_cost")}
                    sx={headerStyles}
                  >
                    Machine Cost{" "}
                    {orderBy === "eq_cost" && (order === "asc" ? "↑" : "↓")}
                  </TableCell>
                  <TableCell align="center">Machine image</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell
                    align="center"
                    onClick={() => handleSort("eq_defected_status")}
                    sx={headerStyles}
                  >
                    Defective status{" "}
                    {orderBy === "eq_defected_status" &&
                      (order === "asc" ? "↑" : "↓")}
                  </TableCell>
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
        </Box>
      </Box>
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
      <Box sx={{  width: "100%" }}>
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
          </Box>
        </Stack>
      </Box>
    </>
  );
}

