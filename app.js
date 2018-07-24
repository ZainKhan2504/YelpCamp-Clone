// Require Packages
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Connect to DB
mongoose.connect("mongodb://localhost/yelp_camp");

// Uses Express Essentials
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// build Schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

// Compile Schema into Model
var Campground = mongoose.model("Campground", campgroundSchema);

// Landing Page
app.get("/", function(req, res){
    res.render("landing");
})

// Campground Page
app.get("/campgrounds", function(req, res){
    // Get all campground from DB
    Campground.find({}, function(err, campgrounds){
       if (err) {
           console.log(err);
       } else {
            res.render("index",{campgrounds: campgrounds});
       } 
    });
})

app.post("/campgrounds", function(req, res){
    // get data from form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description}
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
})

// Show Form campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

// Show the detail of single campground
app.get("/campgrounds/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id, function(err, campground){
       if (err) {
           console.log(err);
       } else {
        // render show template with that campground
        res.render("show", {campground: campground});
       } 
    });
})

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp has Started!")
});