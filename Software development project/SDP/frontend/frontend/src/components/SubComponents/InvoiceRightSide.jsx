import {
  Box,
  Paper,
  Typography,
  FormLabel,
  Checkbox,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { InvoiceContext } from "../../Contexts/Contexts";

function InvoiceRightSide() {

const {equipmentObject,setEquipmentObject}=useContext(InvoiceContext);
  const [eqObject, setEqObject] = useState({});
  const [eq, setEq] = useState('');

  const handleSearch = async (value) => {
    console.log("value frontend", value);
    try {
      const res = await axios.get(
        `http://localhost:8085/getEquipmentbyID/${value}`
      );
      if(res.data[0]==undefined)setEq("")
      setEqObject(res.data[0]);
      console.log("After retrieval", res.data[0]);
      setEq(res.data[0].eq_name);
      setEquipmentObject(res.data[0])
    } catch (error) {
      console.error("error occurred while searching by ID:", error);
    }
  };

  return (
    <>
      
        <Paper
          elevation={3}
          sx={{
            width: "95%",
            display: "flex",
            justifyContent: "center",
            p: 1,
            borderRadius: 3,
            height: "70%",
          }}
        >
          <Box sx={{ width: "90%" }}>
            <Typography sx={{ textAlign: "center" }} variant="h5" gutterBottom>
              Add / Remove / Handover
            </Typography>
            <Typography sx={{ textAlign: "center" }} variant="h5" gutterBottom>
              Equipment
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
                <Box sx={{ width: "60%" }}>
                  <TextField
                    onChange={(e) => handleSearch(e.target.value)}
                    sx={{ width: "100%" }}
                    id="outlined-basic"
                    label="Search machine id"
                    variant="outlined"
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
                  <FormLabel htmlFor="my-input">Equipment Name</FormLabel>
                </Box>
                <Box sx={{ width: "60%" }}>
                  <TextField
                    disabled
                    sx={{ width: "100%" }}
                    id="outlined-basic"
                    variant="outlined"
                    value={eq}
                  />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", p: 3 }}
            >
              <Button>Add</Button>
              <Button>Remove</Button>
              <Button>Handover</Button>
            </Box>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            width: "95%",
            display: "flex",
            justifyContent: "center",
            p: 3,
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
              Handover Id Card
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <FormLabel sx={{ pt: 1 }}>Hand over</FormLabel>
              <Button>Add</Button>
              <Checkbox
                disabled
                checked
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              />
            </Box>
          </Box>
        </Paper>
     
    </>
  );
}

export default InvoiceRightSide;
