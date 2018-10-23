console.log("im up");

function Dog(name, age) {
  this.name = name;
  this.age = age;
  
  this.bark = function(){
    return `${this.name} just Barked`;
  };
}

//New Keyword does 4 things 
// 1) creates an empty object
// 2)sets the keyword this to be that empty object in the function used
// 3)adds the line return this at the end of the function
// 4)creates a link (which we can access as __proto__)
// between the object created and the prototype property of the constructor function



var rusty = new Dog('Rusty', 3);
console.log(rusty.bark());
var fido = new Dog('Fido', 5);
console.log(fido.bark());
//==============================================

function Car(make, model, year) {
  this.make= make;
  this.model = model;
  this.year = year;
  this.numWheels = 4;
}

function Motorcycle(make, model, year) {
  //using call
  //this replaces the this of the carr
  Car.call(this, make, model, year);
  this.numWheels = 2;
}

function Motorcycle(make, model, year) {
  //using apply
  Car.apply(this, [make, model, year]);
  this.numWheels = 2;
}

function Motorcycle(make, model, year) {
  Car.apply(this, arguments);
  this.numWheels=2;
}


//=================prototypal inheritance=========
//instead of creating the same method for a million objects 
//we just create it on  the prototype and link to it 
//pretty smart


function Person(name) {
  this.name = name;
  this.sayHi = function() {
    console.log(`${this.name} says hi`);
  };
}

const elie = new Person("Elie");
elie.sayHi();
//_______ define only once _____________

function PersonP(name) {
  this.name = name;
}

PersonP.prototype.sayHi = function() {console.log(`${this.name} says HELLO!!!`)};

const alex = new PersonP("Alex");

alex.sayHi();


//var and let
console.log(a);  //this prints undefined
var a = 0;


//console.log(b);
// let b = 0;  //this returns an error  

let b = 0;
console.log(b);
//now its ok


  for(var i = 0; i<10; i++) {
    console.log(i)
  }
  console.log(i)

for(let j = 0; j<10; j++) {
    console.log(j)
  }
  // console.log(j) this returns an error
  
  for(let x = 0; x<10; x++) {
  console.log(x) //this goes until 9
}


const multiplier = 3.4
let discount = 5.6 // this will throw an error
var kk = [23, 56, 67].map((num)=> num * discount)

console.log(kk)