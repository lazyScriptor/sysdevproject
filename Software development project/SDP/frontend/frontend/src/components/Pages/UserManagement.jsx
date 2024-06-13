import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Input,
  Chip,
  FormLabel,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../../imagedbfirebase";
import defaultImage from "../../assets/username.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RoleSelect from "../SubComponents/RoleSelect";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import backgroundImage from "../../assets/background.jpg";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import UserImageUpload from "../SubComponents/UserImageUpload";

export default function UserManagement({ username }) {
  const [users, setUsers] = useState([]);
  const [imageMap, setImageMap] = useState({}); // State to store image URLs mapped by username
  const [loading, setLoading] = useState(true); // Loading state
  const imageListRef = ref(storage, "UserImages/");
  const [existingUsernames, setExistingUsernames] = useState([]);
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false); // Set loading to false once images are loaded
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
        const usernames = response.data.map((user) => user.username);
        setExistingUsernames(usernames);
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
        <Box
          sx={{
            overflowX: "auto",
            width: "100%",
            height: "300px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            backgroundImage: `url(${backgroundImage})`,
            backgroundAttachment: "fixed",
            backgroundPosition: `center calc(50% + ${offsetY * 0.5}px)`, // Adjust this factor for desired effect
            backgroundSize: "cover", // Ensures the background image covers the entire box
            backgroundRepeat: "no-repeat", // Prevents the background image from repeating
            p: 4,
            gap: 3,
          }}
        >
          <Typography variant="h4">Add New User</Typography>
          <Typography>Observe the privileges and assign accordingly</Typography>
        </Box>
        <Box
          sx={{
            height: "auto",
            backgroundColor: "#f2f4f7",
            display: "flex",
            justifyContent: "end",
            p: 4,
          }}
        >
          <UserForm existingUsernames={existingUsernames} />
          <Box
            component={Paper}
            sx={{ width: "70%", borderRadius: 4, height: "800px", p: 2 }}
          >
            <UserTable />
            <Box
              sx={{
                mt: 2,
                overflowX: "auto",
                height: "200px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {loading ? (
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ minWidth: "max-content" }}
                >
                  {[...Array(5)].map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      sx={{ borderRadius: 4 }}
                      width={150}
                      height={170}
                    />
                  ))}
                </Stack>
              ) : (
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ minWidth: "max-content" }}
                >
                  {users.map((user) => (
                    <UserPaper
                      key={user.user_id}
                      user={user}
                      imageUrl={imageMap[user.username] || defaultImage}
                    />
                  ))}
                </Stack>
              )}
            </Box>
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
        width: "150px",
        height: "170px",
        borderRadius: 4,
      }}
      elevation={4}
    >
      <Box
        sx={{
          height: "100px",
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
          {user.user_first_name} {user.user_last_name}
        </Typography>
      </Box>
    </Paper>
  );
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function UserForm({ existingUsernames }) {
  const [roles, setRoles] = useState([]);

  const schema = yup.object().shape({
    firstname: yup.string().required("First name is required"),
    userRole: yup.array().min(1, "At least one role must be selected"),
    lastname: yup.string().required("Last name is required"),
    nic: yup
      .string()
      .required()
      .transform((value) => value.trim())
      .test("is-valid-nic", "Please enter a valid NIC number", (value) => {
        if (!value) return false;
        const nineDigitsAndV = /^[0-9]{9}v$/i;
        const validFormatCheck = /^[1-9]\d{8,10}$/;
        const twelveDigits = /^[0-9]{12}$/;
        return nineDigitsAndV.test(value) || twelveDigits.test(value);
      }),
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .notOneOf(existingUsernames, "Username already exists"),
    password: yup
      .string()
      .min(5, "Password must be at least 5 characters")
      .max(15, "Password cannot exceed 10 characters")
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{5,10})/,
        "Password must include at least one uppercase letter and one symbol (!@#$%^&*)"
      ),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    phonenumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number must contain only digits")
      .test("phone-number-validation", function (value) {
        if (!value) return false; // In case the value is undefined or null, required will handle this case
        if (value.startsWith("0")) {
          if (value.length !== 10) {
            return this.createError({
              message:
                `Enter a valid phone number`,
            });
          }
        } else {
          if (value.length !== 9) {
            return this.createError({
              message:
                "Enter a valid phone number",
            });
          }
        }
        return true;
      }),
    address1: yup.string().required("Address line 1 is required"),
    address2: yup.string().required("Address line 2 is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("userRole", roles);
  }, [roles, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8085/createUser",
        data
      );
      reset(); // Assuming reset is a function that resets your form fields

      // Display success message using SweetAlert
      Swal.fire({
        icon: "success",
        title: "User Created Successfully",
        showConfirmButton: false,
        timer: 1500, // Close alert after 1.5 seconds
      });
    } catch (error) {
      console.log("Error occurred in frontend createUser", error);
      // Handle error here if needed
    }
  };

  const handleClear = () => {
    reset(); // Reset the form when "Clear" button is clicked
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
    },
    "& .MuiInputBase-root": {
      borderRadius: "12px",
    },
    "& .MuiPaper-root": {
      borderRadius: "12px",
    },
  };
  

  return (
    <Box
      sx={{
        m: 2,
        width: "700px",
        height: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={3}>
          <Box>
            <FormLabel sx={{ m: 1, width: "150px" }}>First name</FormLabel>
            <TextField
              label="First name"
              size="small"
              sx={textFieldStyle}
              inputProps={{ ...register("firstname") }}
              error={!!errors.firstname}
              helperText={errors.firstname?.message}
            />
          </Box>
          <Box>
            <FormLabel sx={{ m: 1, width: "150px" }}>Last name</FormLabel>
            <TextField
              label="Last name"
              size="small"
              sx={textFieldStyle}
              inputProps={{ ...register("lastname") }}
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
            />
          </Box>
          <Box>
            <FormLabel sx={{ m: 1, width: "150px" }}>User name</FormLabel>
            <TextField
              label="User name"
              size="small"
              sx={textFieldStyle}
              inputProps={{ ...register("username") }}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <FormLabel sx={{ m: 1, width: "150px" }}>Password</FormLabel>
            <TextField
              label="Password"
              type="password"
              size="small"
              sx={textFieldStyle}
              inputProps={{ ...register("password") }}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              label="Confirm password"
              size="small"
              type="password"
              sx={[textFieldStyle, { ml: 2 }]}
              inputProps={{ ...register("confirmpassword") }}
              error={!!errors.confirmpassword}
              helperText={errors.confirmpassword?.message}
            />
          </Box>
          <Box>
            <FormLabel sx={[{ m: 1, width: "150px" },textFieldStyle]}>User role</FormLabel>
            <RoleSelect roles={roles} setRoles={setRoles} register={register} />
            <br/>
            {errors.userRole && (
              <Typography sx={{ml:22}} variant="caption" color={"error"}>
                {errors.userRole.message}
              </Typography>
            )}
          </Box>
          <Box>
            <FormLabel sx={{ m: 1, width: "150px" }}>User NIC number</FormLabel>
            <TextField
              label="nic"
              size="small"
              sx={textFieldStyle}
              inputProps={{ ...register("nic") }}
              error={!!errors.nic}
              helperText={errors.nic?.message}
            />
          </Box>
          <Box>
            <FormLabel sx={{ m: 1, width: "150px" }}>
              User phone number
            </FormLabel>
            <TextField
              label="User phone number"
              size="small"
              sx={textFieldStyle}
              inputProps={{ ...register("phonenumber") }}
              error={!!errors.phonenumber}
              helperText={errors.phonenumber?.message}
            />
          </Box>
          <Box>
            <FormLabel sx={{ m: 1, width: "150px" }}>
              User address Line 1
            </FormLabel>
            <TextField
              label="User address"
              size="small"
              sx={textFieldStyle}
              inputProps={{ ...register("address1") }}
              error={!!errors.address1}
              helperText={errors.address1?.message}
            />
          </Box>
          <Box>
            <FormLabel sx={{ m: 1, width: "150px" }}>
              User address Line 2
            </FormLabel>
            <TextField
              label="User address"
              size="small"
              sx={textFieldStyle}
              inputProps={{ ...register("address2") }}
              error={!!errors.address2}
              helperText={errors.address2?.message}
            />
          </Box>
          <Box display={"flex"} gap={2} justifyContent={"center"}>
            <Button type="submit" variant="contained" customvariant="custom">
              Submit
            </Button>
            <Button
              type="reset"
              variant="contained"
              color="error"
              onClick={handleClear}
              customvariant="custom"
            >
              Clear
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}

function UserTable() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [availableRoles, setAvailableRoles] = useState([]);
  const addButtonStyle = {
    backgroundColor: null,
    color: (theme) => theme.plaette.primary,
    border: 0,
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = async (userId, role) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "This user will lose access with this role",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          console.info("You clicked the delete icon.", role, userId);

          // Optimistically update the local state
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.user_id == userId
                ? {
                    ...user,
                    user_roles: user.user_roles.filter((r) => r !== role),
                  }
                : user
            )
          );

          const response = axios.delete(
            `http://localhost:8085/deleteUserRole/${userId}/${role}`
          );

          if (response.status === 200) {
            window.location.reload();
          } else {
            console.error(
              "Failed to delete user role. Status:",
              response.status
            );
          }

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "User role has been deleted.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "You didn't delete the Role :)",
            icon: "info",
          });
        }
      });
  };

  const handleAddRoles = (user) => {
    setSelectedUser(user);
    const occupiedRoles = new Set(user.user_roles);
    const filteredRoles = Object.entries(roleLabels)
      .filter(([roleId]) => !occupiedRoles.has(parseInt(roleId)))
      .map(([, roleName]) => roleName);
    setAvailableRoles(filteredRoles);
  };

  const handleRoleSelection = async (roleId) => {
    try {
      const { value: password } = await Swal.fire({
        title: `Enter password for ${selectedUser.user_first_name}s role: ${roleId}`,
        input: "password",
        text: roleId === "Admin" ? "You are about to give full access!" : null,
        inputAttributes: {
          autocapitalize: "off",
        },
        inputValidator: (value) => {
          if (!value) {
            return "Password is required";
          }
          // Password validation criteria
          const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{5,10})/;
          if (!regex.test(value)) {
            return "Password must be 5-10 characters long and include at least one uppercase letter and one symbol (!@#$%^&*)";
          }
          return null; // Return null for no validation message
        },
        showCancelButton: true,
        confirmButtonText: "Assign Role",
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (password) {
        let roleIdToSend;
        switch (roleId) {
          case "Admin":
            roleIdToSend = 1;
            break;
          case "Cashier":
            roleIdToSend = 2;
            break;
          case "Warehouse Handler":
            roleIdToSend = 3;
            break;
          default:
            return;
        }

        console.log(
          `Assigning role ${roleIdToSend} to user ${selectedUser.user_id} with password ${password}`
        );

        const response = await axios.put(
          `http://localhost:8085/updateUserRole/${selectedUser.user_id}/${roleIdToSend}`,
          { password }
        );

        if (response.status === 200) {
          Swal.fire("Success!", "User role updated successfully", "success");
          // Update the local state to reflect the newly added role
          const updatedUsers = users.map((user) =>
            user.user_id === selectedUser.user_id
              ? {
                  ...user,
                  user_roles: [...user.user_roles, roleIdToSend],
                }
              : user
          );
          setUsers(updatedUsers);
        } else {
          Swal.fire("Error!", "Failed to update user role", "error");
        }
      } else {
        console.log("Role assignment cancelled by user.");
      }
    } catch (error) {
      console.error("Error assigning user role:", error);
      Swal.fire("Error!", "Failed to update user role", "error");
    }
  };

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

  const roleLabels = {
    1: "Admin",
    2: "Cashier",
    3: "Warehouse Handler",
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Full name</TableCell>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Phone number</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Roles</TableCell>
            <TableCell align="center">Grant permissions</TableCell>
            <TableCell align="left">Upload image</TableCell>
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
              <TableCell align="center">{user.username}</TableCell>
              <TableCell align="center">{user.user_phone_number}</TableCell>
              <TableCell align="center">
                {user.user_address1} {user.user_address2}
              </TableCell>
              <TableCell align="center">
                {user.user_roles &&
                  user.user_roles.map((role) => (
                    <Chip
                      key={role}
                      label={roleLabels[role]}
                      onClick={handleClick}
                      onDelete={() => handleDelete(role, user.user_id)}
                      deleteIcon={<DeleteIcon />}
                      sx={{ margin: "4px" }}
                    />
                  ))}
              </TableCell>
              <TableCell align="center">
                <Button
                  style={addButtonStyle}
                  onClick={() => handleAddRoles(user)}
                >
                  <AddCircleTwoToneIcon />
                </Button>
                {selectedUser === user && availableRoles.length > 0 && (
                  <div>
                    {availableRoles.map((role) => (
                      <Chip
                        key={role}
                        label={role}
                        onClick={() => handleRoleSelection(role)}
                        sx={{ margin: "4px" }}
                      />
                    ))}
                  </div>
                )}
              </TableCell>
              <TableCell align="right">
                <UserImageUpload username={user.username} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
