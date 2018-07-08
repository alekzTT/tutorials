console.log("Promises exercises JS connected");
//we use index.html for jQuery

function getMostFollowers() {
    return new Promise((resolve, reject) => {
        var promArr = [];
        var maxFollowers=0;
        var maxUser;
        //an array of promises
        Array.from(arguments).forEach((name) => {
            promArr.push($.getJSON(`https://api.github.com/users/${name}`))
        });
            
        //we pass that array to promise.all function
        Promise.all(promArr).then((users) => {
            users.forEach((user) => {
                
                if(user.followers >= maxFollowers) {
                    maxFollowers = user.followers;
                    maxUser = user;
                    //console.log(user.login);
                    //console.log(user.followers);
                    //console.log(maxUser);
                    }
            });
            //after we check all users we resolve / reject the promise function
            resolve(maxUser);
            reject("oups");    
        });
    });        
}

function starWarsString(num){
    return new Promise((resolve, reject) => {
        var str="";
        $.getJSON(`https://swapi.co/api/people/${num}`)
        .then((result) => { str+=result.name; $.getJSON(`${result.films[0]}`) 
        .then((film) => { str+=film.title+" "+film.director; $.getJSON(`${film.planets[0]}`) 
        .then((planet) => { str+=planet.name; resolve(`${result.name}
        is featured in ${film.title}
        directed by ${film.director}
        and it takes place on ${planet.name} 
        Or in the str ${str}`);
        //nested promises
        })})})
        .catch((err) => reject(err.status+" Not Found... "));
    });
}

getMostFollowers('elie','tigarcia','colt').then(function(data){
    console.log("this is what i get "+data.login +" with "+ data.followers);
}); 

starWarsString(1).then(function(data){
    console.log(data);
}).catch((err) => console.log (err));
