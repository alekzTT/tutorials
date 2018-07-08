console.log("Promises exercise solution");

function getMostFollowers(...usernames) {
    //...rest operator
    let baseUrl = "https://api.github.com/users/";
    console.log(usernames);
    let urls = usernames.map(username => $.getJSON(baseUrl + username));
    console.log(urls);
    return Promise.all(urls).then(function(data){
        let max = data.sort((a,b) => a.followers < b.followers)[0];
        return `${max.name} has the most followers with ${max.followers}`;
    });
}

function starWarsString(id) {
    var str="";
    return $.getJSON(`https://swapi.co/api/people/${id}`).then(function(data){
        str+=`${data.name} is featured in`;
        let filmData = data.films[0];
        return $.getJSON(filmData);
    }).then(function(res){
        str += `${res.title}, directed by ${res.director}`;
        let planetData = res.planets[0];
        return $.getJSON(planetData);
    }).then(function(res){
        str += `and it takes place at ${res.name}`;
        return str;
    });
}

starWarsString(1).then(function(data){
    console.log(data);
}).catch((err) => console.log (err));



getMostFollowers('elie','tigarcia','colt')
.then((data) => console.log(data))
.catch((err) => console.log(err.status + " at least one user is not found"));

//map function functionality check
function mapCheck(...numbers) {
    console.log(numbers);
    let phrase =numbers.map(entry => entry+" is the age you marry");
    console.log(phrase);
    
}
mapCheck(45, 39, 78);

//var and let scope study =====================================================

//var == valid within function scope

var j="lala";
function printing(){
  for(var j = 0; j<10; j++) {
    console.log(j)
  }
}
printing()
//will throw a not defined error
console.log(`this is ${j}`);
//=====================================================


//let == valid within {} scope
var i ="oper";
for(let i = 0; i<10; i++) {
  console.log(i);
}
//will throw a not defined error
console.log(i);


//=====================================================
var ii = "oups";
for(var ii = 0; ii<10; ii++) {
  console.log(ii);
}
console.log(ii);

