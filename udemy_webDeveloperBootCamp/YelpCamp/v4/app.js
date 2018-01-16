// var express = require("express");
// var app = express();
// var bodyParser = require("body-parser");
// var mongoose = require("mongoose");

//alternatively
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");

    
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

seedDB();
    
//ROUTES
app.get("/", function(req, res){
    //res.send("this will be the landing page, soon!")
    res.render("landing");
});

//TWO different routes but in the same location
//REST convention when showing "friends" the route to add a friend is "friends"
//seven different routes that are RESTfull


//INDEX ROUTE
app.get("/campgrounds", function(req, res){
    //getall Campgrounds from DB and then render them to the route
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            res.render("campgrounds/index");
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
    
});


//CREATE ROUTE
app.post("/campgrounds",function(req, res){
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
app.get("/campgrounds/new" , function(req, res){
    res.render("campgrounds/new")
})

//SHOW ROUTE - more info about a specific camp
//(has to be under specific Routes in order not to overide them)
app.get("/campgrounds/:id", function (req, res){
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

//================================================
//COMMENT ROUTES
//================================================

//NEW ROUTE [form]
app.get("/campgrounds/:id/comments/new", function(req, res){
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
app.post("/campgrounds/:id/comments", function(req, res){
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
                    //associate new Comment to Campgroun
                    // foundCampground.comments.push(newComment._id);
                    foundCampground.comments.push(newComment);
                    foundCampground.save();
                    res.redirect("/campgrounds/"+foundCampground._id)   
                } 
            });
        }
    });
    
    
    
    
    
    
    
});



app.get("*", function(req, res){
    res.send("are you lost???<br/><a href='/'>take me home</a>");
});


//for the server
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp app is running!!!")
});