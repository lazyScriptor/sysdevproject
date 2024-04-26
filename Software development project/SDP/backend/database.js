import mysql, { createPool } from "mysql2";

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "sysdevdb",
  }).promise()

  export async function getUsers(){
    const [rows] =await pool.query("SELECT * FROM users")
    console.log(rows)
    return rows;
}