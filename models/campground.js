var mongoose = require("mongoose")

// build Schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// Compile Schema into Model
module.exports = mongoose.model("Campground", campgroundSchema);