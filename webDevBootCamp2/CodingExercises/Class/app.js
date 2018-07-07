class Person {
    constructor(name, surname, color, number) {
        this.firstName=name;
        this.lastName=surname;
        this.favoriteColor=color;
        this.favoriteNumber=number;
    }
    
    multiplyFavoriteNumber(num) {
        return (this.favoriteNumber * num);
        
    }
}

var person = new Person("Elie", "Schoppik", "purple", 34);

console.log(`Hello I'm ${person.firstName} ${person.lastName} my fav color is ${person.favoriteColor} and im ${person.favoriteNumber} years old`);

console.log(person.multiplyFavoriteNumber(10)); // 340