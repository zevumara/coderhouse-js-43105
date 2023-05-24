function sumar(valor1, valor2) {
	let resultado = valor1 + valor2;
	return resultado;
}
function restar(valor1, valor2) {
	let resultado = valor1 - valor2;
	return resultado;
}
function dividir(valor1, valor2) {
	let resultado = valor1 / valor2;
	return resultado;
}
function multiplicar(valor1, valor2) {
	let resultado = valor1 * valor2;
	return resultado;
}

function calculadora() {
	let prompt1 = parseInt(prompt('Ingrese el primer valor'));
	let prompt2 = parseInt(prompt('Ingrese el segundo valor'));
	let operacion = prompt('¿Qué operación querés hacer? (+ - / *)');
	let resultado;
	switch (operacion) {
		case '+':
			resultado = sumar(prompt1, prompt2);
			alert(prompt1 + ' + ' + prompt2 + ' = ' + resultado);
			break;
		case '-':
			resultado = restar(prompt1, prompt2);
			alert(prompt1 + ' - ' + prompt2 + ' = ' + resultado);
			break;
		case '/':
			resultado = dividir(prompt1, prompt2);
			alert(prompt1 + ' / ' + prompt2 + ' = ' + resultado);
			break;
		case '*':
			resultado = multiplicar(prompt1, prompt2);
			alert(prompt1 + ' * ' + prompt2 + ' = ' + resultado);
			break;
		default:
			alert('El operador ingresado es inválido.');
			break;
	}
}
