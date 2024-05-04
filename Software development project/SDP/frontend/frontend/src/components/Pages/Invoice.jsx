import React from "react";
import "../Stylings/rootstyles.css";
import NewCustomerForm from "./NewCustomerForm.jsx";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew.jsx";
import { Box, Button, TextField } from "@mui/material";

function Invoice() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          Width: "100%",
          minHeight: "100vh",
          border: "solid 8px green",
        }}
      >
        {/* Row1 */}
        <Box
          minHeight={100}
          sx={{
            display: "flex",
            width: "100%",
            border: "solid 3px blue",
            height: "30%",
          }}
        >
          {/*Row1 Leftmost box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "15%",
            }}
          ></Box>
          {/*Row1 middle box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "60%",
              gap: 2,
              pl: 5,
              pr: 5,
            }}
          >
            <TextField
              sx={{ width: "350px" }}
              id="outlined-basic"
              label="Search with id"
              variant="outlined"
            />
            <Button>Update</Button>
          </Box>
          {/*Row1 rightmost box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "25%",
              gap: 2,
            }}
          >
            {" "}
            <Button>Create new</Button>
            {/* Invoice text box */}
            <Box>
              <h5>Invoice ID: 001</h5>
              <h6>Date: 2023 - 12 -30</h6>
            </Box>
          </Box>
        </Box>

        {/* Row2 */}
        <Box
          minHeight={500}
          sx={{
            display: "flex",
            width: "100%",
            border: "solid 3px blue",
            minheight: "30%",
          }}
        >
          {/*Row2 Leftmost box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "15%",
            }}
          >
            <h1>hey</h1>
          </Box>
          {/*Row2 middle box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              width: "60%",
            }}
          >
            {/* 2nd row middle box left */}
            <Box
              sx={{ display: "flex", width: "35%", justifyContent: "center" }}
            >
              <h1>hey</h1>
            </Box>
            {/* 2nd row middle box right */}

            <Box
            //  2nd row middle box right-(Searchid,search box) AND (clear button)
              sx={{ display: "flex", width: "65%", justifyContent: "start" ,gap:10}}
            >
               {/* 2nd row middle box right - searchbar and search button only */}
              <Box sx={{display:"flex", gap:3}}>
                <TextField
                  sx={{ width: "350px" }}
                  id="outlined-basic"
                  label="Search with id"
                  variant="outlined"
                />
                <Button>
                  Search
                </Button>
                </Box>
                <Button>
                  Clear
                </Button>
              
            </Box>
          </Box>
          {/*Row2 rightmost box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "25%",
            }}
          >
            {" "}
            <h1>hey</h1>
          </Box>
        </Box>

        {/* Row3 */}
        <Box
          minHeight={300}
          sx={{
            display: "flex",
            width: "100%",
            border: "solid 3px blue",
            minheight: "30%",
          }}
        >
          {/*Row3 Leftmost box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "15%",
            }}
          >
            <h1>hey</h1>
          </Box>
          {/*Row3 middle box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "60%",
            }}
          >
            {" "}
            <h1>hey</h1>
          </Box>
          {/*Row3 rightmost box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "25%",
            }}
          >
            {" "}
            <h1>hey</h1>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Invoice;
