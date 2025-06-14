const fs = require('fs');
const path = require('path');
const os = require('os');

fs.writeFileSync("test.txt", "Hello Node.js");

console.log("Path join", "alice","docs");

console.log("Path join", path.join("alice", "docs"));
console.log("Path basename:", path.basename("/users/alice/docs/file.txt"));
console.log("Path dirname:", path.extname("/users/alice/docs/file.txt"));
console.log("Path resolve:", path.resolve("file.txt"));

console.log("CPU info:", os.cpus()); //

const getCurrentDateTime = require("./dateFormat");
console.log("Current Date and Time:", getCurrentDateTime());
