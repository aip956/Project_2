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

app.get('/list/seed', (req, res)=> {
// array of starter chocolate
const startChoco = [
  {Manuf: "Zotter", Name: "Sweet Christmas Greetings", CocoaCont: "70", Flavor: "Hazelnut Praline", Description: "Dark Chocolate 70% filled with hazelnut praline and hazelnut brittle"},
  {Manuf: "Puchero", Name: "Sourdough Bread Bar", CocoaCont: "60", Flavor: "Sourdough Bread", Description: "This recipe combines the flowery notes of Indian chocolate with sourdough wheat bread. This has a lovely crumbly and crunchy texture. Reminiscent of a crispy rice candy bar."},
  {Manuf: "Bonnat", Name: "Morenita", CocoaCont: "65", Flavor: "", Description: "Discover Bonnat milk chocolate range with this amazing bar that will allow you to travel in the new taste latitudes."},
  {Manuf: "Marou", Name: "Lâm Đồng", CocoaCont: "74", Flavor: "", Description: "This cacao thrives at the foot of lush forested hills in Vietnam's central highlands. Lâm Đồng Province's cool mountains yield a mild chocolate, but look alive for traces of prunes, raisins, and espresso. "},
  {Manuf: "Soma", Name: "Twinkle Bar", CocoaCont: "", Flavor: "", Description: "Caramel is sugar that’s allowed to change, run a little wild. Bless the sweet science that allows this to occur. Soma's caramel chocolate (they named it Caramel AF) melts like butter in your mouth, the taste of slowly caramelized sugars and cooked milk beautifully intermingled. "},
]

// Delete all choco
Choc.remove({}, (err, data) => {
  // Seed Starter Choco
  Choc.create(startChoco,(err, data) => {
    // send created choco as response to confirm creation
    res.json(data);
  }
  );
});

});




//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World!');
});

// Index Route (Get => /list)
app.get("/choco", (req, res) => {
  Choc.find({}, (err, choco) => {
    res.render("choco/index.ejs", { choco });
  });
});


// show route
app.get("/choco/:id", (req, res) => {
  // get the id from params
  const id = req.params.id

  // find the particular fruit from the database
  Choc.findById(id, (err, choc) => {
      // render the template with the data from the database
      res.render("choco/show.ejs", {choc})
  })
})


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('express is listening on:', PORT));