function showConsoleOutput() {
  // Prompt
  let userName = prompt("What is your name?");
  alert("Hello " + userName);

  // Confirm
  let isDeleted = confirm("Are you sure you want to delete");
  alert("estado de eliminación: " + isDeleted);
  if (isDeleted) {
    console.log("Post deleted");
  } else {
    console.log("Post not deleted");
  }

  // setInterval - mensaje cada 5 segundos
  setInterval(() => {
    alert("Hello every 5 second");
  }, 5000);

  // setTimeout - mensaje después de 3 segundos
  setTimeout(() => {
    alert("Hello after 3 seconds");
  }, 3000);
}
