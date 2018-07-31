var mongoose              = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// build Schema
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: { type: Boolean, default: false }
});

userSchema.plugin(passportLocalMongoose);

// Compile Schema into Model
module.exports = mongoose.model("User", userSchema);