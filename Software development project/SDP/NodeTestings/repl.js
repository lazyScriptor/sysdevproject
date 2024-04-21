//When you type just node in the terminal you can enter the node command line and
// do the node commands.But with this file you can you can run the node command line with 
// custome settngs 
//below 2 lines are required to start the node command line with custom text
//run the file using node repl.js

const repl = require("repl");
const local =repl.start("The node console has started")

local.on('exit',()=>{
    console.log("exiting REPL")
    process.exit();
})

