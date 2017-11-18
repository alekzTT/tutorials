var answer=prompt("Are we there yet ?");

while (answer !== "yes" && answer !== "yeah" && answer !== "y" && answer.indexOf("yes") === -1 ) {
	answer = prompt("answer is : Are we there yet ?");
}
alert("we're there, allready! ");