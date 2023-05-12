// Una aplicación que calcula la edad de una persona
// Pedimos mediante un prompt() el nombre
let nombre = prompt('Ingresá tu nombre');
// Pedimos el año de nacimiento mediante prompt()
let anioNacimiento = prompt('¿En qué año naciste?');
// Guardamos el año actual
const ANIOACTUAL = 2023;
// Calculamos la edad que tiene la persona
let edad = ANIOACTUAL - anioNacimiento;
// Le decimos cuantos años tiene en un alert
alert(nombre + ', tenés ' + edad + ' años. Estás arruinado.');
