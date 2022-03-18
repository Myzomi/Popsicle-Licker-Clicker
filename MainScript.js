//JavaScript Document
//clicking
let Clicks = 0
let AutoClicks = 0
//autoclicks and clicks combined
let AllClicks = 0
let heightMultiplier = 10
let level = 5
let levelUp = 0
let hue = 0
let pointsPerPopsicle = 1
let PPPUpgradeCost = 15
let CPSUpgradeCost = 2
//total popsicles accumulated in all time
let popsicles = 0
//total amount of popsicles spent
let popsiclesSpent = 0
//total amount of popsicles
let popsicleNumber = 0
let sun_amount = 0
var showingUpgrades =  false	

//CPS
let CPS = 0

//frame resize
let width = 0.2 * window.innerHeight + "px"
let height = (heightMultiplier / 10) * 0.73 * window.innerHeight + "px"

//game loop
let l = undefined

//webworker var (background loop)
var w;

//runs game loop
function startGameLoop(){
	l = setInterval(gameLoop, 16)
}

//runs background loop
function startWebworker(){
	w = new Worker("BackgroundLoop.js");
}

//stops game loop
function stopGameLoop(){
	clearInterval(l)
	l = null
}

//stops background loop
function stopWebWorker(){
	w.terminate();
	w = undefined;
}

//start loops
startGameLoop();
startWebworker();

//load saved data
loadGame();

//hide shop on start
document.getElementById("UpgradesDiv").style.visibility = "hidden"

function resize() 
{
	if (window.innerHeight < window.innerWidth) 
	{
		//set height vars
		height = (heightMultiplier / 10) * 0.73 * window.innerHeight + "px"
	} 
	else 
	{
		//set height vars
		height = (heightMultiplier / 10) * 0.73 * window.innerHeight + "px"
	}
	//apply width vars
	document.getElementById("PopsicleTop").style.setProperty('--width', width)

	//apply height vars
	document.getElementById("PopsicleTop").style.setProperty('--height', height)
}

//called when popsicle clicked
function clickFunction() {
	Clicks += 1
	level = (AllClicks) - (Math.floor(((AllClicks)) / 10) * 10)
	heightMultiplier = 10 - level
	popsicleNumber = popsicles - popsiclesSpent
	document.getElementById("PopsiclesNumber").innerHTML = "$" + popsicleNumber

	if ((Math.floor((AllClicks) / 10) * pointsPerPopsicle) > levelUp) {
		hue = (hue + Math.random() * 360)
		document.getElementById("PopsicleTop").style.setProperty('--hue', hue + "deg")
		document.getElementById("PopsicleStickIn").style.setProperty('--hueStick', hue + "deg")
		if (popsicles <= 0)
		{
			levelUp = (Math.floor(((AllClicks)) / 10) * pointsPerPopsicle)
		}
		else
		{
			levelUp = (Math.floor(((AllClicks)) / 10) * pointsPerPopsicle)
		}
		
		popsicles += pointsPerPopsicle
	}

	resize()
}

document.addEventListener('contextmenu', event => event.preventDefault())

//called by upgradeCPS to check if sun has been bought
//void -> boolean
//Example:
//sun_amount = 1 -> return true
//sun_amount = 0 -> return false
function sun_switch () {
	if(sun_amount >= 1) {
		return true;
	}
	else {
		return false;
	}
}

//called when sun is upgraded. Idly "melts" popsicle 
//void -> void
function upgradeCPS() {

	if (CPSUpgradeCost <= popsicles - popsiclesSpent)
	{
		CPS += 0.00333333333334
	    sun_amount += 1
		popsiclesSpent += CPSUpgradeCost
		CPSUpgradeCost = Math.ceil(CPSUpgradeCost * 1.15)
		levelUp = (Math.floor(((AllClicks)) / 10) * pointsPerPopsicle)
	}

}

//called when "bigger popsicle" has been upgraded. Increases points gained per popsicle
//void -> void
function upgradePPP()
{
	if (PPPUpgradeCost <= popsicles - popsiclesSpent)
	{
		pointsPerPopsicle = pointsPerPopsicle * 2
		popsiclesSpent += PPPUpgradeCost
		PPPUpgradeCost = Math.ceil(Math.pow(PPPUpgradeCost, 1.45))
		levelUp = (Math.floor(((AllClicks)) / 10) * pointsPerPopsicle)
	}
	
}

