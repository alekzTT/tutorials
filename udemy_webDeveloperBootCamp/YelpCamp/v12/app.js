var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
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

    
//mongoose.connect("mongodb://localhost/yelp_camp");
//env variables for different DBs e.g production vs devEnv
//$ export DATABASEURL = //localhost
mongoose.connect("mongodb:"+process.env.DATABASEURL+"/yelp_camp");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
//__dirname is tha name that the app runs
app.use(express.static(__dirname + "/public"));
//method overide for restfull routes
app.use(methodOverride("_method"));
//flash package
app.use(flash());

//seedDB(); //seed the Database For now just deletes everything


//PASSPORT CONFIGURATION
//this could also be an env var ? if we'd like to hide the key ?

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
    
    //error and success are not undefined even if not they are empty
    //if([])  empty arrays are "truthy"
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
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


//for the server to run
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp app is running!!!");
    console.log("connected on " + process.env.DATABASEURL);
})