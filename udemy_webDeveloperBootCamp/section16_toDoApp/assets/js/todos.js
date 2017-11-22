//checkoff to-dos by clicking

//$('li').on("click", function(){
$("ul").on("click", "li", function(){  //li is clicked inside a ul
	// $(this).css("color") === "gray" this allways fails cause rgb(128, 128, 128)
	$(this).toggleClass("striked");
})


/*if you have a span inside an li and both have listeners 
the event will "bubble up"  <span> event -> <li> event etc 
we can stop this Bubble : 
pass the (event) in the function and event.stopPropagation();
$(this).parent() function selects the element that the <span> is inside
in order to fade out and then remove an element we use the remove()
function as a callback
*/

  //why isnt this a span in an li ??????
  //probably cause the li is also created dynamically 
$('ul').on("click","span", function(event){
	$(this).parent().fadeOut(800, function(){
		$(this).remove();  //this is the li not the span
	});
	event.stopPropagation();
})

//new to do creation
$('input[type="text"]').keypress(function(event){
	var keyCode = event.which;
	if (keyCode === 13) {
		var todoText = $(this).val();
		$(this).val("");
		//create a new <li> and add to the <ul>
		//this is the case that the new elents "dynamically created" do not have the listeners
		//this is the click() vs on("click", ....)
		//but it needs something more too
		//add listener to the entire ul parent
		$('ul').append("<li><span><i class='fa fa-trash'></i></span> "+todoText+"</li>");
	}
})

$('.fa-plus').click(function(){
	$('input[type="text"]').fadeToggle();
})