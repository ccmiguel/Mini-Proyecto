document.addEventListener("DOMContentLoaded", function () {
  const message = ["Bienvenido!!", "Disfruta tu día", "Se feliz"];
  const color = ["green", "blue", "red"];
  let index = 0;

  setInterval(function () {
    const messageElement = document.getElementById("message");
    if (messageElement) {
      messageElement.innerText = message[index];
      messageElement.style.color = color[index];
      messageElement.style.fontSize = "28px";
      messageElement.style.fontWeight = "bold";
    }
    index = (index + 1) % message.length;
  }, 3000);

  const typing = document.getElementById("typing");
  if (typing) {
    typing.addEventListener("keydown", function (event) {
      console.log("You pressed: " + event.key);
    });
  }

  // Botón 1 - Click Me!
  function sayHello() {
    alert("Hello, World!");
  }

  const button = document.getElementById("btn");
  if (button) {
    button.addEventListener("click", sayHello);
    button.addEventListener("mouseover", function () {
      button.style.backgroundColor = "pink";
    });
  }

  // Botón 2 - Click Me2
  const button2 = document.getElementById("btn2");
  if (button2) {
    button2.addEventListener("click", function () {
      alert("Hola, Mundo!");
    });
    button2.addEventListener("mouseover", function () {
      button2.style.backgroundColor = "skyblue";
    });
  }


    // Evento para mostrar tipo de acción: click o mouseover
  const eventButton = document.getElementById("event-button");
  const eventTypeInput = document.getElementById("event-type");

  if (eventButton && eventTypeInput) {
    eventButton.addEventListener("click", () => {
      eventTypeInput.value = "Event Type: click";
    });

    eventButton.addEventListener("mouseover", () => {
      eventTypeInput.value = "Event Type: mouseover";
    });
  }

  // Contenedor de ítems
  const itemsContainer = document.getElementById("items-container");
  const addItemBtn = document.getElementById("add-item");
  const removeItemBtn = document.getElementById("remove-item");

  // Agrega 5 ítems
  addItemBtn.addEventListener("click", () => {
    for (let i = 0; i < 5; i++) {
      const p = document.createElement("p");
      p.innerText = "New item added! (Nuevo)";
      itemsContainer.appendChild(p);
    }
  });

  // Elimina hasta 5 ítems (si existen)
  removeItemBtn.addEventListener("click", () => {
    for (let i = 0; i < 5; i++) {
      if (itemsContainer.lastChild) {
        itemsContainer.removeChild(itemsContainer.lastChild);
      }
    }
  });

  // Cambia color de fondo con movimiento del mouse
  document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Convertimos posición del mouse a valores RGB
  const r = Math.round((x / width) * 255);
  const g = Math.round((y / height) * 255);
  const b = 200; // Valor constante para mantener tono

  // Aplica el color al fondo
  document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;  });
  
  

});
