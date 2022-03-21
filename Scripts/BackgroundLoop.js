//JavaScript Document
let SunClicks = 0;
let SunCPS = 0
let SeaGullCPS = 0
let AllTowerClicksDecimal = 0
let AllTowerClicks = 0
let SeaGullLevel = 1

onmessage = function(e) {
 SunCPS = e.data.SunCPS
 SeaGullCPS = e.data.SeaGullCPS
  if (e.data.SunClicks != undefined){
    SunClicks = e.data.SunClicks
  }
  if (e.data.AllTowerClicks != undefined){
    AllTowerClicksDecimal = e.data.AllTowerClicks
  }
  if (e.data.SeaGullLevel != undefined){
    SeaGullLevel = e.data.SeaGullLevel
  }
}

function timedCount() {
  SunClicks += SunCPS;
  AllTowerClicksDecimal += SeaGullCPS * SeaGullLevel;
  AllTowerClicks = Math.floor(AllTowerClicksDecimal / SeaGullLevel) * SeaGullLevel;
  postMessage({ 
		SunClicks: SunClicks,
		AllTowerClicks: AllTowerClicks  
	});
  setTimeout("timedCount()", 16);
}

timedCount();