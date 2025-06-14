function showConsoleOutput() {
  let myfirstName = "Alice";
  console.log(myfirstName);

  myfirstName = "Bob";
  console.log(myfirstName);

  const myLastName = "Jenny";
  console.log(myLastName);

  let x = 33;
  console.log(x); // 33

  console.log(x > 30); // true
  console.log(x < 30); // false
  console.log(x == "33"); // true
  console.log(x === "33"); // false
  console.log(x != "33"); // false
  console.log(x > "33"); // false
  console.log(x < "33"); // false
  console.log(x >= "33"); // true
  console.log(x <= "33"); // true

  let score = 52;
  console.log("Score is 50 or higher: " + (score >= 50));
  console.log("Score is below 50: " + (score < 50));

  // Llamar a las tres funciones nuevas
  showWithFor();
  showWithWhile();
  showWithDoWhile();
}

function showWithFor() {
  console.log("Using for loop:");
  for (let i = 1; i <= 5; i++) {
    console.log(i);
  }
}

function showWithWhile() {
  console.log("Using while loop:");
  let i = 1;
  while (i <= 5) {
    console.log(i);
    i++;
  }
}

function showWithDoWhile() {
  console.log("Using do...while loop:");
  let i = 1;
  do {
    console.log(i);
    i++;
  } while (i <= 5);
}