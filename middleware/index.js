var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

// Check if Authenticate person and own campground as well
middlewareObj.checkCampgroundOwnership = function(req, res, next){
    // is user logged in?
    if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, campground){
               if (err || !campground) {
                   req.flash("error", "Campgrounds not found");
                   res.redirect("back");
               } else {
                   // does user own the campground?
                   if(campground.author.id.equals(req.user._id) || req.user.isAdmin){
                       next();
                   } else{
                       // otherwise, redirect
                       req.flash("error", "You don't have permission to do that!");
                       res.redirect("back");
                   }
               } 
            });
        }
        else{
            // if not, redirect
            req.flash("error", "You need to be logged in to do that!");
            res.redirect("back");
        }
}

// Check if Authenticate person and own comment as well
middlewareObj.checkCommentOwnership = function(req, res, next){
    // is user logged in?
    if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, comment){
               if (err || !comment) {
                   req.flash("error", "Comments not found");
                   res.redirect("back");
               } else {
                   // does user own the comment?
                   if(comment.author.id.equals(req.user._id) || req.user.isAdmin){
                       next();
                   } else{
                       // otherwise, redirect
                       req.flash("error", "You don't have permission to do that!");
                       res.redirect("back");
                   }
               } 
            });
        }
        else{
            // if not, redirect
            req.flash("error", "You need to be logged in to do that!");
            res.redirect("back");
        }
}

// check the user is login or not
middlewareObj.isLoggedIn = function (req, res, next){
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;