import mysql from "mysql2";
import dotenv from "dotenv";
import dayjs from "dayjs";
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
  const [user] = await pool.query(
    "SELECT username, role, password ,user_id FROM users WHERE username = ? AND role = ? ",
    [userObject.username, userObject.role]
  );
  console.log("this is the selected user :", user);

  const id = user[0].user_id;

  if (userObject.password === user[0].password) {
    console.log("Successful", user);
    return ["/DashboardMain", user];
  } else {
    return ["/"];
  }
}
export async function getUsers() {
  const [users] = await pool.query("SELECT * FROM users");
  console.log(users);
  return users;
}

export async function getCustomers() {
  const [customers] = await pool.query(
    "SELECT * FROM customer WHERE cus_delete_status = 0"
  );
  return customers;
}
export async function getCustomerBySearchingManyFields(value) {
  try {
    if (value < 1000) {
      const [customer] = await pool.query(
        `SELECT * FROM customer WHERE cus_id LIKE ? AND cus_delete_status = 0`,
        [`%${value}%`]
      );
      return customer;
    } else {
      const query = `
        SELECT * 
        FROM customer 
        WHERE cus_delete_status = 0 AND (
          nic LIKE ? 
          OR cus_phone_number LIKE ? 
          OR cus_fname LIKE ? 
          OR cus_lname LIKE ? 
          OR cus_address1 LIKE ? 
          OR cus_address2 LIKE ?
        )
      `;

      // Add wildcard characters around the value
      const formattedValue = `%${value}%`;

      // Execute the query with the formatted value for each field
      const [customer] = await pool.query(query, [
        formattedValue,
        formattedValue,
        formattedValue,
        formattedValue,
        formattedValue,
        formattedValue,
      ]);

      return customer;
    }
  } catch (error) {
    throw error;
  }
}
export async function getEquipment() {
  const [equipment] = await pool.query(
    "SELECT equipment.*, equipmentCategory.eqcat_name FROM equipment JOIN equipmentCategory ON equipment.eq_catid = equipmentCategory.eqcat_id WHERE equipment.eq_delete_status=0"
  );

  return equipment;
}
export async function getEquipmentbyID(id) {
  const [equipment] = await pool.query(
    "SELECT * FROM equipment WHERE eq_id =? AND eq_delete_status = 0",
    [id]
  );
  console.log(equipment);
  return equipment;
}
export async function getEquipmentbyName(name) {
  const [equipment] = await pool.query(
    "SELECT * FROM equipment WHERE eq_name LIKE ? AND eq_delete_status = 0",
    [`%${name}%`]
  );
  console.log(equipment);
  return equipment;
}
export async function addEquipment(bodydata) {
  const {
    eq_name,
    eq_rental,
    eq_completestock,
    eq_cost,
    eq_defected_status,
    eq_description,
    eq_dofpurchase,
    eq_warranty_expire,
    eq_catid,
  } = bodydata;

  const dateFormat = (value) => {
    const dateOnly = value.substring(0, 10);
    return dateOnly;
  };
  const neweq_dofpurchase = dateFormat(eq_dofpurchase);
  const neweq_warranty_expire = dateFormat(eq_warranty_expire);

  console.log("Formated string", eq_dofpurchase);
  try {
    await pool.query(
      "INSERT INTO equipment (eq_name, eq_rental, eq_description, eq_dofpurchase, eq_warranty_expire, eq_cost, eq_defected_status, eq_completestock, eq_catid) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        eq_name,
        eq_rental,
        eq_description,
        neweq_dofpurchase,
        neweq_warranty_expire,
        eq_cost,
        eq_defected_status,
        eq_completestock,
        eq_catid,
      ]
    );
    console.log(`Created equipment `);
    return { message: `Created equipment` };
  } catch (error) {
    console.error("Error creating customer db connection:", error);
    throw error;
  }
}
export async function setEquipment(bodydata) {
  console.log("This is the body data ", bodydata);
  const {
    eq_name,
    eq_rental,
    eq_completestock,
    eq_cost,
    eq_defected_status,
    eq_description,
    eq_dofpurchase,
    eq_warranty_expire,
    eq_catid,
    eq_id,
  } = bodydata;

  const dateFormat = (value) => {
    const dateOnly = value.substring(0, 10);
    return dateOnly;
  };
  const neweq_dofpurchase = dateFormat(eq_dofpurchase);
  const neweq_warranty_expire = dateFormat(eq_warranty_expire);

  console.log("Formatted string", eq_dofpurchase);
  try {
    await pool.query(
      "UPDATE equipment SET eq_name = ?, eq_rental = ?, eq_description = ?, eq_dofpurchase = ?, eq_warranty_expire = ?, eq_cost = ?, eq_defected_status = ?, eq_completestock = ?, eq_catid = ? WHERE eq_id = ?",
      [
        eq_name,
        eq_rental,
        eq_description,
        neweq_dofpurchase,
        neweq_warranty_expire,
        eq_cost,
        eq_defected_status,
        eq_completestock,
        eq_catid,
        eq_id,
      ]
    );
    console.log(`Updated equipment with ID ${eq_id}`);
    return { message: `Updated equipment with ID ${eq_id}` };
  } catch (error) {
    console.error("Error updating equipment:", error);
    throw error;
  }
}

