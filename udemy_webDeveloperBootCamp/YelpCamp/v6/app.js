// var express = require("express");
// var app = express();
// var bodyParser = require("body-parser");
// var mongoose = require("mongoose");

//alternatively
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

    
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
//__dirname is tha name that the app runs
app.use(express.static(__dirname + "/public"));

seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"123456", 
    resave: false, 
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//pass user variable to all routes
//following middleware will run on every single route
app.use(function(req, res, next){
    //whatever we put in res.locals will be available on all our templates
    res.locals.currentUser = req.user;
    next();
});
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



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
    res.render("campgrounds/new");
});

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
//notice that the muddleware is called without semicolon
app.get("/campgrounds/:id/comments/new",isLogedIn, function(req, res){
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
app.post("/campgrounds/:id/comments",isLogedIn, function(req, res){
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
                    console.log("yolo");
                    foundCampground.comments.push(newComment._id);
                    //this also playz
                    //foundCampground.comments.push(newComment);
                    foundCampground.save();
                    res.redirect("/campgrounds/"+foundCampground._id);  
                } 
            });
        }
    });
});

//=======================
//=====AUTH ROUTES=======
//=======================

//show register form
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    //res.send("Signinp Up"+req.body.username+" user");
    var newUser = new User({username:req.body.username});
    //we only give the username and the register function stores the hash of the password
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            //password local mongoose prevents user to signup if username allready in db
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            console.log("user Registered");
            res.redirect("/campgrounds");
        });
    });
});

//Show login FORM
app.get("/login",function(req, res){
    res.render("login");
});


//app.post ("/login", middleware, callback)
app.post("/login",passport.authenticate("local",
    {
    successRedirect: "/campgrounds",
    failureRedirect:"/login" 
    }), function(req, res){
    //we leave the empty callBack in order to be visible that there is a middleware    
    //res.send("Login On Logic");
});

app.get("/logout",
    
    function(req, res){
        req.logout();
        res.redirect("/campgrounds");
});

app.get("*", function(req, res){
    res.send("are you lost???<br/><a href='/'>take me home</a>");
});


//is logedIn middleware
function isLogedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}


//for the server
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp app is running!!!");
})