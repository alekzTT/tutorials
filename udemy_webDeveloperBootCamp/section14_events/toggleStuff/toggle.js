	var bdbutton = document.querySelector("button");
	//part of the second solution


	//var bod = document.querySelector("body");
	var bod = document.body;


	bod.style.backgroundColor = "white";
	//end

	bdbutton.addEventListener("click", function(){
		//these definately play ;)
		//document.getElementsByTagName("body")[0].classList.toggle("purple");
		//document.querySelector("body").classList.toggle("purple");
		
		//2nd solution but .... tooo much stuff
		if (bod.style.backgroundColor === "white") {
			bod.style.background = "purple";
		} else {
			bod.style.background = "white";
		}

		//another solution is with a bool ispurple = false
		//ispurple = !ispurple
	})



	var button = document.querySelectorAll('button');
	button[2].addEventListener('click', function() {console.log('you found the button!!!');});
	//more than one listener
	button[2].addEventListener('click', function() {this.style.background = 'orange';});

	//for multiple elements

	var lis = document.querySelectorAll("li");
	for (var i = 0; i< lis.length; i++ ) {
		lis[i].addEventListener("click", 
			function() {
				this.style.color = 'purple';
				//font-weight == fontWeight
				this.style.fontWeight = 'bolder';
			});
	}
	function changeText() {
			this.textContent = "now i am not that pure";
		}
	var p = document.querySelector("p");
	p.addEventListener("click", changeText);
