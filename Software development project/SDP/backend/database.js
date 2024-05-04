import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// insted of createconnection, Overall, using createPool simplifies connection
// management by handling the opening, closing, and reuse of connections automatically,
// which can improve the efficiency and scalability of your application.

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  })
  .promise();
const port = process.env.PORT || 8085;

export async function loginValidate(userObject) {
  console.log(userObject.username)
  const [user] = await pool.query(
    "SELECT username, role, password FROM users WHERE username = ? AND role = ? ",
    [userObject.username, userObject.role]
  );
  console.log("this is the selected user :",user)
  if(userObject.password===user[0].password) {
    console.log("Successful",user)
    return ["/DashboardMain"]
  }else{
    return ["/"]
  }
}
export async function getUsers() {
  const [users] = await pool.query("SELECT * FROM users");
  console.log(users);
  return users;
}

export async function getCustomers() {
  const [customers] = await pool.query("SELECT * FROM customer");
  return customers;
}

export async function getEquipment() {
  const [equipment] = await pool.query("SELECT * FROM equipment");
  return equipment;
}
export async function getEquipmentbyID(id) {
  const [equipment] = await pool.query(
    "SELECT * FROM equipment WHERE eq_id =?",
    [id]
  );
  console.log(equipment);
  return equipment;
}
export async function getEquipmentbyName(name) {
  const [equipment] = await pool.query(
    "SELECT * FROM equipment WHERE eq_name LIKE ?",
    [`%${name}%`]
  );
  console.log(equipment);
  return equipment;
}

export async function getCustomerbyNIC(nic) {
  const [customers] = await pool.query("SELECT * FROM customer WHERE nic =?", [
    nic,
  ]);
  console.log(customers);
  return customers;
}
export async function getCustomerbyID(id) {
  const [customers] = await pool.query(
    "SELECT * FROM customer WHERE cus_id =?",
    [id]
  );
  console.log(customers);
  return customers;
}
export async function getCustomerbyFirstName(FirstName) {
  console.log("Backend first name ", FirstName);
  const [customers] = await pool.query(
    "SELECT * FROM customer WHERE cus_fname LIKE ?",
    [`%${FirstName}%`]
  );
  console.log("backend", customers);
  return customers;
}
export async function getCustomerbyLastName(LastName) {
  const [customers] = await pool.query(
    "SELECT * FROM customer WHERE cus_lname LIKE ?",
    [`%${LastName}%`]
  );
  console.log(customers);
  return customers;
}

export async function getCustomerbyPhoneNumber(phoneNumber) {
  const [customers] = await pool.query(
    "SELECT * FROM customer WHERE cus_phone_number =?",
    [phoneNumber]
  );
  console.log(customers);
  return customers;
}
export async function getCustomerbyAddress1(SAddress1) {
  const [customers] = await pool.query(
    "SELECT * FROM customer WHERE cus_address1 LIKE ?",
    [`%${SAddress1}%`]
  );
  console.log(customers);
  return customers;
}
export async function getCustomerbyAddress2(SAddress2) {
  const [customers] = await pool.query(
    "SELECT * FROM customer WHERE cus_address2 LIKE ?",
    [`%${SAddress2}%`]
  );
  console.log(customers);
  return customers;
}

export async function getUserRole(userName) {
  const [user] = await pool.query("SELECT role FROM users WHERE username=?", [
    userName,
  ]);
  console.log(user);
  return user;
}

export async function deleteCustomer(id) {
  try {
    await pool.query("DELETE FROM customer WHERE cus_id = ?", [id]);
    console.log(`Deleted customer with ID ${id}`);
    return { message: `Deleted customer with ID ${id}` };
  } catch (error) {
    console.error("Error deleting customer db connection:", error);
    throw error;
  }
}
export async function setCustomer(bodydata) {
  const { nic, phoneNumber, fname, lname, address1, address2 } = bodydata;
  try {
    await pool.query(
      "INSERT INTO customer ( cus_fname, cus_lname, nic, cus_phone_number, cus_address1, cus_address2) VALUES(?,?,?,?,?,?)",
      [nic, phoneNumber, fname, lname, address1, address2]
    );
    console.log(`Created customer `);
    return { message: `Created customer` };
  } catch (error) {
    console.error("Error creating customer db connection:", error);
    throw error;
  }
}
export async function deleteEquipment(id) {
  try {
    await pool.query("DELETE FROM equipment WHERE eq_id = ?", [id]);
    console.log(`Deleted equipment with ID ${id}`);
    return { message: `Deleted equipment with ID ${id}` };
  } catch (error) {
    console.error("Error deleting equipment db connection:", error);
    throw error;
  }
}
export async function updateCustomerDetails(bodydata) {
  const { id, nic, phoneNumber, fname, lname, address1, address2 } = bodydata;
  try {
    await pool.query(
      "UPDATE customer SET nic = ?, cus_phone_number = ?, cus_fname = ?, cus_lname = ?, cus_address1 = ?, cus_address2 = ? WHERE cus_id = ?",
      [nic, phoneNumber, fname, lname, address1, address2, id]
    );
  } catch (error) {
    console.error("Error in the updateCustomerDetails db connection", error);
  }
}
