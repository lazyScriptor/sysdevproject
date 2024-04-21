
import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

console.log("This is the inline user name",process.env.USERNME)

const port = process.env.PORT || 8085

app.get("/", (req, res) => {
  return res.json("From backend side");
});

// GET request to fetch all users
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// GET request to fetch all customers
app.get("/customers", (req, res) => {
  const sql = "SELECT * FROM customer";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// DELETE request to delete a customer by ID
app.delete("/deleteCustomers/:customerId", (req, res) => {
  const customerId = req.params.customerId;
  const sql = "DELETE FROM customer WHERE cus_id = ?";
  db.query(sql, [customerId], (err, result) => {
    if (err) return res.json(err);
    console.log(`Deleted customer with ID ${customerId}`);
    return res.json({ message: `Deleted customer with ID ${customerId}` });
  });
});

// POST request to update customer details
app.post("/updateCustomerDetails", (req, res) => {
  const { id, nic, phoneNumber, fname, lname, address1, address2 } = req.body;
  const sql = "UPDATE customer SET nic = ?, cus_phone_number = ?, cus_fname = ?, cus_lname = ?, cus_address1 = ?, cus_address2 = ? WHERE cus_id = ?";
  db.query(sql, [nic, phoneNumber, fname, lname, address1, address2, id], (err, result) => {
    if (err) return res.json(err);
    console.log(`Customer details updated for ID ${id}`);
    return res.json({ message: `Customer details updated for ID ${id}` });
    
  });
});
// Delete request to delete customer details
app.post("/updateCustomerDetails", (req, res) => {
  const { id, nic, phoneNumber, fname, lname, address1, address2 } = req.body;
  const sql = "UPDATE customer SET nic = ?, cus_phone_number = ?, cus_fname = ?, cus_lname = ?, cus_address1 = ?, cus_address2 = ? WHERE cus_id = ?";
  db.query(sql, [nic, phoneNumber, fname, lname, address1, address2, id], (err, result) => {
    if (err) return res.json(err);
    console.log(`Customer details updated for ID ${id}`);
    return res.json({ message: `Customer details updated for ID ${id}` });
  });
});


app.listen(port, () => {
  console.log(`listening to :${port}`);
});
