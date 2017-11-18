//alert("connected");
var colorsNum = 6;
var colors = [];
var pickedColor;

var h1 = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");


init();

//functions about ten lines max

function init() {
	setupSquares();
	setupModeButtons();
	reset();
}


function setupSquares() {
	for (var i=0; i < squares.length; i++) {
	//add event listeners
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			//alert("clicked"+clickedColor)
			if (clickedColor === pickedColor) { 
				//alert("YES THIS IS THE COLOR");
				messageDisplay.textContent = "Correct !!!";
				resetButton.textContent = "Play Again";
				changeColors(pickedColor);
			} else {
				this.style.backgroundColor = document.querySelector("body").style.backgroundColor;
				//clickedColor = document.querySelector("body").style.backgroundColor;
			}
		})
	}
}


function setupModeButtons() {
	for (var i=0; i<modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
		messageDisplay.textContent = "";
		resetButton.textContent="new Colors";
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");
		this.textContent === "easy" ? colorsNum = 3 : colorsNum = 6;
		//console.log(colorsNum);
		reset();
	})}
}


function reset() { 
	messageDisplay.textContent = "";
	resetButton.textContent="new Colors";
	//new colors
	colors = generateRandomColors(colorsNum);
	//pick a new random color and change the display
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = "steelblue";
	for (var i=0; i < squares.length; i++) {
		if (colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
}

//my version
//resetButton.addEventListener("click", reset);
//instructors version
resetButton.addEventListener("click", function(){
	reset();
})


function changeColors(color) {
	for (var i = 0; i<squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
	h1.style.backgroundColor = color;
}


function pickColor(){
	
	//Math.random();  random between  0 and 0.99999
	//Math.floor(Math.random() * 6 + 1 ); cuts out all the decimal points
	//choose a random element from  the array. colors
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}


function generateRandomColors(num){

	var arr = [];
	for (var i =0; i<num; i++) {
		//get random color and push in array
		arr.push(randomColor());
	}
	return arr;
}


function randomColor(){
	//pick r, g, b,  from 0 to 255
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	//return color string fyi has to be identical '==='
	//without the gaps it does not work for comparison
	//this.style.backgroundColor auto adds spaces between the rgb
	return "rgb("+r+", "+g+", "+b+")";
}
