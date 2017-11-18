//section12 lecture 137
// an array of movie objects
var movies = [
	{
		title:"lamps",
		rating: 4,
		seenIt : true, 
		//add methods to objects
		slogan : function (num) {
			for (i=0; i<num; i++) {
				console.log(this.title+": Clariiiiiiis Mpe!")
			}
		}
	},
	{
		title:"lamps2",
		rating: 3,
		seenIt : false,
		slogan : function (num) {
			for (i=0; i<num; i++) {
				console.log(this.title+": Clariiiiiiis Mpe, Again!")
			}
		}
	},
	{
		title:"alien3",
		rating: 4.5,
		seenIt : true,
		slogan : function (num) {
			for (i=0; i<num; i++) {
				console.log(this.title+": i have a stomach ache")
			}
		}
	},
	{
		title: "alien 2 3d",
		rating:	4.2,
		seenIt : false,
		slogan : function (num) {
			for (i=0; i<num; i++) {
				console.log(this.title+": i have a stomach ache allover now")
			}
		}
	}

];

//lets see the array
console.log(movies);
//and the ammount of them
var title = "You have "+ movies.length +" movies stored in your Database Dude ";
console.log(title);

console.log(buildTitleLine(title));


//loop through the array and print the response regurding 
//str is the right aproach
movies.forEach(function(movie){
	console.log(buildString(movie));
	//slogan takes a number as an argument to "speak"
	movie.slogan(1);
})



//if we want to refactor our code we get the logic out of the foreach
//into a single function
function buildString(movie) {
	var str="You have ";
	if (movie.seenIt === true) {
		str += "seen :"
	} else {
		str += "not seen :"
	}
	str += "\"" + movie.title + "\" - " + movie.rating+ " stars";
	return str;
}

//also fot the Title underline the same
function buildTitleLine(title) {
	var line="";
	for (var i = 0; i<title.length; i++) {
		//console.log("=");
		//this wont play cause of console groups same answers BUT ::
		line += "=";
	}
	//;)
	return line;
}