import React, { useEffect, useState } from "react";
import { Box, Paper, Button, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Rating from "@mui/material/Rating";
import EquipmentItem1 from "./EquipmentItem1";

import axios from "axios";
import { Item1 } from "./CustomerItem1";
import Item2 from "./CustomerItem2";
import EquipmentItem2 from "./EquipmentItem2";
import EquipmentItem3 from "./EquipmentItem3";
import EquipmentItem4 from "./EquipmentItem4";
import { EquipmentItem5 } from "./EquipmentItem5";

export default function ReportsBackground() {
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box component={Paper} sx={{ width: "100%", height: "auto" }}>
        <Box sx={{ height: "30vh" }}></Box>
        <Box
          sx={{
            height: "auto",
            minHeight: "70vh",
            display: "flex",
            backgroundColor: "#f2f4f7",
            p: 2,
          }}
        >
          <Box sx={{ width: "20%" }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Customer Reports
              </AccordionSummary>
              <AccordionDetails>
                <Tabs
                  orientation="vertical"
                  selectionFollowsFocus
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="Customer Sale " {...a11yProps(0)} />
                  <Tab label="Customer Invoice details" {...a11yProps(1)} />
                  <Tab label="Item Three" {...a11yProps(2)} />
                  <Tab label="Equipment Utilization Report" {...a11yProps(3)} />
                  <Tab label="Equipment Revenue Report" {...a11yProps(4)} />
                  <Tab
                    label="Under Utilized Equipment Report"
                    {...a11yProps(5)}
                  />
                  <Tab
                    label="Equipment Maintenance Needs Report"
                    {...a11yProps(6)}
                  />
                  <Tab
                    label="Incomplete Rentals by Equipment"
                    {...a11yProps(7)}
                  />
                </Tabs>
              </AccordionDetails>
            </Accordion>
            {/* <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                Invoice Reports
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                Equipment Reports
              </AccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
              <AccordionActions>
                <Button>Cancel</Button>
                <Button>Agree</Button>
              </AccordionActions>
            </Accordion> */}
          </Box>
          <Box width={"80%"}>
            <CustomTabPanel value={value} index={0}>
              <Item1 />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Item2 />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              Item Three
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <EquipmentItem1 />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              <EquipmentItem2 />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
              <EquipmentItem3 />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={6}>
              <EquipmentItem4/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={7}>
              <EquipmentItem5/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={8}>
            </CustomTabPanel>
          </Box>
        </Box>
      </Box>
    </>
  );
}
