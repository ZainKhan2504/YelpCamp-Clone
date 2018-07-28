var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campground");

// Show All Campgrounds
router.get("/", function(req, res){
    // Get all campground from DB
    Campground.find({}, function(err, campgrounds){
       if (err) {
           console.log(err);
       } else {
            res.render("campgrounds/index",{campgrounds: campgrounds});
       } 
    });
});

// Create new campground
router.post("/", isLoggedIn, function(req, res){
    // get data from form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: description, author: author}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, created){
       if(err){
           console.log(err);
       } 
       else{
        // redirect to campground page
        res.redirect("/campgrounds");
       }
    });
});

// Show Form campground
router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// Show the detail of single campground
router.get("/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
       if (err) {
           console.log(err);
       } else {
           console.log(campground);
        // render show template with that campground
        res.render("campgrounds/show", {campground: campground});
       } 
    });
});

// Middleware function
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

module.exports = router;