//called every frame (60 fps)
//void -> void
function gameLoop()
{
	AllClicks = Clicks + AutoClicks
	level = (AllClicks) - (Math.floor(((AllClicks)) / 10) * 10)
	heightMultiplier = 10 - level
	popsicleNumber = popsicles - popsiclesSpent
	document.getElementById("PopsiclesNumber").innerHTML = "$" + popsicleNumber
	document.getElementById("PopsicleTop").style.setProperty('--hue', hue + "deg")
	document.getElementById("PopsicleStickIn").style.setProperty('--hueStick', hue + "deg")

	if ((Math.floor(((AllClicks)) / 10) * pointsPerPopsicle) > levelUp) {
		hue = (hue + Math.random() * 360)
		document.getElementById("PopsicleTop").style.setProperty('--hue', hue + "deg")
		document.getElementById("PopsicleStickIn").style.setProperty('--hueStick', hue + "deg")
		if (popsicles <= 0)
		{
			levelUp = (Math.floor(((AllClicks)) / 10) * pointsPerPopsicle)
		}
		else
		{
			levelUp = (Math.floor(((AllClicks)) / 10) * pointsPerPopsicle)
		}

		popsicles += pointsPerPopsicle
	}

	resize()
	saveGame()

	w.onmessage = function(event) {
		AutoClicks = event.data;
	}

	w.postMessage({ 
		CPS: CPS,  
	})
	
	//set the cost banners to the cost of each upgrade
	document.getElementById("PPPPriceP").innerHTML = "$" + PPPUpgradeCost
	document.getElementById("CPSPriceP").innerHTML = "$" + CPSUpgradeCost
}

//shows and hides the shop
//void -> void
function show(){
	if (showingUpgrades == false)
	{
		document.getElementById("UpgradesDiv").style.visibility = "visible"
		showingUpgrades = true
	}
	else
	{
		document.getElementById("UpgradesDiv").style.visibility = "hidden"
		showingUpgrades = false
	}
}




function loadGame()
{
	var savedGame = JSON.parse(localStorage.getItem("gameSave"))
	if (typeof savedGame.CPS !== "undefined"){CPS = savedGame.CPS}
	if (typeof savedGame.Clicks !== "undefined"){Clicks = savedGame.Clicks}
	if (typeof savedGame.AutoClicks !== "undefined"){AutoClicks = savedGame.AutoClicks}
	if (typeof savedGame.AllClicks !== "undefined"){AllClicks = savedGame.AllClicks}
	if (typeof savedGame.heightMultiplier !== "undefined"){heightMultiplier = savedGame.heightMultiplier}
	if (typeof savedGame.level !== "undefined"){level = savedGame.level}
	if (typeof savedGame.hue !== "undefined"){hue = savedGame.hue}
	if (typeof savedGame.pointsPerPopsicle !== "undefined"){pointsPerPopsicle = savedGame.pointsPerPopsicle}
	if (typeof savedGame.PPPUpgradeCost !== "undefined"){PPPUpgradeCost = savedGame.PPPUpgradeCost}
	if (typeof savedGame.CPSUpgradeCost !== "undefined"){CPSUpgradeCost = savedGame.CPSUpgradeCost}
	if (typeof savedGame.levelUp !== "undefined"){levelUp = savedGame.levelUp}
	if (typeof savedGame.popsicles !== "undefined"){popsicles = savedGame.popsicles}
	if (typeof savedGame.popsiclesSpent !== "undefined"){popsiclesSpent = savedGame.popsiclesSpent}
	if (typeof savedGame.popsicleNumber !== "undefined"){popsicleNumber = savedGame.popsicleNumber}
	if (typeof savedGame.sun_amount !== "undefined"){sun_amount = savedGame.sun_amount}
	w.postMessage({ 
		CPS: CPS, 
		i: AutoClicks 
	})	
}

function saveGame()
{
	var gameSave = 
	{
		Clicks: Clicks,
		AutoClicks: AutoClicks,
		AllClicks: AllClicks,
		heightMultiplier: heightMultiplier,
		level: level,
		levelUp: levelUp,
		CPS: CPS,
		hue: hue,
		pointsPerPopsicle: pointsPerPopsicle,
		PPPUpgradeCost: PPPUpgradeCost,
		CPSUpgradeCost: CPSUpgradeCost,
		popsicles: popsicles,
		popsiclesSpent: popsiclesSpent,
		popsicleNumber: popsicleNumber,
		sun_amount: sun_amount,
	}
	localStorage.setItem("gameSave", JSON.stringify(gameSave))
}

function clearSave(){
	//stop all loops
	stopGameLoop()
	stopWebWorker()
	//clear old data
	localStorage.clear();
	//set vars to defualt
	Clicks = 0
	AutoClicks = 0
	AllClicks = 0
	heightMultiplier = 10
	level = 5
	levelUp = 0
	hue = 0
	pointsPerPopsicle = 1
	PPPUpgradeCost = 15
	CPSUpgradeCost = 2
	popsicles = 0
	popsiclesSpent = 0
	popsicleNumber = 0
	sun_amount = 0
	showingUpgrades =  false	
	CPS = 0
	//save new (defualt) values
	saveGame()
	//start all loops
	startWebworker()
	startGameLoop()
	//load new (defualt) data
	loadGame()
}