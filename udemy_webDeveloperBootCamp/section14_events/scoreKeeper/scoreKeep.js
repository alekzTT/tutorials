//alert("ok");
//multiple implementations are kept in purpose for example reasons

// so we got our html objects

var p1 = document.getElementById("p1");
var p2 = document.getElementById("p2");
var p1Display=document.getElementById("p1Display");
var p2Display=document.getElementById("p2Display");
var reset = document.querySelector("#reset");
var winScore = document.querySelector("p span"); // this is the first span in a paragraph
var limit = document.querySelector("input");

//our variables 

var gameOver = false;
var p1Score = 0;
var p2Score = 0;

//difference between "change" and "input" events
//"change" event takes place when the cursor clicks out of the field
//while "input" event responds to each change 



//All the event listeners

limit.addEventListener("input", function() {
	//console.log("input has been clicked");
	winScore.textContent = this.value;
	//here we want to reset the score
	//if the score changes in the middle of the game
	//so we want to refactor the reset function
	resetfunc();
})

//this function is refactored for each player
//logic is the same as p2.listener
p1.addEventListener("click", function(){
	p1Score = updateScore(p1Score, p1Display);
});


p2.addEventListener("click", function(){
	if (!gameOver) {
		p2Score++;
		//score === limit.value is never true
		//parseInt(limit.value) can change the string to number
		//Number(limit.value)  does the same
		if (p2Score === Number(limit.value)) {
			gameOver = true;
			//p2Display.style.color = "green";
			//if more stuff shough should happen :: 
			p2Display.classList.add("winner");
		}
	p2Display.textContent = p2Score;
	}
});

reset.addEventListener("click", resetfunc);


//And all the functions

// -- it only calls for the fist time :: why ?
//--> because it cannot affect variable p1Score or p2Score 
//score++; does not update p1Score that's why we return the value
function updateScore(score, display) {
	if (score < limit.value && gameOver === false) {
		score++;
		display.textContent = score;
		if (score === parseInt(limit.value)) {
			display.style.color = "green";
			gameOver = true;
			
		}	
	}
	return score;
}

function resetfunc() {
	p1Score = 0; 
	p2Score = 0;
	p1Display.textContent = p1Score;
	p2Display.textContent = p2Score;
	p1Display.style.color = "";
	p2Display.classList.remove("winner");
	gameOver = false;
}