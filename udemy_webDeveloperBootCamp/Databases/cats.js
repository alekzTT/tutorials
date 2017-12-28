var mongoose = require("mongoose");
//if it does not exist it will make it
mongoose.connect("mongodb://localhost/cat_app", {useMongoClient:true});

mongoose.Promise = global.Promise;  //to avoid warnings


var catSchema = new mongoose.Schema({
    name : String, 
    age : Number, 
    temperament : String
});

var Cat = mongoose.model("Cat", catSchema);  //collection called cats

//add a new cat to db

// var anyCat = new Cat({
//     name:"MsNorris",
//     age:12, 
//     temperament:"gloomy"
// });

//george is in Javascript cat is what is saved in the database
/*
anyCat.save(function(error, cat){
    if (error) {
        console.log("error in saving george.... george will die....");
    } else {
        console.log("no problem, george is saved");
        console.log(cat);
    }
});
*/

//hint for db.cats.update( {name:"George"}, {name:"replaced"},{multi:true});
//this will return an error errmsg" : "multi update only works with $ operators"

//this is the correct method to call with multi
//db.cats.update({name:"George"},{$set: {status: "replaced"}},{multi:true});

//New ans save all at once  (otherwise 1 - create 2 - save)
Cat.create({
    name:"MeatBall",
    age:6, 
    temperament:"Indeferent"
}, function(err, cat){  //this is our callback in order to know what happened
    if (err) {
        console.log("ERROR");
        console.log(err);
    } else {
        console.log("cat created");
        console.log(cat);
    }
});


//console.log all cats from db

Cat.find({}, function(err, cats){
    if(err){
        console.log("There has been an error");
        console.log(err);
    } else {
        console.log("ALL the Cats");
        console.log(cats);
    }
});