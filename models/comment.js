var mongoose = require("mongoose");

// build Schema
var commentSchema = new mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

// Compile Schema into Model
module.exports = mongoose.model("Comment", commentSchema);