var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var friends = ["Tony", "Pony", "Lony"];
//body-parser in order to see request body in server side
//it actually transforms the request into a javascript object
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
//ROUTES
 
app.get("/", function(req, res){
    res.render("home"); 
});

app.post("/addfriend", function(req, res){
    console.log(req.body);    
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.get("/friends", function(req, res){
    res.render("friends", {friends:friends});
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