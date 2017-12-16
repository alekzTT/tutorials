var express = require("express");
var path = require('path');

var app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

//ROUTES
//=====================================
//home route
app.get("/", function(req, res) {
    //res.send("<h1>Another Express App</h1>");
    //res.render automatically looks in to the views Directory
    res.render("home");
    
});

//rest of the routes
app.get("/fallinlovewith/:thing", function(req, res){
    //res.render
    var thing = req.params.thing;
    //passes variable thing as thingVar
    res.render("love", { thingVar: thing });
})

//posts Route
app.get("/posts", function(req, res) {
    
    var posts = [
        {title : "post1" , author : "author1"},
        {title : "post2" , author : "author2"},
        {title : "post3" , author : "author3"},
        {title : "post4" , author : "author4"},
        ]
        
    res.render("posts", { posts : posts });
})



//default route
app.get("*", function(req, res) {
    res.send("Are you lost ????")
});


//ENDOF ROUTES

//SERVER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});