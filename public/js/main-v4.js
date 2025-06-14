// Arreglo de mensajes y colores
const mensajes = [
  { texto: "BIENVENIDO! :)", color: "blue" },
  { texto: "QUE TENGAS UN BUEN DÍA!", color: "green" },
  { texto: "SIGUE ADELANTE!", color: "purple" },
  { texto: "LO ESTÁS HACIENDO GENIAL!", color: "red" }
];

let indice = 0;
let intervalo = null;

function showConsoleOutput() {
  const contenedor = document.getElementById("mensaje-bienvenida");

  if (!contenedor) {
    console.error("No se encontró el contenedor con ID 'mensaje-bienvenida'");
    return;
  }

  // Evita que se creen múltiples intervalos si ya hay uno corriendo
  if (intervalo !== null) {
    return;
  }

  intervalo = setInterval(() => {
    const mensajeActual = mensajes[indice];
    contenedor.textContent = mensajeActual.texto;
    contenedor.style.color = mensajeActual.color;
    contenedor.style.fontSize = "24px";
    contenedor.style.fontWeight = "bold";

    indice = (indice + 1) % mensajes.length;
  }, 3000);
}
