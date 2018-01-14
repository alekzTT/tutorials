var mongoose = ("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
        {   name : "Great Camp Site",
            image : "https://www.autostraddle.com/wp-content/uploads/2012/03/camp-tent.jpg",
            description : "The greatest Camp in the world"
        }, 
        {   name : "Camp in the woods",
            image : "http://dismalscanyon.com/campsites/images/sleeping_water_5177_900px.jpg",
            description : "Feeling like camping in the forest"
        },
        {   name : "English Camp",
            image : "http://www.ecocampuk.co.uk/wp-content/uploads/2011/08/Sussex-Campsite-with-Bell-Tents-7.jpeg",
            description : "Camp like an english person"
        }
    ]

function seedDB(){
    Campground.remove({}, function(err){
        if (err) {
            console.log("Something went wrong");
        } else {
            console.log("Campgrounds Removed");
            Comment.remove(function(err){
                if (err) {
                    console.log("error deleting comments");
                } else {
                    console.log("Comments Removed");
                    data.forEach(function(seed){ //have to put it in callback cause of the asynchronous call type
                    //else it might delete the db after the insertion
                        Campground.create(seed,function(err, campground){  
                        if (err) {
                            console.log(err+"Is the ERROR");
                        } else {
                            console.log(campground+"\nIs saved in Database");
                            //create a comment on each campground
                            Comment.create({
                                text : "This place is great, but no wifi for us to make a living",
                                author : "Bob"
                            }, function(err, comment){
                                if (err) {
                                    console.log("could not create comment");
                                } else {
                                    //associate it with campground after creating the comment
                                    campground.comments.push(comment._id);
                                    campground.save();
                                    console.log(comment+" was created");
                                }
                            });
                        }
                    });
                    //alternatively we can pass the data array but for now we wont be able
                    //to add comments and go errorDriven
                    // Campground.create(data,function(err, campground){  
                    // if (err) {
                    //     console.log(err+"Is the ERROR");
                    // } else {
                    //     console.log(campground+"\nIs saved in Database");
                    // }
                });
                }
                
            })
        }
    });
};
//add a few campgrounds


module.exports = seedDB;