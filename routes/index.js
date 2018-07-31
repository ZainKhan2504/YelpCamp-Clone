var express        = require("express");
var router         = express.Router();
var passport       = require("passport");
var User           = require("../models/user");
var Campground     = require("../models/campground");


// Landing Page
router.get("/", function(req, res){
    res.render("landing");
});

// ==========
// Auth Route
// ==========

// Register route

// Show Register Form
router.get("/register", function(req, res){
    res.render("register");
});

// Handle Registration Form
router.post("/register", function(req, res){
    var newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            avatar: req.body.avatar,
            username: req.body.username,
            email: req.body.email
        });
    if (req.body.adminCode === "Admin") {
        newUser.isAdmin = true;
    }
    else {
        User.register(newUser, req.body.password, function(err, user){
          if (err) {
              req.flash("error", err.message);
              return res.render("register");
          } else {
              passport.authenticate("local")(req, res, function(){
                  req.flash("success", "Welcome to YelpCamp "+ user.username);
                  res.redirect("/campgrounds"); 
              });
          } 
        });
    }
});

// Login route

// Show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

// Handle User Login
router.post("/login",passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res){
});

// Logout route
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/campgrounds");
});

// User Profile
router.get("/users/:id", function(req, res) {
    User.findById(req.params.id, function(err, user){
       if (err) {
           req.flash("error", "Something went wrong");
           res.redirect("/campgrounds");
       } else {
           Campground.find().where("author.id").equals(user._id).exec(function(err, campground){
               if (err) {
                   req.flash("error", "Something went wrong");
                   res.redirect("/campgrounds");
               }
               res.render("users/show", {user: user, campground: campground});
           });
       } 
    });
});

module.exports = router;