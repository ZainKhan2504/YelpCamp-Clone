var express    = require("express");
var router     = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment    = require("../models/comment");

// show comment form
router.get("/new", isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
       if (err) {
           console.log(err);
       } else {
            res.render("comments/new", {campground: campground});
       } 
    });
});

// Submit Comment form
router.post("/", isLoggedIn, function(req, res){
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
       if (err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           // create new comment
           Comment.create(req.body.comment, function(err, comment){
              if (err) {
                  console.log(err);
              } 
              else{
                  // add username and id to comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  // Save comment
                  comment.save();
                  // connect new comment to campground
                  campground.comments.push(comment);
                  campground.save();
                  // redirect campground show page
                  res.redirect("/campgrounds/" + campground._id);
              }
           });
       } 
    });
});

// EDIT the Comment
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment){
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {comment: comment, campground_id: req.params.id});
        }
    });
});

// UPDATE the comment
router.put("/:comment_id", checkCommentOwnership, function(req, res){
    // find and update correct comment
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
       if (err) {
           res.redirect("back");
       } else {
           // redirect show page
           res.redirect("/campgrounds/" + req.params.id);
       } 
    });
});

// DELETE the campground
router.delete("/:comment_id", checkCommentOwnership, function(req, res) {
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if (err) {
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id);
      } 
   });
});

// Middleware function
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

// Check if Authenticate person and own comment as well
function checkCommentOwnership(req, res, next){
    // is user logged in?
    if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, comment){
               if (err) {
                   res.redirect("back");
               } else {
                   // does user own the comment?
                   if(comment.author.id.equals(req.user._id)){
                       next();
                   } else{
                       // otherwise, redirect
                       res.redirect("back");
                   }
               } 
            });
        }
        else{
            // if not, redirect
            res.redirect("back");
        }
}

module.exports = router;