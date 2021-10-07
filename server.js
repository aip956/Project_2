require('dotenv').config()
console.log(process.env.PORT);
//___________________
//Dependencies
//___________________
const express = require('express');
const morgan = require("morgan") //import morgan
const methodOverride = require('method-override');
const mongoose = require ('mongoose');

// Not in Superfruits "complete server.js file"
const db = mongoose.connection;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database

// Setup inputs for our connect function; added from SuperFruits
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

//___________________
// How to connect to the database either via heroku or locally; from Heroku Lab
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
// From Heroku Lab
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true}
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const {Schema, model} = mongoose

// make chocolate schema
const chocoSchema = new Schema({
    Manuf: String,
    Name: String,
    CocoaCont: Number,
    Flavor: String,
    Description: String
})

// make choc model
const Choc = model("Choc", chocoSchema)

/////////////////////////////////////////////////
// Create our Express Application Object, from Superfruits
/////////////////////////////////////////////////
const app = express()

//___________________
//Middleware
//___________________
app.use(morgan("tiny")) //logging
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

//use public folder for static assets; not in Superfruits Register Middleware
// app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings; gets req.body
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project


//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World!');
});








//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('express is listening on:', PORT));