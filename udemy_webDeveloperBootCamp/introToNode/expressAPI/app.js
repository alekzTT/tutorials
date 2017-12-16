var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

//ROUTES
app.get("/", function(req, res){
    res.render("home"); 
});

app.get("/search", function(req, res){
    
});

app.get("/results", function(req, res){
    //res.send("ok");
    var reqStr = "http://www.omdbapi.com/?s=%27harry%20potter%20part%27&apiKey=thewdb&tomatoes=true&plot=full";
    request(reqStr, function(error, response, body){
        if (!error && response.statusCode == 200) {
            
            body = JSON.parse(body);
           
            res.send(body.Search[0].Title);
        }
    })
    
    
})



//SERVER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App has started");
});