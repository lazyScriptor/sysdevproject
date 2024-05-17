import mysql, { createPool } from "mysql2";



const pool = mysql.createPool({
    host: "localHost",
    user: "root",
    password: "",
    database: "sysdevdb2",
  }).promise()


export const [result] =await pool.query("SELECT * FROM user")

//mehemma krama lassanata data tika enawa

export async function getUsers(){
    const rows =await pool.query("SELECT * FROM user")
    return rows;
}
export async function getUser(id){
    const [rows] =await pool.query(`SELECT * FROM user WHERE user_id=?`,[id])//untrusted data enter krnna denneha meken
    console.log(rows[0].user_id);
}


export async function createUser(fname,lname,username,role,nic,pno,add1,add2,password){
    const [rows] = await pool.query(
        `INSERT INTO user ( user_first_name, user_last_name, username, role, nic, user_phone_number, user_address1, user_address2, password) VALUES (?,?,?,?,?,?,?,?,?);`,
        [fname,lname,username,role,nic,pno,add1,add2,password]
    )
    return getUser(2)
}

