var mongoose              = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// build Schema
var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

// Compile Schema into Model
module.exports = mongoose.model("User", userSchema);