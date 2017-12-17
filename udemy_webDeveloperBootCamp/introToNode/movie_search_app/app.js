var express = require ("express");
var app = express();
app.set ("view engine", "ejs");

var request = require("request");

//home route 
app.get("/", function(req, res){
    res.render("home");
})

//OMDB api
app.get("/results", function(req, res) {
    var searchstring = req.query.search
    var url = 'https://omdbapi.com/?s='+searchstring+'&apikey=thewdb';
    request(url, function(error, response, body){
       if (!error && response.statusCode == 200) {
           var data = JSON.parse(body);
           //res.send(results.Search[0].Title);
           res.render("results", {data : data, searchstring : searchstring});
       }
        
    });
});


//default route

app.get("*", function(req, res) {
    res.send("Are you lost ????")
});

//ENDOF ROUTES

//SERVER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie search app has started");
});