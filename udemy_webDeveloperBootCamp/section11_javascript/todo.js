
var todos=["cleanup", "read", "take a walk", "cook", "dishes"];

var input = prompt("tell me what you'd like to do");

while (input !== "quit")
{
	if (input === "list") { 
		listToDos();
	} else if (input === "new") {
		newToDo();
	} else if (input === "delete") {
		delToDo();
	}
input = prompt("What you'd like to do");	
}

console.log("Thank you for using this app");

//functions 
//notice that these functions have no passed arguments
//todos array is visible to all without passing it !!!!!!!!!!!!!

function listToDos() {
	//console.log(todos); 
	console.log("************************");
	//forEach() function
	todos.forEach(function(todo, i){
		console.log(i + " : " + todo);
		})
	console.log("************************");
}

function newToDo() {
	var newTask = prompt("add task :");
		todos.push(newTask);
		//console.log(todos);
}

function delToDo() {
	var index = prompt("the index of todo to delete");
	//splice
	//remove an item from the array
	//the item/items  that is removed is returned from splice
	//firts argument is the starting point, second is the ammount
	var item = todos.splice(index, 1);
	console.log("the todo \""+item+"\"  has been deleted from list");
}