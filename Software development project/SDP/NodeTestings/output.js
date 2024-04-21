// const { default: chalk } = require("chalk");
import chalk from 'chalk'

// const chalk = require("chalk");
const x = "x";
const y = "y";

//console.log(x, y);

//%s format a variable as a string
//%d format a variable as a number
//%i format a variable as a integer part only
//%o format a variable as a object
console.log("My %s has %d ears", "cat", 2);

// console.log("%o", Number);

// console.clear();

// console.count("I am Dipesh");
// console.count("I am Dipesh");
// console.count("I am Dipesh");
// console.countReset("I am Dipesh");
// console.count("I am Dipesh");
// console.count("I am Nikesh");

// const oranges = ["orange", "orange"];
// const apples = ["just one apple"];
// oranges.forEach((fruit) => {
//   console.count(fruit);
// });

// console.countReset("orange");
// oranges.forEach((fruit) => {
//   console.count(fruit);
// });
// apples.forEach((fruit) => {
//   console.count(fruit);
// });
//Print the stack trace
// const function2 = () => console.trace();
// const function1 = () => function2();
// function1();












// ============================================================================

// -------------------- IMPLICIT RETURN START -----------------------

// arrow function does not need the return keyword if the function body conatins
// one line .it will automaticcaly return the line without explicit implemetntaion

// const function1 = (x) => x * 2;
// const function2 = () => {
//   console.log("This is the function 2");
//   console.log(function1(4));
// };
// function2();

// -------------------- IMPLICIT RETURN END -----------------------

// -------------------- LEXICAL SCOPE START -----------------------
// const obj1 = {
//     count: 0,
//     increment: function() {
//         setInterval(function() {
//             // In this context, "this" refers to the global object, not "obj"
//             console.log(this.count++); // This won't work as expected
//         }, 1000);
//     }
// };
// obj1.increment();

// // Arrow functions do not have their own this context. Instead, they inherit
// // this from the surrounding lexical scope. This behavior can prevent the
// // confusion and bugs related to this binding in regular functions.
// const obj2 = {
//     count: 0,
//     increment: function() {
//         setInterval(() => {
//             // In this context, "this" refers to "obj"
//             console.log(this.count++); // This works as expected
//         }, 1000);
//     }
// };
// obj2.increment();

// -------------------- LEXICAL SCOPE END -----------------------

// -------------------- NO BINDINF OF ARGUMENTS START -----------------------

// const function1 = (x) => x * 2;
// const function2 = (...args) => args[1]

// function function3(){
//     console.log(arguments.length)
//     console.log(arguments[0])
// }
// console.log("This is outside the function",function2(3,7),function3(4,8));


// -------------------- NO BINDINF OF ARGUMENTS END -----------------------




// ============================================================================


//Calculate time spent
// const sum = () => console.log(`The sum of 2 and 3 is: ${2 + 3}`);
// const multiply = () =>
//   //console.log("\x1b[33m%s\x1b[0m", `The Multipication is: ${100000 + 35678}`);
//   console.log(chalk.blue(`The Multipication is: ${100000 + 35678}`));

// const measureTime = () => {
//   console.time("sum()");
//   //exceute sum(), and measure the time it takes
//   sum();
//   console.timeEnd("sum()");

//   console.time("multiply()");
//   //exceute multiply(), and measure the time it takes
//   multiply();
//   console.timeEnd("multiply()");
// };

// measureTime();

// //create a progress bar in console
// const ProgressBar = require("progress");

// const bar = new ProgressBar("downloading [:bar] :rate/bps :percent :etas", {
//   total: 20,
// });
// const timer = setInterval(() => {
//   bar.tick();
//   if (bar.complete) {
//     clearInterval(timer);
//   }
// }, 100);
console.log(chalk.bgCyan("green colour"))