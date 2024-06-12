import {
  Box,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardArrowLeftTwoToneIcon from "@mui/icons-material/KeyboardArrowLeftTwoTone";
import KeyboardDoubleArrowLeftTwoToneIcon from "@mui/icons-material/KeyboardDoubleArrowLeftTwoTone";

export default function EquipmentStockComponent(props) {
  const {
    stockValue,
    workingStock,
    setworkingStock,
    defectedStock,
    setDefectedStock,
  } = props;
  useEffect(() => {
    // setworkingStock(stockValue);
    // setDefectedStock(0);
  }, [stockValue, workingStock, defectedStock]);

  const handleStock = () => {};
  return (
    <>
      <Collapse in={stockValue > 1} timeout="auto">
        <Paper
          elevation={2}
          sx={{
            backgroundColor: (theme) => theme.palette.primary[25],
            borderRadius: 0,
            width: "auto",
            height: "120px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{ color: (theme) => theme.palette.primary[800] }}
            variant="caption"
          >
            Complete Stock : {stockValue}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <TextField
              disabled={true}
              label="Working stock"
              sx={{ width: "120px", mr: 3 }}
              variant="outlined"
              value={workingStock}
            />
            <Box>
              <Button
                sx={{
                  width: "20px",
                  height: "40px",
                  p: 0,
                  border: "1px solid",
                  borderRadius: 10,
                }}
                onClick={() => {
                  setworkingStock((prev) => prev + parseInt(defectedStock));
                  setDefectedStock(0);
                }}
              >
                <KeyboardDoubleArrowLeftTwoToneIcon />{" "}
              </Button>
              <Button
                sx={{
                  width: "20px",
                  height: "40px",
                  p: 0,
                  border: "1px solid",
                  borderRadius: 10,
                }}
                onClick={() => {
                  if (defectedStock != 0) {
                    setworkingStock((prev) => prev + 1);
                    setDefectedStock((prev) => prev - 1);
                  }
                }}
              >
                <KeyboardArrowLeftTwoToneIcon />
              </Button>
            </Box>
            <Box>
              <Button
                sx={{
                  width: "20px",
                  height: "40px",
                  p: 0,
                  border: "1px solid",
                  borderRadius: 10,
                }}
                onClick={() => {
                  if (workingStock != 0) {
                    setworkingStock((prev) => prev - 1);
                    setDefectedStock((prev) => prev + 1);
                  }
                }}
              >
                <KeyboardArrowRightIcon />
              </Button>
              <Button
                sx={{
                  width: "20px",
                  height: "40px",
                  p: 0,
                  border: "1px solid",
                  borderRadius: 10,
                }}
                onClick={() => {
                  setworkingStock(0);
                  setDefectedStock((prev) => parseInt(workingStock) + prev);
                }}
              >
                <KeyboardDoubleArrowRightIcon />
              </Button>
            </Box>
            <TextField
              disabled={true}
              sx={{ width: "120px", ml: 3 }}
              variant="outlined"
              label="Defected stock"
              value={defectedStock}
            />
          </Box>
        </Paper>
      </Collapse>
      <Collapse in={stockValue == 1} timeout="auto">
        <FormControl fullWidth>
          <InputLabel>Defective Status</InputLabel>

          <Select
            value={defectedStock}
            onChange={(e) => setDefectedStock(e.target.value)}
          >
            <MenuItem value={0}>Not Defective</MenuItem>
            <MenuItem value={1}>Defective</MenuItem>
          </Select>
          <Typography
            variant="caption"
            sx={{ ml: 2 }}
            color="error"
          ></Typography>
        </FormControl>
      </Collapse>
    </>
  );
}

export function EquipmentStockDefectiveStatus(props) {
  const {
    stockValue,
    workingStock,
    setworkingStock,
    defectedStock,
    setDefectedStock,
  } = props;

  return (
    <>
      <Collapse in={stockValue == 1} timeout="auto">
        <FormControl fullWidth>
          <InputLabel>Defective Status</InputLabel>
          <Select onChange={(e) => setDefectedStock(e.target.value)}>
            <MenuItem value={0}>Not Defective</MenuItem>
            <MenuItem value={1}>Defective</MenuItem>
          </Select>
          <Typography variant="caption" sx={{ ml: 2 }} color="error">
            {errors.eq_defected_status?.message}
          </Typography>
        </FormControl>
      </Collapse>
    </>
  );
}
