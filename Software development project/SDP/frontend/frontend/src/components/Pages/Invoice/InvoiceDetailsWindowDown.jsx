import { Box, Paper, Stack, Typography } from "@mui/material";
import { Button } from "@mui/material";
import React from "react";

function InvoiceDetailsWindowDown() {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "start",
          p: 1,
          borderRadius: "0px 0px 12px 12px",
          height: "70%",
        }}
      >
        {/* <Box width="60%" sx={{display:"flex",flexDirection:"column",gap:3}}>
            <Typography variant='h6'>Advance</Typography>
            <Typography variant='h7'>Payments</Typography>
        </Box>
        <Box width="40%" sx={{display:"flex",flexDirection:"column",gap:3}}>
            <Typography variant='h6' sx={{textAlign:"end"}}>2000 LKR</Typography>
            <Typography variant='h7' sx={{textAlign:"end"}}></Typography>
        </Box> */}
        <Box
          sx={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography variant="h6">Advance</Typography>
          <Typography variant="h7">Payments</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ width: "30%", display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" sx={{ textAlign: "end", mb: 3 }}>
            2000 LKR
          </Typography>
          <Typography variant="h7" sx={{ textAlign: "end" }}>
            x 1000 LKR
          </Typography>
          <Typography variant="h7" sx={{ textAlign: "end" }}>
            x 200 LKR
          </Typography>
          <Typography variant="h7" sx={{ textAlign: "end" }}>
            x 350 LKR
          </Typography>
        </Box>
        {/* <Button>Create</Button> */}
      </Paper>
      <Button
        fullWidth
        color="success"
        variant="outlined"
        sx={{ mt: 2, borderRadius: 0, height: "60px" }}
      >
        Create Invoice
      </Button>
    </>
  );
}

export default InvoiceDetailsWindowDown;
