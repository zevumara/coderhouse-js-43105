/**
 * Objetivos de la aplicación:
 * - Estructura HTML ✅
 * - Funciones ✅
 * - Objetos ✅
 * - Arrays ✅
 * - Y algún método de array
 * -- push: para agregar al array ✅
 * -- splice: para quitar del array ✅
 * -- find: para buscar un elemento
 * -- indexOf: para encontrar el índice de un elemento ✅
 * - El uso innerHTML, innerText (opcional)
 */

// Clase molde para los objetos del juego
class Item {
  // Parámetros para instanciar (crear) el item del juego
  constructor(nombre, precio, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
  }
}

// Variables globales

// Array donde guardamos todos los items comprados
const mochila = [];

// Items del juego
const pocion = new Item("Poción de Vida", 80, "pocion.png");
const espada = new Item("Espada", 160, "espada.png");
const escudo = new Item("Escudo", 120, "escudo.png");

// Oro
let oro = 1000;

// Elementos
const elementoOro = document.querySelector("#oro span");
const elementoMochila = document.querySelector("#mochila");
elementoOro.innerText = oro;

// Funciones regulares

// Función encargada de agregar items a la mochila
function comprar(item) {
  if (oro - item.precio <= 0) {
    // Si el oro que tengo menos el precio no me alcanza
    alert("No ténes suficiente oro para comprar " + item.nombre + ".");
  } else {
    // Si me alcanza, agrego el item a la mochi
    mochila.push(item);
    oro = oro - item.precio; // Actualizo el precio
    actualizarHTML(); // Actualizo el HTML
  }
}

// Función encargada de quitar itiems de la mochila
function vender(indice) {
  // Obtengo el item del array para usar la propiedad precio
  const item = mochila[indice];
  // Sumo a mi oro el precio del item
  oro = oro + item.precio;
  // Con el índice uso splice y lo borro del array
  mochila.splice(indice, 1);
  actualizarHTML(); // Actualizo el HTML
}

// Se va a encargar de renderizar todos los items de la mochila
function actualizarHTML() {
  // Vacío el elemento de la mochila
  elementoMochila.innerHTML = "";
  // Recorro el array y vuelvo a agregar a TODOS los elementos (items)
  // que hay dentro del array mochila
  for (const item of mochila) {
    let indiceItem = mochila.indexOf(item);
    let elementoItem = `
        <li class="item" onclick="vender(${indiceItem})">
            <img src="img/${item.imagen}" />
        </li>`;
    elementoMochila.innerHTML += elementoItem;
  }
  // Actualizo el oro
  elementoOro.innerText = oro;
}
