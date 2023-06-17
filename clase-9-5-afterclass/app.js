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

// Vendedor
const itemsVendedor = [pocion, espada, escudo];

// Oro
let oro = 1000;

// Elementos
const elementoOro = document.querySelector("#oro span");
const elementoMochila = document.querySelector("#mochila");
const btnComprarPocion = document.querySelector("#btnComprarPocion");
const btnComprarEspada = document.querySelector("#btnComprarEspada");
const btnComprarEscudo = document.querySelector("#btnComprarEscudo");
elementoOro.innerText = oro;

const botones = document.querySelectorAll(".boton");

// Botones simples
// btnComprarPocion.addEventListener("click", function () {
//   comprar(pocion);
// });

// btnComprarEspada.addEventListener("click", function () {
//   comprar(espada);
// });

// btnComprarEscudo.addEventListener("click", function () {
//   comprar(escudo);
// });

// Más complejo, generar los eventos de los botones
// de forma dinámica
for (const boton of botones) {
  boton.addEventListener("click", function (event) {
    // 1 - Busco en la lista de items del vendedor, el item que
    // tenga el mismo nombre que tiene el innerText del botón
    // Por ejemplo si el botón es <li>Espada</li>, el innerText
    // es Espada, y va a buscar en la lista del vendedor (array
    // itemsVendedor) un item con el atributo nombre Espada
    // 2 - Si hay un item con el nombre Espada, el método find
    // devuelve ese item (objeto espada)
    // 3 - Se lo pasamos como parámetro en la función comprar
    let item = itemsVendedor.find((item) => item.nombre == boton.innerText);
    comprar(item);
  });
}

console.log(mochila);

// Funciones regulares

// Función encargada de agregar items a la mochila
function comprar(item) {
  if (oro - item.precio <= 0) {
    // Si el oro que tengo menos el precio no me alcanza
    alert("No ténes suficiente oro para comprar " + item.nombre + ".");
  } else if (mochila.length > 5) {
    // No tiene más espacio en el inventario
    alert("No ténes más espacio en el inventario.");
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
