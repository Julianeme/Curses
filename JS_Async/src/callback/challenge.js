// Implementación de una API con XMLHttpRquest

// Instanciando el request.
//Permite hacer peticiones a algun servidor en la nube
let XMLHttpRquest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character/';


function fetchData(url_api, callback) {
	let xhttp = new XMLHttpRquest();
	/*
   A nuestra referencia xhttp le pasamos un LLAMADO 'open'
   donde: parametro1 = el metodo, parametro2 = la url,
   parametro3 = verificación si es asincrono o no, valor por defecto true
   */
	xhttp.open('GET', url_api, true);
	xhttp.onreadystatechange = function (event) {
		if (xhttp.readyState === 4) {
			/*status =4 means all the data is recieved*/
			if (xhttp.status === 200) {
				callback(null, JSON.parse(xhttp.responseText));
			} else {
				const error = new Error("Error " + url_api);
				return callback(error, null);
			}
		}
	}
	xhttp.send();
}

fetchData(API, function(error1, data1) {
	if (error1) return console.error(erro1);
	fetchData(API + data1.results[0].id, function(error2, data2) {
		if (error2) return console.error(error2);
		fetchData(data2.origin.url, function(error3, data3) {
			if (error3) return console.error(error3);
			console.log(data1.info.count);
			console.log(data2.name);
			console.log(data3.dimension);
		})
	})
})
