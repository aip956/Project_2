
//Dependencies
//___________________
require("dotenv").config() // load env vars
const express = require('express');
const morgan = require("morgan") //import morgan
const methodOverride = require('method-override');
const ChocRouter = require('./controllers/choc')
const UserRouter = require('./controllers/user')
const session = require('express-session');
const MongoStore = require('connect-mongo');


//___________________

//___________________


// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version




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
app.use(express.static("public")); // serve files from public statically
app.use(session({
  secret: process.env.SECRET,
  store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
  saveUninitialized: true,
  resave: false,
}))

app.use("/user", UserRouter)
app.use("/choco", ChocRouter)

//___________________
// Routes
//___________________



// Main routes

//localhost:3000

app.get("/", (req, res) => {
  res.render("index.ejs")
});




//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('express is listening on:', PORT));