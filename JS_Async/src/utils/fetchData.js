let XMLHttpRquest = require('xmlhttprequest').XMLHttpRequest;


const fetchData = (url_api) => {
	return new Promise((resolve, reject) => {
		const xhttp = new XMLHttpRquest();
		xhttp.open('GET', url_api, true);
		xhttp.onreadystatechange = (() => {
			if (xhttp.readyState === 4) {
			/*status =4 means all the data is recieved*/
			xhttp.status === 200
				? resolve(JSON.parse(xhttp.responseText))
				:reject(new Error('Error ' + url_api));
			}
		})
	xhttp.send();
	})
}

module.exports = fetchData;