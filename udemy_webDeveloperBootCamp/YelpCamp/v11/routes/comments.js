var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//require middleware
//var middleware = require("../middleware/index.js");
var middleware = require("../middleware");


//================================================
//COMMENT ROUTES
//================================================

//NEW ROUTE [form]
//notice that the muddleware is called without semicolon
router.get("/new",middleware.isLogedIn, function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground){
        if (error) { 
            console.log("No camp with such id");
        } else {
            console.log(foundCampground);
            res.render("comments/new", {campground : foundCampground});
        }
    });
});

//CREATE ROUTE
//add middleware here to prevent post requests that can add a comment like from POSTMAN 
router.post("/",middleware.isLogedIn, function(req, res){
    //we have to know the Campground here
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log("Error finding Campground");
            res.redirect("/campgrounds");
        } else {
            console.log("=========="+foundCampground+"=================");
        
            //create new comment
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //if in form element name="author", name = "text", etc
            // var author = req.body.comment.author;
            // var text = req.body.comment.text;
            // var newComment = {author : author, text : text};
            //check the FORM with the names in order to have a comment object in the req.body
            //name = "comment[author]", name="comment[name]"
            
            Comment.create(req.body.comment, function(err, newComment){
                if (err) {
                    console.log("Error creating new comment");
                } else { 
                    //associate new Comment to Campgroun with a User
                    //there is a user as of the middleware
                    //console.log("New Comments username" + req.user.username);
                    newComment.author.id = req.user.id;
                    newComment.author.username = req.user.username;
                    //==========================================
                    //add username and ID to comment
                    //save comment
                    newComment.save();
                    //==========================================
            //foundCampground.comments.push(newComment); //this also playz
                    console.log(newComment);
                    foundCampground.comments.push(newComment._id);
                    foundCampground.save();
                    res.redirect("/campgrounds/"+foundCampground._id);  
                } 
            });
        }
    });
});

//campgrounds/:id/edit
//campgrounds/:id/comments/:comment_id/edit
router.get("/:comment_id/edit",middleware.checkCommentOwner, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "this is not a valid campground");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                //console.log("no comment found for campground");
                req.flash("error", "oups!!! Something went wrong");
            } else {
                res.render("comments/edit",{campground_id:req.params.id, comment:foundComment});
            }
        });
    });   
});

//comment update 
//campgrounds/:id/comments/:comment_id
router.put("/:comment_id",middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err) {
            req.flash("error", "oups!!! Something went wrong");
            res.redirect("back");
        } else {
            req.flash("success", "comment updated !!!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:comment_id",middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, deletedComment){
        if (err) {
            console.log("error deleting a comment"+ req.params.comment_id);
        } else {
            //console.log("deleted comment " + req.params.comment_id);
            req.flash("success", "comment deleted");
            res.redirect("back");
        }
    });  

});

module.exports = router;