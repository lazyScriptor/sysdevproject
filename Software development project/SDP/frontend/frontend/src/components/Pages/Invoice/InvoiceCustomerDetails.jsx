import {
  Box,
  Checkbox,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Button } from "bootstrap";
import React from "react";

function InvoiceCustomerDetails() {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "95%",
          display: "flex",
          justifyContent: "center",
          p: 3,
          borderRadius: 3,
        }}
      >
        {/* 2nd row middle box left */}
        <Box
          sx={{
            display: "flex",
            width: "35%",
            justifyContent: "start",
            flexDirection: "column",
            gap: 7.4,
            pt: 12.8,
          }}
        >
          <FormLabel>Customer Name</FormLabel>
          <FormLabel>Customer Address</FormLabel>
          <FormLabel>Upload NIC</FormLabel>
          <FormLabel>Customer Phone number</FormLabel>
        </Box>
        {/* 2nd row middle box right */}

        <Box
          //  2nd row middle box right-(Searchid,search box) AND (clear button)
          sx={{
            display: "flex",
            width: "65%",
            justifyContent: "start",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              gap: 2,
            }}
          >
            {/* 2nd row middle box right - searchbar and search button only */}

            <TextField
              // onChange={(e) => setPhoneNumber(e.target.value)}
              sx={{ width: "350px" }}
              id="outlined-basic"
              label="Search with phone number or NIC"
              variant="outlined"
            />
            {/* <Button onClick={() => handleSearchPhoneNumber(phoneNumber)}>
                    <FontAwesomeIcon icon={faSearch} />
                  </Button> */}
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                // setBoolvalue(!boolvalue);
              }}
            >
              Advance
              <br />
              search
            </Button>

            <Button
              onClick={() => {
                // setData(clearData);
              }}
              sx={{
                color: (theme) => theme.palette.primary.error[400],
                backgroundColor: (theme) => theme.palette.primary.error[10],
              }}
            >
              Clear
            </Button>
          </Box>

          <Box>
            <TextField
              fullWidth
              disabled
              sx={{}}
              // value={data.cus_fname}
              id="outlined-basic"
              label=""
              variant="outlined"
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              disabled
              sx={{}}
              // value={`${data.cus_address1}  ${data.cus_address2}`}
              id="outlined-basic"
              label=""
              variant="outlined"
            />
          </Box>
          <Box sx={{ display: "flex", gap: 4 }}>
            <TextField
              sx={{}}
              disabled
              id="outlined-basic"
              // value={data.nic}
              // label={<FontAwesomeIcon icon={faUpload} />}
              variant="outlined"
            />
            <Checkbox
            // checked={checkState === "true"} // Convert the string value to a boolean
            // onChange={(e)=>handlecheck(e)}

            // sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
            />
            <FormLabel sx={{ pt: 2 }}>Physical</FormLabel>
            <Checkbox />
            <FormLabel sx={{ pt: 2 }}>Digital</FormLabel>
          </Box>
          <Box>
            <TextField
              fullWidth
              disabled
              sx={{}}
              // value={data.cus_phone_number}
              id="outlined-basic"
              label=""
              variant="outlined"
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {/* <Button variant="contained" onClick={handleProceedPayment}>
                    Proceed to <br />
                    payment
                  </Button> */}
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default InvoiceCustomerDetails;
