import mysql, { createPool } from "mysql2";

// mysql.createPool({
//     host:"localHost",
//     user:"root",
//     password:'',
//     database:'sysdevdb'
// })
// Pool created and store it in a variable
//insted of creating a brandnew query to the db for each request we create a pool

// const pool = mysql.createPool({
//   host: "localHost",
//   user: "root",
//   password: "",
//   database: "sysdevdb",
// });

//then we add promise keyword to async rather than having old call back functions

const pool = mysql.createPool({
    host: "localHost",
    user: "root",
    password: "",
    database: "sysdevdb2",
  }).promise()

  // Dan node database.js ghla balanna error ekak nattan owlak nathuwa nikan command eka execute wei
  
// const result = await pool.query("SELECT * FROM user")
// console.log(result)
  //mehema enter krama apita oni datatika arrays dekakin enawa
  //array1->ape db eke data tika array ekaka element widihata enawa
  //array2->`user_id` INT NOT NULL PRIMARY KEY,
    // `user_first_name` VARCHAR(20) NOT NULL,
    // `user_last_name` VARCHAR(20) NOT NULL,
    // `username` VARCHAR(15) NOT NULL,
    // `role` VARCHAR(25) NOT NULL,
    // `nic` VARCHAR(12) NOT NULL,
//e nisa array destructuring use kranna oni

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

//const res=await getUsers();
// dan res eka console.log eke call krath output eka enawa
//console.log(await getUsers())


export async function createUser(fname,lname,username,role,nic,pno,add1,add2,password){
    const [rows] = await pool.query(
        `INSERT INTO user ( user_first_name, user_last_name, username, role, nic, user_phone_number, user_address1, user_address2, password) VALUES (?,?,?,?,?,?,?,?,?);`,
        [fname,lname,username,role,nic,pno,add1,add2,password]
    )
    return getUser(2)
}

//await createUser("kamal","fernando","kamal","admin","1223131","0718976568","kahawatta","rathnapura","1234")

