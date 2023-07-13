/*
Objetivos:
- Categorías (filtrado) ✅
- Usar asincronía (fetch): ✅
  - Opción 1: Cargar un archivo .json local con NUESTROS productos ✅
  - Opción 2: Usar una API como la de Mercado Libre ✅
*/

// Clase "molde" para los productos
class Producto {
  constructor(id, nombre, precio, categoria, imagen = false) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.imagen = imagen;
  }
}

// Variables globales
const limiteProductos = 12;
let productos = [];
let categoriaSeleccionada = "MLA1652";

// Busca un producto por ID, si lo encuentra lo retorna en forma de objeto
function registroPorId(id) {
  return productos.find((producto) => producto.id === id);
}

// Función asincrónica para buscar productos por categoría en el API de Mercado Libre
async function apiProductosPorCategoria(categoria = categoriaSeleccionada) {
  const response = await fetch(
    `https://api.mercadolibre.com/sites/MLA/search?category=${categoria}&limit=${limiteProductos}&offset=0`
  );
  const api = await response.json();
  const productosMercadoLibre = api.results; // Este es el array de productos de ML
  // Vamos a convertir los objetos de productos de ML a nuestra clase Productos,
  // para hacerlos compatible con nuestro carrito. Simplemente instanciamos objetos
  // de la clase molde Productos con los atributos de ML y los guardamos en un array
  productos = [];
  for (const productoMercadoLibre of productosMercadoLibre) {
    productos.push(
      new Producto(
        productoMercadoLibre.id,
        productoMercadoLibre.title.slice(0, 20) + "...",
        productoMercadoLibre.price,
        productoMercadoLibre.category_id,
        productoMercadoLibre.thumbnail_id
      )
    );
  }
  return productos;
}

// Función asincrónica para buscar productos por categoría en el API de Mercado Libre
async function apiProductosPorNombre(nombre) {
  const response = await fetch(
    `https://api.mercadolibre.com/sites/MLA/search?category=${categoriaSeleccionada}&q=${nombre}&limit=${limiteProductos}&offset=0`
  );
  const api = await response.json();
  const productosMercadoLibre = api.results; // Este es el array de productos de ML
  console.log(productosMercadoLibre);
  // Vamos a convertir los objetos de productos de ML a nuestra clase Productos,
  // para hacerlos compatible con nuestro carrito. Simplemente instanciamos objetos
  // de la clase molde Productos con los atributos de ML y los guardamos en un array
  productos = [];
  for (const productoMercadoLibre of productosMercadoLibre) {
    productos.push(
      new Producto(
        productoMercadoLibre.id,
        productoMercadoLibre.title.slice(0, 20) + "...",
        productoMercadoLibre.price,
        productoMercadoLibre.category_id,
        productoMercadoLibre.thumbnail_id
      )
    );
  }
  return productos;
}

// Elementos
const divProductos = document.querySelector("#productos");
const divCarrito = document.querySelector("#carrito");
const spanCantidadProductos = document.querySelector("#cantidadProductos");
const spanTotalCarrito = document.querySelector("#totalCarrito");
const inputBuscar = document.querySelector("#inputBuscar");
const botonCarrito = document.querySelector("section h1");
const botonComprar = document.querySelector("#botonComprar");
const botonesCategorias = document.querySelectorAll(".btnCategoria");

// Apenas carga la página por primera vez, muestro el loading
mostrarLoading();
// Llamamos a la función asincrónica, cuando esté resulta mostramos los
// productos y cerramos el loading
apiProductosPorCategoria().then((productos) => {
  cargarProductos(productos);
  Swal.close(); // Cierro el loading
});

// Muestra un Sweet Alert
function mostrarLoading() {
  Swal.fire({
    title: "Cargando",
    html: "Estamos buscando productos...",
    timer: 1000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
  });
}

