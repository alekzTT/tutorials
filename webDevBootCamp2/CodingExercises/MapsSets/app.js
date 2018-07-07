//"Maps & Sets new data structures in ES2015 "


//"Maps" (hash maps) were replaced by objects until 2015
//Maps are similar to objects except the keys can be ANY data type
//JavaScript object dataType strings for keys

//good to look up keys dynamically for not hard coded Strings

//"WeakMap" Similar to  map but all keys must be OBJECTS
//values in WeakMap can be cleared from Memory if there is no reference to them
//More performant than Maps but cannot be itterated over... 

var firstMap = new Map;

firstMap.set(1, "elie");
firstMap.set(false, "a boolean");
firstMap.set('nice', "a string");

//following functions are the same
//iterate through values
firstMap.forEach(v => console.log(v));

firstMap.forEach(function(value){
    console.log(value);
});

//for...of   key value
for (let o of firstMap) {
  console.log(o);
}



console.log(firstMap.size);
firstMap.delete('nice');
console.log(firstMap.size);


//Sets all the values in a set are unique ,any type of value , also created using the "new" keyword
//mostly to remove duplications //dont really care about the order... 

//"WeakSets" Similar to sets but all keys must be OBJECTS

var s = new Set([20, 10, 20 , 30, 50, 20, 10]);

s.add(10);
s.add(55);
console.log(`The Size is ${s.size}`);
console.log(s.has(10));
console.log(s.delete(33));
console.dir(s);

//same thing
s.forEach(v => console.log(v));

for (let ss of s) {
  console.log(ss);
}
