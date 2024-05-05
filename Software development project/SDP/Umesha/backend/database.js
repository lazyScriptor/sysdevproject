import mysql from "mysql2";


const pool = mysql
  .createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
  })
  .promise();

  export async function loginValidate(userObject) {
   // console.log(userObject.username)
    const [user] = await pool.query(
      "SELECT admin_name FROM systemadmin WHERE admin_name = ? AND admin_password = ?",
      [userObject.username, userObject.password]
    );
    if (user.length > 0) {
        // User exists, return true
        return true;
      } else {
        // User does not exist, return false
        return false;
      }



    console.log("this is the selected user :",user)
   
    }
  