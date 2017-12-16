//oti na nai .....

var arr1 = [90, 98, 89, 100, 100, 86, 94];
var arr2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];

console.log(average(arr1));
console.log(average(arr2));



function average(scores){
    
    var sum = 0;
    /* for (var i =0; i<scores.length; i++ ) {
        sum += scores[i];    
    }
    */
    scores.forEach(function(score){
        sum += score;
    })
    var avg = sum/scores.length;
    return Math.round(avg);
}