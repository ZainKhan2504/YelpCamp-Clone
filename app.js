// Require Packages
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// Get Seed file
var seedDB = require("./seed");
// Get Schema
var Campground = require("./models/campground");
var Comment = require("./models/comment");

// Connect to DB
mongoose.connect("mongodb://localhost/yelp_camp");

// Uses Express Essentials
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +"/public"));

seedDB();

// Landing Page
app.get("/", function(req, res){
    res.render("landing");
});

// Campground Page
app.get("/campgrounds", function(req, res){
    // Get all campground from DB
    Campground.find({}, function(err, campgrounds){
       if (err) {
           console.log(err);
       } else {
            res.render("campgrounds/index",{campgrounds: campgrounds});
       } 
    });
});

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
});

// Show Form campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

// Show the detail of single campground
app.get("/campgrounds/:id", function(req, res){
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

// =================
// Comments Route
// =================

// show comment form
app.get("/campgrounds/:id/comments/new", function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
       if (err) {
           console.log(err);
       } else {
            res.render("comments/new", {campground: campground});
       } 
    });
});

// Submit Comment form
app.post("/campgrounds/:id/comments", function(req, res){
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
       if (err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           // create new comment
           Comment.create(req.body.comment, function(err, comment){
              if (err) {
                  console.log(err);
              } 
              else{
                  // connect new comment to campground
                  campground.comments.push(comment);
                  campground.save();
                  // redirect campground show page
                  res.redirect("/campgrounds/" + campground._id);
              }
           });
       } 
    });
});

// Connect to Server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp has Started!");
});