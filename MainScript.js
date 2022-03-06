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
//costs of each upgrade
let popsicle_worth_cost = 5
let sun_cost = 2
let factory_cost = 15
//total amount of popsicles spent
let popsiclesSpent = 0
let popsicleNumber= 0
let sun_amount = 0
var showingUpgrades =  false

//
let idlenumber = 0
let idle = 0
let dogs = 0


let debug = 0

//CPs upticks the popsicle height every game loop (popsicles upticks 1 every time the popsicle height is zero)
let CPS = 0
//CPS2 upticks idle every game loop (idle number is rounded down to equal idle)
let CPS2 = 0

document.getElementById("PopsiclesNumber").innerHTML = popsicles - popsiclesSpent
//both are hidden at the start
document.getElementById("UpgradesDiv").style.visibility = "hidden"
document.getElementById("Sun").style.visibility = "hidden"

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
		upgradeButtonWidth = 0.28 * window.innerHeight + "px"
		menuButtonWidth = 0.35 * window.innerHeight + "px"
		squareWidth = 0.2 * ((sun_amount + 10) * 0.1) * window.innerHeight + "px"
		textWidth = 0.05 * window.innerHeight + "px"
		
		//set height vars
		height = (heightMultiplier / 10) * 0.73 * window.innerHeight + "px"
		stickHeight = 0.23 * window.innerHeight + "px"
		upgradeButtonHeight = 0.1 * window.innerHeight + "px"
		menuButtonHeight = 0.05 * window.innerHeight + "px"
		squareHeight = 0.2 * ((sun_amount + 10) * 0.1) * window.innerHeight + "px"
		textHeight = 0.05 * window.innerHeight + "px"
	} 
	else 
	{
		//set width vars
		width = 0.2 * window.innerWidth + "px"
		stickWidth = 0.05 * window.innerWidth + "px"
		upgradeButtonWidth = 0.28 * window.innerWidth + "px"
		menuButtonWidth = 0.35 * window.innerWidth + "px"
		squareWidth = 0.2 * ((sun_amount + 10) * 0.1) * window.innerWidth + "px"
		textWidth = 0.05 * window.innerWidth + "px"
		
		//set height vars
		height = (heightMultiplier / 10) * 0.73 * window.innerWidth + "px"
		stickHeight = 0.23 * window.innerWidth + "px"
		upgradeButtonHeight = 0.1 * window.innerWidth + "px"
		menuButtonHeight = 0.05 * window.innerWidth + "px"
		squareHeight = 0.2 * ((sun_amount + 10) * 0.1) * window.innerWidth + "px"
		textHeight = 0.05 * window.innerWidth + "px"
	}
	//apply width vars
	document.getElementById("PopsicleTop").style.setProperty('--width', width)
	document.getElementById("PopsicleStick").style.setProperty('--width', stickWidth)
	document.getElementById("PopsicleStickIn").style.setProperty('--width', stickWidth)		
	//document.getElementById(").style.setProperty('--width', upgradeButtonWidth)	
	//document.getElementById("popsicle_worth_upgrade").style.setProperty('--width', upgradeButtonWidth)	
	
	//apply height vars
	document.getElementById("PopsicleTop").style.setProperty('--height', height)
	document.getElementById("PopsicleStick").style.setProperty('--height', stickHeight)
	document.getElementById("PopsicleStickIn").style.setProperty('--height', stickHeight)
	//document.getElementById("sun_upgrade").style.setProperty('--height', upgradeButtonHeight)	
	//document.getElementById("popsicle_worth_upgrade^").style.setProperty('--height', upgradeButtonHeight)		
	
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
	popsicleNumber = (idlenumber + popsicles) - popsiclesSpent
	document.getElementById("PopsiclesNumber").innerHTML = popsicleNumber + "$"
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
function popsicle_worth_upgrade()
{
	if (popsicle_gain <= (idlenumber + popsicles) - popsiclesSpent)
	{
		pointsPerPopsicle++
		popsiclesSpent += popsicle_gain
		popsicle_gain = popsicle_gain + Math.round(popsicle_gain * 0.15)
		levelUp = (Math.floor((TimesClicked) / 10) * pointsPerPopsicle)
	}

}


function factory_upgrade()
{
	if (factory_cost <= (idlenumber + popsicles) - popsiclesSpent)
	{
		CPS2 += 0.005555555
		popsiclesSpent += factory_cost
		factory_cost = Math.floor(factory_cost * 1.15)  
		
	}

}

document.addEventListener('contextmenu', event => event.preventDefault())

//called by upgradeCPS to check if sun has been bought
//void -> boolean
//Example:
//sun_amount = 1 -> return true
//sun_amount = 0 -> return false
function is_sun_active () {
	if(sun_amount >= 1) {
		return true;
	}
	else {
		return false;
	}
}

//called when sun is upgraded. Idly "melts" popsicle 
//void -> void
function sun_upgrade() {

	if (sun_cost <= (idlenumber + popsicles) - popsiclesSpent)
	{
		//hides sun if not bought
		if (!is_sun_active) {
		document.getElementById("Sun").style.visibility = "hidden"
		}
		else {
		document.getElementById("Sun").style.visibility = "visible"
		}

		CPS += 0.0011111111111
	    sun_amount += 1
		popsiclesSpent += sun_cost
		sun_cost = sun_cost + Math.round(sun_cost * 0.15)
		levelUp = (Math.floor((TimesClicked) / 10) * pointsPerPopsicle)
	}

}

//called every frame (60 fps)
//void -> void
function gameLoop()
{
	level = TimesClicked - (Math.floor((TimesClicked) / 10) * 10)
	heightMultiplier = 10 - level
	popsicleNumber = (idlenumber + popsicles) - popsiclesSpent
	document.getElementById("PopsiclesNumber").innerHTML = popsicleNumber + "$"
	//popsicles = ((Math.floor((TimesClicked + 1) / 10)) * 1)
	
	idle += CPS2
	idlenumber = Math.floor(idle)

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
