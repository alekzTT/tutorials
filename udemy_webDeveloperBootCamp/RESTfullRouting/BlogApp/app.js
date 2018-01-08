var  bodyParser = require("body-parser"), 
     methodOverride = require("method-override"),
     mongoose = require("mongoose"),
     express = require("express"),
     expressSanitizer = require("express-sanitizer"),
     app = express();

//APP CONFIG
mongoose.connect("mongodb://localhost/restfull_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//=====================

//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
     title : String, 
     image : {type : String, default: "placeholderimage.jpg"},
     body : String, 
     created : {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//      title: "Test Blog", 
//      image: "http://www.gettyimages.com/gi-resources/images/Embed/new/embed2.jpg",
//      body:"This is a test Blog to showcase stuff"
// });

//RESTFULL ROUTES
//"/" conventional for home to go to index route
app.get("/", function(req, res){
     res.redirect("/blogs");
})

//INDEX ROUTE
app.get("/blogs", function(req, res){
     Blog.find({}, function(err, blogs){
          if (err) {
               console.log("there was an ERROR! retrieving data from mongo");
          } else {
               res.render("index", {blogs2 : blogs});  //1st value is the name the data is passed in the view
          }
     })
});

//NEW ROUTE
app.get("/blogs/new", function(req, res){
   res.render("new");  
});

//CREATE ROUTE
app.post("/blogs", function(req, res){
     //create blog 
     req.body.blog.body = req.sanitize(req.body.blog.body);
     Blog.create(req.body.blog, function(err, newBlog){
          if (err) {
               res.render("new")
          } else {
               //redirect
               res.redirect("/blogs");
          }
     })
});


//SHOW ROUTE
app.get("/blogs/:id", function(req, res){
     Blog.findById(req.params.id, function(err, foundBlog){
          if (err) {
               res.redirect("/blogs");
          } else {
               res.render("show", {blog : foundBlog});
               
          }
     })
})


//EDIT ROUTE 
app.get("/blogs/:id/edit", function(req, res ){
     Blog.findById(req.params.id, function(err, foundBlog){
          if (err) {     
               res.render("edit");
          } else {
               res.render("edit", {blog : foundBlog});
          }
     })
});


//UPDATE ROUTE we need to use PUT request for restFull Routing 
app.put("/blogs/:id", function(req, res){
     //replace the input in the Database
     req.body.blog.body = req.sanitize(req.body.blog.body);
     Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
          if (err) {
               res.send("an error in update happened"); 
          } else {
               res.redirect("/blogs/"+req.params.id);
          }
     });
});

//DELETE ROUTE another different HTTP request for RESTfull routing
app.delete("/blogs/:id", function(req, res){
          //res.send("DESTROY ROUTE");
     Blog.findByIdAndRemove(req.params.id, function(err){
           if (err) {
                res.send("ERROR in DELETING"); 
           } else {
                res.redirect("/blogs");
           }
     });
});







app.listen(process.env.PORT, process.env.IP, function(){
     console.log("Blog app is running");
});