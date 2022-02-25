const path = require('path');
require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log("CONNECTED TO MONGO"));

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	age: Number,
	favoriteFoods: [String],
	height: {
		type: Number,
		min: 0,
		max: [3, "Height must be less than 3 meters"]
	}
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
	const Angela = new Person({
		name: "Angela",
		age: 36,
		favoriteFoods: ["creppes", "pasta", "local food"],
		height: 1.5});
	Angela.save(function (err){
		if (err) {
			return(err);
		}
		console.log("Person created and saved!");
		done(null, Angela);
	});};

let arrayOfPeople = [{
	name: "Angela",
	age: 36,
	favoriteFoods: ["creppes", "pasta", "local food"],
	height: 1.5
},
	{
		name: "Julian",
		age: 40,
		favoriteFoods: ["Patain", "pasta", "local food"],
		height: 1.75
	},
]

const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, function(err, people){
		if (err) {
			return(err);
			}
			console.log("People created and saved!");
			done(null, people);
		});
	};


const findPeopleByName = (personName, done) => {
	Person.find({name: personName}, function(err, people){
		if (err) {
			return(err);
		}
		console.log("People found!")
		done(null, people);
	});
}

const findOneByFood = (food, done) => {
	Person.findOne({favoriteFoods: food}, function(err, people){
		if (err) {
			return(err);
		}
		console.log("People found!")
		done(null, people)
	});
};

const findPersonById = (personId, done) => {
	Person.findById(personId, function(err, people){
		if (err) {
			return(err);
			}
		console.log("People found!")
		done(null, people)
		});
	};

const findEditThenSave = (personId, done) => {
	Person.findById(personId, function(err, person){
		if (err) {
			return(err);
			}
		const foodToAdd = "hamburger";
		person.favoriteFoods.push(foodToAdd);
		person.save(function(err){
			if (err) {
				return(err);
			}
			console.log("Person edited and saved!")
			done(null, person);
		});
	});
};

const findAndUpdate = (personName, done) => {
	const ageToSet = 20;
	Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function(err, person){
		if (err) {
			return(err);
		}
		console.log("Person found and updated!")
		done(null, person);
	});
};

const removeById = (personId, done) => {
	Person.findByIdAndRemove(personId, function(err, person){
		if (err) {
			return(err);
		}
		console.log("Person found and removed!")
		done(null, person);
	});
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function(err, people){
	if(err) {
		return(err);
	}
	console.log("People removed!")
	done(null, people);
	  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }).sort({name: 'asc'}).limit(2).select('-age').exec(function(err, people){
	if(err) {
		return(err);
	}
	console.log("People found!")
	done(null, people);
	  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
