console.log("ok");

var express = require("express");
var app = express();



//ROUTES
//=============================

// "/" => "Hi there!"
app.get("/", function(req, res){
    res.send("Hi there!");
})

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    res.send("Goodbye!");
})

// "/dog" => "MEOW!"
app.get("/dog", function(req, res){
    res.send("MEOW!");
    console.log("someone made a request to /dog");  //in the console not in the browser
})

//Route parameters and Patterns
app.get("/r/:subName", function(req, res){
    var subject = req.params.subName;
    res.send("this is a subReddit, with subject = "+subject.toUpperCase());
    
    
    
})
//all the non-defined ROUTES..... 
//this has to be at the end of the application though else all urls will respond to that
app.get("*", function(req, res){
    res.send("Are you lost?");
})

//Tell express to listen for requests (start server)
//app.listen(3000) in another environment
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});  //environment variable PORT, IP of cloud9