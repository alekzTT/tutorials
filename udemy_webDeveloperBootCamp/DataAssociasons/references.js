var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo_2", {useMongoClient:true});
mongoose.Promise = global.Promise;  //to avoid warnings

var Post = require("./models/post");
var User = require("./models/user");

console.log("no errors");


// User.create({
//     email : "bob@gmail.com", 
//     name : "Bob Belcher"
// });

Post.create({
    title : "Cook burgers part 4",
    content : "mpla mpla"
},function(err, post){
    User.findOne({email: "bob@gmail.com"}, function (err, foundUser){
        if (err) {
            console.log("ERROR");
        } else {
            foundUser.posts.push(post);
            foundUser.save(function(err,savedUser){
                console.log(savedUser);
            })
        }
    });
});

//5a53ec8342446213eab7d86c

//found user and find all posts for that user
User.findOne({email:"bob@gmail.com"}).populate("posts").exec(function(err, user){
    if (err) {
        console.log("ERROR");
    } else {
        console.log(user);
    }
});





