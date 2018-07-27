var mongoose = require("mongoose");

// build Schema
var commentSchema = new mongoose.Schema({
    text: String,
    author: String
});

// Compile Schema into Model
module.exports = mongoose.model("Comment", commentSchema);