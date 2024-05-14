import React from 'react'
import {
    Box,
    Paper,
    Typography,
    FormLabel,
    Checkbox,
    TextField,
    Chip,
    Stack,
    Button,
    IconButton,
  } from "@mui/material";
  import axios from "axios";
  import { AlertComponentContext, InvoiceContext } from "../../Contexts/Contexts";
  import MousePopOver from "./AlertComponents/MousePopOver";
  import SearchIcon from "@mui/icons-material/Search";

function InvoiceLeftSide() {
  return (
    <>
     <Paper
        elevation={3}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection:"column",
          pt: 1,
          borderRadius: 3,
          height: "70%",
        }}
      >
        <Box sx={{ width: "95%" }}>
          <Typography sx={{ textAlign: "center" }} variant="h5" gutterBottom>
            Add / Remove / Handover
          </Typography>

          <Box
            gap={2}
            sx={{ display: "flex", flexDirection: "column", height: "auto" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "40%",
                  alignItems: "center",
                }}
              >
                <FormLabel htmlFor="my-input">Equipment Id</FormLabel>
              </Box>
              <Box sx={{ width: "60%",display:"flex",alignItems:"center"}}>
                <TextField
                  onChange={(e) => {
                    // setEqIdValue(e.target.value);
                  }}
                  sx={{ width: "70%" }}
                  id="outlined-basic"
                  label="Search machine id"
                  variant="outlined"
                />
                <IconButton
                  onClick={() => {
                    // handleSearch(EqIdValue);
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "40%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FormLabel htmlFor="my-input">Equipment Name</FormLabel>
              </Box>
              <Box sx={{ width: "60%" }}>
                <TextField
                  disabled
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  variant="outlined"
                //   value={eq}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "40%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FormLabel htmlFor="my-input">Equipment Qty</FormLabel>
              </Box>
              <Box sx={{ width: "60%" }}>
                <TextField
                //   disabled={isQtyGreaterThanOne}
                  sx={{ width: "100%" }}
                  id="standard-basic"
                  label=""
                  variant="outlined"
                //   value={eqQty}
                  onChange={(e) => {
                    // setBorrowedQty(eqQty);
                  }}
                />
              </Box>
            </Box>
          </Box>
                  <>
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
            {/* <Button onClick={() => handleAddEquipment(EqIdValue, eqQty)}>
              Add
            </Button>
            <Button>Remove</Button> */}
            <Button>Handover</Button>
          </Box>
          </>
         
        </Box>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          width: "95%",
          display: "flex",
          justifyContent: "center",
          p: 0,
          borderRadius: 3,
          height: "30%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Typography sx={{ textAlign: "center" }} variant="h5" gutterBottom>
            Id card Status
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pl: 2.5,
            }}
          >
            <MousePopOver
              message={"HandOver status"}
              popOverContent={`Press Add button to select`}
            />
            {/* <Button onClick={handleIdAdd}>Add</Button> */}
            <Checkbox
            //   checked={checkState}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
            />
          </Box>
        </Box>
      </Paper>
    </>
  )
}

export default InvoiceLeftSide
