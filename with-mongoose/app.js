const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true
});

const fruitsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified."]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitsSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid."
});

//fruit.save();

const personsSchema = new mongoose.Schema({
  name: String,
  age: Number,
  // to link to record from another collection, will be embedded inside
  favouriteFruit: fruitsSchema
});

const Person = mongoose.model("Person", personsSchema);

const pineapple = new Fruit({
  name: "Pineapple",
  rating: 9,
  review: "Awesome stuff"
});

// pineapple.save();

const mango = new Fruit({
  name: "Mango",
  rating: 8,
  review: "Decent fruit"
});

mango.save();

Person.updateOne({ name: "John" }, { favouriteFruit: mango }, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully updated.");
  }
});

const person = new Person({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple
});

// person.save();

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "The best fruit!"
});

const orange = new Fruit({
  name: "Orange",
  rating: 6,
  review: "Too sour"
});

const banana = new Fruit({
  name: "Banana",
  rating: 8,
  review: "Tasty"
});

// insert records

// Fruit.insertMany([kiwi, orange, banana], function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Succesfully saved all the fruits to fruitsDB.")
//   }
// });

// update document
Fruit.updateOne({ _id: "5cec645f1c4d864ffc6bad81" }, { rating: 7 }, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully updated the document.");
  }
});

// delete record

// Fruit.deleteOne({name: "Banana"}, function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted record.")
//   }
// });

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    // to close mongoose once for each loop done
    // mongoose.connection.close();

    fruits.forEach(fruit => {
      console.log(fruit.name);
    });
  }
});
