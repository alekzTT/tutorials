var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

//different routes group
//when we require files we should export something from them
var commentRoutes   = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
    //routes that don't go with some models , could name it auth routes too
var indexRoutes     = require("./routes/index");

    
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
//__dirname is tha name that the app runs
app.use(express.static(__dirname + "/public"));
//method overide for restfull routes
app.use(methodOverride("_method"));
//seedDB(); //seed the Database For now just deletes everything

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


//==================================================================
//pass user variable to all routes
//following middleware will run on every single route and template (view)
app.use(function(req, res, next){
    //whatever we put in res.locals will be available on all templates
    res.locals.currentUser = req.user;
    next();
});
//==================================================================

//use the external route files
//The following technique is to wright sorter Route declarations
//with predefined strings in the app.use() statements
//takes all camground routes and places "/campgrounds" infront of them
//because we have the :id we must use the following
//var router = express.Router({mergeParams:true});  in the comments routes

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);
//for the server
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp app is running!!!");
})