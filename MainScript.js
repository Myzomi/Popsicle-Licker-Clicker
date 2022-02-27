//JavaScript Document
//clicking
let TimesClicked = 0
//total amount of popsicles
let popsicles = 0
let heightMultiplier = 10
let level = 5
let levelUp = 0
let hue = 0
let pointsPerPopsicle = 1
let PPPUpgradeCost = 5
let CPSUpgradeCost = 5
//total amount of popsicles spent
let popsiclesSpent = 0
let popsicleNumber = 0
let sun_amount = 0
var showingUpgrades =  false

document.getElementById("PopsiclesNumber").innerHTML = popsicles - popsiclesSpent
//both are hidden at the start
document.getElementById("UpgradesDiv").style.visibility = "hidden"
document.getElementById("Sun").style.visibility = "hidden"
let debug = 0

//CPS
let CPS = 0




setInterval(gameLoop, 16)


//frame resize
let width = 0.2 * window.innerHeight + "px"
let stickWidth = 0.05 * window.innerHeight + "px"
let upgradeButtonWidth = 1
let height = (heightMultiplier / 10) * 0.73 * window.innerHeight + "px"
let stickHeight = 0.23 * window.innerHeight + "px"
let upgradeButtonHeight = 0.05 * window.innerHeight + "px"
let menuButtonWidth = 0.05 * window.innerHeight + "px"
let menuButtonHeight = 0.05 * window.innerHeight + "px"
let squareWidth = 0.05 * window.innerHeight + "px"
let squareHeight = 0.05 * window.innerHeight + "px"
let textWidth = 0.05 * window.innerHeight + "px"
let textHeight = 0.05 * window.innerHeight + "px"

function resize() 
{
	if (window.innerHeight < window.innerWidth) 
	{
		//set width vars
		width = 0.2 * window.innerHeight + "px"
		stickWidth = 0.05 * window.innerHeight + "px"
		upgradeButtonWidth = 0.25 * window.innerHeight + "px"
		menuButtonWidth = 0.35 * window.innerHeight + "px"
		squareWidth = 0.2 * ((sun_amount + 10) * 0.1) * window.innerHeight + "px"
		textWidth = 0.05 * window.innerHeight + "px"
		
		//set height vars
		height = (heightMultiplier / 10) * 0.73 * window.innerHeight + "px"
		stickHeight = 0.23 * window.innerHeight + "px"
		upgradeButtonHeight = 0.093 * window.innerHeight + "px"
		menuButtonHeight = 0.05 * window.innerHeight + "px"
		squareHeight = 0.2 * ((sun_amount + 10) * 0.1) * window.innerHeight + "px"
		textHeight = 0.05 * window.innerHeight + "px"
	} 
	else 
	{
		//set width vars
		width = 0.2 * window.innerWidth + "px"
		stickWidth = 0.05 * window.innerWidth + "px"
		upgradeButtonWidth = 0.25 * window.innerWidth + "px"
		menuButtonWidth = 0.35 * window.innerWidth + "px"
		squareWidth = 0.2 * ((sun_amount + 10) * 0.1) * window.innerWidth + "px"
		textWidth = 0.05 * window.innerWidth + "px"
		
		//set height vars
		height = (heightMultiplier / 10) * 0.73 * window.innerWidth + "px"
		stickHeight = 0.23 * window.innerWidth + "px"
		upgradeButtonHeight = 0.093 * window.innerWidth + "px"
		menuButtonHeight = 0.05 * window.innerWidth + "px"
		squareHeight = 0.2 * ((sun_amount + 10) * 0.1) * window.innerWidth + "px"
		textHeight = 0.05 * window.innerWidth + "px"
	}
	//apply width vars
	document.getElementById("PopsicleTop").style.setProperty('--width', width)
	document.getElementById("PopsicleStick").style.setProperty('--width', stickWidth)
	document.getElementById("PopsicleStickIn").style.setProperty('--width', stickWidth)		
	//document.getElementById("UpgradeCPS").style.setProperty('--width', upgradeButtonWidth)	
	//document.getElementById("UpgradePPP").style.setProperty('--width', upgradeButtonWidth)	
	
	//apply height vars
	document.getElementById("PopsicleTop").style.setProperty('--height', height)
	document.getElementById("PopsicleStick").style.setProperty('--height', stickHeight)
	document.getElementById("PopsicleStickIn").style.setProperty('--height', stickHeight)
	//document.getElementById("UpgradeCPS").style.setProperty('--height', upgradeButtonHeight)	
	//document.getElementById("UpgradePPP").style.setProperty('--height', upgradeButtonHeight)		
	
	const nodeListButtons = document.querySelectorAll(".button");
	for (let i = 0; i < nodeListButtons.length; i++) 
	{
  		nodeListButtons[i].style.setProperty('--height', upgradeButtonHeight)	
		nodeListButtons[i].style.setProperty('--width', upgradeButtonWidth)
	}

	const nodeListSquares = document.querySelectorAll(".square");
	for (let i = 0; i < nodeListSquares.length; i++) 
	{
  		nodeListSquares[i].style.setProperty('--height',squareWidth)	
		nodeListSquares[i].style.setProperty('--width', squareHeight)
	}
	
	const nodeListTexts = document.querySelectorAll(".text");
	for (let i = 0; i < nodeListTexts.length; i++) 
	{
  		nodeListTexts[i].style.setProperty('--height', textHeight)	
		nodeListTexts[i].style.setProperty('--width', textWidth)
	}
}

