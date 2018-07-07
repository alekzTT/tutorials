console.log("Promises JS connected");
/*
function getMostFollowers() {
  var maxF=0, maxN;
  Array.from(arguments).forEach((arg) => {
    $.getJSON(`https://api.github.com/users/${arg}`).then((data) => {
     if (data.followers > maxF) {
       maxF = data.followers;
       maxN = data.login;
     }
    });
  });
  return();
}

console.log(getMostFollowers('me', 'elie', 'tigarcia', 'colt'));
.then((data) => {console.log('------'+data)
.catch((error) => {console.log('======='+error)});
});
*/

function getUser(name) {
  return $.getJSON(`https://api.github.com/users/${name}`)
}

//set Up some promises
var coltPromise = getUser('colt');
var eliePromise = getUser('elie');
var tigarciaPromise = getUser('tigarcia');
var mePromise = getUser('alekztt');


//Promise All example (even if one promise fails is returns an error)

Promise.all([coltPromise,eliePromise,tigarciaPromise,mePromise])
//returns an array of promise replies 
.then((users) => {
  users.forEach((user) => {
    console.log(`The git user ${user.login} has ${user.followers} followers`);

  });
})
.catch((err) => {console.log('one promise rejected')});
