function sayHi (name) {
	console.log("Hello " + name)
}

function greet (callback, name) {
	callback(name)
}

//greet(sayHi, "Julian")

const saludo =(nombre) => {
	console.log("saludos " + nombre)
}

const saludar = (callback, nombre) => {
	callback(nombre)
}

saludar(saludo, "Julian Tabares")