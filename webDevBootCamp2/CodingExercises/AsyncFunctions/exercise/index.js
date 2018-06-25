console.log("Running exercise");


//https://api.github.com/users/alekztt

async function hasMostFollowers(...names) {
    /*names.forEach(function(name){
      var data = await $.getJson(`https://api.github.com/users/${name}`);console.log(data);
        console.log(data);
    });
    */
    //console.log(names.length);
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
                console.log(err)
            }
        //console.log(names[i]);
        //console.log(data);
    }
    return (`${maxName} has the most followers with ${maxFollowing}`);
}

hasMostFollowers('alekztt', 'colt', 'elie', 'tigarcia').then(function(data){
    console.log(data);
})

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
    })
   return (`${maxName} has the most followers with ${maxFollow}`);
}

hasMostFollowers2('alekztt', 'colt', 'elie', 'tigarcia').then(function(data){
    console.log(data);
})