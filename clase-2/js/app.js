// Usuario ya creado
const USUARIO = "seba";
const CLAVE = "1234";

// Usuario que se está logueando
let usuario = prompt("Igresá tu usuario:");
let clave = prompt("Ingresá tu clave:");

// Algoritmo para login
if (usuario == USUARIO && clave == CLAVE) {
    alert("Bienvenid@ " + usuario);
} else {
    if (usuario != USUARIO) {
        alert("El usuario " + usuario + " no existe.")
    } else if (clave != CLAVE) {
        alert("La contraseña es incorrecta.")
    }
}