export async function getCustomerbyNIC(nic) {
  const [customers] = await pool.query(
    "SELECT * FROM customer WHERE nic =? AND cus_delete_status = 0",
    [nic]
  );
  console.log(customers);
  return customers;
}
export async function getCustomerbyID(id) {
  const [customers] = await pool.query(
    "SELECT * FROM customer WHERE cus_id =? AND cus_delete_status = 0",
    [id]
  );
  console.log(customers);
  return customers;
}
export async function getCustomerbyFirstName(FirstName) {
  console.log("Backend first name ", FirstName);
  const [customers] = await pool.query(
    "SELECT * FROM customer WHERE cus_fname LIKE ? AND cus_delete_status = 0",
    [`%${FirstName}%`]
  );
  console.log("backend", customers);
  return customers;
}
export async function getCustomerbyLastName(LastName) {
  const [customers] = await pool.query(
    "SELECT * FROM customer WHERE cus_lname LIKE ? AND cus_delete_status = 0",
    [`%${LastName}%`]
  );
  console.log(customers);
  return customers;
}

export async function getCustomerbyPhoneNumber(phoneNumber) {
  const [customers] = await pool.query(
    "SELECT * FROM customer WHERE cus_phone_number =? OR nic=? AND cus_delete_status = 0",
    [phoneNumber, phoneNumber]
  );
  console.log(customers);
  return customers;
}
export async function getCustomerbyAddress1(SAddress1) {
  const [customers] = await pool.query(
    "SELECT * FROM customer WHERE cus_address1 LIKE ? AND cus_delete_status = 0",
    [`%${SAddress1}%`]
  );
  console.log(customers);
  return customers;
}
export async function getCustomerbyAddress2(SAddress2) {
  const [customers] = await pool.query(
    "SELECT * FROM customer WHERE cus_address2 LIKE ? AND cus_delete_status = 0",
    [`%${SAddress2}%`]
  );
  console.log(customers);
  return customers;
}

export async function getUserRole(userName) {
  const [user] = await pool.query(`SELECT role FROM users WHERE username=?`, [
    userName,
  ]);
  console.log(user);
  return user;
}

