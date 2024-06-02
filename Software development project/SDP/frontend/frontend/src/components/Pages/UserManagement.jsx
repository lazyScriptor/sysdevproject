import {
  Box,
  ButtonGroup,
  Button,
  Paper,
  Stack,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  FormLabel,
  Checkbox,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Stylings/rootstyles.css";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../../imagedbfirebase";
import defaultImage from "../../assets/username.png"; // Import the default image
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function UserManagement({ username }) {
  const [users, setUsers] = useState([]);
  const [imageMap, setImageMap] = useState({}); // State to store image URLs mapped by username
  const imageListRef = ref(storage, "UserImages/");

  useEffect(() => {
    const fetchImages = async () => {
      const response = await listAll(imageListRef);
      const imageMap = {};
      for (const item of response.items) {
        const url = await getDownloadURL(item);
        const name = item.name.split(".")[0]; // Assuming the image name is the username
        imageMap[name] = url;
      }
      setImageMap(imageMap);

      // Check if the username exists in the imageMap
      if (username && !imageMap[username]) {
        setImageMap((prevImageMap) => ({
          ...prevImageMap,
          [username]: defaultImage, // Set the default image for the username
        }));
      }
    };
    fetchImages();
  }, [username]); // Add username as a dependency

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8085/fetchUserDetails"
        );
        console.log("This is the response", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Box id="main-body">
      <Box id="body" sx={{ display: "flex", flexDirection: "column" }}>
        {/* <Box sx={{ overflowX: "auto", width: "100%", position: "relative" }}>
        For the user staack  
        </Box> */}
        <Box
          sx={{
            overflowX: "auto",
            width: "100%",
            height: "300px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            p: 4,
            gap: 3,
          }}
        >
          <Typography variant="h4">Add New User</Typography>
          <Typography>
            Carefully observ the privillages and assign accordingly
          </Typography>
        </Box>
        <Box
          sx={{
            height: "100vh",
            backgroundColor: "#f2f4f7",
            display: "flex",
            justifyContent: "end",
            p: 4,
          }}
        >
          <UserForm />
          <Box component={Paper} sx={{ width: "75%", borderRadius: 4 }}>
            <UserTable />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function UserPaper({ user, imageUrl }) {
  return (
    <Paper
      sx={{
        width: "300px",
        height: "100%",
        minHeight: "254px",
        borderRadius: 4,
        flexShrink: 0,
      }}
      elevation={3}
    >
      <Box
        sx={{
          height: "200px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={user.username}
            style={{
              maxWidth: "100%", // Set maximum width to ensure the image fits within the box
              maxHeight: "100%", // Set maximum height to ensure the image fits within the box
              borderRadius: "50%",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
        ) : null}
      </Box>
      <Box sx={{ height: "40%", width: "100%", p: 2 }}>
        <Typography variant="body2">
          Full name: {user.user_first_name}
        </Typography>
        <Typography variant="body2">Role: {user.role}</Typography>
        <Typography variant="body2">Username: {user.username}</Typography>
        <Typography variant="body2">NIC: {user.nic}</Typography>
        <Typography variant="body2">
          Phone number: {user.user_phone_number}
        </Typography>
        <Box sx={{ width: "100%", display: "flex", height: "60px" }}>
          <Typography variant="body2" sx={{ width: "30%" }}>
            Address:
          </Typography>
          <Box sx={{ width: "60%" }}>
            <Typography variant="body2" sx={{ width: "100%" }}>
              {user.user_address1} {user.user_address2}
            </Typography>
          </Box>
        </Box>
        <Box>
          <ButtonGroup
            variant="outlined"
            aria-label="Basic button group"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Paper>
  );
}

function UserForm() {
  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px", // Increase the border radius
    },
  };
  return (
    <>
      <Box
        sx={{
          m: 2,
          width: "auto",
          height: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ height: "200px" }}></Box>
        <Stack gap={3}>
          <Box>
            <FormLabel sx={{ m: 1, width: "150px" }}>First name</FormLabel>
            <TextField label="First name" size="small" sx={textFieldStyle} />
          </Box>
          <Box>
            <FormLabel sx={{ m: 1, width: "150px" }}>Last name</FormLabel>
            <TextField label="Last name" size="small" sx={textFieldStyle} />
          </Box>
          <Box>
            <FormLabel sx={{ m: 1, width: "150px" }}>User name</FormLabel>
            <TextField label="User name" size="small" sx={textFieldStyle} />
          </Box>
          <Box>
            <FormLabel sx={{ m: 1, width: "150px" }}>User role</FormLabel>
            <TextField label="User role" size="small" sx={textFieldStyle} />
          </Box>
          <Box>
            <FormLabel sx={{ m: 1, width: "150px" }}>
              User phone number
            </FormLabel>
            <TextField
              label="User phone number"
              size="small"
              sx={textFieldStyle}
            />
          </Box>
          <Box>
            <FormLabel sx={{ m: 1, width: "150px" }}>
              User address Line 1
            </FormLabel>
            <TextField label="User address" size="small" sx={textFieldStyle} />
          </Box>
          <Box>
            <FormLabel sx={{ m: 1, width: "150px" }}>
              User address Line 2
            </FormLabel>
            <TextField label="User address" size="small" sx={textFieldStyle} />
          </Box>
        </Stack>
      </Box>
    </>
  );
}
function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8085/fetchUserDetails"
        );
        console.log("This is the response", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Full name</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Phone number</TableCell>
            <TableCell align="center">Admin</TableCell>
            <TableCell align="center">Cashier</TableCell>
            <TableCell align="center">Warehouse Handler</TableCell>
            <TableCell align="right">Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.user_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.user_first_name} {user.user_last_name}
              </TableCell>
              <TableCell align="right">{user.username}</TableCell>
              <TableCell align="right">{user.user_phone_number}</TableCell>
              <TableCell align="center">
                <Checkbox checked={user.ur_role.includes("admin")} />
              </TableCell>
              <TableCell align="center">
                <Checkbox checked={user.ur_role.includes("cashier")} />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={user.ur_role.includes("warehouse handler")}
                />
              </TableCell>
              <TableCell align="right">
                {user.user_address1} {user.user_address2}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// <Stack direction="row" spacing={2} sx={{ minWidth: "max-content"}}>
// {users.map((user) => (
//   <UserPaper
//     key={user.user_id}
//     user={user}
//     imageUrl={imageMap[user.username] || defaultImage}
//   />
// ))}
// </Stack>
