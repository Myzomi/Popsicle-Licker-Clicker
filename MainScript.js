// JavaScript Document
//clicking
let TimesClicked = 0
let popsicles = 0
let heightMultiplier = 10
let level = 5
let levelUp = 0
let hue = 0
document.getElementById("PopsiclesNumber").innerHTML = popsicles

//frame resize
let width = 0.2 * window.innerHeight + "px"
let stickWidth = 0.05 * window.innerHeight + "px"
document.getElementById("PopsicleTop").style.setProperty('--width', width)
document.getElementById("PopsicleStick").style.setProperty('--width', stickWidth)
document.getElementById("PopsicleStickIn").style.setProperty('--width', stickWidth)
let height = (heightMultiplier / 10) * 0.73 * window.innerHeight + "px"
let stickHeight = 0.23 * window.innerHeight + "px"
document.getElementById("PopsicleTop").style.setProperty('--height', height)
document.getElementById("PopsicleStick").style.setProperty('--height', stickHeight)
document.getElementById("PopsicleStickIn").style.setProperty('--height', stickHeight)

function resize() {
	if (window.innerHeight < window.innerWidth) {
		width = 0.2 * window.innerHeight + "px"
		stickWidth = 0.05 * window.innerHeight + "px"
		document.getElementById("PopsicleTop").style.setProperty('--width', width)
		document.getElementById("PopsicleStick").style.setProperty('--width', stickWidth)
		document.getElementById("PopsicleStickIn").style.setProperty('--width', stickWidth)
		height = (heightMultiplier / 10) * 0.73 * window.innerHeight + "px"
		stickHeight = 0.23 * window.innerHeight + "px"
		document.getElementById("PopsicleTop").style.setProperty('--height', height)
		document.getElementById("PopsicleStick").style.setProperty('--height', stickHeight)
		document.getElementById("PopsicleStickIn").style.setProperty('--height', stickHeight)
	} else {
		width = 0.2 * window.innerWidth + "px"
		stickWidth = 0.05 * window.innerWidth + "px"
		document.getElementById("PopsicleTop").style.setProperty('--width', width)
		document.getElementById("PopsicleStick").style.setProperty('--width', stickWidth)
		document.getElementById("PopsicleStickIn").style.setProperty('--width', stickWidth)
		height = (heightMultiplier / 10) * 0.73 * window.innerWidth + "px"
		stickHeight = 0.23 * window.innerWidth + "px"
		document.getElementById("PopsicleTop").style.setProperty('--height', height)
		document.getElementById("PopsicleStick").style.setProperty('--height', stickHeight)
		document.getElementById("PopsicleStickIn").style.setProperty('--height', stickHeight)
	}
}

function clickFunction() {
	TimesClicked += 1

	level = TimesClicked - (Math.floor((TimesClicked) / 10) * 10)
	heightMultiplier = 10 - level

	document.getElementById("PopsiclesNumber").innerHTML = popsicles
	popsicles = Math.floor((TimesClicked + 1) / 10)

	if (Math.floor((TimesClicked) / 10) > levelUp) {
		hue = (hue + Math.random() * 360)
		document.getElementById("PopsicleTop").style.setProperty('--hue', hue + "deg")
		document.getElementById("PopsicleStickIn").style.setProperty('--hueStick', hue + "deg")
		levelUp = popsicles
	}

	resize()
}