//mulinma npm i dotenv file dependency eka intall kranna
//ita passe .env files read krnna pluwan wenawa
//.env file eka athule environment varialbles tika define kranna
// dan project eke idan oyata ewa call krnna pluwan
//mewa access kranna require("dotenv").config(); use kranna


require("dotenv").config();
console.log(process.env.NAME)
console.log(process.env.PROFESSION)
console.log(process.env.COURSE)