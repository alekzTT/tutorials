console.log('async example');

async function tellMe(){    //async functions return promises
    return "told ya";
}

tellMe().then(val => console.log(val));

async function getMovieData() {
    console.log("Starting");
    try {
    var tell = await tellMe();  //tell Me is a promise
    //include JQuery CDN in html file
    var movieData = await $.getJSON('https://omdbapi.com/?t=titanic&apikey=thewdb');
    } catch (err) {
        console.log("something went wrong");
        console.log(err);
    }
    
    
    console.log("all done");
    console.log(tell);
    console.log(movieData);
}

getMovieData();

//or in objects 
var movieCollector = {
    data: "UP",
    async getMovie() {
            var response = await $.getJSON(`https://omdbapi.com/?t=${this.data}&apikey=thewdb`);
            console.log(response);
    }
}

movieCollector.getMovie();

//and ES2015 class syntax 
class MovieData {
    constructor(name) {
        this.name = name;
    }
    async getMovie(){
        try {
            var response = await $.getJSON(`https://omdbapi.com/?t=${this.name}&apikey=thewdb`);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
}
var m = new MovieData('shrek');
m.getMovie();