//var exports = module.exports = {}; 

const { PI } = Math;

//console.log(`This  PI is : ${PI} `);


exports.area = function(r) {
    return (PI * r * r);
};

// exports.area = (r) => PI * r * r;


exports.circumference = function(r) {
    return (2*PI*r);
};