function Vehicle(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  
  this.isRunning = false;
  
}

Vehicle.prototype.turnOn = function() 
{
this.isRunning = true;  
};

Vehicle.prototype.turnOff = () => this.isRunning = false;

//for some reason the ternary operator here does not function as expected
//Vehicle.prototype.honk = () => this.isRunning == true ? "beep" : "_";
Vehicle.prototype.honk = function() {
  if (this.isRunning) {
    return "beep";
  }
}

const car1 = new Vehicle("volvo", "23plus", 2021);
const car2 = new Vehicle("alpha", "316", 2012);


console.log(car1.honk());
console.log(car2.honk());

car1.turnOn();
car2.turnOn();

console.log(car1.honk());
console.log(car2.honk());

car1.turnOff();
car2.turnOff();