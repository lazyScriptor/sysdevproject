import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  deleteCustomer,
  deleteEquipment,
  getCustomerbyID,
  getCustomerbyNIC,
  getCustomerbyPhoneNumber,
  getCustomers,
  getEquipment,
  getUsers,
  updateCustomerDetails,
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

app.get("/customers", async (req, res) => {
  try {
    const customers = await getCustomers();
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

app.get("/getCustomerbyPhoneNumber/:phoneNumber", async (req, res) => {
  try {
    console.log("Server side getCustomerbyID", req.params.phoneNumber);
    const customers = await getCustomerbyPhoneNumber(req.params.phoneNumber);
    return res.json(customers);
  } catch (error) {
    console.error("Error in getCustomerbyPhoneNumber:", error);
    return res.status(500).json({ error: "Internal Server Error" });
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

dotenv.config();
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
