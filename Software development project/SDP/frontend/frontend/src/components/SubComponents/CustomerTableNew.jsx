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
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

function Row(props) {
  const { row, searchValue } = props;
  const [open, setOpen] = useState(false);

  const cellStyles = {
    padding: "6px 8px",
    height: "30px",
  };

  const highlightText = (text, highlight) => {
    if (typeof text !== 'string') return text; // Ensure text is a string
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={cellStyles}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {highlightText(row.cus_id, searchValue)}
        </TableCell>
        <TableCell align="center">
          {highlightText(`${row.cus_fname} ${row.cus_lname}`, searchValue)}
        </TableCell>
        <TableCell align="right">{highlightText(row.cus_phone_number, searchValue)}</TableCell>
        <TableCell align="right">{highlightText(row.nic, searchValue)}</TableCell>
        <TableCell align="right">{highlightText(row.cus_address1, searchValue)}</TableCell>
        <TableCell align="right">{highlightText(row.cus_address2, searchValue)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <NewCustomerForm cus_id={row.cus_id} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CustomerTableNew() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    try {
      axios.get("http://localhost:8085/customers").then((res) => {
        setData(res.data);
        console.log(res.data);
      });
    } catch (error) {
      console.error("error occurred in the try catch block", error);
    }
  }, []);

  return (
    <>
      <CustomerPageUpper setData={setData} setSearchValue={setSearchValue} />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Customer Id</TableCell>
              <TableCell align="center">Customer Name</TableCell>
              <TableCell align="right">Customer Phone number</TableCell>
              <TableCell align="right">Customer NIC</TableCell>
              <TableCell align="right">Customer Address line 1</TableCell>
              <TableCell align="right">Customer Address line 2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <Row key={row.cus_id} row={row} searchValue={searchValue} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export function CustomerPageUpper(props) {
  const { setData, setSearchValue } = props;

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
      <Box sx={{ height: "250px", width: "100%" }}>
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="stretch"
          spacing={2}
        >
          <Box></Box>
          <Box display="flex" justifyContent="center">
            <TextField
              label={[<ManageSearchIcon/>," Search by everything"]}
              onChange={(e) => {
                searchByVariable(e.target.value);
              }}
              sx={{ width: "420px" }}
            />
          </Box>
          <Box display="flex" justifyContent="flex-start" sx={{}}>
           <Box>
              
           </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
