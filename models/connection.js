////////////////////////////////////////////////////
//Dependencies
////////////////////////////////////////////////////
require('dotenv').config()
console.log(process.env.PORT);
const mongoose = require ('mongoose');

////////////////////////////////////////////////////
//Database
////////////////////////////////////////////////////
// Setup inputs for our connect function; added from SuperFruits
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
// From Heroku Lab
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true}
    );
    
    // Error / success
    db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
    db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
    db.on('disconnected', () => console.log('mongod disconnected'));

////////////////////////////////////////////////////
// Export the Connection
////////////////////////////////////////////////////

module.exports = mongoose