// Botones categorías
botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    event.preventDefault();
    quitarClase();
    boton.classList.add("seleccionado");
    inputBuscar.value = "";
    // Mostramos el loading
    mostrarLoading();
    // Tomamos la categoría del HTML (data-categoria)
    categoriaSeleccionada = boton.dataset.categoria;
    // Llamamos a la función asincrónica, cuando esté resulta mostramos los
    // productos y cerramos el loading
    apiProductosPorCategoria().then((productos) => {
      cargarProductos(productos);
      Swal.close(); // Cerramos el loading
    });
  });
});

// Esta función regular recibe como parámetro un array de productos y se encarga
// de renderizarlos en el HTML
function cargarProductos(productos) {
  divProductos.innerHTML = "";
  // Recorremos todos los productos y lo agregamos al div #productos
  for (const producto of productos) {
    // A cada div lo agregamos un botón de Agregar al carrito, y a ese botón le pasamos
    // el atributo data-id, con el id del producto. Eso después nos va a ser muy útil
    // para saber desde que producto estamos haciendo click
    divProductos.innerHTML += `
        <div class="producto">
            <h2>${producto.nombre}</h2>
            <p class="precio">$${producto.precio}</p>
            <div class="imagen">
              <img src="https://http2.mlstatic.com/D_604790-${producto.imagen}-V.webp" />
            </div>
            <a href="#" class="btn btnAgregar" data-id="${producto.id}">Agregar al carrito</a>
        </div>
    `;
  }
  // Botones agregar al carrito: como no sabemos cuántos productos hay en nuestra base de datos,
  // buscamos TODOS los botones que hayamos renderizado recién, y los recorremos uno por uno
  const botonesAgregar = document.querySelectorAll(".btnAgregar");
  for (const boton of botonesAgregar) {
    // Le agregamos un evento click a cada uno
    boton.addEventListener("click", (event) => {
      event.preventDefault();
      // Obtenemos el ID del producto del atributo data-id
      const id = boton.dataset.id;
      console.log(id);
      // Con ese ID, consultamos a nuestra base de datos por el producto
      const producto = registroPorId(id);
      // Agregamos el registro (producto) a nuestro carrito
      carrito.agregar(producto);
    });
  }
}

// Quitar clase seleccionada
function quitarClase() {
  const botonSeleccionado = document.querySelector(".seleccionado");
  if (botonSeleccionado) {
    botonSeleccionado.classList.remove("seleccionado");
  }
}

// Clase carrito, para manipular los productos de nuestro carrito
class Carrito {
  constructor() {
    // Cargamos del storage
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
    // Inicializamos variables
    this.carrito = carritoStorage || [];
    this.total = 0;
    this.totalProductos = 0;
    // Apenas se crea el carrito, que llame al método listar para que
    // renderice todos los productos que haya en el storage
    this.listar();
  }

  // Método para agregar el producto al carrito
  agregar(producto) {
    // Si el producto está en el carrito, lo guardo en esta variable
    const productoEnCarrito = this.estaEnCarrito(producto);
    if (productoEnCarrito) {
      // Si está en el carrito, le sumo la cantidad
      productoEnCarrito.cantidad++;
    } else {
      // Si no está, lo agrego al carrito
      this.carrito.push({ ...producto, cantidad: 1 });
    }
    // Actualizo el storage
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
    // Actualizo el carrito en el HTML
    this.listar();
    // Toastify
    Toastify({
      text: `${producto.nombre} fue agregado al carrito`,
      position: "center",
      className: "info",
      gravity: "bottom",
      style: {
        background: "linear-gradient(to right, blue, red)",
      },
    }).showToast();
  }

  // Verificamos si el producto está en el carrito. Usamos desectruración en el parámetro:
  // recibimos el objeto producto en el parámetro pero solo usamos la propiedad id
  estaEnCarrito({ id }) {
    return this.carrito.find((producto) => producto.id === id);
  }

