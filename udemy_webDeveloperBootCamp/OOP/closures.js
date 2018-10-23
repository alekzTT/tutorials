//inner functions make use of outer functions date

function outer() { 
  var data = "closures are ";
  return function inner() {
    var innerData = "awesome";
    return data + innerData;
  }
}


//can use tha data variable even though the outer
//function has allready returned
console.log(outer());
console.log(outer()());


//when to use closures ?


//emulate private variables
//inner functions are anonymous
//due to variable scope