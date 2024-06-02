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
      "INSERT INTO equipment (eq_name, eq_rental, eq_description, eq_dofpurchase, eq_warranty_expire, eq_cost, eq_completestock, eq_catid) VALUES (?,?,?,?,?,?,?,?)",
      [
        eq_name,
        eq_rental,
        eq_description,
        neweq_dofpurchase,
        neweq_warranty_expire,
        eq_cost,
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
export async function getCustomerbyPhoneNumber(trimmedPhoneNumber) {
  const [customers] = await pool.query(
    "SELECT * FROM customer WHERE cus_phone_number =? AND cus_delete_status = 0",
    [trimmedPhoneNumber]
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

export async function getCustomerbyPhoneNumberOrNic(phoneNumber) {
  const [customers] = await pool.query(
    "SELECT * FROM customer WHERE (cus_phone_number LIKE ? OR nic LIKE ?) AND cus_delete_status = 0",
    [`%${phoneNumber}%`, `%${phoneNumber}%`]
  );
  if (customers.length > 0) {
    console.log(customers);
    return customers;
  } else {
    return { message: `No customer found with ${phoneNumber}` };
  }
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
    const [invoiceId] = await pool.query(
      "SELECT Min(inv_id) AS largest_invoice_number FROM invoice WHERE inv_updatedstatus = 0"
    );
    if (invoiceId[0].largest_invoice_number == null) {
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
    }
    const [newInvoiceId] = await pool.query(
      "SELECT Min(inv_id) AS largest_invoice_number FROM invoice WHERE inv_updatedstatus = 0"
    );
    return newInvoiceId[0].largest_invoice_number;
  } catch (error) {
    console.error("Error in the updateCustomerDetails db connection", error);
  }
}

export async function createInvoiceDetails(InvoiceCompleteDetail) {
  // Update invoice details
  try {
    await pool.query(
      "UPDATE invoice SET inv_advance = ?, inv_special_message = ?, inv_idcardstatus = ?,inv_cusid=?, inv_updatedstatus = ? WHERE inv_id = ?",
      [
        InvoiceCompleteDetail.advance,
        "", // Empty string for inv_special_message
        InvoiceCompleteDetail.iDstatus,
        InvoiceCompleteDetail.customerDetails.cus_id, // Assuming idStatus is a boolean value
        1,
        InvoiceCompleteDetail.InvoiceID,
      ]
    );
  } catch (error) {
    console.log("Error occurred in backend invoice details update", error);
  }

  // Update customer invoice details
  // try {
  //   await pool.query(
  //     "INSERT INTO customerInvoice (cusinv_cusid, cusinv_invid) VALUES (?, ?)",
  //     [
  //       InvoiceCompleteDetail.customerDetails.cus_id,
  //       InvoiceCompleteDetail.InvoiceID,
  //     ]
  //   );
  // } catch (error) {
  //   // Handle duplicate entry error
  //   if (error.code === "ER_DUP_ENTRY") {
  //     console.log(
  //       "Duplicate entry detected. Attempting to update existing record..."
  //     );
  //     try {
  //       await pool.query(
  //         "UPDATE customerInvoice SET cusinv_cusid = ?, cusinv_invid = ? WHERE cusinv_cusid = ? AND cusinv_invid = ?",
  //         [
  //           InvoiceCompleteDetail.customerDetails.cus_id,
  //           InvoiceCompleteDetail.InvoiceID,
  //           InvoiceCompleteDetail.customerDetails.cus_id,
  //           InvoiceCompleteDetail.InvoiceID,
  //         ]
  //       );
  //     } catch (updateError) {
  //       console.log("Error occurred in updating existing record:", updateError);
  //     }
  //   } else {
  //     console.log("Error occurred in backend invoice details update:", error);
  //   }
  // }

  //Update invoice payment table

  try {
    for (const payment of InvoiceCompleteDetail.payments) {
      console.log("This is the payID", payment.payId);
      await pool.query(
        "INSERT INTO invoicePayments (invpay_payment_id, invpay_inv_id ,	invpay_amount, invpay_payment_date) VALUES (?, ?,?, ?)",
        [
          payment.invpay_payment_id,
          InvoiceCompleteDetail.InvoiceID,
          payment.invpay_amount,
          payment.invpay_payment_date,
        ]
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
          console.log("This is the payID", payment.payId);
          await pool.query(
            "INSERT INTO invoicePayments (invpay_payment_id, invpay_inv_id, invpay_amount, invpay_payment_date) VALUES (?, ?, ?, ?)",
            [
              payment.invpay_payment_id,
              InvoiceCompleteDetail.InvoiceID,
              payment.invpay_amount,
              payment.invpay_payment_date,
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
        "INSERT INTO invoiceEquipment (inveq_eqid, inveq_invid,inveq_borrowqty,inveq_borrow_date) VALUES (?, ?,?,?)",
        [
          equipment.eq_id,
          InvoiceCompleteDetail.InvoiceID,
          equipment.inveq_borrowqty,
          equipment.inveq_borrow_date,
        ]
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
            `UPDATE invoiceEquipment SET inveq_eqid = 24, inveq_invid = 4, inveq_borrowqty = NULL, inveq_borrow_date = 24 WHERE inveq_eqid = 4 AND inveq_invid = NULL AND inveq_borrowqty = ?`,
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

export async function getInvoiceDetails(invoiceIdSearch) {
  try {
    // Fetch customer, invoice, equipment, and additional invoice details
    // Fetch customer, invoice, equipment, and additional invoice details
    const [invoiceDetails] = await pool.query(
      `SELECT customer.*, invoice.*, invoiceEquipment.*, equipment.*, invoice.inv_advance, invoice.inv_special_message, invoice.inv_idcardstatus 
   FROM invoice
   LEFT JOIN customer ON customer.cus_id = invoice.inv_cusid
   LEFT JOIN invoiceEquipment ON invoice.inv_id = invoiceEquipment.inveq_invid
   LEFT JOIN equipment ON invoiceEquipment.inveq_eqid = equipment.eq_id
   WHERE invoice.inv_id = ?`,
      [invoiceIdSearch]
    );

    if (invoiceDetails.length > 0) {
      const invoiceObject = {
        customerDetails: {},
        createdDate: null,
        eqdetails: [],
        payments: [],
        advance: null,
        invoiceSpecialmessage: null,
        idStatus: null,
      };

      const customerDetails = Object.keys(invoiceDetails[0])
        .filter((key) => key.startsWith("cus_") || key === "nic")
        .reduce((obj, key) => {
          obj[key] = invoiceDetails[0][key];
          return obj;
        }, {});

      invoiceObject.customerDetails = customerDetails;

      function dateformatter(date) {
        const createdDate = new Date(date);
        const datePart = createdDate.toLocaleDateString("en-GB");
        const timePart = createdDate.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        return `${datePart} ${timePart}`;
      }

      invoiceObject.createdDate = dateformatter(
        invoiceDetails[0].inv_createddate
      );

      invoiceObject.InvoiceID = invoiceIdSearch;

      // Extracting equipment details
      const equipmentDetails = invoiceDetails.map((record) => ({
        eq_id: record.eq_id,
        eq_name: record.eq_name,
        eq_rental: record.eq_rental,
        eq_description: record.eq_description,
        eq_dofpurchase: record.eq_dofpurchase,
        eq_warranty_expire: record.eq_warranty_expire,
        eq_image: record.eq_image,
        eq_cost: record.eq_cost,
        eq_defected_status: record.eq_defected_status,
        eq_completestock: record.eq_completestock,
        eq_delete_status: record.eq_delete_status,
        eq_catid: record.eq_catid,
        inveq_borrow_date: record.inveq_borrow_date,
        inveq_return_date: record.inveq_return_date,
        duration_in_days: record.duration_in_days,
        inveq_borrowqty: record.inveq_borrowqty,
        inveq_return_quantity: record.inveq_returned_quantity,
        inveq_updated_status: record.inveq_updated_status
      }));

      invoiceObject.eqdetails = equipmentDetails;

      // Fetch payment details
      const [invoicePayments] = await pool.query(
        `SELECT invpay_payment_id, invpay_payment_date, invpay_amount 
     FROM invoicePayments 
     WHERE invpay_inv_id = ?`,
        [invoiceIdSearch]
      );

      // Extracting payment details
      const paymentDetails = invoicePayments.map((payment) => ({
        invpay_payment_id: payment.invpay_payment_id,
        invpay_payment_date: payment.invpay_payment_date,
        invpay_amount: payment.invpay_amount,
      }));

      invoiceObject.payments = paymentDetails;

      // Adding additional invoice details
      invoiceObject.advance = invoiceDetails[0].inv_advance;
      invoiceObject.invoiceSpecialmessage =
        invoiceDetails[0].inv_special_message;
      invoiceObject.idStatus = !!invoiceDetails[0].inv_idcardstatus; // converting to boolean

      return invoiceObject;
    } else {
      console.error("No invoice details found");
      return false;
    }
  } catch (error) {
    console.error("Error fetching invoice details:", error);
    return false;
  }
}

export async function updateInvoiceDetails(InvoiceCompleteDetail) {
  // Update invoice details
  // try {
  //   await pool.query(
  //     "UPDATE invoice SET inv_advance = ?, inv_special_message = ?, inv_idcardstatus = ?, inv_cusid = ?, inv_updatedstatus = ? WHERE inv_id = ?",
  //     [
  //       InvoiceCompleteDetail.advance,
  //       "", // Empty string for inv_special_message
  //       InvoiceCompleteDetail.idStatus,
  //       InvoiceCompleteDetail.customerDetails.cus_id,
  //       1,
  //       InvoiceCompleteDetail.InvoiceID,
  //     ]
  //   );
  // } catch (error) {
  //   console.log("Error occurred in backend invoice details update", error);
  // }

  // Update invoice payment table
  try {
    for (const payment of InvoiceCompleteDetail.payments) {
      // Convert payment date to SQL format
      const formattedDate = new Date(payment.invpay_payment_date)
        .toISOString()
        .slice(0, 10);

      console.log("This is the payID", formattedDate);

      await pool.query(
        `INSERT INTO invoicePayments (invpay_payment_id, invpay_inv_id, invpay_amount, invpay_payment_date)
           VALUES (?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
           invpay_inv_id = VALUES(invpay_inv_id), invpay_amount = VALUES(invpay_amount), invpay_payment_date = VALUES(invpay_payment_date)`,
        [
          payment.invpay_payment_id,
          InvoiceCompleteDetail.InvoiceID,
          payment.invpay_amount,
          formattedDate, // Use the formatted date here
        ]
      );
    }
  } catch (error) {
    console.log("Error occurred in backend invoice details update:", error);
  }

  // Update invoice equipment details

  try {
    console.log("complete retrieved object", InvoiceCompleteDetail);
    // Function to format the date for SQL
    function formatDateForSQL(date) {
      if (!date) return null;
      return new Date(date).toISOString().slice(0, 19).replace("T", " ");
    }

    for (const equipment of InvoiceCompleteDetail.eqdetails) {
      if (equipment.inveq_return_quantity < equipment.inveq_borrowqty && equipment.inveq_return_quantity!=0) {
        // If returned quantity is less than borrowed quantity
        console.log("object");
        // Variables for updated quantities and dates
        const returnedQuantity = equipment.inveq_return_quantity;
        const previousBorrowQuantity = equipment.inveq_borrowqty;
        const newBorrowQuantity = previousBorrowQuantity - returnedQuantity;

        console.log(
          "return qty",
          returnedQuantity,
          "newborrowed",
          returnedQuantity,
          "prevborrowqty",
          previousBorrowQuantity,
          "newborrowqty",
          newBorrowQuantity
        );

        const formattedReturnDate = formatDateForSQL(
          equipment.inveq_return_date
        );
        const formattedBorrowDate = formatDateForSQL(
          equipment.inveq_borrow_date
        );

        await pool.query(
          `INSERT INTO invoiceEquipment (inveq_eqid, inveq_invid, inveq_borrowqty, inveq_borrow_date,inveq_return_date,inveq_returned_quantity,inveq_updated_status)
             VALUES (?, ?, ?, ?,?,?,?)`,
          [
            equipment.eq_id,
            InvoiceCompleteDetail.InvoiceID,
            returnedQuantity,
            formattedBorrowDate, // Updated borrow date
            formattedReturnDate,
            returnedQuantity,
            1
          ]
        );

        // Update the existing row
        await pool.query(
          `UPDATE invoiceEquipment
             SET
               inveq_returned_quantity = ?,
               inveq_borrowqty = ?
             WHERE
               inveq_invid = ?
               AND inveq_eqid = ?
               AND inveq_returned_quantity = 0`,
          [
            0, // Update returned quantity
            newBorrowQuantity, // Update borrowed quantity to the returned quantity
            // formattedReturnDate, // Update return date
            InvoiceCompleteDetail.InvoiceID,
            equipment.eq_id,
          ]
        );

        // Insert a new row with the remaining borrowed quantity
      } 
      else if ((equipment.inveq_return_quantity == equipment.inveq_borrowqty)&&equipment.inveq_updated_status==0) {
        console.log("it equals");
        // If returned quantity is equal to borrowed quantity

        const formattedReturnDate = formatDateForSQL(
          equipment.inveq_return_date
        );

        // Update the existing row
        await pool.query(
          `UPDATE invoiceEquipment 
            SET 
              inveq_returned_quantity = ?, 
              inveq_borrowqty = ?, 
              inveq_return_date = ? ,
              inveq_updated_status = ?
            WHERE 
              inveq_invid = ? 
              AND inveq_eqid = ?
              AND inveq_returned_quantity = 0
              AND inveq_updated_status=0`,
          [
            equipment.inveq_return_quantity,
            equipment.inveq_borrowqty,
            formattedReturnDate,
            1,
            InvoiceCompleteDetail.InvoiceID,
            equipment.eq_id,
          ]
        );
      }
    }
  } catch (error) {
    console.log("Error occurred in backend invoice details update:", error);
  }
}
