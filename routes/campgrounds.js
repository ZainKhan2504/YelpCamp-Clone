var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

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

// CREATE new campground
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image: image, description: description, author: author}
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

// SHOW Form campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// SHOW the detail of single campground
router.get("/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
       if (err || !campground) {
           req.flash("error", "Campground Not Found");
           res.redirect("back");
       } else {
           console.log(campground);
        // render show template with that campground
        res.render("campgrounds/show", {campground: campground});
       } 
    });
});

// EDIT the campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        res.render("campgrounds/edit", {campground: campground});
    });
});

// UPDATE the campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
       if (err) {
           res.redirect("/campgrounds");
       } else {
           // redirect show page
           res.redirect("/campgrounds/"+req.params.id);
       } 
    });
});

// DELETE the campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
   Campground.findByIdAndRemove(req.params.id, function(err){
      if (err) {
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      } 
   });
});

module.exports = router;