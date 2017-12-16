//express writing assignment

var express = require("express");
var app = express();

//ROUTES 
//=================================
app.get("/", function(req, res){
    res.send("Hi there wellcome to the assignment");
})


//repeat paradigm
app.get("/repeat/:phrase/:num", function(req, res){
    var repeat = req.params.num; // we should convert with "Number(repeat); for best practice"
    var phrase = req.params.phrase;
    //for a reason you cannot repeat res.send() function
    //has something to do with the headers and stuff
    var response = "<ul>"; 
    
    
    //should we convert the number to number ???? 
    //works fine even if we do not
    console.log(typeof repeat);
    console.log(typeof isNaN());
    //console.log(typeof parseInt(repeat));
    //repeat=parseInt(repeat);
    
    //the following function returns that it is a number....
    //wtf
    if (isNaN(repeat)) {
        console.log('true: is not a number');
    }else{
        console.log('false: number');
    }
    //repeat phrase number of times
    for (var i =0; i<repeat;i++) {
        response += "<li>"+phrase+"</li>";
    }
    response += "</ul>"
    res.send(response);
});

//Speak function
app.get("/speak/:animal", function(req, res){
    //we parse tha variable in Lower Case in order to be more like "case insensitive"
    var animal = (req.params.animal).toLowerCase();
    var sound = "";
    //that is the common approach until now
    // if (animal === "pig") {
    //     sound = 'Oink';
    // } else if (animal === "cow") {
    //     sound = 'Mououou';
    // } else if (animal === "dog") {
    //     sound = 'Wouf';
    // } 
    
    //this is a dictionary
    var animalSounds = {
        pig: "Oink", 
        cow: "Mouououo", 
        dog: "Wouf",
        cat: "GO AWAY!!!!",
        goldfish: "....."
        
    }

        res.send("<h1>"+animal+" says "+animalSounds[animal] +"</h1>");
});





//default route 
app.get("*", function(req, res){
    res.send("Sry page not found, what are you doing with your life ?");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});