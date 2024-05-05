import React from "react";
import "../Stylings/rootstyles.css";
import NewCustomerForm from "./NewCustomerForm.jsx";
import BackgroundStyleNew from "../SubComponents/BackgroundStyleNew.jsx";
import {
  Box,
  Button,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUpload } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "@mui/material/Checkbox";
import CustomerTable from "../SubComponents/CustomerTable.jsx";


function Invoice() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent:"space-evenly",
          Width: "100%",
          minHeight: "100vh",
          border:"solid 2px green"
        }}
      >
        {/* Row1 */}
        <Box
          minHeight={100}
          sx={{
            display: "flex",
            width: "100%",
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
              justifyContent:"space-evenly",
              alignItems: "center",
              width: "25%",
              gap: 2,
            }}
          >
            
            <Button variant="contained">Create new</Button>
            {/* Invoice text box */}
            <Box>
              <h5>Invoice ID: 001</h5>
              <h6>Date: 2023 - 12 -30</h6>
            </Box>
          </Box>
        </Box>

        {/* Row2 */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            minheight: "40%",
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
            Row 2 coloumn 1
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
                    width: "100%",
                    gap: 2,
                  }}
                >
                  {/* 2nd row middle box right - searchbar and search button only */}
                 
                    <TextField
                      sx={{ width: "350px" }}
                      id="outlined-basic"
                      label="Search with id"
                      variant="outlined"
                    />
                    <Button sx={{borderRadius:"50%"}}><FontAwesomeIcon icon={faSearch}/></Button>
                  
                  <Button
                    sx={{ color: (theme) => theme.palette.primary.error }}
                  >
                    Clear
                  </Button>
                </Box>

                <Box>
                  <TextField
                    fullWidth
                    sx={{}}
                    id="outlined-basic"
                    label="Customer Name"
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    sx={{}}
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 4 }}>
                  <TextField
                    sx={{}}
                    id="outlined-basic"
                    label={<FontAwesomeIcon icon={faUpload} />}
                    variant="outlined"
                  />
                  <Checkbox defaultChecked /><FormLabel sx={{pt:2}}>Physical</FormLabel>
                  <Checkbox /><FormLabel sx={{pt:2}}>Digital</FormLabel>
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    sx={{}}
                    id="outlined-basic"
                    label="Phone number"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button variant="contained">
                    Proceed to <br />
                    payment
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/*Row2 rightmost box */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "25%",
            }}
          >
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
              <Box sx={{ width: "90%"}}>
                <Typography sx={{textAlign:"center"}} variant="h5" gutterBottom>
                  Add / Remove / Handover
                </Typography>
                <Typography
                  sx={{ textAlign: "center" }}
                  variant="h5"
                  gutterBottom
                >
                  Equipment
                </Typography>
                <Box gap={2} sx={{ display:"flex",flexDirection:"column",height:"auto"}}>
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
                        sx={{ width: "100%" }}
                        id="outlined-basic"
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                </Box>



                <Box sx={{display:"flex",justifyContent:"space-between",p:3}}>
                  <Button>
                    Add
                  </Button>
                  <Button>
                    Remove
                  </Button>
                  <Button>
                    Handover
                  </Button>
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
              <Box sx={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"space-evenly"}}>
                <Typography sx={{textAlign:"center"}}variant="h5" gutterBottom>
                  Handover Id Card
                </Typography>
                <Box sx={{width:"100%",display:"flex",justifyContent:"space-evenly"}}>
                  <FormLabel sx={{pt:1}}>Hand over</FormLabel>
                  <Button>
                    Add
                  </Button>
                  <Checkbox disabled checked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}/>
                </Box>
              </Box>
              
            </Paper>
          </Box>
        </Box>

        {/* Row3 */}
        <Box
          minHeight={300}
          sx={{
            display: "flex",
            width: "100%",
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
           Row 3 coloumn 1
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
    
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Invoice;
