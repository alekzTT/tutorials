var db = require('../models');

var exports = {};

exports.getTodos = function (req, res) {
    //res.send("Hello from todos routes");
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.createTodo = function (req, res) {
    //res.send("this is the post route");
    // console.log(req.body);
    // res.send(req.body);
    db.Todo.create(req.body)
    .then(function(newTodo){
        //we send back the newly created object ... api purposes
        //http status 201 == "created"
        res.status(201).json(newTodo);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.showTodo = function (req, res) {
    db.Todo.findById(req.params.todoid)
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.updateTodo = function (req, res) {
    db.Todo.findOneAndUpdate({_id: req.params.todoid}, req.body, {new:true})
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.deleteTodo = function (req, res) {
    db.Todo.findByIdAndRemove(req.params.todoid)
    .then(function(todo){
        res.json({message:"we deleted it"});
    })
    .catch(function(err){
        res.send(err);
    }); 
};



module.exports = exports;