console.log("Running exercise");

//Assignment 1 -> hasMostFollowers
//https://api.github.com/users/alekztt

async function hasMostFollowers(...names) {
    
    var maxName ="";
    var maxFollowing=0;
    
    for (var i=0; i<names.length; i++) {
        var dataProm = $.getJSON(`https://api.github.com/users/${names[i]}`);
        try { 
                var data = await dataProm;
                if (data.followers > maxFollowing) {
                    maxFollowing = data.followers;
                    maxName = data.login;
                }
            } catch (err) {
                console.log(err);
            }
    }
    
    return (`${maxName} has the most followers with ${maxFollowing}`);
}


hasMostFollowers('alekztt', 'colt', 'elie', 'tigarcia').then(function(data){
    console.log(data);
});


async function hasMostFollowers2(...names) {
    
    var promiseTable=[];
    var maxName="";
    var maxFollow="";
    
     for (var i=0; i<names.length; i++) {
        promiseTable[i] = $.getJSON(`https://api.github.com/users/${names[i]}`);
     }
    
    var resultList = await Promise.all(promiseTable);
    resultList.forEach(function(item){
         if (item.followers > maxFollow) {
                    maxFollow = item.followers;
                    maxName = item.login;
                }
    });
    
   return (`${maxName} has the most followers with ${maxFollow}`);
}


hasMostFollowers2('alekztt', 'colt', 'elie', 'tigarcia').then(function(data){
    console.log(data);
});

//Assignment 2 -> starWarsString
//https://swapi.co/ 


async function starWarsString(number) {
    try {
        var result = await $.getJSON(`https://swapi.co/api/people/${number}`);
        var film = await $.getJSON(`${result.films[0]}`);
        var planet = await $.getJSON(`${film.planets[0]}`);
    } catch (err) {
        console.log("Star Wars Error"+err);
    }
    
    return (`${result.name} is featured in ${film.title} directed by ${film.director} and it takes place on ${planet.name}`);
}


    starWarsString(1).then(function(data){
        console.log(data);
    });
     
    //1 => "Luke Skywalker"
    //2 => "C-3PO"    etc



