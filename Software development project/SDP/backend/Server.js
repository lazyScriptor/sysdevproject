import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
  deleteCustomer,
  deleteEquipment,
  getEquipmentbyID,
  getEquipmentbyName,
  getCustomerbyID,
  getCustomerbyNIC,
  getCustomers,
  getEquipment,
  getUsers,
  updateCustomerDetails,
  getCustomerbyFirstName,
  getCustomerbyLastName,
  setCustomer,
  getCustomerbyAddress1,
  getCustomerbyAddress2,
  getUserRole,
  loginValidate,
  getInvoiceId,
  getInvoiceDetails,
  updateInvoiceDetails,
  getCustomerBySearchingManyFields,
  setEquipment,
  addEquipment,
  getCustomerbyPhoneNumberOrNic,
  getCustomerbyPhoneNumber,
} from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("From backend side");
});

app.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    return res.json(users);
  } catch (error) {
    console.error("Error in fetching users:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


const verifyAdmin = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    console.log("object");
    return res.status(403).json({ auth: false, message: "No token provided." });
  }
  jwt.verify(token, "jwtSecret", (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });
    } else {
      if (decoded.userRole === "admin") {
        console.log("authenticated");
        next();
      } else {
        return res
          .status(403)
          .json({ auth: false, message: "You are not an admin." });
      }
    }
  });
};
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.json({ auth: false, message: "failed" });
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "U failed to authencticate" });
      } else {
        req.role = decoded.userRole;
        console.log("veriy jwt else part ", req.role);
        next();
      }
    });
  }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
  return res.json({ auth: true, message: "You have a valid token" });
});

app.get("/loginValidate", async (req, res) => {
  try {
    console.log("express app ", req.query.username);

    const response = await loginValidate(req.query);
    const id = response[1][0].user_id;
    const userRole = response[1][0].role;
    const userName = response[1][0].username;
    console.log("id is", id, "Role is ", userRole);
    const token = jwt.sign({ userRole }, "jwtSecret", {
      expiresIn: 3600,
    });

    return res.json({
      auth: true,
      token: token,
      result: userRole,
      username: userName,
    });
  } catch (error) {
    console.log("wrong", { auth: false, message: "express failed auth false" });
    return res.json({ auth: false, message: "express failed auth false" });
  }
});


