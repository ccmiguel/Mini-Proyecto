



console.log("Hello Node.js!");

//Para llamar un modulo local
const add = require("./math");
console.log("Sum:", add(5, 3));

//Write to a file
const fs = require("fs");
fs.writeFileSync("test.txt", "Hello Node.js");

//Uso de path
const path = require('path');
console.log("Path join", "alice","docs");

console.log("Path join", path.join("/users","alice", "docs"));
console.log("Path basename:", path.basename("/users/alice/docs/file.txt"));
console.log("Path dirname:", path.extname("/users/alice/docs/file.txt"));
console.log("Path resolve:", path.resolve("file.txt"));

// Udso de os
const os = require('os');
console.log("CPU info:", os.cpus()); 

const getCurrentDateTime = require("./dateFormat");
console.log("Current Date and Time:", getCurrentDateTime());


