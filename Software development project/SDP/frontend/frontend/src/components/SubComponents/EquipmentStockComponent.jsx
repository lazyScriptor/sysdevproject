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
  }, [stockValue,workingStock,defectedStock]);

  const handleStock = () => {};
  return (
    <>
      <Collapse in={stockValue > 1} timeout="auto">
        <Paper
          sx={{
            width: "auto",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Quantity : {stockValue}</Typography>
          <Box sx={{ display: "flex" }}>
            <TextField variant="standard" value={workingStock} />
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
                --------
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
                -
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
                +
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
                +++++
              </Button>
            </Box>
            <TextField
              variant="standard"
              label="Defected stock"
              value={defectedStock}
            />
          </Box>
        </Paper>
      </Collapse>
      <Collapse in={stockValue ==1} timeout="auto">
        <FormControl fullWidth>
          <InputLabel>Defective Status</InputLabel>
                
          <Select value={defectedStock} onChange={(e) => setDefectedStock(e.target.value)}>
            <MenuItem value={0}>Not Defective</MenuItem>
            <MenuItem value={1}>Defective</MenuItem>
          </Select>
          <Typography variant="caption" sx={{ ml: 2 }} color="error">
          </Typography>
        </FormControl>
      </Collapse>
    </>
  );
}

export  function EquipmentStockDefectiveStatus(props) {
  const {
    stockValue,
    workingStock,
    setworkingStock,
    defectedStock,
    setDefectedStock,
  } = props;

  return (
    <>
      <Collapse in={stockValue ==1} timeout="auto">
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
