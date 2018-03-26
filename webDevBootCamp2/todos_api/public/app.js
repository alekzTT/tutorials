/* global $ */
$(document).ready(function(){
    //Show ToDo's
    $.getJSON("/api/todos")
    .then(showToDos);
    
    //enter listener 
    $('#todoInput').keypress(function(event){
        //console.log(event.which);
        if(event.which === 13){
            createTodo();
        }
    });
    
    //X delete button listener
    //event delegation issue on something that loads afterwards
    //so $('li') wont work but ul is still there
    //listeners have to apply to dynamically generated code
    $('ul').on('click', 'span', function(e){
        //in order not to buble up (inherit) the event from the li
        e.stopPropagation();
        removeTodo($(this).parent());
    });
    
    $('ul').on('click', 'li', function(){
        //console.log($(this).data('completed'));
        updateTodo($(this));
        
    });

});

function showToDos(todos) {
    todos.forEach(function(todo){
    addTodo(todo);
    });
}
 
function createTodo(){
    //send a post request to /api/todo
    var usrInput = $('#todoInput').val();
    //console.log(usrInput);
    
    $.post('/api/todos', {name: usrInput})
    .then(function(newToDo){
        console.log(newToDo);
        addTodo(newToDo);
        $('#todoInput').val('');
    })
    .catch(function(err){
        console.log(err.message);
    });
    
    //promise vs callback
}    

function addTodo(todo){
    var newToDo = $('<li class=\"task\">'+todo.name+'<span>X</span></li>');
    newToDo.data('id', todo._id);
    newToDo.data('completed', todo.completed);
    //console.log(newToDo.data());
    if (todo.completed){
        newToDo.addClass("done");
    }
    $('.list').append(newToDo);
}

function removeTodo (todo) {
    //console.log($(this).parent().data('id'));
        var clickedId = todo.data('id');
        todo.remove();
        $.ajax({
            method:'DELETE',
            url: '/api/todos/'+clickedId
        })
        .then(function(data){
            console.log(data);
        })
        .catch(function(err){
            console.log(err);
        });
}

function updateTodo(todo) {
    console.log(todo.data());
    var clickedId = todo.data('id');
    var isDone = !todo.data('completed');
    //flip the status
    var updateData = {completed:isDone};
    $.ajax({
            method:'PUT',
            url: '/api/todos/'+clickedId,
            data: updateData
                
        })
        .then(function(updatedToDo){
            console.log(updatedToDo);
            todo.toggleClass('done');
            todo.data('completed',isDone);
        })
        .catch(function(err){
            console.log(err);
        });
}