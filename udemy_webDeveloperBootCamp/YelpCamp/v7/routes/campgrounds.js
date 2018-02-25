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
    console.log(req.user);
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
router.post("/",function(req, res){
    //get data //add to array //redirect to campgrounds page
    //here we have to use the names given in the form
    var name = req.body.name;
    var img = req.body.image;
    var desc = req.body.description;
    var newCampground = {name : name, image : img, description : desc};
    //if this object is different from the Schema ?
    //it sure passes in DB
    
    //var newCampground = {name : name, image2 : img, location:"Athens"};
    //in case this is the object that passes, the only thing that will pass is the name  
    
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) { 
            console.log("ERROR"); 
        } else {
            res.redirect("/campgrounds");
        }
    }); 
});

//NEW - ROUTE (shows the form to create)
router.get("/new" , function(req, res){
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
            console.log(foundCampground);
            res.render("campgrounds/show", {campground : foundCampground});
        }
    });
    
    //find the camp with the provided id
    
});

module.exports = router;