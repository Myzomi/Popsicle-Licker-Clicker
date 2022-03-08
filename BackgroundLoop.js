//JavaScript Document
let i = 0;
let CPS = 0


onmessage = function(e) {
 CPS = e.data
}


function timedCount() {
  i += CPS;
  postMessage(i);
  setTimeout("timedCount()", 16);
}

timedCount();