console.log("Connected");
/* 1 - Refactor the following code to use ES2015 arrow functions - make sure your function is also called tripleAndFilter

    function tripleAndFilter(arr){
      return arr.map(function(value){
        return value * 3;
      }).filter(function(value){
        return value % 5 === 0;
      })
    }
*/
  //if we only have one parameter in an arrow function it does not have to be wrapped in a parenthesis
    var tripleAndFilter = arr => arr.map(value => value * 3).filter(value => value % 5 === 0);
      
    console.log(tripleAndFilter([10, 5, 3, 5, 2, 3]));



/* 2 - Refactor the following code to use ES2015 arrow functions. Make sure your function is also called doubleOddNumbers
//if a number is odd it returns it's value * 2
    function doubleOddNumbers(arr){
        return arr.filter(function(val){
            return val % 2 !== 0;
        }).map(function(val){
            return val *2;
        })
    }
*/

  let doubleOddNumbers = arr => arr.filter(val => val % 2 !== 0).map(val => val * 2);
  
  console.log(doubleOddNumbers([10, 5, 3, 7, 9, 3, 4, 11]));



/* 3 - Refactor the following code to use ES2015 arrow functions. Make sure your function is also called mapFilterAndReduce.
    function mapFilterAndReduce(arr){
      return arr.map(function(val){
        return val.firstName;
      }).filter(function(val){
        return val.length < 5;
      }).reduce(function(acc,next){
        acc[next] = next.length;
        return acc;
      }, {});
    }
*/
  let mapFilterAndReduce = arr => arr.map(val => val.firstName)
  .filter(val => val.length < 5).reduce((acc, next) => {
    acc[next] = next.length;
    return acc;
  }, {}); 
    
  console.log(mapFilterAndReduce([{firstName: "Alex"}, {firstName: "Tom"}, {firstName: "Manos"}, {firstName: "Karamo"}, {firstName: "Nik"}]));

/* 4 - Write a function called createStudentObj which accepts two parameters, firstName and lastName and returns an object with the keys of firstName and lastName with the values as the parameters passed to the function.

    function createStudentObj(firstName, lastName){
      var student ={
        firstName, 
        lastName
      };
      return student;
    }
    
Example:
*/
    var createStudentObj = (firstName, lastName) => ({firstName, lastName});
    //the same as : 
    var createStudentObj2 = (firstName, lastName) => ({firstName: firstName, lastName: lastName});
    
    console.log(createStudentObj('Elie', 'Schoppik')); // {firstName: 'Elie', lastName: 'Schoppik'}
    console.log(createStudentObj2('Tom', 'Robins')); 
/* 5 - Given the following code: 


Refactor this code to use arrow functions to make sure that in 1000 milliseconds you console.log 'Hello Colt'
this keywprd points to the setTimeout function as it is    
*/
    var instructor = {
      firstName: "Colt",
      // sayHi: function(){
      //   setTimeout(function(){
      //     console.log('Hello ' + this.firstName)
      //   },1000)
      // }
     sayHi : function() {
       setTimeout(() => {
         console.log("Hello " + this.firstName)
       }, 1000)
     }
    }

    instructor.sayHi();