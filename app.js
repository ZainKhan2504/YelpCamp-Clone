var express = require("express");
var app = express();
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
            {name: "Salmon Creek", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?cs=srgb&dl=adventure-camp-camping-699558.jpg&fm=jpg"},
            {name: "Granite Hill", image: "https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?cs=srgb&dl=adventure-camp-clouds-939723.jpg&fm=jpg"},
            {name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?cs=srgb&dl=camp-camping-dark-45241.jpg&fm=jpg"},
            {name: "Salmon Creek", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?cs=srgb&dl=adventure-camp-camping-699558.jpg&fm=jpg"},
            {name: "Granite Hill", image: "https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?cs=srgb&dl=adventure-camp-clouds-939723.jpg&fm=jpg"},
            {name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?cs=srgb&dl=camp-camping-dark-45241.jpg&fm=jpg"},
            {name: "Salmon Creek", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?cs=srgb&dl=adventure-camp-camping-699558.jpg&fm=jpg"},
            {name: "Granite Hill", image: "https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?cs=srgb&dl=adventure-camp-clouds-939723.jpg&fm=jpg"},
            {name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?cs=srgb&dl=camp-camping-dark-45241.jpg&fm=jpg"},
            {name: "Salmon Creek", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?cs=srgb&dl=adventure-camp-camping-699558.jpg&fm=jpg"},
            {name: "Granite Hill", image: "https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?cs=srgb&dl=adventure-camp-clouds-939723.jpg&fm=jpg"},
            {name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?cs=srgb&dl=camp-camping-dark-45241.jpg&fm=jpg"},
            {name: "Salmon Creek", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?cs=srgb&dl=adventure-camp-camping-699558.jpg&fm=jpg"},
            {name: "Granite Hill", image: "https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?cs=srgb&dl=adventure-camp-clouds-939723.jpg&fm=jpg"},
            {name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?cs=srgb&dl=camp-camping-dark-45241.jpg&fm=jpg"}
        ];

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    res.render("campgrounds",{campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    // redirect to campground page
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp has Started!")
});