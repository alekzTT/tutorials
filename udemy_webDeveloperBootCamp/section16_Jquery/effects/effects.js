$('.toggleB').on('click', function(){
	$('.toggle').fadeToggle(3000);
})

$('.fadeOut').on('click', function(){
	$('.fo').fadeOut(5000, function(){ //time in ms
		console.log("task completed"); //3 alerts cause of three divs
		$(this).remove();
	}); 

});

$('.slideB').on('click', function(){
	$('.slide').slideToggle(2000);
});


