const carrito = [];

function agregarAlCarrito(){
    let producto = prompt("¿Qué producto desea agregar al carrito?");
    carrito.push(producto);
    console.log(carrito);
}

function cuantosProductosTengo(){
    alert("Tenés " + carrito.length + " productos en el carrito.");
}

function listaDeProductos(){
    alert(carrito.join("\n"));
}

function quitarProducto(){
    let producto = prompt("¿Qué producto desea quitar del carrito?");
    if (carrito.includes(producto)){   
        let indice = carrito.indexOf(producto);
        carrito.splice(indice, 1);
        alert("El producto " + producto + " fue quitado del carrito.");
    }else{
        alert("Ese producto no está en el carrito.");
    }
}