//Express Router
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
//TWO different routes but in the same location
//REST convention when showing "friends" the route to add a friend is "friends"
//seven different routes that are RESTfull


//INDEX ROUTE
router.get("/", function(req, res){
    //get loged in user info 
    //console.log(req.user);
    //getall Campgrounds from DB and then render them to the route
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            res.render("campgrounds/index");
        } else {
            //whatever variable we pass to our templates we have access also in partials (header/footer etc)
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
    
});


//CREATE ROUTE
router.post("/",isLogedIn,function(req, res){
    //get data //add to array //redirect to campgrounds page
    //here we have to use the names given in the form
    //console.log(req.user.username);
    var name = req.body.name;
    var img = req.body.image;
    var desc = req.body.description;
    var author = {
        id :req.user.id, 
        username: req.user.username
    };
    var newCampground = {name : name, image : img, description : desc,author : author };
    //if this object is different from the Schema ?
    //it sure passes in DB
    
    //var newCampground = {name : name, image2 : img, location:"Athens"};
    //in case this is the object that passes, the only thing that will pass is the name  
    
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) { 
            console.log("ERROR"); 
        } else {
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    }); 
});

//NEW - ROUTE (shows the form to create)
router.get("/new" ,isLogedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW ROUTE - more info about a specific camp
//(has to be under specific Routes in order not to overide them)
router.get("/:id", function (req, res){
    //req.params.id is where these are stored
    
    //mongoose function
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground){
        if (error) { 
            console.log("No camp with such id");
        } else {
            //console.log(foundCampground);
            res.render("campgrounds/show", {campground : foundCampground});
        }
    });
    
    //find the camp with the provided id
    
});

//EDIT CAMPGROUND ROUTE =======================
router.get("/:id/edit",checkCampOwner, function (req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            res.redirect("back");
        } else {
        res.render("campgrounds/edit", {campground : foundCampground});
        }
    });

});
//UDATE CAMPGROUND ROUTE
router.put("/:id",checkCampOwner, function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err, updatedCampground){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            //also correct ("/campgrounds/"+updatedCampground.id)
            res.redirect("/campgrounds/"+req.params.id);
        }
    } );
    //redirect to show page
});


//DESTROY CAMPGROUND ROUTE
router.delete("/:id",checkCampOwner, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, deletedCampground){
        if(err) {
            console.log("Error in Deleting Campground ");
            res.redirect("/campgrounds/"+req.params.id);
        } else {
            console.log("Deleting " + deletedCampground.name);
            res.redirect("/campgrounds");
        }
    });
});




//is logedIn middleware
function isLogedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

function checkCampOwner(req, res, next) {
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
    
}

module.exports = router;