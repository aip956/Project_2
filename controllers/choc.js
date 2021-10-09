////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Choc = require("../models/choc")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()


////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
    if (req.session.loggedIn) {
      next();
    } else {
      res.redirect("/user/login");
    }
  });
/////////////////////////////////////////
// Routes
/////////////////////////////////////////
// Seed route
router.get('/seed', (req, res)=> {
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
// Index Route (Get => /list)
router.get("/", (req, res) => {
    Choc.find({username: req.session.username}, (err, choco) => {
      res.render("choco/index.ejs", { choco });
    });
  });
  
  // New route
  router.get("/new", (req, res) => {
    res.render("choco/new.ejs")
  })
  
  // Destroy (Delete => /choco/:id)
  router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // delete the chocolate
   Choc.findByIdAndRemove(id, (err, choc) => {
        // redirect user back to index page
        res.redirect("/choco")
    })
  })
  
  
  
  // Update Route, (PUT => /choco/:id)
  router.put("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    
    // update the chocolate
    Choc.findByIdAndUpdate(id, req.body, {new: true}, (err, choc) => {
        // redirect user back to main page when chocolate updates 
        res.redirect("/choco")
    })
  })
  
  
  
  // Create Route (POST => /choco)
  router.post("/", (req, res) => {
    // add username to req.body to track related user
  req.body.username = req.session.username
  // Create the Chocolate!
    Choc.create(req.body, (err, choc) => {
        // redirect the user back to the main fruits page after fruit created
        res.redirect("/choco")
    })
  })
  
  // Edit  Route
  // (GET => /fruits/:id/edit)
  router.get("/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the chocolate from the database
    Choc.findById(id, (err, choc) => {
        // render template and send it fruit
        res.render("choco/edit.ejs", {choc})
    })
  })
  
  
  // Show route
  router.get("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
  
    // find the particular fruit from the database
    Choc.findById(id, (err, choc) => {
        // render the template with the data from the database
        res.render("choco/show.ejs", {choc})
    })
  })    

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;