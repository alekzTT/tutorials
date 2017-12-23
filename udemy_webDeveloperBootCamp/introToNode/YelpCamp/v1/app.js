var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


var campgrounds = [
        {  name : "Salmon Creek", image : "http://visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg"},
        {  name : "Fam Camp", image : "http://www.asiliaafrica.com/wp-content/uploads/2016/08/Nomadic-Camp-guest-tent-new.jpg"},
        {  name : "Lonely Camp", image : "https://www.autostraddle.com/wp-content/uploads/2012/03/camp-tent.jpg"},
        {  name : "Crazy Camp", image : "http://explorersgroup.in/web/wp-content/uploads/2014/03/Rajmachi-Kids-Camp-560x300.jpg"},
        {  name : "Short Creek", image : "http://visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg"},
        {  name : "Pixel Camp", image : "http://www.asiliaafrica.com/wp-content/uploads/2016/08/Nomadic-Camp-guest-tent-new.jpg"},
        {  name : "Fish Camp", image : "https://www.autostraddle.com/wp-content/uploads/2012/03/camp-tent.jpg"},
        {  name : "Doily Camp", image : "http://explorersgroup.in/web/wp-content/uploads/2014/03/Rajmachi-Kids-Camp-560x300.jpg"}
    ];
    
//ROUTES
app.get("/", function(req, res){
    //res.send("this will be the landing page, soon!")
    res.render("landing");
});

//TWO different routes but in the same location
//REST convention when showing "friends" the route to add a friend is "friends"
//seven different routes that are RESTfull
app.get("/campgrounds", function(req, res){
    
    
    res.render("campgrounds", {campgrounds : campgrounds});
});

app.post("/campgrounds",function(req, res){
    //get data //add to array //redirect to campgrounds page
    var name = req.body.name;
    var img = req.body.image;
    var newCampground = {name : name, image : img};
    campgrounds.push(newCampground);
    //redirect to campground page
    //typical for a post ROUTE to redirect to another ROUTE
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new" , function(req, res){
    res.render("new")
})

app.get("*", function(req, res){
    res.send("are you lost???<br/><a href='/'>take me home</a>");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp app is running!!!")
});