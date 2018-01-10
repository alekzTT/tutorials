var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo", {useMongoClient:true});
mongoose.Promise = global.Promise;  //to avoid warnings

var postSchema = new mongoose.Schema({
    title : String,
    content : String
});

var Post = mongoose.model("Post", postSchema);

var newPost = new Post({
    title : "This is a comment title",
    content : "This is a comment content"
});

// newPost.save(function(err, post){
//     if (err) {
//         console.log("ERROR");
//     } else {
//         console.log(post)
//     }
// });

//USER : email  name
var userSchema = new mongoose.Schema({
    email : String, 
    name : String,
    //embeding data inside the user the name of the scema
    //posts schema has to be declared first
    posts : [postSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
//     email : "hermioni@hogwards.edu", 
//     name : "Hermioni Granger"
// });

// newUser.posts.push({
//     title:"how to brew stuff",
//     content:"Go to the class to find out"
// })


// newUser.save(function(err, user){
//     if (err) {
//         console.log("error")
//     } else {
//         console.log(user);
//     }
// });

User.findOne({name:"Hermioni Granger"}, function(err, foundUser){
    if (err) {
        console.log("ERROR");
    } else {
        foundUser.posts.push({
            title: "3 things i really hate", 
            content: "Voldermort, Voldermort, Voldermort"
        });
        
        foundUser.save(function(err, user){
            if (err) {
                console.log("ERROR");
            } else {
                console.log(user);
            }
        });
    }
});

//POST title Content
