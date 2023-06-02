class Carrito{
    constructor(){
        this.productos = [];
    }

    // Esta función se encarga de verificar si el producto está el en carrito o no
    enCarrito(nuevoProducto){
        // Recorro producto por producto el array
        for (let producto of this.productos){
            // Si el nombre del nuevo producto que introduje en el prompt (función agregarProducto())
            // es igual al producto que estoy comparando en el ciclo, significa que ya está en el array
            if (producto.nombre == nuevoProducto.nombre){
                return true; // Está en el array, salgo del for
            }
            return false; // No está en el array
        }
    }

    // Agregar al carrito
    agregar(nuevoProducto){
        if (this.enCarrito(nuevoProducto)){ // Está en el carrito?
            alert("El producto " + nuevoProducto.nombre + " ya está en el carrito.");
        }else{
            // Si no está en el carrito, lo agrego al array.
            this.productos.push(nuevoProducto);
            alert("El producto " + nuevoProducto.nombre + " fue agregado al carrito.");
        }
        // Muestro la lista de productos llamando al método listar
        this.listar();
    }

    // Muestro la lista de productos en consola
    listar(){
        console.clear(); // Limpia consola
        console.log("Mis productos en el carrito:");
        // Recorro cada elemento (objeto) del array
        for (let producto of this.productos){
            // Imprimo los atributos de cada producto en consola
            console.log("------");
            console.log("Nombre: " + producto.nombre);
            console.log("Precio: " + producto.precio);
            console.log("Cantidad: " + producto.cantidad);
        }
    }

    // Remueve un producto del carrito basado en el nombre
    quitar(nombre){ // Parámetro nombre que viene de la función quitarProducto()
        // Recorro cada elemento (objeto) del array
        for (let producto of this.productos){
            // Comparo el nombre del producto (atributo nombre) con el nombre que introduje en el prompt (parámetro que viene de la función quitarProducto())
            if (producto.nombre == nombre){
                // Guardo el índice del producto
                let indice = this.productos.indexOf(producto);
                // Lo borro del array con splice, usando el índice
                this.productos.splice(indice, 1);
                alert("El producto " + nombre + " fue borrado del carrito");
                // Muestro la lista de productos llamando al método listar
                this.listar();
            }
        }
    }
}

// Creo el objeto carrito
const carrito = new Carrito();

// FUNCIONES PARA LOS BOTONES EN HTML

// Botón Agregar producto
function agregarProducto(){
    // Pido por prompt los datos del producto
    let nombre = prompt("Introduzca el nombre del producto");
    let precio = prompt("Introduzca el precio del producto");

    // Creo un objeto con los datos obtenidos del prompt
    const nuevoProducto = {
        nombre: nombre,
        precio: parseInt(precio),
        cantidad: 1
    }

    // Llamo al método agregar del carrito y le paso el objeto del producto que acabo de crear como parámetro
    carrito.agregar(nuevoProducto);
}

// Botón Quitar Producto
function quitarProducto(){
    // Pido por prompt el nombre del producto que quiero quitar
    let nombre = prompt("Introduzca el nombre del producto que desea quitar");

    // Llamo al método quitar del carrito y le paso por parámetro el nombre del producto que quiero quitar del carrito
    carrito.quitar(nombre);
}
