function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.sayHello = function() {
    return ("Hello " + this.firstName + " " + this.lastName);
};

function Student(firstName, lastName) {
    /*duplicated code with parent object
    this.firstname = firstName;
    this.lastname = lastName;
    */
    Person.apply(this, arguments);
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

//ES2015 inheritance
class Person2 {
    constructor(firstName,lastName ) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    sayHello() {
        return `Hello ${this.firstName} ${this.lastName}`;
    }
}

class Student2 extends Person2{
    constructor(firstName, lastName) {
        //use of the super keyword
        super (lastName, firstName);
        //super can be used only the method is implemented in the parent class by the same name
        //Question :: why "Super" doesnt the child object inherit from the parent? ----> END OF PAGE
    }
}

var person = new Person2("John", "Doe");
var student = new Student2("Tim", "Roth");

console.log(person.sayHello());
console.log(student.sayHello());

//----------------Super Keyword----------------------------
class Rectangle {
  constructor(height, width) {
    this.name = 'Rectangle';
    this.height = height;
    this.width = width;
  }
  sayName() {
    console.log('Hi, I am a ', this.name + '.');
  }
  get area() {
    return this.height * this.width;
  }
  set area(value) {
    this.height = this.width = Math.sqrt(value);
  }
}

class Square extends Rectangle {
  constructor(length) {
    this.height; // ReferenceError, super needs to be called first!
    
    // Here, it calls the parent class' constructor with lengths
    // provided for the Rectangle's width and height
    super(length, length);
    
    // Note: In derived classes, super() must be called before you
    // can use 'this'. Leaving this out will cause a reference error.
    this.name = 'Square';
  }
}