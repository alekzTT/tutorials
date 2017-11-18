var factorial=function(number) {
    var fact = 1;
         for (var i = 1; i <= number; i++) {
             //fact = fact * i;
             fact *= i;
         }
    return fact;
}

function isEven(number) { 
    if (number % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

function kebabTwoSnake(str) {
	//replace all dashes '-' with underscores '_'
	/*for (var i =0; i <str.length; i++) {
		//if (str[i] == '-' ) {
		//	str[i] = '_';
		console.log(str[i]);
		}
	}*/
	return str.replace(/-/g, '_');
} 