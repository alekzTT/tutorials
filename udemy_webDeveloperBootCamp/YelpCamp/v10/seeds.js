var mongoose = ("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");
var User        = require("./models/user");

var data = [
        {   name : "Great Camp Site",
            image : "https://www.autostraddle.com/wp-content/uploads/2012/03/camp-tent.jpg",
            description : "Bacon ipsum dolor amet ribeye kielbasa brisket kevin buffalo shank. Tail tongue spare ribs cow swine porchetta prosciutto, ground round boudin jerky. Tongue tri-tip pork belly, flank salami prosciutto short loin ham hock cupim turkey cow. Shankle brisket pork chuck. Jerky meatball rump, venison ball tip bresaola pig burgdoggen salami biltong pastrami. Meatloaf rump tongue flank ribeye. Pork chop pork loin ham ground round buffalo sirloin fatback."
        }, 
        {   name : "Camp in the woods",
            image : "http://dismalscanyon.com/campsites/images/sleeping_water_5177_900px.jpg",
            description : "Feeling like camping in the forest. Bacon ipsum dolor amet ribeye kielbasa brisket kevin buffalo shank. Tail tongue spare ribs cow swine porchetta prosciutto, ground round boudin jerky. Tongue tri-tip pork belly, flank salami prosciutto short loin ham hock cupim turkey cow. Shankle brisket pork chuck. Jerky meatball rump, venison ball tip bresaola pig burgdoggen salami biltong pastrami. Meatloaf rump tongue flank ribeye. Pork chop pork loin ham ground round buffalo sirloin fatback."
        },
        {   name : "English Camp",
            image : "http://www.ecocampuk.co.uk/wp-content/uploads/2011/08/Sussex-Campsite-with-Bell-Tents-7.jpeg",
            description : "Camp like an english person. Bacon ipsum dolor amet ribeye kielbasa brisket kevin buffalo shank. Tail tongue spare ribs cow swine porchetta prosciutto, ground round boudin jerky. Tongue tri-tip pork belly, flank salami prosciutto short loin ham hock cupim turkey cow. Shankle brisket pork chuck. Jerky meatball rump, venison ball tip bresaola pig burgdoggen salami biltong pastrami. Meatloaf rump tongue flank ribeye. Pork chop pork loin ham ground round buffalo sirloin fatback."
        }
    ]

function seedDB(){
    Campground.remove({}, function(err){
        if (err) {
            console.log("Seed DB cannot delete campgrounds cause of " + err);
        }
        Comment.remove({}, function(err){
            if (err) {
                console.log("Seed DB cannot delete comments cause of " + err);
            }
        }); User.remove({}, function(err){
            if (err) {
                console.log("Seed DB cannot delete users cause of " + err);
            }
        });
        // if (err) {
        //     console.log("Something went wrong");
        // } else {
        //     console.log("Campgrounds Removed");
        //     Comment.remove(function(err){
        //         if (err) {
        //             console.log("error deleting comments");
        //         } else {
        //             console.log("Comments Removed");
        //             data.forEach(function(seed){ //have to put it in callback cause of the asynchronous call type
        //             //else it might delete the db after the insertion
        //                 Campground.create(seed,function(err, campground){  
        //                 if (err) {
        //                     console.log(err+"Is the ERROR");
        //                 } else {
        //                     //console.log(campground+"\nIs saved in Database");
        //                     console.log("Camp created");
        //                     //create a comment on each campground
        //                     Comment.create({
        //                         text : "This place is great, but no wifi for us to make a living",
        //                         author : "Bob"
        //                     }, function(err, comment){
        //                         if (err) {
        //                             console.log("could not create comment");
        //                         } else {
        //                             //associate it with campground after creating the comment
        //                             campground.comments.push(comment._id);
        //                             campground.save();
        //                             //console.log(comment+" was created");
        //                             console.log("Comment was created");
        //                         }
        //                     });
        //                 }
        //             });
        //             //alternatively we can pass the data array but for now we wont be able
        //             //to add comments and go errorDriven
        //             // Campground.create(data,function(err, campground){  
        //             // if (err) {
        //             //     console.log(err+"Is the ERROR");
        //             // } else {
        //             //     console.log(campground+"\nIs saved in Database");
        //             // }
        //         });
        //         }
                
        //     })
        // }
    });
}
//add a few campgrounds


module.exports = seedDB;