  // Este método es el encargado de actualizar el HTML de nuestro carrito
  listar() {
    // Reiniciamos las variables
    this.total = 0;
    this.totalProductos = 0;
    divCarrito.innerHTML = "";
    // Recorremos todos los productos del carrito y lo agregamos al div #carrito
    for (const producto of this.carrito) {
      // A cada div lo agregamos un botón de Quitar del carrito, y a ese botón le pasamos
      // el atributo data-id, con el id del producto. Eso después nos va a ser muy útil
      // para saber desde que producto estamos haciendo click
      divCarrito.innerHTML += `
        <div class="productoCarrito">
            <h2>${producto.nombre}</h2>
            <p>$${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <a href="#" data-id="${producto.id}" class="btn btnQuitar">Quitar del carrito</a>
        </div>
    `;
      // Actualizamos los totales
      this.total += producto.precio * producto.cantidad;
      this.totalProductos += producto.cantidad;
    }
    // Oculto el botón Comprar si no hay productos
    if (this.totalProductos > 0) {
      botonComprar.classList.remove("oculto"); // Muestro el botón
    } else {
      botonComprar.classList.add("oculto"); // Oculto el botón
    }
    // Botones de quitar: como no sabemos cuántos productos hay en el carrito,
    // buscamos TODOS los botones que hayamos renderizado recién, y los recorremos uno por uno
    const botonesQuitar = document.querySelectorAll(".btnQuitar");
    for (const boton of botonesQuitar) {
      // Le agregamos un evento onclick a cada uno
      boton.onclick = (event) => {
        event.preventDefault();
        // Llamamos al método quitar, pasándole el ID del producto que sacamos
        // del atributo data-id del HTML
        this.quitar(boton.dataset.id);
      };
    }
    // Actualizamos variables carrito
    spanCantidadProductos.innerText = this.totalProductos;
    spanTotalCarrito.innerText = this.total;
  }

  // Método para quitar o restar productos del carrito
  quitar(id) {
    // Recibimos como parámetro el ID del producto, con ese ID buscamos el índice
    // del producto para poder usar el splice y borrarlo en caso de que haga falta
    const indice = this.carrito.findIndex((producto) => producto.id === id);
    // Si la cantidad del producto es mayor a 1, le resto
    if (this.carrito[indice].cantidad > 1) {
      this.carrito[indice].cantidad--;
    } else {
      // Sino, signica que hay un solo producto, así que lo borro
      this.carrito.splice(indice, 1);
    }
    // Actualizo el storage
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
    // Actualizo el carrito en el HTML
    this.listar();
  }

  // Método para vaciar el carrito
  vaciar() {
    this.carrito = [];
    localStorage.removeItem("carrito");
    this.listar();
  }
}

// Buscador: al presionar enter se ejecuta el evento submit
formBuscar.addEventListener("submit", (event) => {
  event.preventDefault();
  // Obtenemos el atributo value del input
  const palabra = inputBuscar.value;
  // Muestro el loading previo a cargar los productos
  mostrarLoading();
  // Llamamos a la función asincrónica, cuando esté resulta mostramos los
  // productos y cerramos el loading
  apiProductosPorNombre(palabra).then((productos) => {
    cargarProductos(productos);
    Swal.close(); // Cierro el loading
  });
});

// Toggle para ocultar/mostrar el carrito
botonCarrito.addEventListener("click", () => {
  document.querySelector("section").classList.toggle("ocultar");
});

// Mensaje de compra realizada con la librería Sweet Alert
botonComprar.addEventListener("click", (event) => {
  event.preventDefault();
  Swal.fire({
    title: "Su pedido está en camino",
    text: "¡Su compra ha sido realizada con éxito!",
    icon: "success",
    confirmButtonText: "Aceptar",
  });
  // Vacíamos el carrito
  carrito.vaciar();
  // Ocultamos el carrito en el HTML
  document.querySelector("section").classList.add("ocultar");
});

// Objeto carrito: lo instanciamos a lo último de nuestro archivo JavaScript
// para asegurarnos que TODO esté declarado e inicializado antes de crear el carrito
const carrito = new Carrito();