//called when popsicle clicked
function clickFunction() {
	TimesClicked += 1

	level = TimesClicked - (Math.floor((TimesClicked) / 10) * 10)
	heightMultiplier = 10 - level
	popsicleNumber = popsicles - popsiclesSpent
	document.getElementById("PopsiclesNumber").innerHTML = "$" + popsicleNumber
	//popsicles = ((Math.floor((TimesClicked + 1) / 10)) * 1)

	if ((Math.floor((TimesClicked) / 10) * pointsPerPopsicle) > levelUp) {
		hue = (hue + Math.random() * 360)
		document.getElementById("PopsicleTop").style.setProperty('--hue', hue + "deg")
		document.getElementById("PopsicleStickIn").style.setProperty('--hueStick', hue + "deg")
		if (popsicles <= 0)
		{
			levelUp = (Math.floor((TimesClicked) / 10) * pointsPerPopsicle)
		}
		else
		{
			levelUp = (Math.floor((TimesClicked) / 10) * pointsPerPopsicle)
		}
		
		popsicles += pointsPerPopsicle
	}

	resize()
}
//called when "bigger popsicle" has been upgraded. Increases points gained per popsicle
//void -> void
function upgradePPP()
{
	if (PPPUpgradeCost <= popsicles - popsiclesSpent)
	{
		pointsPerPopsicle += 1
		popsiclesSpent += PPPUpgradeCost
		PPPUpgradeCost = PPPUpgradeCost + Math.round(PPPUpgradeCost * 0.15)
		levelUp = (Math.floor((TimesClicked) / 10) * pointsPerPopsicle)
	}

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
		//hides sun if not bought
		if (!sun_switch) {
		document.getElementById("Sun").style.visibility = "hidden"
		}
		else {
		document.getElementById("Sun").style.visibility = "visible"
		}

		CPS += 0.001
	    sun_amount += 1
		popsiclesSpent += CPSUpgradeCost
		CPSUpgradeCost = CPSUpgradeCost + Math.round(CPSUpgradeCost * 0.15)
		levelUp = (Math.floor((TimesClicked) / 10) * pointsPerPopsicle)
	}

}

//called every frame (60 fps)
//void -> void
function gameLoop()
{
	//set all cookies to their corrosponding variables
	//setCookie("username", user, 30);

	
	level = TimesClicked - (Math.floor((TimesClicked) / 10) * 10)
	heightMultiplier = 10 - level
	popsicleNumber = popsicles - popsiclesSpent
	document.getElementById("PopsiclesNumber").innerHTML = "$" + popsicleNumber
	//popsicles = ((Math.floor((TimesClicked + 1) / 10)) * 1)

	if ((Math.floor((TimesClicked) / 10) * pointsPerPopsicle) > levelUp) {
		hue = (hue + Math.random() * 360)
		document.getElementById("PopsicleTop").style.setProperty('--hue', hue + "deg")
		document.getElementById("PopsicleStickIn").style.setProperty('--hueStick', hue + "deg")
		if (popsicles <= 0)
		{
			levelUp = (Math.floor((TimesClicked) / 10) * pointsPerPopsicle)
		}
		else
		{
			levelUp = (Math.floor((TimesClicked) / 10) * pointsPerPopsicle)
		}
		
		popsicles += pointsPerPopsicle
	}

	resize()
	TimesClicked += CPS
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
