var mongoose              = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// build Schema
var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    avatar: String,
    username: { type: String, unique: true, required: true},
    email: { type: String, unique: true, required: true},
    password: String,
    isAdmin: { type: Boolean, default: false }
});

userSchema.plugin(passportLocalMongoose);

// Compile Schema into Model
module.exports = mongoose.model("User", userSchema);