export async function deleteCustomer(id) {
  try {
    // await pool.query("DELETE FROM customer WHERE cus_id = ?", [id]);
    await pool.query(
      `UPDATE customer SET cus_delete_status = 1 WHERE cus_id = ?`,
      [id]
    );
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
      [fname, lname, nic, phoneNumber, address1, address2]
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
    // await pool.query("DELETE FROM equipment WHERE eq_id = ?", [id]);
    await pool.query(
      `UPDATE equipment SET eq_delete_status = 1 WHERE eq_id = ?`,
      [id]
    );

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
export async function getInvoiceId() {
  try {
    await pool.query(
      "INSERT INTO invoice (inv_advance,inv_special_message,inv_idcardstatus) VALUES (?,?,?)",
      [0, "", 0],
      (error, results, fields) => {
        if (error) {
          console.error("Error creating new statement:", error);
          return;
        }
        console.log("New statement created successfully!");
      }
    );

    const [invoiceId] = await pool.query(
      "SELECT Min(inv_id) AS largest_invoice_number FROM invoice WHERE inv_updatedstatus = 0"
    );
    console.log("back", invoiceId[0].largest_invoice_number);
    return invoiceId[0].largest_invoice_number;
  } catch (error) {
    console.error("Error in the updateCustomerDetails db connection", error);
  }
}
export async function getInvoiceDetails(invoiceId) {
  const [invoice] = await pool.query(
    `SELECT * FROM customerInvoice WHERE cusinv_invid=?`,
    [invoiceId]
  );

  const customerDetails = getCustomerbyID(invoice[0].cusinv_cusid);
  console.log("backend", customerDetails);
  return customerDetails;
}

export async function updateInvoiceDetails(InvoiceCompleteDetail) {
  // Update invoice details
  try {
    await pool.query(
      "UPDATE invoice SET inv_advance = ?, inv_special_message = ?, inv_idcardstatus = ?, inv_updatedstatus = ? WHERE inv_id = ?",
      [
        InvoiceCompleteDetail.advance,
        "", // Empty string for inv_special_message
        InvoiceCompleteDetail.iDstatus && 1, // Assuming iDstatus is a boolean value
        1,
        InvoiceCompleteDetail.InvoiceID,
      ]
    );
  } catch (error) {
    console.log("Error occurred in backend invoice details update", error);
  }

  // Update customer invoice details
  try {
    await pool.query(
      "INSERT INTO customerInvoice (cusinv_cusid, cusinv_invid) VALUES (?, ?)",
      [
        InvoiceCompleteDetail.customerDetails.cus_id,
        InvoiceCompleteDetail.InvoiceID,
      ]
    );
  } catch (error) {
    // Handle duplicate entry error
    if (error.code === "ER_DUP_ENTRY") {
      console.log(
        "Duplicate entry detected. Attempting to update existing record..."
      );
      try {
        await pool.query(
          "UPDATE customerInvoice SET cusinv_cusid = ?, cusinv_invid = ? WHERE cusinv_cusid = ? AND cusinv_invid = ?",
          [
            InvoiceCompleteDetail.customerDetails.cus_id,
            InvoiceCompleteDetail.InvoiceID,
            InvoiceCompleteDetail.customerDetails.cus_id,
            InvoiceCompleteDetail.InvoiceID,
          ]
        );
      } catch (updateError) {
        console.log("Error occurred in updating existing record:", updateError);
      }
    } else {
      console.log("Error occurred in backend invoice details update:", error);
    }
  }

  //Update invoice payment table

  try {
    for (const payment of InvoiceCompleteDetail.payments) {
      console.log("This is the payID", payment.payId);
      await pool.query(
        "INSERT INTO invoicePayments (invpay_payment_id, invpay_inv_id ,	invpay_amount) VALUES (?, ?, ?)",
        [payment.payId, InvoiceCompleteDetail.InvoiceID, payment.payment]
      );
    }
  } catch (error) {
    // Handle duplicate entry error
    if (error.code === "ER_DUP_ENTRY") {
      console.log(
        "Duplicate entry detected. Attempting to update existing record..."
      );
      try {
        for (const payment of InvoiceCompleteDetail.payments) {
          await pool.query(
            "UPDATE invoicePayments SET invpay_payment_id = ?, invpay_inv_id = ? ,invpay_amount = ? WHERE cusinv_cusid = ? AND invpay_payment_id = ?",
            [
              payment.payId,
              InvoiceCompleteDetail.InvoiceID,
              payment.payment,
              payment.payId,
            ]
          );
        }
      } catch (updateError) {
        console.log("Error occurred in updating existing record:", updateError);
      }
    } else {
      console.log("Error occurred in backend invoice details update:", error);
    }
  }

  // Update invoice equipment details
  try {
    for (const equipment of InvoiceCompleteDetail.eqdetails) {
      await pool.query(
        "INSERT INTO invoiceEquipment (inveq_eqid, inveq_invid,inveq_borrowqty) VALUES (?, ?,?)",
        [equipment.eq_id, InvoiceCompleteDetail.InvoiceID, equipment.quantity]
      );
    }
  } catch (error) {
    // Handle duplicate entry error
    if (error.code === "ER_DUP_ENTRY") {
      console.log(
        "Duplicate entry detected. Attempting to update existing record..."
      );
      try {
        console.log(InvoiceCompleteDetail.eqdetails);
        for (const equipment of InvoiceCompleteDetail.eqdetails) {
          await pool.query(
            "UPDATE invoiceEquipment SET inveq_eqid = ?, inveq_invid = ? ,inveq_borrowqty = ? WHERE inveq_eqid = ? AND inveq_invid = ? AND inveq_borrowqty = ?",
            [
              equipment.eq_id,
              InvoiceCompleteDetail.InvoiceID,
              equipment.Qty,
              equipment.eq_id,
              InvoiceCompleteDetail.InvoiceID,
              equipment.Qty,
            ]
          );
        }
      } catch (updateError) {
        console.log("Error occurred in updating existing record:", updateError);
      }
    } else {
      console.log("Error occurred in backend invoice details update:", error);
    }
  }
}
