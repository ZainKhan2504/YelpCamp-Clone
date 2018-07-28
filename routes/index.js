var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");

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
    var newUser = new User({username: req.body.username}); 
   User.register(newUser, req.body.password, function(err, user){
      if (err) {
          console.log(err);
          return res.render("register");
      } else {
          passport.authenticate("local")(req, res, function(){
             res.redirect("/campgrounds"); 
          });
      } 
   });
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
   res.redirect("/campgrounds");
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