//all the middleware
var middlewareObj = {};
var Comment = require("../models/comment.js");
var Campground = require("../models/campground.js");

//is logedIn middleware
middlewareObj.isLogedIn = function (req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        //the flash will be accesed on the next request
        req.flash("loginError", "please login first !");
        res.redirect("/login");
    }
};

//Comment Owner
middlewareObj.checkCommentOwner = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err){
                console.log("No comment found to edit");    
                res.redirect("back");
            } else {
                //does user own the campground ?
                if(foundComment.author.id.equals(req.user._id)) {
                    //these two are different so we use the .equals() mongoose method
                    //console.log(foundCampground.author.id);
                    //console.log(req.user._id);
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
       res.redirect("back");
    }
};

//campground Owner
middlewareObj.checkCampOwner = function (req, res, next) {

    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err){
                console.log("No camp found to edit");    
                res.redirect("back");
            } else {
                //does user own the campground ?
                if(foundCampground.author.id.equals(req.user._id)) {
                    //these two are different so we use the .equals() mongoose method
                    //console.log(foundCampground.author.id);
                    //console.log(req.user._id);
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
       res.redirect("back");
    }
};



module.exports = middlewareObj;