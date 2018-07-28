// Require Packages
var express       = require("express");
var app           = express();
var bodyParser    = require("body-parser");
var mongoose      = require("mongoose");
var passport      = require("passport");
var localStrategy = require("passport-local");

// Get User Schema
var User     = require("./models/user");


// Get Seed file
var seedDB = require("./seed");

// Get route files
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes    = require("./routes/comments");
var indexRoutes      = require("./routes/index");

// Connect to DB
mongoose.connect("mongodb://localhost/yelp_camp");

// App Configuration
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +"/public"));

// seedDB(); // seed the DB

// Passport Configuration
app.use(require("express-session")({
    secret: "Hello This is Auth",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Dynamic Links
app.use(function(req, res, next){
   res.locals.user = req.user;
   next();
});

// Using Routes
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// =================
// Connect to Server
// =================
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp has Started!");
});