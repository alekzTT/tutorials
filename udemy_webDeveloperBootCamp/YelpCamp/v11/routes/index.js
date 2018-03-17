var express = require("express");
var router  = express.Router();
var User    = require("../models/user");
var passport= require("passport");

//root route
router.get("/", function(req, res){
    //res.send("this will be the landing page, soon!")
    res.render("landing");
});

//=====AUTH ROUTES======
//REGISTER FORM ROUTE
router.get("/register", function(req, res){
    res.render("register");
});

//NEW REGISTRATION ROUTE
router.post("/register", function(req, res){
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

//LOGIN FORM ROUTE
router.get("/login",function(req, res){
   // res.render("login", {message: "standard error"});
   res.render("login", {message: req.flash("loginError")});
});


//Syntax ("/login", middleware, callback)
//LOGIN VALIDATION ROUTE
router.post("/login",passport.authenticate("local",
    {
    successRedirect: "/campgrounds",
    failureRedirect:"/login" 
    }), function(req, res){
    //we leave the empty callBack in order to be visible that there is a middleware    
    //res.send("Login On Logic");
});

//LOGOUT ROUTE
router.get("/logout",
    function(req, res){
        req.logout();
        res.redirect("/campgrounds");
});

//EVERYTHING ELSE ROUTE
router.get("*", function(req, res){
    res.send("are you lost???<br/><a href='/'>take me home</a>");
});


module.exports = router;