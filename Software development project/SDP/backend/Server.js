import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  deleteCustomer,
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
app.use(express.json()); // Add this line to parse JSON request bodies

// const db = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USERNAME,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });
// console.log("This is the inline user name", process.env.USERNAME);

app.get("/", (req, res) => {
  return res.json("From backend side");
});

// GET request to fetch all users
app.get("/users", async (req, res) => {
  // const sql = "SELECT * FROM users";
  // db.query(sql, (err, data) => {
  //   if (err) return res.json(err);
  //   return res.json(data);
  // });
  console.log("Before functionn execute in the express app")
  const users = await getUsers();
  console.log("After functionn execute in the express app")
  return res.json(users);
});

// GET request to fetch all customers
app.get("/customers", async (req, res) => {
  // const sql = "SELECT * FROM customer";
  // db.query(sql, (err, data) => {
  //   if (err) return res.json(err);
  //   return res.json(data);
  // });
  const customers = await getCustomers();
  return res.json(customers);
});
app.get("/equipment", async (req, res) => {
  // const sql = "SELECT * FROM customer";
  // db.query(sql, (err, data) => {
  //   if (err) return res.json(err);
  //   return res.json(data);
  // });
  const customers = await getEquipment();
  return res.json(customers);
});

app.get("/getCustomerbyNIC/:nic", async (req, res) => {
  // const sql = "SELECT * FROM customer";
  // db.query(sql, (err, data) => {
  //   if (err) return res.json(err);
  //   return res.json(data);
  // });
  console.log("Server side getCustomerbyNIC",req.params.nic);
  const customers = await getCustomerbyNIC(req.params.nic);
  return res.json(customers);
});

app.get("/getCustomerbyID/:id", async (req, res) => {
  // const sql = "SELECT * FROM customer";
  // db.query(sql, (err, data) => {
  //   if (err) return res.json(err);
  //   return res.json(data);
  // });
  console.log("Server side getCustomerbyID",req.params.id);
  const customers = await getCustomerbyID(req.params.id);
  return res.json(customers);
});
app.get("/getCustomerbyPhoneNumber/:phoneNumber", async (req, res) => {
  // const sql = "SELECT * FROM customer";
  // db.query(sql, (err, data) => {
  //   if (err) return res.json(err);
  //   return res.json(data);
  // });
  console.log("Server side getCustomerbyID",req.params.phoneNumber);
  const customers = await getCustomerbyPhoneNumber(req.params.phoneNumber);
  return res.json(customers);
});

// DELETE request to delete a customer by ID

app.delete("/deleteCustomers/:customerId", async (req, res) => {
  // const customerId = req.params.customerId;
  const customerData = await deleteCustomer(req.params.customerId);

  return res.json(customerData);

  // const sql = "DELETE FROM customer WHERE cus_id = ?";
  // db.query(sql, [customerId], (err, result) => {
  //   if (err) return res.json(err);
  //   console.log(`Deleted customer with ID ${customerId}`);
  //   return res.json({ message: `Deleted customer with ID ${customerId}` });
  // });
});

// POST request to update customer details
app.post("/updateCustomerDetails", async (req, res) => {
  // const { id, nic, phoneNumber, fname, lname, address1, address2 } = req.body;
  // const sql =
  //   "UPDATE customer SET nic = ?, cus_phone_number = ?, cus_fname = ?, cus_lname = ?, cus_address1 = ?, cus_address2 = ? WHERE cus_id = ?";
  // db.query(
  //   sql,
  //   [nic, phoneNumber, fname, lname, address1, address2, id],
  //   (err, result) => {
  //     if (err) return res.json(err);
  //     console.log(`Customer details updated for ID ${id}`);
  //     return res.json({ message: `Customer details updated for ID ${id}` });
  //   }
  // );
  const customerDetails = await updateCustomerDetails(req.body);
  console.log("This is the req body :", req.body);
  return res.json({
    message: `Customer details updated for the customer with id : ${req.body.id}`,
  });
});

// // Delete request to delete customer details
// app.post("/updateCustomerDetails", (req, res) => {
//   const { id, nic, phoneNumber, fname, lname, address1, address2 } = req.body;
//   const sql =
//     "UPDATE customer SET nic = ?, cus_phone_number = ?, cus_fname = ?, cus_lname = ?, cus_address1 = ?, cus_address2 = ? WHERE cus_id = ?";
//   db.query(
//     sql,
//     [nic, phoneNumber, fname, lname, address1, address2, id],
//     (err, result) => {
//       if (err) return res.json(err);
//       console.log(`Customer details updated for ID ${id}`);
//       return res.json({ message: `Customer details updated for ID ${id}` });
//     }
//   );
// });

dotenv.config();
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening to :${port}`);
});
