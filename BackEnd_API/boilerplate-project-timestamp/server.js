// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// current time endpoint.
// The current timestamp can be fetched by calling the now() method on the Date object:
// Date.now()
// or get the same value by:
// new Date().getTime()
// or
// new Date().valueOf()

app.get("/api", function (req, res) {
	date = new Date()
	const time = {
		unix: date.getTime(),
		utc: date.toUTCString()
	}
	  return (res.json(time))
});

// input time endpoint.
app.get("/api/:date", function (req, res) {
	dates = req.params.date
	console.log(dates)
	let newDate = (!isNaN(dates))? new Date(Number(dates)): new Date(dates)
	const time = {
		unix: newDate.getTime(),
		utc: newDate.toUTCString()
	}
	console.log(typeof(newDate))
	if (time.utc == 'Invalid Date') {
		return (res.json({error: 'Invalid Date'}))
	}
	return (res.json(time))
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