app.get("/customers", async (req, res) => {
  try {
    console.log(req);
    const customers = await getCustomers();
    return res.json(customers);
  } catch (error) {
    console.error("Error in fetching customers:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/searchCustomerByValue/:value", async (req, res) => {
  try {
    const customers = await getCustomerBySearchingManyFields(req.params.value);
    return res.json(customers);
  } catch (error) {
    console.error("Error in fetching customers:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/equipment", async (req, res) => {
  try {
    const equipment = await getEquipment();
    return res.json(equipment);
  } catch (error) {
    console.error("Error in fetching equipment:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/getEquipmentbyID/:equipmentID", async (req, res) => {
  try {
    console.log("Server side getEquipmentbyID", req.params.equipmentID);
    const equipment = await getEquipmentbyID(req.params.equipmentID);
    return res.json(equipment);
  } catch (error) {
    console.error("Error in getCustomerbyID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/getEquipmentbyName/:equipmentName", async (req, res) => {
  try {
    console.log("Server side getEquipmentbyName", req.params.equipmentName);
    const equipment = await getEquipmentbyName(req.params.equipmentName);
    return res.json(equipment);
  } catch (error) {
    console.error("Error in getCustomerbyID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getCustomerbyNIC/:nic", async (req, res) => {
  try {
    console.log("Server side getCustomerbyNIC", req.params.nic);
    const customers = await getCustomerbyNIC(req.params.nic);
    return res.json(customers);
  } catch (error) {
    console.error("Error in getCustomerbyNIC:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/addEquipment", async (req, res) => {
  try {
    const customerDetails = await addEquipment(req.body);
    console.log("created equipment details:", req.body);
    return res.json({
      message: `equipment details updated for the equipment with id : ${req.body.id}`,
    });
  } catch (error) {
    console.error("Error in updateEquipmentDetails:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/setEquipment", async (req, res) => {
  try {
    const customerDetails = await setEquipment(req.body);
    console.log("created equipment details:", req.body);
    return res.json({
      message: `equipment details updated for the equipment with id : ${req.body.id}`,
    });
  } catch (error) {
    console.error("Error in updateEquipmentDetails:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/createCustomer", async (req, res) => {
  try {
    const customerDetails = await setCustomer(req.body);
    console.log("created customer details:", req.body);
    return res.json({
      message: `Customer details updated for the customer with id : ${req.body.id}`,
    });
  } catch (error) {
    console.error("Error in updateCustomerDetails:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getCustomerbyID/:id", async (req, res) => {
  try {
    console.log("Server side getCustomerbyID", req.params.id);
    const customers = await getCustomerbyID(req.params.id);
    return res.json(customers);
  } catch (error) {
    console.error("Error in getCustomerbyID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/getCustomerbyFirstName/:SFirstName", async (req, res) => {
  try {
    console.log("Server side getCustomerbyFirstName", req.params.SFirstName);
    const customers = await getCustomerbyFirstName(req.params.SFirstName);
    return res.json(customers);
  } catch (error) {
    console.error("Error in getCustomerbyFirstName:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/getCustomerbyLastName/:SLastName", async (req, res) => {
  try {
    console.log("Server side getCustomerbyLastName", req.params.SLastName);
    const customers = await getCustomerbyLastName(req.params.SLastName);
    return res.json(customers);
  } catch (error) {
    console.error("Error in getCustomerbyLastName:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/getCustomerbyPhoneNumber/:trimmedPhoneNumber", async (req, res) => {
  try {
    console.log(
      "Server side getCustomerbyPhoneNumber",
      req.params.trimmedPhoneNumber
    );
    const customer = await getCustomerbyPhoneNumber(
      req.params.trimmedPhoneNumber
    );
    return res.json(customer);
  } catch (error) {
    console.error("Error in getCustomerbyPhoneNumber:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getCustomerbyPhoneNumberOrNic/:phoneNumber", async (req, res) => {
  try {
    console.log("Server side getCustomerbyphoneNumber", req.params.phoneNumber);
    const customers = await getCustomerbyPhoneNumberOrNic(
      req.params.phoneNumber
    );
    return res.json(customers);
  } catch (error) {
    console.error("Error in getCustomerbyPhoneNumber:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getCustomerbyAddress1/:SAddress1", async (req, res) => {
  try {
    console.log("Server side getCustomerbySAddress1", req.params.SAddress1);
    const customers = await getCustomerbyAddress1(req.params.SAddress1);
    return res.json(customers);
  } catch (error) {
    console.error("Error in getCustomerbySAddress1:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/getCustomerbyAddress2/:SAddress2", async (req, res) => {
  try {
    console.log("Server side getCustomerbyLastName", req.params.SAddress2);
    const customers = await getCustomerbyAddress2(req.params.SAddress2);
    return res.json(customers);
  } catch (error) {
    console.error("Error in getCustomerbyID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/getUserRole/:userName", async (req, res) => {
  try {
    const userRole = await getUserRole(req.params.userName);
    console.log("express ", userRole);
    return res.json(userRole);
  } catch (error) {
    console.log("Error occured in express", error);
  }
});

app.delete("/deleteCustomers/:customerId", async (req, res) => {
  try {
    const customerData = await deleteCustomer(req.params.customerId);
    return res.json(customerData);
  } catch (error) {
    console.error("Error in deleteCustomers:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/deleteEquipment/:eq_id", async (req, res) => {
  try {
    console.log("This is the server ", req.params.eq_id);
    const equipmentData = await deleteEquipment(req.params.eq_id);
    return res.json(equipmentData);
  } catch (error) {
    console.error("Error in deleteEquipment:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/updateCustomerDetails", async (req, res) => {
  try {
    const customerDetails = await updateCustomerDetails(req.body);
    console.log("Updated customer details:", req.body);
    return res.json({
      message: `Customer details updated for the customer with id : ${req.body.id}`,
    });
  } catch (error) {
    console.error("Error in updateCustomerDetails:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/invoiceIdRetrieve", async (req, res) => {
  try {
    console.log("req");
    const invoiceId = await getInvoiceId();
    console.log("Express", invoiceId);
    return res.json(invoiceId);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/invoiceDataRetrieve/:invoiceIdSearch", async (req, res) => {
  try {
    const completeInvoiceDetails = await getInvoiceDetails(
      req.params.invoiceIdSearch
    );
    if (completeInvoiceDetails) {
      console.log("Express complete invoice object", completeInvoiceDetails);
      return res.json(completeInvoiceDetails);
    } else {
      console.error("No invoice details found");
      return res.status(404).json({ error: "Invoice not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/updateInvoiceDetails", async (req, res) => {
  try {
    const customerDetails = await updateInvoiceDetails(req.body);
    return res.json({
      message: `Customer details updated for the customer with id : ${req.body.id}`,
    });
  } catch (error) {
    console.error("Error in updateCustomerDetails:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

dotenv.config();
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
