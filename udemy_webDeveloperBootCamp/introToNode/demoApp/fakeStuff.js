var faker = require("faker");

console.log("HI\n====================\nWELLCOME TO MY SHOP\n====================\n");
/*
var randomProduct = faker.commerce.productName();
var randomPrice = faker.commerce.price();
var randomMaterial = faker.commerce.productMaterial();

console.log(randomProduct);
console.log(randomPrice);
console.log(randomMaterial);
*/
for (var i=0;i<10;i++) {
    console.log(faker.commerce.productMaterial()+faker.commerce.productName()+" - $"+faker.commerce.price());
}