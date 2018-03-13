//AJAx 1. XMLHttpRequest
console.log ("connected");

//XMLHTTPRequest.readyState
//5 different options for XMLHtttpRequest
// 0 unsent
// 1 opened
// 2 headers_received
// 3 loading (on it's way back)
// 4 done

var XHR = new XMLHttpRequest();

XHR.onreadystatechange = function() {
   console.log("READY STATE IS...." + XHR.readyState); 
    
   if(XHR.readyState == 4){
       if(XHR.status != 200) {
           console.log("AJAX ERROR " + XHR.status);
       } else {
        console.log(XHR.responseText);
       }
   }
};

//HTTP request VERBS GET, POST, PUT, DELETE etc
XHR.open("GET", "https://api.github.com/zen");
XHR.send();