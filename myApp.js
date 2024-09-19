require('dotenv').config();

/** install and set up mongoose */
const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// railway app variable
mongoose.connect(${{ MONGO_URL }}, { useNewUrlParser: true, useUnifiedTopology: true });
/* define a schema and compile it into a model */
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let wernerHerzog = new Person({
    name: "Werner Herzog",
    age: 76,
    favoriteFoods: ["Sauerkraut", "Wurst"]});

  wernerHerzog.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  })
};

const arrayOfPeople = [
  {name: "Janka",
    age: 33,
    favoriteFoods: ["Club Mate", "pizza"]
  },
  {
    name: "Balazs",
    age: 43,
    favoriteFoods: ["turosteszta", "hummus"]
  }
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
  };

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    done(null , data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
    data.favoriteFoods.push(foodToAdd);
    data.save((err, newData) => {
      done(err, newData);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: 20}, {new: true}, (err, data) => {

    done(err, data);
  })
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
