require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const { Schema } = mongoose;
var bodyParser = require('body-parser');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log("CONNECTED TO MONGO"));

//Database Schema configuraton
const URLshortSchema = new mongoose.Schema({
	originalUrl: {
		type: String,
		required: true
	},
	sUrl: {
		type: String,
		required: true
	}
});

// Model configuraton
const shURL = mongoose.model('shURL', URLshortSchema);

//URL shortener function
function getrandom() { var random_string = Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5); return (random_string) }

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// URL shorterner endpoint
app.post("/api/shorturl", function (req, res) {
	const url = req.body.url;
	console.log(url);
	const urlTest = /^\b(https?|ftp|file):\/\//;
	if (!url || urlTest.test(url) === false) {
		return (res.json({ error: "invalid URL" }));
	}
	shURL.findOne({ originalUrl: url }, function (err, data) {
		if (err) {
			return (err);
		}
		if (data) {
			return (res.json({ original_url: data.originalUrl,
								short_url: data.sUrl }));
		}
		else {
			const newURL = new shURL({
				originalUrl: url,
				sUrl: getrandom()
			});
			newURL.save(function (err, data) {
				if (err) {
					return (err);
				}
				return (res.json({ "original_url": data.originalUrl,
									"short_url": data.sUrl }));
			});
		}
	});

});



// short URL redirection endpoint
app.get("/api/shorturl/:short_url", function (req, res) {
	shURL.findOne({ sUrl: req.params.short_url }, function (err, data) {
		if (err) {
			console.log("No encontrado")
			return (err);
		}
		if (data) {
			res.redirect(data.originalUrl);
		}
		else {
		return (res.json({ "error": "No short URL found for the given input" }));
			}
		})
	})



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

