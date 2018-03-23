var express = require("express");
//allows to break our routes in modular chanks
var router = express.Router();
var helpers = require("../helpers/todos");

//RESTfull Routes
//Promise syntax
//list all

router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodo);

router.route('/:todoid')
    .get(helpers.showTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo);

//retrieve a todo  :todoid  "path variable"
//router.get("/:todoid");

//update a todo
//responds by default with old data , {new:true} sends the updated version
//router.put("/:todoid");

//delete a todo
//router.delete("/:todoid");

module.exports = router;

