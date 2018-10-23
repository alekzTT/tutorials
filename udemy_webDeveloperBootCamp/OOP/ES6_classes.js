class Person {
  
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
  
  greet() {
    return 'Hi '+ this.firstname; 
    
  }
}


//extends sets the prototype (__proto__)
class InformalPerson extends Person {
  constructor(firstname, lastname) {
    super(firstname, lastname)
  }
  
  greet() {
    return 'Yo ' + this.firstname;
  }
}




var John = new Person ('John', 'Doe');
var Elen = new InformalPerson('Elen', 'keller');
console.log(John.greet());
console.log(Elen.greet());

//Class in javascript is AN OBJECT..... !!!!!
//and then you create new Objects From That Object

//Prototypal inheritance..... should be appreciated 
//simplicity of it

//Design purposes....