var mongoose = require('mongoose');

mongoose.set('debug', true);
//var dbUrl = "mongodb:"+process.env.DATABASEURL+"/todo-api" || "mongodb://localhost/todo-api";
mongoose.connect("mongodb://localhost/todo-api");

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");

