console.log("files connected");


var number  = 7;


do{
	var guess = Number(prompt("guess a number"));
	//check for number bellow
	console.log(typeof(guess)+" is "+guess);
	if (guess < number ) {
		alert("too low");
	} else if (guess > number) {
		alert("too high")
	} else if (guess === number) {
		//here if it was like (guess === number)
		//it would be allways false cause of : 
		//prompt returns values as strings and not as numbers
		//thats why you use the "Number()" function to convert input in number
		alert("correct guess");
	} else if (guess == NaN) {
		//this comparison does not play .... 
		// with '==' or '===' 
		alert("Not a number you damm ass");

	}
	console.log(Number(guess));
}while (guess !== number);

