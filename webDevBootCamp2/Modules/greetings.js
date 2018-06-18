var exports = module.exports = {};
//assign any expression we want to become available in other files to 
//the exports objext


exports.sayHelloInEnglish = function() {
    return "Hello";
};

exports.sayHelloInSpanish = function() {
    return "Holla";    
};

exports.sayHelloInGreek = function() {
  return "Kalispera";  
};


//if we reassign the module.exports the object will be unavailable
//module.exports = "Bonjour";