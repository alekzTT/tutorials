var express = require("express"), 
    app = express(), 
    port = process.env.PORT || 3000, 
    bodyParser = require('body-parser');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

    
var todoRoutes = require('./routes/todos');    
app.use('/api/todos', todoRoutes);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

//body-parser package to access the PUT or POST request of the BODY


//app.use("view engine", "ejs");

app.get("/", function(req, res){
    res.send("index.html");
});



//server start
app.listen(port, function() {
    console.log("App is running on port "+process.env.PORT);
});