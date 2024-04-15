const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sysdevdb",
});

app.get("/", (req, res) => {
  return res.json("From backend side");
});
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/customers", (req, res) => {
  const sql = "SELECT * FROM customer";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.delete("/deleteCustomers/:customerId", (req, res) => {
  const customerId = req.params.customerId;
  const sql = "DELETE FROM customer WHERE cus_id = ?";
  db.query(sql, [customerId], (err, result) => {
    if (err) return res.json(err);
    console.log(`Deleted customer with ID ${customerId}`);
    return res.json({ message: `Deleted customer with ID ${customerId}` });
  });
});
app.delete("/deleteCustomers/1", (req, res) => {
    const customerId = req.params.customerId;
    const sql = "DELETE FROM customer WHERE cus_id = 1";
    db.query(sql, [customerId], (err, result) => {
      if (err) return res.json(err);
      console.log(`Deleted customer with ID ${customerId}`);
      return res.json({ message: `Deleted customer with ID 1` });
    });
  });

app.listen(8085, () => {
  console.log("listening");
});
