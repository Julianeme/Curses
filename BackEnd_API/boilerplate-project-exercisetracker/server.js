const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { Schema } = mongoose;
require ('dotenv').config({ path: __dirname + '/.env' })

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log("CONNECTED TO MONGODB"))

//Database Schema configuration
//User configuration
const userSchema = new mongoose.Schema({
	username: {type: String,
				required: true}
})
const User = mongoose.model('User', userSchema)

//Exercise configuration
const exerciseSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	duration: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
})
const Exercise = mongoose.model('Exercise', exerciseSchema)

app.use(cors())
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html')
});


app.post('/api/users', (req, res) => {
	User.find({ username: req.body.username }, (err, data) => {
		if (err) {
			console.log(err)
		} else if (data.length > 0) {
			res.json({
				error: "Username already exists"
			})
		} else {
			const newUser = new User({ username: req.body.username })
			newUser.save((err, user) => {
				if (err) return (err)
				return res.json({ username: user.username, _id: user._id })
			})
		}
	})
})

app.get('/api/users', (req, res) => {
	console.log(req.body)
	User.find({}, { "__v": 0}, (err, users) => {
		if (err) {
			console.log(err)
		} else {
			res.json(users)
		}
	})
})

app.delete('/api/users/:_id', (req, res) => {
	User.findByIdAndDelete(req.params._id, (err, data) => {
		if (err) {
			console.log(err)
		} else {
			res.json(data)
		}
	})
})

app.post("/api/users/:_id/exercises", (req, res) => {
	User.findById(req.params._id, (err, user) => {
		if (err) {
			console.log("User not found")
		} else {
			const newExercise = new Exercise({
				"username": user.username,
				"description": req.body.description,
				"duration": req.body.duration,
				"date": isNaN(Date.parse(req.body.date)) ?
					Date.now() :
					Date.parse(req.body.date)
			})
			newExercise.save((err, exercise) => {
				if (err){
					console.log(err)
					return (err)
					}
				res.json({
					"username": exercise.username,
					"description": exercise.description,
					"duration": exercise.duration,
					"date": new Date(exercise.date).toDateString(),
					"_id": user._id
				})
			})
		}
	})
})

app.get("/api/users/:_id/logs", (req, res) => {
	let from = req.query.from ? new Date(req.query.from) : new Date(0)
	let to = req.query.to ? new Date(req.query.to) : new Date()
	let limit = req.query.limit ? parseInt(req.query.limit) : 1000
	User.findById(req.params._id, (err, user) => {
		if (err) {
			console.log("User not found")
		} else {
			try {
				console.log("trying search")
				Exercise.find({ "username": user.username }, { "description": 1, "duration": 1, "date": 1, "_id": 0 }).where('date').gte(from).lte(to)
					.limit(limit).exec().then(exercises => {
						return (res.json({ "username": user.username,
											"count": exercises.length,
											"_id": user._id,
											"log": exercises.map(exercise => ({ "description": exercise.description,
																				"duration": exercise.duration,
																				"date": new Date(exercise.date).toDateString() }))}))
					})
				}catch (err) {
					console.log(err)
				}
		}
	})
})

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log('Your app is listening on port ' + listener.address().port)
})
